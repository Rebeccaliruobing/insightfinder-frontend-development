import store from 'store';
import _ from 'lodash';
import getEndpoint from './get-endpoint';
import DataParser from './data-parser';
import moment from 'moment';

function _getRootCauseNameFromHints(incidentText){
  // parse rootcause text and extract simplified rootcause names
  const rootCauseNameMap = {
    "cpu": "high CPU usage",
    "mem": "high memory usage",
    "disk": "high disk usage",
    "network": "network traffic surge",
    "load": "high load",
    "request": "high request count",
    "latency": "high latency"
  };
  const suggestedActionMap = {
    "missing": "check metric data source",
    "cpu": "scale up CPU",
    "mem": "scale up memory",
    "disk": "scale up disk",
    "network": "scale up network",
    "load": "scale up CPU",
    "request": "check request count",
    "latency": "check latency",
  };

  let rootCauseNames = new Set();
  let suggestedActions = new Set();
  let parts0 = incidentText.split("\n");
  let durationLine = parts0[0];
  let neuronId = undefined;
  let duration = durationLine.substring(durationLine.indexOf("Duration")+9,durationLine.indexOf("minutes")-1);
  let startLine = parts0[1];
  let start = startLine.substring(12,startLine.indexOf(","));
  let hintStr = parts0.splice(2,parts0.length).join("\n").trim();
  let hints = hintStr.split("\n");
  let retObj = {};
  if(durationLine.indexOf(",")!=-1){
    neuronId = parseInt(durationLine.substring(0,durationLine.indexOf(",")))
  }
  _.each(hints,function(h,ih){
    let parts = h.split(",");
    if(parts[0].indexOf("missing")!=-1){
      rootCauseNames.add("missing metric data");
      suggestedActions.add("check metric data source");
    } else if(neuronId&&neuronId==-1){
      // iterate through map
      let matched = false;
      for (var key in rootCauseNameMap) {
        if(parts[2].toLowerCase().indexOf(key)!=-1){
          rootCauseNames.add(key+" hotspot");
          suggestedActions.add("check load balancing");  
          matched = true;
        }    
      }
    } else {
      // iterate through map
      let matched = false;
      for (var key in rootCauseNameMap) {
        if(parts[2].toLowerCase().indexOf(key)!=-1){
          rootCauseNames.add(rootCauseNameMap[key]);
          suggestedActions.add(suggestedActionMap[key]);
          matched = true;
        }
      }
    }
  });
  retObj["neuronId"] = neuronId;
  retObj["rootCauseNames"] = Array.from(rootCauseNames).join("\n");
  retObj["suggestedActions"] = Array.from(suggestedActions).join("\n");
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

    inst = inst.trim();
    const anomalies = heapmap[inst] || {};

    const names = inst.split('_');
    const isContainer = names.length > 1;
    const iname = isContainer ? names[1] : names[0];
    const cname = isContainer ? names[0] : '';

    const children = _.map(metrics, (m) => {
      const mn = m.trim();
      const val = parseFloat(anomalies[mn]);
      return {
        id: mn,
        type: 'metric',
        active: true,
        projectName: projectName,
        instanceName: inst,
        name: mn,
        value: 1,
        text: _.isFinite(val) ? val.toFixed(2) : '',
        score: _.isFinite(val) ? val : 0.0,
      };
    });

    if (isContainer) {
      const container = {
        type: 'container',
        name: cname,
        score: 0,
        active: !_.find(newInsts, i => i === inst),
        projectName: projectName,
        instanceName: inst,
        value: 1,
        children,
      };

      // Find the instance by name, and add container to children.
      let instance = _.find(root, o => o.name === iname);
      if (!instance) {
        root.push({
          type: 'instance',
          name: iname,
          projectName: projectName,
          instanceName: inst,
          containers: 1,
          score: 0,
          active: true,
          value: 1,
          children: [container],
        });
      } else {
        instance.containers += 1;
        instance.children.push(container);
      }
    } else {
      root.push({
        containers: 0,
        type: 'instance',
        projectName: projectName,
        instanceName: inst,
        active: !_.find(newInsts, i => i === inst),
        score: 0,
        name: iname,
        value: 1,
        children,
      });
    }
  });

  return {
    type: 'project',
    name: projectName,
    score: 0,
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
          const latestTimestamp = statistics['latestDataTimestamp'];
          const ret = {};
          ret['statistics'] = statistics;
          ret['instanceMetricJson'] = statistics;
          ret['anomalyHeatmapJson'] = heatmap;
          ret['projectName'] = projectName;
          ret['summary'] = summary;
          ret['causalDataArray'] = causalDataArray;
          ret['causalTypes'] = causalTypes;
          ret['latestDataTimestamp'] = latestTimestamp;
          ret['incidentsTreeMap'] = buildTreemap(projectName, statistics, heatmap);

          // Build incidents list data
          let incidentList = [];
          //_.map(summary.incidentSummary || [], a => {
          _.each(summary.incidentSummary || [],function(a,ia){
            let incidentObj = _getRootCauseNameFromHints(a.text);
            let incidentName = "";
            if(incidentObj.neuronId){
              if(incidentObj.neuronId == -1){
                // threshold driven
                incidentName = "AT";
              }else{
                incidentName = "A"+incidentObj.neuronId;
              }
            }
            incidentList.push({
              id: a.id,
              incidentName:incidentName,
              rootCauseNames: incidentObj.rootCauseNames,
              suggestedActions: incidentObj.suggestedActions,
              start:incidentObj.start,
              duration:incidentObj.duration,
              startTimestamp:incidentObj.startTimestamp,
              endTimestamp:incidentObj.endTimestamp,
              text: a.text
            });
          });
          ret['incidents'] = incidentList;

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
