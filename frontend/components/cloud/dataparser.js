import $ from 'jquery';
import _ from 'lodash';

class DataParser {
  
  constructor(data) {
    
    this.data = data;

    this.hintMapping = [];
    
    this.anomalyTexts = [];
    this.anomalies = [];
    
    this.metricUnitMap = [];
    this.seriesOptions = [];
    this.metrics = [];
    this.groups = [];
    this.gmpairs = [];
    this.groupmetrics = [];

  }
  
  parseMetricUnitMap() {
    var arr = this.data.metricUnitMapping;
    if(!arr || arr.length === 0){
      console.log("Empty metric unit map!");
    }
    $.each(arr, function(i,a){
      this.metricUnitMap[a.metric] = a.unit;
    });
  }
  
  _parseData(data) {
    // soptions[nMetrics]:{name,data[nTs]:[ts,val],metric,node}
    var soptions = {};
    
    var lines = data.split('\\n');
    $.each(lines, function(lineNo, line) {
      var items = line.split(',');
      if (lineNo === 0) {
        $.each(items, function(seriesNo, item) {
          if (seriesNo > 0) {
            // cpu#% [node1]: 1
            var cats = item.trim().split(/\[|\]|\:/);
            soptions[seriesNo-1] = {
              name: item,
              data: [],
              metric: cats[0].trim(),
              node: cats[1].trim(),
              groupId: cats[3].trim()
            };
          }
        });
      } else {
        let ts = undefined;
        $.each(items, function(seriesNo, item) {
          if (seriesNo === 0) {
            ts = new Date(parseInt(item));
          } else {
            if(soptions[seriesNo-1]==null){
              console.log("seriesNo-1:",seriesNo-1,"so len:",soptions.length)
            }
            soptions[seriesNo-1].data.push([ts,parseFloat(item)]);
          }
        });
      }
    });
    
    return soptions;
  };

  extractMetric(atext) {
    if(!atext){
      return "";
    }
    var ret = [];
    var items = atext.split(';');
    $.each(items, function(itemNo,item) {
      var pos = item.trim().indexOf(".");
      var pos2 = item.trim().substr(pos+1).indexOf("[");
      var metr = item.trim().substr(pos+1).substr(0,pos2);
      ret.push(metr);
    });
    ret = ret.filter(function(el, index, arr) {
      return index === arr.indexOf(el);
    });
    return ret;
  };

  parseAnomalyText() {
    
    let arr = this.data.anomalyString;
    var self = this;

    $.each(arr, function(i,a){
      var atext = {};
      if(a.anomalies!=""){
        var lines = a.anomalies.split('\\n');
        $.each(lines, function(lineNo, line) {
          var items = line.split(',');
          if(items[2]){
            var hints = items[2].trim().split(':');
            // further parse hints[1], eg. 1.Change_inflicted(min)[node0](1.0); 2.Sub_cause_type[node0](4.0); 3.Sub_cause_subset[node0](4.0)
            var hintss = hints[1].trim().split(';');
            var newhints = "";
            try{
              $.each(hintss, function(ihint,hint){
                // 1.Change_inflicted(min)[node0](1.0);
                // 0=#.metric, 1=node, 2=(val)
                var hintparts = hint.split(/\[|\]/);
                var metric = hintparts[0].split('.')[1];
                var valparts = hintparts[2].split(/\(|\)/)[1].split('.');
                var newval = hintparts[2].split(/\(|\)/)[1];
                if(self.hintMapping[metric.trim()]!=undefined){
                  var thisMap = self.hintMapping[metric.trim()];
                  if(thisMap[parseInt(valparts[0])]!=undefined){
                    newval = thisMap[parseInt(valparts[0])];
                  }
                }
                newhints = newhints+hintparts[0]+"["+hintparts[1]+"]("+newval+")";
                if(ihint<hintss.length-1){
                  newhints = newhints+"; ";
                }
              });
            } catch (err){
              newhints = hints[1];
            }

            atext[parseInt(items[0])] = newhints;
          }
        });
      }
      self.anomalyTexts.push(atext);
    });
  }
  
  parseAnomalyData() {

    let self = this;
    let arr = this.data.detectionResults;
    
    $.each(arr, function(i,a){
      var atext = (arr.length === 1)?self.anomalyTexts[0]:self.anomalyTexts[i];
      var alies = [];
      var lines = a.detectionResults.split('\\n');
      $.each(lines, function(lineNo, line) {
        var items = line.split(',');
        if (lineNo === 0) {
          $.each(items, function(seriesNo, item) {
            if (seriesNo > 0) {
              // if multiple output types are present, parse them here
            }
          });
        } else {
          if ($.isNumeric(items[1])) {
            var ts = parseInt(items[0]);
            var val = parseFloat(items[1]);
            alies.push({
              groupId : a.groupId,
              time : new Date(ts),
              timestamp : ts,
              val : val,
              text : (parseFloat(items[1])>0)?atext[ts]:"",
              metrs : (parseFloat(items[1])>0)?(self.extractMetric(atext[ts])):[]
            });
          }
        }
      });
      self.anomalies[a.groupId] = alies
    });
  }

  getGroupData() {
    let soptions = this._parseData(this.data.data);
    
    let gmpairs = _.map(soptions, o => [o.groupId, o.metric]);
    let groups = _.sortBy(_.uniq(_.map(gmpairs, o => o[0])));
    let groupmetrics = {};

    // Get the metrics for each group
    $.each(groups, function(gNo, grp){
      groupmetrics[grp] = $.map(
        gmpairs.filter(function(item,index){
          return item[0] === grp;
        }),
        function(a){ return a[1]; }
      ).filter(function(el, idx, arr) {
        return idx === arr.indexOf(el);
      });
    });
    
    let gdata = _.map(groups, grp => {
      
      let series = _.filter(soptions, o => o.groupId == grp);
      let sdata = [];
      let sname = ['datetime'];

      $.each(series,function(seriesNo, s){
        sname.push(s.name);
        $.each(s.data,function(itemNo, item){
          if(seriesNo === 0){
            sdata.push(item);
          } else {
            sdata[itemNo].push(item[1]);
          }
        })
      });

      return {
        id: grp,
        sdata: sdata,
        sname: sname,
        unit: ''
      };
    });
    
    return gdata;
  }
}

export default DataParser;
