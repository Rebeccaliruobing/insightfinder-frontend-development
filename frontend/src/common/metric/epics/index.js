import hourlyEventsEpic from './hourlyEventsEpic';
import weeklyAnomaliesEpic from './weeklyAnomaliesEpic';

const epics = [
  hourlyEventsEpic,
  weeklyAnomaliesEpic,
];

export default epics;
