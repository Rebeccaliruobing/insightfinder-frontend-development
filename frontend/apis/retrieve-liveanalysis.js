import store from 'store';
import _ from 'lodash';
import getEndpoint from './get-endpoint';
import DataParser from './data-parser';

export function buildTreemap(
  projectName, incidentName, statistics, anomaliesList, incident, instanceStatsJson) {
  // Create tree structure with instance => container => metric.
  // If no container, instance => metric.

  const root = [];
  const rootCauseByInstanceJson = incident ? (incident.rootCauseByInstanceJson || {}) : {};
  const eventStartTime = incident ? incident.startTimestamp : null;
  const eventEndTime = incident ? incident.endTimestamp : null;

  // FIXME: instances, metrics is a string instead of json array.
  const insts = _.filter((statistics.instances || '').replace(/[\[\]]/g, '').split(','), s => !!s);
  const newInsts = _.filter((statistics.newInstances || '').replace(/[\[\]]/g, '').split(','), s => !!s);
  const metrics = _.filter((statistics.metrics || '').replace(/[\[\]]/g, '').split(','), s => !!s);
  const startTimestamp = statistics.startTimestamp;
  const endTimestamp = statistics.endTimestamp;
  const maxAnomalyRatio = statistics.maxAnomalyRatio;
  const minAnomalyRatio = statistics.minAnomalyRatio;
  const instanceTypeMap = statistics.instanceTypeJson || {};
  const typeMetricMap = statistics.typeMetricMap || {};

  _.forEach(insts, (inst) => {
    inst = inst.trim();
    const anomalies = anomaliesList[inst] || {};

    const names = inst.split('_');
    const isContainer = names.length > 1;
    const iname = isContainer ? names[1] : names[0];
    const cname = isContainer ? names[0] : '';

    const instanceType = instanceTypeMap[inst];
    const isFilterByStats = !!instanceStatsJson;
    const statsByMetric = _.get(instanceStatsJson, [inst, 'statsByMetricJson'], {});
    let instanceMetrics = metrics;
    if (instanceType && typeMetricMap[instanceType]) {
      instanceMetrics = typeMetricMap[instanceType] || [];
    }

    const children = [];
    _.forEach(instanceMetrics, (m) => {
      const mn = m.trim();
      const val = parseFloat(anomalies[mn]);
      let eventType1 = rootCauseByInstanceJson[mn] || '';
      const pos1 = eventType1.indexOf(':');
      if (pos1 > 0) {
        // remove repeated instance name
        eventType1 = eventType1.slice(0, pos1);
      }

      if (!isFilterByStats || statsByMetric[mn]) {
        children.push({
          id: mn,
          type: 'metric',
          active: true,
          projectName,
          instanceName: inst,
          instanceType: instanceTypeMap[inst],
          name: mn,
          eventStartTime,
          eventEndTime,
          value: 1,
          text: _.isFinite(val) ? val.toFixed(2) : '',
          score: _.isFinite(val) ? val : 0.0,
          eventType: eventType1,
        });
      }
    });

    if (isContainer) {
      let eventType2 = rootCauseByInstanceJson[inst] || '';
      const pos2 = eventType2.indexOf(':');
      if (pos2 > 0) {
        // remove repeated instance name
        eventType2 = eventType2.slice(0, pos2);
      }
      const container = {
        type: 'container',
        name: cname,
        score: 0,
        eventType: eventType2,
        active: !_.find(newInsts, i => i === inst),
        projectName,
        instanceName: inst,
        instanceType,
        value: 1,
        children,
      };

      // Find the instance by name, and add container to children.
      const instance = _.find(root, o => o.name === iname);
      if (!instance) {
        let eventType3 = rootCauseByInstanceJson[inst] || '';
        const pos3 = eventType3.indexOf(':');
        if (pos3 > 0) {
          // remove repeated instance name
          eventType3 = eventType3.slice(0, pos3);
        }
        root.push({
          type: 'instance',
          name: iname,
          projectName,
          instanceName: inst,
          instanceType,
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
      let eventType4 = rootCauseByInstanceJson[inst] || '';
      const pos4 = eventType4.indexOf(':');
      if (pos4 > 0) {
        // remove repeated instance name
        eventType4 = eventType4.slice(0, pos4);
      }
      root.push({
        containers: 0,
        type: 'instance',
        projectName,
        instanceName: inst,
        instanceType,
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
    eventType: '',
    children: root,
    projectName,
    startTimestamp,
    endTimestamp,
    maxAnomalyRatio,
    minAnomalyRatio,
    anomaliesList,
  };
}

export function retrieveLiveAnalysis(projectName, modelType, instanceGroup, pvalue, cvalue, endTimestamp, numberOfDays, version) {
  const userName = store.get('userName');
  const token = store.get('token');

  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'POST',
      url: getEndpoint('eventSummary', version),
      data: $.param({ userName, token, pvalue, cvalue, modelType, instanceGroup, endTimestamp, numberOfDays, projectName }),
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
          const eventStats = data['eventStatsJson'] || {};
          const ret = {};
          ret['statistics'] = statistics;
          ret['instanceMetricJson'] = statistics;
          ret['eventStats'] = eventStats;
          ret['anomalyMapJson'] = heatmap;
          ret['instanceMetaData'] = instanceMetaData;
          ret['projectName'] = projectName;
          ret['projectType'] = projectType;
          ret['summary'] = summary;
          ret['causalDataArray'] = causalDataArray;
          ret['causalTypes'] = causalTypes;
          ret['latestDataTimestamp'] = latestTimestamp;
          ret['eventsCausalRelation'] = data['eventsCausalRelation'] || {};
          // ret['incidentsTreeMap'] = buildTreemap(projectName, projectName+" ("+numberOfDays+"d)", statistics, heatmap);
          ret['incidents'] = incidentList;
          ret['hasDataFlag'] = data.hasDataFlag;

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
