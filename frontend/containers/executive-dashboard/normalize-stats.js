import _ from 'lodash';
import { calculateRGBByAnomaly } from '../../components/utils';

const normalizeStats = (stats = {}, orderBy) => {
  const ret = [];
  const orderedStats = _.reverse(_.sortBy(
    _.toPairs(stats),
    o => _.get(o[1].All, orderBy, 0),
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

    // create sum group to be put on top row
    let sumStat = {"previous":{"totalAnomalyEventCount":0,"avgDailyAnomalyScore":0,"totalAnomalyDuration":0,"AvgCPUUtilization":0,"AvgInstanceUptime":0},"current":{"totalAnomalyEventCount":0,"avgDailyAnomalyScore":0,"totalAnomalyDuration":0,"AvgCPUUtilization":0,"AvgInstanceUptime":0},"predicted":{"totalAnomalyEventCount":0,"avgDailyAnomalyScore":0,"totalAnomalyDuration":0}};

    let cpuCountCurrent = 0;
    let cpuCountPrevious = 0;
    let availCountCurrent = 0;
    let availCountPrevious = 0;
    _.each(stat, function (s, i) {
      if(s['previous']){
        if(s['previous']['totalAnomalyDuration']) sumStat['previous']['totalAnomalyDuration'] += s['previous']['totalAnomalyDuration'];
        if(s['previous']['totalAnomalyEventCount']) sumStat['previous']['totalAnomalyEventCount'] += s['previous']['totalAnomalyEventCount'];
        if(s['previous']['avgDailyAnomalyScore']) sumStat['previous']['avgDailyAnomalyScore'] += s['previous']['avgDailyAnomalyScore'];
        if(s['previous']['AvgCPUUtilization']!=undefined) {
          sumStat['previous']['AvgCPUUtilization'] += s['previous']['AvgCPUUtilization'];
          cpuCountPrevious += 1;
        } 
        if(s['previous']['AvgInstanceUptime']!=undefined) {
          sumStat['previous']['AvgInstanceUptime'] += s['previous']['AvgInstanceUptime'];
          availCountPrevious += 1;
        }
      }
      if(s['current']){
        if(s['current']['totalAnomalyDuration']) sumStat['current']['totalAnomalyDuration'] += s['current']['totalAnomalyDuration'];
        if(s['current']['totalAnomalyEventCount']) sumStat['current']['totalAnomalyEventCount'] += s['current']['totalAnomalyEventCount'];
        if(s['current']['avgDailyAnomalyScore']) sumStat['current']['avgDailyAnomalyScore'] += s['current']['avgDailyAnomalyScore'];
        if(s['current']['AvgCPUUtilization']!=undefined) {
          sumStat['current']['AvgCPUUtilization'] += s['current']['AvgCPUUtilization'];
          cpuCountCurrent += 1;
        } 
        if(s['current']['AvgInstanceUptime']!=undefined) {
          sumStat['current']['AvgInstanceUptime'] += s['current']['AvgInstanceUptime'];
          availCountCurrent += 1;
        }
      }
      if(s['predicted']){
        if(s['predicted']['totalAnomalyDuration']) sumStat['predicted']['totalAnomalyDuration'] += s['predicted']['totalAnomalyDuration'];
        if(s['predicted']['totalAnomalyEventCount']) sumStat['predicted']['totalAnomalyEventCount'] += s['predicted']['totalAnomalyEventCount'];
        if(s['predicted']['avgDailyAnomalyScore']) sumStat['predicted']['avgDailyAnomalyScore'] += s['predicted']['avgDailyAnomalyScore'];
      }
    });

    if(sumStat['current']){
      if(sumStat['current']['AvgCPUUtilization'] != undefined && cpuCountCurrent!=0){
        sumStat['current']['AvgCPUUtilization'] = sumStat['current']['AvgCPUUtilization']/cpuCountCurrent;
      }
      if(sumStat['current']['AvgInstanceUptime'] != undefined && availCountCurrent!=0){
        sumStat['current']['AvgInstanceUptime'] = sumStat['current']['AvgInstanceUptime']/availCountCurrent;
      }
    }
    if(sumStat['previous']){
      if(sumStat['previous']['AvgCPUUtilization'] != undefined && cpuCountPrevious!=0){
        sumStat['previous']['AvgCPUUtilization'] = sumStat['previous']['AvgCPUUtilization']/cpuCountPrevious;
      }
      if(sumStat['previous']['AvgInstanceUptime'] != undefined && availCountPrevious!=0){
        sumStat['previous']['AvgInstanceUptime'] = sumStat['previous']['AvgInstanceUptime']/availCountPrevious;
      }
    }

    // Use the all stat as the group stat.
    // const { All: allStats, ...subStats } = stat;
    const score = _.get(sumStat, orderBy, 0);
    const color = calculateRGBByAnomaly(score, maxScore, minScore);
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
