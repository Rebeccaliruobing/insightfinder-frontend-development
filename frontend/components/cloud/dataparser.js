import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';

class DataParser {
  
  constructor(data, instanceName) {
    
    this.data = data;
    this.instanceName = instanceName;

    // TODO: How to get hintMapping?
    this.hintMapping = {};
    
    this.anomalyTexts = null;
    this.anomalyConsolidatedTexts = null;
    this.causalDataArray = null;
    this.causalTypes = null;
    this.anomalies = null;
    this.seriesOptions = null;
    this.stats = null;
    this.metricUnitMap = null;
    this.groupsData = null;
    this.summaryData = null;
    this.groupmetrics = null;
    
    this.mode = this._detectionModeAndParse();
  }
  
  _detectionModeAndParse(){
    var arr = this.data['anomalyString'];
    if (!arr) return 'split';
    if(arr.length === 0){
      return "error";
    }
    var newarr = arr.filter(function(el, index, arr) {
      return el!==null;
    });
    if(newarr.length !== arr.length) {
      return "error";
    }

    if(this.data['modelType'] === 'Split'){
      return "split";
    } else {
      return "holistic";
    }
  }

  _parseMetricUnitMap() {
    if (this.metricUnitMap) return;
    
    let metricUnitMap = [];
    var arr = this.data['metricUnitMapping'];
    _.each(arr, function(a,i){
      metricUnitMap[a.metric] = a.unit;
    });
    
    this.metricUnitMap = metricUnitMap;
  }
  
  _extractMetric(atext) {

    if(!atext) return '';

    var ret = [];
    var items = atext.split(';');
    _.each(items, function(item, itemNo) {
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
    let rawHintMapping = this.data['hintMapping'];
    let hintMapping = {};
    if(rawHintMapping){
      hintMapping = $.parseJSON(rawHintMapping);
    }
    let anomalyTexts = [];
    let causalDataArray=[];
    let causalTypes = [];
    
    if(arr){
      _.each(arr, function(a,i){
        var atext = [];
        if(a.anomalies!=""){
          var lines = a.anomalies.split('\\n');
          _.each(lines, function(line, lineNo) {
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
              _.each(hintss, function(hint, ihint){
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

  _parseAnomalyConsolidatedText() {
    
    if (this.anomalyConsolidatedTexts) return;
    if(this.data['anomalyConsolidatedString'] === undefined) return;
    let arr = this.data['anomalyConsolidatedString'];
    let rawHintMapping = this.data['hintMapping'];
    let hintMapping = {};
    if(rawHintMapping){
      hintMapping = $.parseJSON(rawHintMapping);
    }
    let anomalyConsolidatedTexts = [];
    let causalDataArray=[];
    let causalTypes = [];
    
    if(arr){
      _.each(arr, function(a, i){
        var atext = [];
        if(a.anomaliesConsolidated){
          var lines = a.anomaliesConsolidated.split('\\n');
          _.each(lines, function(line, lineNo) {
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
              _.each(hintss, function(hint, ihint){
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
        anomalyConsolidatedTexts.push(atext);
      });
    }
    
    this.causalDataArray = causalDataArray;
    this.causalTypes = causalTypes;
    this.anomalyConsolidatedTexts = anomalyConsolidatedTexts;
  }
  
  _parseAnomalyData() {
    
    if (this.anomalies) return;
    this._parseAnomalyText();
    this._parseAnomalyConsolidatedText();
    
    if (this.mode != 'error') {

      let anomalyTexts = this.anomalyTexts;
      let anomalies = {};

      let self = this;
      let arr = this.data['detectionResults'];

      _.each(arr, function(a, i){
        var atext = (arr.length === 1) ? anomalyTexts[0] : anomalyTexts[i];
        var alies = [];
        var lines = a.detectionResults.split('\\n');
        _.each(lines, function(line, lineNo) {
          var items = line.split(',');
          if (lineNo === 0) {
            _.each(items, function(item, seriesNo) {
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

    _.each(this.seriesOptions, function(opt, i){
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
    _.each(lines, function(line, lineNo) {
      var items = line.split(',');
      if (lineNo === 0) {
        _.each(items, function(item, seriesNo) {
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
        _.each(items, function(item, seriesNo) {
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
    
    if (this.summaryData) return this.summaryData;
    
    this._parseAnomalyData();
    
    if(this.data['detectionResults'] === undefined) return null;
    
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
    
    let anomalyTexts = this.anomalyConsolidatedTexts || this.anomalyTexts;
    _.each(anomalyTexts, (o) => {
      _.forIn(o, (v, k) => {
        index++;
        annotations.push({
          series: 'Y1',
          x: k,
          shortText: index.toString(),
          text: v
        })
      });
    });
    
    this.summaryData = {
      id: 'summary',
      div_id: 'summary',
      title: 'Analysis Summary',
      unit: 'Anomaly Degree',
      sdata: _.map(alies, a => [a.time, a.val]),
      sname: ['X', 'Y1'],
      highlights: highlights,
      annotations: annotations
    };
    console.log(this.summaryData);
    return this.summaryData;
  }
  
  getGroupsData() {
    
    if (this.groupsData) return this.groupsData;

    this._parseMetricUnitMap();
    this._parseAnomalyData();
    this._parseData();
    
    let soptions = this.seriesOptions;
    let anomalies = this.anomalies;
    let metricUnitMap = this.metricUnitMap;
    let mode = this.mode;
    
    let gmpairs = _.map(soptions, o => [o.groupId, o.metric]);
    let groups = _.sortBy(_.uniq(_.map(gmpairs, o => o[0])));
    
    let groupmetrics = {};
    // Get the metrics for each group
    _.each(groups, function(grp, gNo){
      groupmetrics[grp] = $.map(
        gmpairs.filter((item,index) =>item[0] === grp),
        function(a){ return a[1]; }
      ).filter(function(el, idx, arr) {
        return idx === arr.indexOf(el);
      });
    });
    this.groupmetrics = groupmetrics;
    
    this.groupsData = _.map(groups, grp => {
      
      let series = _.filter(soptions, o => o.groupId == grp);
      let alies = [];
      let sdata = [];
      
      let sname = ['datetime'];
      
      // For highlight bar
      if(mode === "holistic"){
        var rawalies = anomalies["0"];
        var thismetrs = groupmetrics[grp];;
        _.each(thismetrs,function(item, itemNo){
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
      _.each(series,function(s, seriesNo){
        sname.push(s.name);
        _.each(s.data,function(item, itemNo){
          if(seriesNo === 0){
            sdata.push(item);
          } else {
            sdata[itemNo].push(item[1]);
          }
        })
      });

      var unit = metricUnitMap[groupmetrics[grp][0]];

      return {
        id: grp,
        div_id: 'metric_group_' + grp,
        title: 'Metric Group ' + grp,
        sdata: sdata,
        sname: sname,
        unit: unit || '',
        highlights: highlights,
        annotations: undefined
      };
    });
    return this.groupsData;
  }
}

export default DataParser;
