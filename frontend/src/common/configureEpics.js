import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { epics as authEpics } from './auth/actions';

const epics = [
  ...appEpics,
  ...authEpics,
];

const configureEpics = deps => (action$, { getState }) =>
  combineEpics(...epics)(action$, { ...deps, getState });

export default configureEpics;
