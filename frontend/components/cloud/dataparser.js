import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';

class DataParser {
  
  constructor(data) {
    
    this.data = data;

    // TODO: How to get hintMapping?
    this.hintMapping = {};
    
    this.anomalyTexts = null;
    this.causalDataArray = null;
    this.causalTypes = null;
    this.anomalies = null;
    this.seriesOptions = null;
    this.stats = null;
    this.metricUnitMap = [];
    this.groupsData = null;
    this.groupmetrics = null;
    
    this.mode = this._detectionModeAndParse();
  }
  
  _detectionModeAndParse(){
    var arr = this.data['anomalyString'];
    if(arr.length === 0){
      return "error";
    }
    var newarr = arr.filter(function(el, index, arr) {
      return el!==null;
    });
    if(newarr.length !== arr.length) {
      return "error";
    }

    if(arr[0].groupId === "0"){
      return "holistic";
    } else {
      return "split";
    }
  }
  
  _extractMetric(atext) {

    if(!atext) return '';

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

  _parseAnomalyText() {
    
    if (this.anomalyTexts) return;
    
    let arr = this.data['anomalyString'];
    let hintMapping = this.hintMapping;
    let anomalyTexts = [];
    let causalDataArray=[];
    let causalTypes = [];
    
    if(arr){
      $.each(arr, function(i,a){
        var atext = [];
        if(a.anomalies!=""){
          var lines = a.anomalies.split('\n');
          $.each(lines, function(lineNo, line) {
            var items = line.split(',');

            //prepare causality chart data
            var thisAnomaly = [];
            var timeString = moment(parseInt(items[0])).format("YYYY-MM-DD HH:mm")
            thisAnomaly.push(timeString+","+items[1]);

            if(items[2]){
              var hints = items[2].trim().split(':');
              // further parse hints[1], eg. 1.Change_inflicted(min)[node0](1.0); 2.Sub_cause_type[node0](4.0); 3.Sub_cause_subset[node0](4.0)
              var hintss = hints[1].trim().split(';');
              var newhints = "";
              $.each(hintss, function(ihint,hint){
                // 1.Change_inflicted(min)[node0](1.0);
                // 0=#.metric, 1=node, 2=(val)
                var hintparts = hint.split(/\[|\]/);
                var metric = hintparts[0].split('.')[1];
                if(hintparts.length==3){
                  thisAnomaly.push(hintparts[0]+" ["+hintparts[1]+"]"+hintparts[2]);
                } else {
                  thisAnomaly.push(hintparts[0]+" ["+hintparts[1]+"]");
                }
                causalTypes.push(metric+" ["+hintparts[1]+"]");
                try{
                  var valparts = hintparts[2].split(/\(|\)/)[1].split('.');
                  var newval = hintparts[2].split(/\(|\)/)[1];
                  if(hintMapping[metric.trim()]!=undefined){
                    var thisMap = hintMapping[metric.trim()];
                    if(thisMap[parseInt(valparts[0])]!=undefined){
                      newval = thisMap[parseInt(valparts[0])];
                    }
                  }
                  newhints = newhints+hintparts[0]+"["+hintparts[1]+"]("+newval+")";
                  if(ihint<hintss.length-1){
                    newhints = newhints+"; ";
                  }
                } catch (err){
                  newhints = hints[1];
                }
              });

              atext[parseInt(items[0])] = newhints;
            }
            causalDataArray.push(thisAnomaly);
          });
          causalTypes = causalTypes.filter(function(el, index, arr) {
            return index === arr.indexOf(el);
          });
        }
        anomalyTexts.push(atext);
      });
    }
    
    this.causalDataArray = causalDataArray;
    this.causalTypes = causalTypes;
    this.anomalyTexts = anomalyTexts;
  }
  
  _parseAnomalyData() {
    
    if (this.anomalies) return;
    this._parseAnomalyText();
    
    if (this.mode != 'error') {

      let anomalyTexts = this.anomalyTexts;
      let anomalies = {};

      let self = this;
      let arr = this.data['detectionResults'];

      $.each(arr, function(i,a){
        var atext = (arr.length === 1) ? anomalyTexts[0] : anomalyTexts[i];
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
                metrs : (parseFloat(items[1])>0)?(self._extractMetric(atext[ts])):[]
              });
            }
          }
        });
        anomalies[a.groupId] = alies
      });
      this.anomalies = anomalies;
    }
  }

  _parseStats() {

    if (this.stats) return;
    this._parseData();

    let stats = [];
    let {minString, maxString, avgString, stdString, availString}= this.data;

    let mins = minString.split(',');
    let maxs = maxString.split(',');
    let avgs = avgString.split(',');
    let stds = stdString.split(',');
    let avails = availString.split(',');

    $.each(this.seriesOptions, function(i, opt){
      var stat = {
        metric: opt.metric,
        node: opt.node,
        groupId: opt.groupId,
        min: parseFloat(mins[i]),
        max: parseFloat(maxs[i]),
        avg: parseFloat(avgs[i]),
        std: parseFloat(stds[i]),
        avail: parseFloat(avails[i])*100
      };
      stats.push(stat);
    });
    this.stats = stats;
  };

  _parseData() {

    if (this.seriesOptions) return;
    let data = this.data['data'];

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
        let ts = new Date(parseInt(items[0]));
        $.each(items, function(seriesNo, item) {
          if (seriesNo > 0) {
            if(soptions[seriesNo-1]==null){
              console.log("seriesNo-1:",seriesNo-1,"so len:",soptions.length)
            }
            soptions[seriesNo-1].data.push([ts,parseFloat(item)]);
          }
        });
      }
    });

    this.seriesOptions = soptions;
  };
  getSummaryData() {
    
    this._parseAnomalyData();
    
    // TODO: Check chart mode, only holistic has summary
    let alies = this.anomalies[0];
    let annotations = [];
    
    let index = 0;
    let highlights = _.map(alies, a => {
      return {
        start: a.timestamp,
        end: a.timestamp,
        val: a.val < 0 ? 0 : Math.min(10, a.val)
      }
    });
    
    _.map(this.anomalyTexts, (o) => {
      _.forIn(o, (v, k) => {
        index++;
        annotations.push({
          series: 'D',
          x: k,
          shortText: index.toString(),
          text: v
        })
      });
    });
    
    return {
      series: _.map(alies, a => [a.time, a.val]),
      highlights: highlights,
      annotations: annotations
    }
  }
  
  getGroupsData() {
    
    if (this.groupsData) return this.groupsData;

    this._parseAnomalyData();
    this._parseData();
    
    let soptions = this.seriesOptions;
    let anomalies = this.anomalies;
    let mode = this.mode;
    
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
    this.groupmetrics = groupmetrics;
    
    let gdata = _.map(groups, grp => {
      
      let series = _.filter(soptions, o => o.groupId == grp);
      let alies = [];
      let sdata = [];
      
      let sname = ['datetime'];
      
      // For highlight bar
      if(mode === "holistic"){
        var rawalies = anomalies["0"];
        var thismetrs = groupmetrics[grp];;
        $.each(thismetrs,function(itemNo,item){
          var thisalies = rawalies.filter(function(ra,rai){
            return (ra.metrs.indexOf(item) != -1);
          });
          alies = alies.concat(thisalies);
        });
        alies = alies.filter(function(el, index, arr) {
          return index === arr.indexOf(el);
        });
      } else if (mode === "split") {
        alies = anomalies[grp];
      }
      
      let highlights = _.map(alies, a => {
        return {
          start: a.timestamp,
          end: a.timestamp,
          val: a.val < 0 ? 0 : Math.min(10, a.val)
        }
      });

      // series name & data
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

      var unit = this.metricUnitMap[groupmetrics[grp][0]];

      return {
        id: grp,
        sdata: sdata,
        sname: sname,
        unit: unit || '',
        highlights: highlights
      };
    });
    
    return gdata;
  }
}

export default DataParser;