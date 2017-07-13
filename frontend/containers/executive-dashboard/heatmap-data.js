/* eslint-disable import/prefer-default-export */
import _ from 'lodash';
import moment from 'moment';

export function aggregateToMultiHourData(dataset, endTime, numberOfDays, isStationary = false) {
  if (!dataset) return {};

  // Initial an empty vector to hold the hourly object.
  const numberOfHours = 24;
  const size = numberOfDays * numberOfHours;
  const detectedVector = _.range(size).map(() => ({ items: [] }));
  const predictedVector = _.range(size).map(() => ({ items: [] }));

  const startTime = moment(endTime).startOf('day').subtract(numberOfDays - 1, 'day');
  const nowObj = moment();
  const predictedStartTime = moment(endTime).startOf('day');

  // Populate the data into vector.
  _.forEach(dataset, (groups, project) => {
    if (groups && _.isObject(groups)) {
      _.forEach(groups, (hours, group) => {
        if (hours && _.isObject(hours)) {
          _.forEach(hours, (stats, hour) => {
            // Server side returns GMT time
            const h = moment.utc(hour, 'YYYYMMDDHH').local();

            // Split the detected & predicted items and ignore data out of time window
            const predicted = !!stats.predictedFlag;
            const vector = predicted ? predictedVector : detectedVector;
            const startTimeObj = predicted ? predictedStartTime : startTime;

            // Ignore the prediction if it's today and old than now.
            let ignore = false;
            if (predicted && startTimeObj.diff(nowObj, 'days') === 0 && !isStationary) {
              if (h < nowObj) {
                ignore = true;
              }
            }

            const idx = h.diff(startTimeObj, 'hours');

            if (!ignore && idx >= 0 && idx < size) {
              vector[idx].items.push({
                project,
                group,
                datetime: h,
                stats,
              });
            } else {
              console.warn(
                `[IF] Ignored event: predictedFlag=${predicted}, Server hour=${hour}, local StartTime=${startTimeObj.format(
                  'YYYYMMDDHH',
                )}, diff Hours=${idx} (0 <= diff < ${size})`,
              );
            }
          });
        }
      });
    }
  });

  // Aggregate the stats hourly
  _.forEach([detectedVector, predictedVector], vector => {
    _.forEach(vector, (hour, index) => {
      const items = hour.items;

      hour.x = index % numberOfHours;
      hour.y = Math.floor(index / numberOfHours);

      const hourStats = _.reduce(
        items,
        (sum, item) => {
          const ret = {};
          // Sum all stats
          _.forEach(item.stats, (val, stat) => {
            ret[stat] = (sum[stat] || 0) + (val || 0);
          });
          ret.count = sum.count + 1;
          return ret;
        },
        { count: 0 },
      );

      hour.stats = hourStats;

      if (hourStats.totalAnomalyScore) {
        hour.totalAnomalyScore = hourStats.totalAnomalyScore / hourStats.count;
      }

      if (hourStats.numberOfEvents) {
        hour.numberOfEvents = hourStats.numberOfEvents;
      }
    });
  });

  const timeLabels = [
    '',
    '',
    '3a',
    '',
    '',
    '6a',
    '',
    '',
    '9a',
    '',
    '',
    '12p',
    '',
    '',
    '3p',
    '',
    '',
    '6p',
    '',
    '',
    '9p',
    '',
    '',
    '12a',
  ];

  const detectedDayLabels = _.range(0, numberOfDays).map(diff =>
    moment(endTime).subtract(numberOfDays - diff - 1, 'days').format('MM/DD'),
  );
  const predictedDayLabels = _.range(0, numberOfDays).map(diff =>
    moment(endTime).add(diff, 'days').format('MM/DD'),
  );

  return {
    detected: {
      data: detectedVector,
      dayLabels: detectedDayLabels,
      timeLabels,
    },
    predicted: {
      data: predictedVector,
      dayLabels: predictedDayLabels,
      timeLabels,
    },
  };
}
