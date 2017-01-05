import _ from 'lodash';
import { calculateRGBByAnomaly } from '../../components/utils';

const normalizeStats = (stats = {}, orderBy) => {
  const ret = [];
  const orderedStats = _.reverse(_.sortBy(
    _.toPairs(stats),
    o => _.get(o[1].All, orderBy),
  ));

  // Get the max/min score for all project
  const maxScore = orderedStats.length > 0 ?
    _.get(orderedStats[0][1].All, orderBy) : 0;
  let minScore = orderedStats.length > 0 ?
    _.get(orderedStats[orderedStats.length - 1][1].All, orderBy) : 0;
  minScore = maxScore === minScore ? 0.0 : minScore;

  _.forEach(orderedStats, (o) => {
    const name = o[0];
    const stat = o[1];

    // Use the all stat as the group stat.
    const { All: allStats, ...subStats } = stat;
    const score = _.get(allStats, orderBy);
    const color = calculateRGBByAnomaly(score, maxScore, minScore);
    const project = {
      name,
      stats: allStats,
      groups: [],
      color,
    };

    // Order the group stat
    const orderedSubStats = _.reverse(_.sortBy(
      _.toPairs(subStats),
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
