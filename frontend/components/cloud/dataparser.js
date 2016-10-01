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
    this.anomalyConsolidatedIncidentTexts = null;
    this.anomalyConsolidatedInstanceTexts = null;
    this.causalDataArray = null;
    this.causalTypes = null;
    this.anomalies = null;
    this.seriesOptions = null;
    this.interval = null;
    this.stats = null;
    this.metricUnitMap = null;
    this.groupsData = null;
    this.summaryData = null;
    this.groupmetrics = null;
    this.gmpairs = null;
    this.nidMap = null;
    this.logEventArr = null;
    this.episodeMapArr = null;

    this.mode = this._detectionModeAndParse();
  }

  _detectionModeAndParse() {
    var arr = this.data['anomalyString'];
    if (!arr) return 'holistic';
    if (arr.length === 0) {
      return "error";
    }
    var newarr = arr.filter(function (el, index, arr) {
      return el !== null;
    });
    if (newarr.length !== arr.length) {
      return "error";
    }

    if (this.data['modelType'] === 'Split') {
      //return "split";
      // this is after we unified returned anomaly string 
      // and result string to be only in group 0 
      // for all model types
      return "holistic";
    } else {
      return "holistic";
    }
  }

  _parseMetricUnitMap() {
    if (this.metricUnitMap) return;

    let metricUnitMap = [];
    var arr = this.data['metricUnitMapping'];
    _.each(arr, function (a, i) {
      metricUnitMap[a.metric] = a.unit;
    });

    this.metricUnitMap = metricUnitMap;
  }

  // 1.memory[node3](1630.0)(83.1801528930664); 2.disk_read[node1](2.73)(51.61351776123047)"
  // return { metric:allocatedAnomalyRatio, ... }
  _extractMetric(atext) {
    if (!atext) return '';
    var retMap = {};
    var items = atext.split(';');
    var metricList = [];
    var percentageList = [];
    var totalPercentage = 0;
    _.each(items, function (item, itemNo) {
      var pos1 = item.indexOf(".");
      var pos2 = item.indexOf("[");
      var pos3 = item.indexOf("(");
      var pos4 = item.indexOf("(",pos3+1);
      var pos5 = item.indexOf(")",pos4+1);
      var metr = item.substring(pos1 + 1, pos2);
      metricList.push(metr);
      if(pos4!=-1 && pos5!=-1){
        let percentageString = item.substring(pos4 + 1, pos5);
        let percentage = 0;
        if(percentageString != "missing"){
           percentage = parseFloat(percentageString);
        }
        
        percentageList.push(percentage);
        totalPercentage += percentage;
      } else {
        percentageList.push(0);
      }
    });
    _.each(metricList, function (metric, imetric) {
      let allocatedPercentage = (totalPercentage==0) ? (1.0/metricList.length) : (percentageList[imetric]/totalPercentage);
      retMap[metric] = allocatedPercentage;
    });
    return retMap;
  }
  _parseIncidentList(){
    if (this.causalDataArray) return;
    let causalDataArray = [];
    let causalTypes = [];
    let incidents = this.data['incidentsJson'];
    if(incidents){
      _.each(incidents, function (incident, index) {
        if(incident.anomalyMapJson){
          let thisAnomaly = [];
          let timeString = moment(parseInt(incident.timestamp)).format("YYYY-MM-DD HH:mm")
          thisAnomaly.push(timeString + ",anomaly ratio:" + incident.anomalyRatio);
          for(var k in incident.anomalyMapJson){
            let rank = 1;
            causalTypes.push(k);
            let hint = incident.anomalyMapJson[k];
            for(var h in hint){
              let val = hint[h];
              thisAnomaly.push(rank + "." + h + " [" + k + "](" + val + ")");
              rank++;
            }
          }
          causalDataArray.push(thisAnomaly);
        }
      });
    }
    causalTypes = causalTypes.filter(function (el, index, arr) {
      return index === arr.indexOf(el);
    });
    this.causalDataArray = causalDataArray;
    this.causalTypes = causalTypes;
  }

  _parseAnomalyText() {

    if (this.anomalyTexts) return;

    let arr = this.data['anomalyString'];
    let rawHintMapping = this.data['hintMapping'];
    let hintMapping = {};
    if (rawHintMapping) {
      try {
        hintMapping = $.parseJSON(rawHintMapping);
      } catch (err) {
      }
    }
    let anomalyTexts = [];
    // let causalDataArray = [];
    // let causalTypes = [];

    if (arr) {
      _.each(arr, function (a, i) {
        var atext = [];
        if (a.anomalies && a.anomalies != "") {
          var lines = a.anomalies.split('\\n');
          _.each(lines, function (line, lineNo) {
            if (!line || line === '') return;
            var items = line.split(',',4);

            //prepare causality chart data
            var thisAnomaly = [];
            var timeString = moment(parseInt(items[0])).format("YYYY-MM-DD HH:mm")
            thisAnomaly.push(timeString + "," + items[1]);
            let hintString = undefined;
            if(items.length == 3){
              hintString = items[2];
            }else if(items.length == 4){
              hintString = items[3];
            }
            if (hintString) {
              var hints = hintString.trim().split(':');
              if(hints.length>1){
                // further parse hints[1], eg. 1.Change_inflicted(min)[node0](1.0); 2.Sub_cause_type[node0](4.0); 3.Sub_cause_subset[node0](4.0)
                var hintss = hints[1].trim().split(';');
                var newhints = "";
                _.each(hintss, function (hint, ihint) {
                  // 1.Change_inflicted(min)[node0](1.0)(10.0);
                  // 0=#.metric, 1=node, 2=(val), 3=(pct)
                  var hintparts = hint.split(/\[|\]/);
                  var metric = hintparts[0].split('.')[1];
                  if (hintparts.length == 3) {
                    thisAnomaly.push(hintparts[0] + " [" + hintparts[1] + "]" + hintparts[2]);
                  } else {
                    thisAnomaly.push(hintparts[0] + " [" + hintparts[1] + "]");
                  }
                  // causalTypes.push(metric + " [" + hintparts[1] + "]");
                  // causalTypes.push( hintparts[1] );
                  try {
                    var valparts = hintparts[2].split(/\(|\)/)[1].split('.');
                    var newval = hintparts[2].split(/\(|\)/)[1];
                    if (hintMapping[metric.trim()] != undefined) {
                      var thisMap = hintMapping[metric.trim()];
                      if (thisMap[parseInt(valparts[0])] != undefined) {
                        newval = thisMap[parseInt(valparts[0])];
                      }
                    }
                    newhints = newhints + hintparts[0] + "[" + hintparts[1] + "](" + newval + ")";
                    if(hintparts[2].split(/\(|\)/).length>=4){
                      var pct = hintparts[2].split(/\(|\)/)[3];
                      newhints += "("+pct+")";
                    }
                    if (ihint < hintss.length - 1) {
                      newhints = newhints + "; ";
                    }
                  } catch (err) {
                    newhints = hints[1];
                  }
                });
  
                atext[parseInt(items[0])] = newhints;
              }
            }
            // causalDataArray.push(thisAnomaly);
          });
          // causalTypes = causalTypes.filter(function (el, index, arr) {
          //   return index === arr.indexOf(el);
          // });
        }
        anomalyTexts.push(atext);
      });
    }
    // this.causalDataArray = causalDataArray;
    // this.causalTypes = causalTypes;
    this.anomalyTexts = anomalyTexts;
  }

  _parseAnomalyConsolidatedText() {

    if (this.anomalyConsolidatedTexts) return;
    if (this.data['anomalyConsolidatedString'] === undefined) return;
    let arr = this.data['anomalyConsolidatedString'];
    let rawHintMapping = this.data['hintMapping'];
    let hintMapping = {};
    let interval = this.interval;
    if (rawHintMapping) {
      try {
        hintMapping = $.parseJSON(rawHintMapping);
      } catch (err) {
      }
    }
    let anomalyConsolidatedTexts = [];
    let anomalyConsolidatedIncidentTexts = [];

    if (arr) {
      _.each(arr, function (a, i) {
        var atext = [];
        var intext = [];
        if (a.anomaliesConsolidated) {
          var lines = a.anomaliesConsolidated.split('\\n');
          _.each(lines, function (line, lineNo) {
            if (!line || line === '') return;
            var items = line.split(',',4);

            //prepare causality chart data
            var thisAnomaly = [];
            var ts = parseInt(items[0]);
            var timeString = moment(ts).format("YYYY-MM-DD HH:mm");
            thisAnomaly.push(timeString + "," + items[1]);
            let hintString = undefined;
            let hasPct = false;
            let neuronId = undefined;
            if(items.length == 3){
              hintString = items[2];
            }else if(items.length == 4){
              hasPct = true;
              hintString = items[3];
              neuronId = parseInt(items[2].split(":")[1]);
            }
            if (hintString) {
              var hints = hintString.trim().split(':');
              var pos = hintString.trim().indexOf(':');
              if(pos==hintString.trim().length-1){
                // emtpy hint, skip
                return true;
              }
              var newhints = hintString.trim().substring(pos+1);
              var newhintsArr = newhints.split("\t");
              var newhintsStr = "";
              var newhintsIncidentStr = "";
              _.each(newhintsArr,function(h,ih){
                var parts = h.split(":",2);
                var hintStr = "";
                _.each(parts[1].split(";"),function(item,index){
                  let pos0 = item.indexOf(".");
                  let pos1 = item.indexOf("[");
                  let pos2 = item.indexOf("]");
                  let pos3 = item.indexOf(")");
                  let pos4 = item.indexOf(")",pos3+1);
                  let rootcause = item.substring(pos3+2,pos4);
                  let valString = item.substring(pos2+2,pos3);
                  if(valString != 'missing'){
                    valString = parseFloat(item.substring(pos2+2,pos3)).toFixed(2);
                  }
                  if(!hasPct){
                    rootcause = "";
                  } else {
                    if(valString != 'missing'){
                      if(neuronId&&neuronId==-1){
                        rootcause = parseFloat(rootcause).toFixed(1)+"% higher than threshold, ";  
                      } else {
                        rootcause = parseFloat(rootcause).toFixed(1)+"% higher than normal, ";
                      }                      
                    } else {
                      rootcause = "missing value, "
                    }
                  }
                  hintStr += "Root cause #" + (index+1) + ": "+rootcause
                    +"instance:"+item.substring(pos1+1,pos2)
                    +", metric:"+item.substring(pos0+1,pos1)
                    +", value:"+valString+";\n";
                });
                let tsHint = parseInt(parts[0]);
                let timeStringHint = moment(tsHint).format("YYYY-MM-DD HH:mm");

                newhintsStr += "Starting at " + timeStringHint +",\n"+hintStr;
                if(ih == 0){
                  newhintsIncidentStr = newhintsStr;
                }              
              });
              if(newhintsStr.length>512){
                newhintsStr = newhintsStr.substring(0,511)+"...";
              }
              atext[parseInt(items[0])] = newhintsStr;
              var dur = Math.round(newhintsArr.length * interval / 60000);
              intext[parseInt(items[0])] = (neuronId?(neuronId+","):"") + "Duration:" + dur + " minute"+(dur>1?"s":"")+"\n" + newhintsIncidentStr;
            }
          });
        }
        anomalyConsolidatedTexts.push(atext);
        anomalyConsolidatedIncidentTexts.push(intext);
      });
    }
    this.anomalyConsolidatedTexts = anomalyConsolidatedTexts;
    this.anomalyConsolidatedIncidentTexts = anomalyConsolidatedIncidentTexts;
  }

  parseLogAnalysisData(){
    if(this.data['eventJsonArr']){
      this.logEventArr = this.data['eventJsonArr'];
    }
    if(this.data['episodeMapArr']){
      this.episodeMapArr = this.data['episodeMapArr'];
    }
    if(this.data['wordCountArr']){
      this.wordCountArr = this.data['wordCountArr'];
    }
    if(this.data['clusterTopEpisodeArr']){
      this.clusterTopEpisodeArr = this.data['clusterTopEpisodeArr'];
    }
    if(this.data['clusterTopWordArr']){
      this.clusterTopWordArr = this.data['clusterTopWordArr'];
    }
  }

  _parseAnomalyData() {

    if (this.anomalies) return;
    this._parseAnomalyText();
    this._parseAnomalyConsolidatedText();
    this._parseIncidentList(); // for causal graph

    if (this.mode != 'error') {

      let anomalyTexts = this.anomalyTexts;
      let anomalies = {};

      let self = this;
      let arr = this.data['detectionResults'];
      let nidMap = {};

      _.each(arr, function (a, i) {
        var atext = (arr.length === 1) ? anomalyTexts[0] : anomalyTexts[i];
        var alies = [];
        if(!a.detectionResults) return false;
        var lines = a.detectionResults.split('\\n');
        _.each(lines, function (line, lineNo) {
          var items = line.split(',');
          if (lineNo === 0) {
            _.each(items, function (item, seriesNo) {
              if (seriesNo > 0) {
                // if multiple output types are present, parse them here
              }
            });
          } else {
            var ts = parseInt(items[0]);
            if ($.isNumeric(items[1])) {
              var val = parseFloat(items[1]);
              alies.push({
                groupId: a.groupId,
                time: new Date(ts),
                timestamp: ts,
                val: val,
                text: (parseFloat(items[1]) > 0) ? atext[ts] : "",
                metrs: (parseFloat(items[1]) > 0) ? (self._extractMetric(atext[ts])) : {}
              });
            }
            if(items[2] && $.isNumeric(items[2])){
              var nid = parseInt(items[2]);
              if(!nidMap[nid]){
                nidMap[nid] = [];
              }
              nidMap[nid].push(ts);
            }
          }
        });
        anomalies[a.groupId] = alies
      });
      this.anomalies = anomalies;
      this.nidMap = nidMap;
    }
  }

  _parseStats() {

    if (this.stats) return;
    this._parseData();

    let stats = [];
    let {minString, maxString, avgString, stdString, availString}= this.data;
    if(!(minString&&maxString&&avgString&&stdString&&availString)) return;

    let mins = minString.split(',');
    let maxs = maxString.split(',');
    let avgs = avgString.split(',');
    let stds = stdString.split(',');
    let avails = availString.split(',');

    _.each(this.seriesOptions, function (opt, i) {
      var stat = {
        metric: opt.metric,
        node: opt.node,
        groupId: opt.groupId,
        min: parseFloat(mins[i]),
        max: parseFloat(maxs[i]),
        avg: parseFloat(avgs[i]),
        std: parseFloat(stds[i]),
        avail: parseFloat(avails[i]) * 100
      };
      stats.push(stat);
    });
    this.stats = stats;
  }

;

  _parseData() {

    if (this.seriesOptions) return;
    let data = this.data['data'];
    if (!data) return;

    // soptions[nMetrics]:{name,data[nTs]:[ts,val],metric,node}
    var soptions = {};
    var lines = data.trim().split('\\n');
    var ts1 = undefined;
    var ts2 = undefined;
    var tsN = undefined;
    _.each(lines, function (line, lineNo) {
      var items = line.split(',');
      if (lineNo === 0) {
        _.each(items, function (item, seriesNo) {
          if (seriesNo > 0) {
            // cpu#% [node1]: 1
            var cats = item.trim().split(/\[|\]|\:/);
            soptions[seriesNo - 1] = {
              name: item,
              data: [],
              metric: cats[0].trim(),
              node: cats[1].trim(),
              groupId: cats[3].trim()
            };
          }
        });
      } else {
        if(lineNo==1){
          ts1 = parseInt(items[0]);
        }else if(lineNo==2){
          ts2 = parseInt(items[0]);
        }
        if(lineNo==lines.length-1){
          tsN = parseInt(items[0]);
        }
        let ts = new Date(parseInt(items[0]));
        _.each(items, function (item, seriesNo) {
          if (seriesNo > 0) {
            if (soptions[seriesNo - 1] == null) {
            }
            soptions[seriesNo - 1].data.push([ts, parseFloat(item)]);
          }
        });
      }
    });

    if(ts1 && ts2){
      this.interval = ts2-ts1;
    }
    this.startTimestamp = ts1;
    this.endTimestamp = tsN;
    this.seriesOptions = soptions;
  }

;

  getSummaryData() {

    if (this.summaryData) return this.summaryData;

    this._parseData();
    this._parseAnomalyData();

    if (this.data['detectionResults'] === undefined) return null;

    let alies = this.anomalies[0];
    let annotations = [];
    let incidentSummary = [];

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
          // attachAtBottom: true
        })
      });
    });

    let incidentTexts = this.anomalyConsolidatedIncidentTexts;
    index=0;
    _.each(incidentTexts, (o) => {
      _.forIn(o, (v, k) => {
        index++;
        incidentSummary.push({
          id: index.toString(),
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
      annotations: annotations,
      incidentSummary: incidentSummary
    };
    return this.summaryData;
  }

  getGroupsData() {

    if (this.groupsData) return this.groupsData;

    this._parseData();
    this._parseMetricUnitMap();
    this._parseAnomalyData();

    let soptions = this.seriesOptions;
    let anomalies = this.anomalies;
    let metricUnitMap = this.metricUnitMap;
    let mode = this.mode;

    let gmpairs = _.map(soptions, o => [o.groupId, o.metric]);
    let groups = _.sortBy(_.uniq(_.map(gmpairs, o => o[0])));

    let groupmetrics = {};
    // Get the metrics for each group
    _.each(groups, function (grp, gNo) {
      groupmetrics[grp] = $.map(
          gmpairs.filter((item, index) =>item[0] === grp),
          function (a) {
            return a[1];
          }
      ).filter(function (el, idx, arr) {
            return idx === arr.indexOf(el);
          });
    });
    this.gmpairs = gmpairs;
    this.groupmetrics = groupmetrics;
    this.groupsData = _.map(groups, grp => {

      let series = _.filter(soptions, o => o.groupId == grp);
      let alies = [];
      let sdata = [];

      let sname = ['datetime'];

      // For highlight bar, use holistic mode for all modeltype
      if (mode === "holistic") {
        var rawalies = anomalies["0"];
        if(rawalies!=undefined){
          var thismetrs = groupmetrics[grp];
          _.each(thismetrs, function (item, itemNo) {
            var thisalies = rawalies.filter(function (ra, rai) {
              return (Object.keys(ra.metrs).indexOf(item) != -1);
            });
            alies = alies.concat(thisalies);
          });
          alies = alies.filter(function (el, index, arr) {
            return index === arr.indexOf(el);
          });
        }
      } else if (mode === "split") {
        if(anomalies[grp]!=undefined){
          alies = anomalies[grp];
        }
      }

      let highlights = _.map(alies, a => {
        return {
          start: a.timestamp,
          end: a.timestamp,
          val: a.val < 0 ? 0 : Math.min(10, a.val)
        }
      });

      // series name & data
      _.each(series, function (s, seriesNo) {
        sname.push(s.name);
        _.each(s.data, function (item, itemNo) {
          if (seriesNo === 0) {
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
        metrics: groupmetrics[grp],
        highlights: highlights,
        annotations: undefined,
        incidentSummary: undefined
      };
    });
    return this.groupsData;
  }

  getGroupsDataTest() {

    if (this.groupsData) return this.groupsData;

    this._parseData();
    this._parseMetricUnitMap();
    this._parseAnomalyData();

    let soptions = this.seriesOptions;
    let anomalies = this.anomalies;
    let metricUnitMap = this.metricUnitMap;
    let mode = this.mode;

    let gmpairs = _.map(soptions, o => [o.groupId, o.metric]);
    let groupsT = _.sortBy(_.uniq(_.map(gmpairs, o => o[1])));

    let groupmetrics = {};
    _.each(groupsT, function (grp, gNo) {
      groupmetrics[gNo+1] = grp;
        });
    this.gmpairs = gmpairs;
    this.groupmetrics = groupmetrics;
    this.groupsData = groupsT.map(function (value, index) {
      let grp = index + 1;
      let series = _.filter(soptions, o => o.metric == value);
      let alies = [];
      let sdata = [];
      let sname = ['datetime'];
      let sId = [];
      // For highlight bar, use holistic mode for all modeltype
      if (mode === "holistic") {
        //var rawalies = anomalies["0"];
        var rawalies = anomalies["0"];
        if(rawalies!=undefined){
          var thismetrs = groupmetrics[grp];
          var thisalies = rawalies.filter(function (ra, rai) {
            return (Object.keys(ra.metrs).indexOf(thismetrs) != -1);
          });
          alies = thisalies;
          alies = alies.filter(function (el, index, arr) {
            return index === arr.indexOf(el);
          });
        }
      } else if (mode === "split") {
        if(anomalies[grp]!=undefined){
          alies = anomalies[grp];
        }
      }
      let highlights = _.map(alies, a => {
        let newval = a.val < 0 ? 0 : Math.min(10, a.val);
        let allocatedPercentage = a.metrs[value];
        if(allocatedPercentage==0){
          // set missing to 100%
          allocatedPercentage = 1;
        }
        let allocatedVal = newval * allocatedPercentage;
        if(allocatedVal < 1){
          allocatedVal = 1;
        }
        return {
          start: a.timestamp,
          end: a.timestamp,
          val: allocatedVal
        }
      });
      // series name & data
      _.each(series, function (s, seriesNo) {
        sId.push(s.groupId);
        sname.push(s.name);
        _.each(s.data, function (item, itemNo) {
          if (seriesNo === 0) {
            sdata.push(item);
          } else {
            sdata[itemNo].push(item[1]);
          }
        })
      });
      var unit = metricUnitMap[value];
      return {
        id: grp,
        div_id: 'metric_group_' + sId[0],
        title: 'Metric Group ' + sId[0],
        groupId: sId[0],
        sdata: sdata,
        sname: sname,
        unit: unit || '',
        metrics: groupmetrics[grp],
        highlights: highlights,
        annotations: undefined,
        incidentSummary: undefined
      };
    });
    return this.groupsData;
  }
}
export default DataParser;
