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
 * "1388541600000, anomaly ratio: 2.3393375001524683, neuron Id: 865,
 * Fault hints: 1.neuron 165(1.0)(8.333333015441895)\n"
**/

import R from 'ramda';
import { isArray } from 'lodash';

const logPatternAnomalyToMap = derivedAnomalyString => {
  const anomalies = {};
  if (!derivedAnomalyString || !isArray(derivedAnomalyString)) return anomalies;

  R.forEach(group => {
    if (group.anomalies) {
      R.forEach(line => {
        const parts = line.split(',');
        if (parts.length !== 4) {
          console.error('[IF] Anomaly string needs 4 parts seperated by ",", ignored', line);
        } else {
          const timestamp = parseInt(parts[0], 10);
          // parts[1] and parts[2] is ignored, they are used for all clusters.

          // parts[3] Fault hints like:
          // 1.neuron 165(1.0)(8.333333015441895);2.Sub_cause_type[node0](4.0)(1.0);\n
          //
          // contain the pattern id(165), freqence count (1.0) and frequency percentage pct(8.33..)
          const hintsStr = (parts[3].split(':')[1] || '').trim();

          const hints = R.filter(s => Boolean(s), R.map(s => s.trim(), hintsStr.split(';')));
          if (hints.length === 0) {
            console.warn('[IF] Fault hints contains empty strings', hintsStr);
          }

          R.forEach(hint => {
            const hintRegex = /.*neuron\s*(\d*).*\(([0-9.]*)\).*\(([0-9.]*)\).*/gi;
            const matches = hintRegex.exec(hint);
            if (!matches || matches.length !== 4) {
              console.error(
                '[IF] Ignore wrong hintsStr, no match nid, val and pct:',
                hint,
                matches,
              );
            } else {
              const nid = parseInt(matches[1], 10);
              const val = parseFloat(matches[2]);
              const pct = parseFloat(matches[3]);

              // Store the data in a map to improve performance.
              const nidStr = nid.toString();
              const tsStr = timestamp.toString();
              if (!anomalies[nidStr]) {
                anomalies[nidStr] = {};
              }
              if (anomalies[nidStr][tsStr]) {
                console.error('[IF] Duplicated anomaly value at the same time', hint, timestamp);
              }
              anomalies[nidStr][tsStr] = { val, pct };
            }
          }, hints);
        }
      }, group.anomalies.split('\\n'));
    }
  }, derivedAnomalyString);

  return anomalies;
};

export default logPatternAnomalyToMap;
