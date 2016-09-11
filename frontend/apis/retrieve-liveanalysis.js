import store from 'store';
import _ from 'lodash';
import getEndpoint from './get-endpoint';
import DataParser from './data-parser';

function buildTreemap(projectName, statistics, heapmap) {

  // Create tree structure with instance => container => metric.
  // If no container, instance => metric.

  const root = [];

  // FIXME: instances, metrics is not a string instead of json array.
  const insts = (statistics['instances'] || '').replace(/[\[\]]/g, '').split(',');
  const newInsts = (statistics['newInstances'] || '').replace(/[\[\]]/g, '').split(',');
  const metrics = (statistics['metrics'] || '').replace(/[\[\]]/g, '').split(',');

  _.forEach(insts, (inst) => {

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
        name: mn,
        value: 1,
        text: _.isFinite(val) ? val.toFixed(2) : '',
      };
    });

    if (isContainer) {
      const container = {
        type: 'container',
        name: cname,
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
          parser.getSummaryData();

          const ret = {};
          ret['statistics'] = statistics;
          ret['summary'] = parser.summaryData || {};
          ret['incidentsTreeMap'] = buildTreemap(projectName, statistics, heatmap);

          // TODO: Get incidents list object or array;
          ret['incidents'] = {};

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
      // reject(`Server Error: ${resp.status}\n${resp.statusText}`);
    });
  });
};

export default retrieveLiveAnalysis;
