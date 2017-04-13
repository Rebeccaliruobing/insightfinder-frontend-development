import 'rxjs';
import { combineEpics } from 'redux-observable';
import appEpics from './app/epics';
import authEpics from './auth/epics';
import logEpics from './log/epics';

const epics = [
  ...appEpics,
  ...authEpics,
  ...logEpics,
];

const configureEpics = deps => (action$, { getState }) =>
  combineEpics(...epics)(action$, {
    ...deps,
    getState,
  });

export default configureEpics;
