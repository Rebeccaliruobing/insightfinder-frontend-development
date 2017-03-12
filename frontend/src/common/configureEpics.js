import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { epics as sessionEpics } from './session/actions';

const epics = [
  ...appEpics,
  ...sessionEpics,
];

const configureEpics = deps => (action$, { getState }) =>
  combineEpics(...epics)(action$, { ...deps, getState });

export default configureEpics;
