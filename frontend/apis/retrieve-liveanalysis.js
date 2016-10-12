import store from 'store';
import _ from 'lodash';
import getEndpoint from './get-endpoint';
import DataParser from './data-parser';
import moment from 'moment';

export function buildTreemap(projectName, incidentName, statistics, anomaliesList, rootCauseByInstanceJson) {

  // Create tree structure with instance => container => metric.
  // If no container, instance => metric.

  const root = [];

  // FIXME: instances, metrics is a string instead of json array.
  const insts = _.filter((statistics['instances'] || '').replace(/[\[\]]/g, '').split(','), s => !!s);
  const newInsts = _.filter((statistics['newInstances'] || '').replace(/[\[\]]/g, '').split(','), s => !!s);
  const metrics = _.filter((statistics['metrics'] || '').replace(/[\[\]]/g, '').split(','), s => !!s);
  const startTimestamp = statistics['startTimestamp'];
  const endTimestamp = statistics['endTimestamp'];

  _.forEach(insts, (inst) => {

    inst = inst.trim();
    const anomalies = anomaliesList[inst] || {};

    const names = inst.split('_');
    const isContainer = names.length > 1;
    const iname = isContainer ? names[1] : names[0];
    const cname = isContainer ? names[0] : '';

    const children = _.map(metrics, (m) => {
      const mn = m.trim();
      const val = parseFloat(anomalies[mn]);
      let eventType1 = (rootCauseByInstanceJson&&rootCauseByInstanceJson[mn])?rootCauseByInstanceJson[mn]+"":"";
      let pos1 = eventType1.indexOf(":");
      if(pos1>0){
        // remove repeated instance name
        eventType1 = eventType1.slice(0, pos1);
      }

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
        eventType: eventType1,
      };
    });

    if (isContainer) {
      let eventType2 = (rootCauseByInstanceJson&&rootCauseByInstanceJson[inst])?rootCauseByInstanceJson[inst]+"":"";
      let pos2 = eventType2.indexOf(":");
      if(pos2>0){
        // remove repeated instance name
        eventType2 = eventType2.slice(0, pos2);
      }
      const container = {
        type: 'container',
        name: cname,
        score: 0,
        eventType: eventType2,
        active: !_.find(newInsts, i => i === inst),
        projectName: projectName,
        instanceName: inst,
        value: 1,
        children,
      };

      // Find the instance by name, and add container to children.
      let instance = _.find(root, o => o.name === iname);
      if (!instance) {
        let eventType3 = (rootCauseByInstanceJson&&rootCauseByInstanceJson[inst])?rootCauseByInstanceJson[inst]+"":"";
        let pos3 = eventType3.indexOf(":");
        if(pos3>0){
          // remove repeated instance name
          eventType3 = eventType3.slice(0, pos3);
        }
        root.push({
          type: 'instance',
          name: iname,
          projectName: projectName,
          instanceName: inst,
          containers: 1,
          score: 0,
          eventType: eventType3,
          active: true,
          value: 1,
          children: [container],
        });
      } else {
        instance.containers += 1;
        instance.children.push(container);
      }
    } else {
      let eventType4 = (rootCauseByInstanceJson&&rootCauseByInstanceJson[inst])?rootCauseByInstanceJson[inst]+"":"";
      let pos4 = eventType4.indexOf(":");
      if(pos4>0){
        // remove repeated instance name
        eventType4 = eventType4.slice(0, pos4);
      }
      root.push({
        containers: 0,
        type: 'instance',
        projectName: projectName,
        instanceName: inst,
        active: !_.find(newInsts, i => i === inst),
        score: 0,
        eventType: eventType4,
        name: iname,
        value: 1,
        children,
      });
    }
  });

  return {
    type: 'project',
    name: incidentName || projectName,
    score: 0,
        eventType:"",
    children: root,
    startTimestamp,
    endTimestamp
  };
}

function buildTimeTable(startTime, endTime, predicatedEndTime, incidents) {
  const table = [];

  if (!startTime && !endTime && !predicatedEndTime && !incidents) {
    return table;
  }

  const start = moment(startTime);
  const end = moment(endTime);
  const pend = moment(predicatedEndTime);

  // 1 day, 1* 24 * 60 = 24 * 6 * 10m
  // 3 day, 3 * 24 * 60 = 24 * 6 * 30mins
  // 7 day, 7 * 24 * 60 = 28 * 6 * 60mins
  // 14 day, 14 * 24 * 60 = 28 * 6 * 120min

  return table;
}

/**
 * Api to retrieve project's live analysis data.
 * @param pname: The name of the project
 * @param mtype: The type of the model
 * @param pvalue: pvalue
 * @param cvalue: cvalue
 */
export function retrieveLiveAnalysis(projectName, modelType, pvalue, cvalue, endTimestamp, numberOfDays, version) {
  const userName = store.get('userName');
  const token = store.get('token');

  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'POST',
      url: getEndpoint('eventSummary', version),
      data: $.param({ userName, token, pvalue, cvalue, modelType, endTimestamp, numberOfDays, projectName }),
      beforeSend: function (request) {
        request.setRequestHeader("Accept", 'application/json');
      }
    }).done(function (resp) {
      if (resp.success) {

        try {
          const data = resp.data;
          const statistics = data['instanceMetricJson'] || {};
          const heatmap = data['anomalyMapJson'] || {};
          const incidentList = data['incidentsJson'] || [];
          const instanceMetaData = data['instanceMetaDataJson'] || {};
          const parser = new DataParser(data);
          const summary = parser.getSummaryData() || {};
          const causalDataArray = parser.causalDataArray || [];
          const causalTypes = parser.causalTypes || [];
          const latestTimestamp = statistics['latestDataTimestamp'];
          const projectType = data['projectType'] || "";
          const ret = {};
          ret['statistics'] = statistics;
          ret['instanceMetricJson'] = statistics;
          ret['anomalyMapJson'] = heatmap;
          ret['instanceMetaData'] = instanceMetaData;
          ret['projectName'] = projectName;
          ret['projectType'] = projectType;
          ret['summary'] = summary;
          ret['causalDataArray'] = causalDataArray;
          ret['causalTypes'] = causalTypes;
          ret['latestDataTimestamp'] = latestTimestamp;
          ret['incidentsTreeMap'] = buildTreemap(projectName, projectName+" (1d)", statistics, heatmap);
          ret['incidents'] = incidentList;
          ret['incidentsTimeTable'] = buildTimeTable(
            data.startTimestamp, data.endTimestamp, data.predictedEndTime, incidentList);

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
}
