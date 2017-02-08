/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment';

export function aggregateToMultiHourData(
  dataset, endTime, numberOfDays,
) {
  if (!dataset) return {};

  // Initial an empty vector to hold the hourly object.
  const size = numberOfDays * 24;
  const vector = _.range(size).map(() => ({ items: [] }));
  const startTime = moment(endTime).startOf('day').subtract(numberOfDays - 1, 'day');

  // Populate the data into vector.
  _.forEach(dataset, (groups, project) => {
    if (groups && _.isObject(groups)) {
      _.forEach(groups, (hours, group) => {
        if (hours && _.isObject(hours)) {
          _.forEach(hours, (stats, hour) => {
            const h = moment(hour, 'YYYYMMDDHH');
            const idx = h.diff(startTime, 'hours');
            // Ignore data out of time window
            if (idx >= 0) {
              vector[idx].items.push({
                project,
                group,
                stats,
              });
            }
          });
        }
      });
    }
  });

  // Aggregate the stats hourly
  _.forEach(vector, (hour) => {
    const items = hour.items;
    const hourStats = _.reduce(items, (sum, item) => {
      const ret = {};
      // Sum all stats
      _.forEach(item.stats, (val, stat) => {
        ret[stat] = (sum[stat] || 0) + (val || 0);
      });
      ret.count = sum.count + 1;
      return ret;
    }, { count: 0 });
    hour.stats = hourStats;
    if (hourStats.totalAnomalyScore) {
      hour.value = hourStats.totalAnomalyScore / hourStats.count;
    }
  });

  return {
    data: vector,
  };
}
