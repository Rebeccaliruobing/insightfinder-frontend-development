import _ from 'lodash';

const normalizeStats = (stats = {}, orderBy = 'current.avgDailyAnomalyScore') => {
  const ret = [];
  const statsPairs = [];
  const selectedMetrics = [
    'totalAnomalyEventCount',
    'avgDailyAnomalyScore',
    'totalAnomalyDuration',
    'AvgCPUUtilization',
    'AvgInstanceUptime',
  ];

  // Calc the sum/avg of the group stats for each project
  _.forEach(stats, (stat, pname) => {
    const totals = { previous: {}, current: {}, predicted: {} };
    const counts = { previous: {}, current: {}, predicted: {} };
    const sumStat = { previous: {}, current: {}, predicted: {} };

    // calc group.type.metric values.
    _.forEach(stat || {}, (groupStats, gname) => {
      _.forEach(['previous', 'current', 'predicted'], (tname) => {
        _.forEach(selectedMetrics, (mname) => {
          const val = _.get(stat, `${gname}.${tname}.${mname}`, undefined);
          if (_.isFinite(val)) {
            totals[tname][mname] = (totals[tname][mname] || 0.0) + val;
            counts[tname][mname] = (counts[tname][mname] || 0) + 1;
          }
        });
      });
    });

    // calc the avg of the summary, only divide the exists number.
    _.forEach(['previous', 'current', 'predicted'], (tname) => {
      _.forEach(selectedMetrics, (mname) => {
        const total = totals[tname][mname];
        const count = counts[tname][mname];
        if (mname === 'AvgCPUUtilization' || mname === 'AvgInstanceUptime') {
          sumStat[tname][mname] = count > 0 ? total / count : undefined;
        } else {
          sumStat[tname][mname] = total;
        }
      });
    });

    statsPairs.push([pname, stat, sumStat]);
  });

  const orderedStats = _.reverse(_.sortBy(
    statsPairs,
    o => _.get(o[2], orderBy, 0),
  ));

  _.forEach(orderedStats, (o) => {
    const name = o[0];
    const stat = o[1];
    const sumStat = o[2];

    // const score = _.get(sumStat, orderBy, 0);
    // const color = calculateRGBByAnomaly(score, maxScore, minScore);
    const color = 'rgb(0, 205, 0)';
    const project = {
      name,
      stats: sumStat,
      groups: [],
      color,
    };

    // Order the group stat
    const orderedSubStats = _.reverse(_.sortBy(
      _.toPairs(stat),
      o => _.get(o[1], orderBy),
    ));

    _.forEach(orderedSubStats, (subObj) => {
      const subName = subObj[0];
      const subStats = subObj[1];

      project.groups.push({
        name: subName,
        stats: subStats,
        color,
      });
    });
    ret.push(project);
  });

  return ret;
};

export default normalizeStats;
