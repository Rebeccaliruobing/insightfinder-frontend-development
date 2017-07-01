import projectEpic from './projectEpic';
import { RehydrateEpic, appStartEpic } from './startEpic';

const epics = [RehydrateEpic, appStartEpic, projectEpic];

export default epics;
