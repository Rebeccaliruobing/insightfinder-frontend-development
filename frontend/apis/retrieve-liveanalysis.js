import store from 'store';
import _ from 'lodash';
import getEndpoint from './get-endpoint';
import DataParser from './data-parser';

function buildTreemap(statistics, heapmap) {

  // Create tree structure with instance => container => metric.
  // If no container, instance => metric.

  const ret = [];

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
        value: _.isFinite(val) ? val : 0.0,
      };
    });

    if (isContainer) {
      const container = {
        type: 'container',
        name: cname,
        active: !_.find(newInsts, i => i === inst),
        instance: inst,
        children,
      };

      // Find the instance by name, and add container to children.
      let instance = _.find(ret, o => o.name === iname);
      if (!instance) {
        ret.push({
          type: 'instance',
          name: iname,
          instance: inst,
          active: true,
          children: [container],
        });
      } else {
        instance.children.push(container);
      }
    } else {
      ret.push({
        instance: inst,
        type: 'instance',
        active: !_.find(newInsts, i => i === inst),
        name: iname,
        children,
      });
    }
  });

  return ret;
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
          ret['incidentsTreeMap'] = buildTreemap(statistics, heatmap);

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
      reject(`Server Error: ${resp.status}\n${resp.statusText}`);
    });
  });
};

export default retrieveLiveAnalysis;
