/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/* eslint-disable no-console */

/**
 * Convert log anomaly string derivedAnomalyString to array
 * The string contains: timestamp, anomaly ratio, pattern id and hints
 * anomalies: "1480977554899, anomaly ratio: 131.71558458366675, neuron Id: 902, Fault hints: ; ;\n"
**/

import R from 'ramda';

const logPatternAnomalyToArray = (str) => {
  const anomalies = [];
  if (!str) return anomalies;

  R.forEach((line) => {
    const parts = line.split(',');
    if (parts.length !== 4) {
      console.error('[IF] Anomaly string needs 4 parts seperated by ",", ignored', line);
    } else {
      const timestamp = parseInt(parts[0], 10);
      // anomaly ratio: 131.71558458366675
      const ratio = parseFloat(parts[1].split(':')[1]);
      // neuron Id: 902
      const nid = parseInt(parts[2].split(':')[1], 10);
      if (isNaN(nid)) {
        console.warn('[IF] neuron id in anomaly is not number, will ignore', parts[2]);
      }
      // Fault hints: ; ; ;
      const hintsStr = (parts[3].split(':')[1] || '').trim();

      const hints = R.filter(s => Boolean(s), R.map(s => s.trim(), hintsStr.split(';')));
      if (hints.length === 0) {
        console.warn('[IF] Fault hints contains empty strings', hintsStr);
      }

      anomalies.push({ nid, timestamp, ratio, hints });
    }
  }, str.split('\\n'));

  return anomalies;
};

export default logPatternAnomalyToArray;
