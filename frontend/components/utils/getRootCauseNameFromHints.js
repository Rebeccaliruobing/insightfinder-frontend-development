import moment from 'moment';
import _ from 'lodash';

const getRootCauseNameFromHints = (incidentText) => {
  const rootCauseNameMap = {
    cpu: 'High CPU usage',
    mem: 'High memory usage',
    disk: 'High disk usage',
    network: 'Network traffic surge',
    load: 'High load',
    request: 'High request count',
    latency: 'High latency',
  };
  const suggestedActionMap = {
    missing: 'Check metric data source',
    cpu: 'Upgrade CPU spec',
    mem: 'Check for memory leak',
    disk: 'Upgrade disk spec',
    network: 'Check network traffic pattern',
    load: 'Check load',
    request: 'Check request count',
    latency: 'Check latency',
  };

  const rootCauseNames = new Set();
  const suggestedActions = new Set();
  const durationLine = incidentText.split('\n', 3)[0];
  const duration = durationLine.match(/Duration:(\d+)/)[1];
  const startLine = incidentText.split('\n', 3)[1];
  const start = startLine.substring(12, startLine.indexOf(','));
  const hintStr = incidentText.split('\n', 3)[2];
  const hints = hintStr.split('\n');
  const retObj = {};
  _.each(hints, (h) => {
    const parts = h.split(',');
    if (false && parts[0].indexOf('missing') !== -1) {
      rootCauseNames.add('Missing metric data');
      suggestedActions.add('Check metric data source');
    } else {
      // iterate through map
      for (const key in rootCauseNameMap) {
        if (parts[2].toLowerCase().indexOf(key) !== -1) {
          rootCauseNames.add(rootCauseNameMap[key]);
          suggestedActions.add(suggestedActionMap[key]);
        }
      }
    }
  });
  retObj.rootCauseNames = Array.from(rootCauseNames).join('\n');
  retObj.suggestedActions = Array.from(suggestedActions).join('\n');
  retObj.start = start;
  retObj.duration = parseInt(duration, 10);
  retObj.startTimestamp = moment(start).valueOf();
  retObj.endTimestamp = moment(start).add(parseInt(duration, 10), 'minutes').valueOf();

  return retObj;
};

export default getRootCauseNameFromHints;
