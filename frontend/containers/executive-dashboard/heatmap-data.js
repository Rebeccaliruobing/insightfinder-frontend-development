/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment';

export function aggregateToMultiHourData(
  dataset, endTime, numberOfDays,
) {
  if (!dataset) return {};

  // Initial an empty vector to hold the hourly object.
  const numberOfHours = 24;
  const size = numberOfDays * numberOfHours;
  const vector = _.range(size).map(() => ({ items: [] }));
  const startTime = moment(endTime).startOf('day').subtract(numberOfDays - 1, 'day');

  // Populate the data into vector.
  _.forEach(dataset, (groups, project) => {
    if (groups && _.isObject(groups)) {
      _.forEach(groups, (hours, group) => {
        if (hours && _.isObject(hours)) {
          _.forEach(hours, (stats, hour) => {
            // Server side returns GMT time
            const h = moment.utc(hour, 'YYYYMMDDHH');
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
  _.forEach(vector, (hour, index) => {
    const items = hour.items;

    hour.x = index % numberOfHours;
    hour.y = Math.floor(index / numberOfHours);

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
      hour.totalAnomalyScore = hourStats.totalAnomalyScore / hourStats.count;
    }

    if (hourStats.numberOfEvents) {
      hour.numberOfEvents = hourStats.numberOfEvents;
    }
  });

  const timeLabels = [
    '', '', '3a',
    '', '', '6a',
    '', '', '9a',
    '', '', '12p',
    '', '', '3p',
    '', '', '6p',
    '', '', '9p',
    '', '', '12a',
  ];

  const dayLabels = _.range(0, numberOfDays).map(
    diff => moment(endTime).subtract(numberOfDays - diff, 'days').format('MM/DD'),
  );

  return {
    data: vector,
    dayLabels,
    timeLabels,
  };
}
