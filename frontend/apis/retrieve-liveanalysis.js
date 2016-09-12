import store from 'store';
import _ from 'lodash';
import getEndpoint from './get-endpoint';
import DataParser from './data-parser';
import moment from 'moment';

function _getRootCauseNameFromHints(incidentText){
  // parse rootcause text and extract simplified rootcause names
  const rootCauseNameMap = {
    "cpu": "High CPU usage",
    "mem": "High memory usage",
    "disk": "High disk usage",
    "network": "Network traffic surge",
    "load": "High load",
    "request": "High request count",
    "latency": "High latency"
  };

  let rootcauseNames = new Set();
  let durationLine = incidentText.split("\n",3)[0];
  let duration = durationLine.substring(9,durationLine.indexOf("minutes")-1);
  let startLine = incidentText.split("\n",3)[1];
  let start = startLine.substring(12,startLine.indexOf(","));
  let hintStr = incidentText.split("\n",3)[2];
  let hints = hintStr.split("\n");
  let retObj = {};
  _.each(hints,function(h,ih){
    let parts = h.split(",");
    if(false &&parts[0].indexOf("missing")!=-1){
      rootcauseNames.add("Missing metric data");
    } else {
      // iterate through map
      let matched = false;
      for (var key in rootCauseNameMap) {
        if(parts[2].toLowerCase().indexOf(key)!=-1){
          rootcauseNames.add(rootCauseNameMap[key]);
          matched = true;
        }
      }
    }
  });
  retObj["rootcauseName"] = Array.from(rootcauseNames).join("\n");
  retObj["start"] = start;
  retObj["duration"] = duration;
  retObj["startTimestamp"] = 0+moment(start);
  retObj["endTimestamp"] = 0+moment(start)+parseInt(duration)*60000;

  return retObj;
}

function buildTreemap(projectName, statistics, heapmap) {

  // Create tree structure with instance => container => metric.
  // If no container, instance => metric.

  const root = [];

  // FIXME: instances, metrics is a string instead of json array.
  const insts = _.filter((statistics['instances'] || '').replace(/[\[\]]/g, '').split(','), s => !!s);
  const newInsts = _.filter((statistics['newInstances'] || '').replace(/[\[\]]/g, '').split(','), s => !!s);
  const metrics = _.filter((statistics['metrics'] || '').replace(/[\[\]]/g, '').split(','), s => !!s);

  _.forEach(insts, (inst) => {

    const anomalies = heapmap[inst] || {};

    const names = inst.split('_');
    const isContainer = names.length > 1;
    const iname = isContainer ? names[1] : names[0];
    const cname = isContainer ? names[0] : '';

    let hasError = false;
    const children = _.map(metrics, (m) => {
      const mn = m.trim();
      const val = parseFloat(anomalies[mn]);
      hasError = hasError || _.isFinite(val);
      return {
        id: mn,
        type: 'metric',
        active: true,
        error: _.isFinite(val),
        name: mn,
        value: 1,
        text: _.isFinite(val) ? val.toFixed(2) : '',
      };
    });

    if (isContainer) {
      const container = {
        type: 'container',
        name: cname,
        error: hasError,
        active: !_.find(newInsts, i => i === inst),
        instance: inst,
        value: 1,
        children,
      };

      // Find the instance by name, and add container to children.
      let instance = _.find(root, o => o.name === iname);
      if (!instance) {
        root.push({
          type: 'instance',
          error: hasError,
          name: iname,
          instance: inst,
          active: true,
          value: 1,
          children: [container],
        });
      } else {
        instance.children.push(container);
      }
    } else {
      root.push({
        instance: inst,
        error: hasError,
        type: 'instance',
        active: !_.find(newInsts, i => i === inst),
        name: iname,
        value: 1,
        children,
      });
    }
  });

  return {
    type: 'project',
    name: projectName,
    children: root,
  };
}

/**
 * Api to retrieve project's live analysis data.
 * @param pname: The name of the project
 * @param mtype: The type of the model
 * @param pvalue: pvalue
 * @param cvalue: cvalue
 */
const retrieveLiveAnalysis = (projectName, modelType, pvalue, cvalue) => {
  const userName = store.get('userName');
  const token = store.get('token');

  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'POST',
      url: getEndpoint('liveAnalysis'),
      data: $.param({ userName, token, pvalue, cvalue, modelType, projectName }),
      beforeSend: function (request) {
        request.setRequestHeader("Accept", 'application/json');
      }
    }).done(function (resp) {
      if (resp.success) {

        try {
          const data = resp.data;
          const statistics = data['instanceMetricJson'] || {};
          const heatmap = data['anomalyHeatmapJson'] || {};

          const parser = new DataParser(data);
          const summary = parser.getSummaryData() || {};
          const causalDataArray = parser.causalDataArray || [];
          const causalTypes = parser.causalTypes || [];

          const ret = {};
          ret['statistics'] = statistics;
          ret['summary'] = summary;
          ret['causalDataArray'] = causalDataArray;
          ret['causalTypes'] = causalTypes;
          ret['latestDataTimestamp'] = statistics['latestDataTimestamp'];
          ret['incidentsTreeMap'] = buildTreemap(projectName, statistics, heatmap);

          // Build incidents list data
          ret['incidents'] = _.map(summary.incidentSummary || [], a => {
            let incidentObj = _getRootCauseNameFromHints(a.text);
            return {
              id: a.id,
              rootcauseName: incidentObj.rootcauseName,
              start:incidentObj.start,
              duration:incidentObj.duration+" minutes",
              startTimestamp:incidentObj.startTimestamp,
              endTimestamp:incidentObj.endTimestamp,
              text: a.text
              //.replace(/\n/g, "<br />")
            }
          });

          resolve(ret);
        } catch (e) {
          console.log(e);
          reject(`Data Error: ${e.message}`)
        }
      } else {
        reject(resp.message);
      }
    }).fail(function (resp) {
      console.log(resp);
      reject(`Server Error: ${resp.status}\n${resp.statusText}`);
    });
  });
};

export default retrieveLiveAnalysis;
