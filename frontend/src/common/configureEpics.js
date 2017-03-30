import 'rxjs';
import { combineEpics } from 'redux-observable';
import appEpics from './app/epics';
import authEpics from './auth/epics';
import bindCredentials from '../common/apis/bindCredentials';

const epics = [
  ...appEpics,
  ...authEpics,
];

const configureEpics = deps => (action$, { getState }) =>
  combineEpics(...epics)(action$, {
    ...deps,
    getState,
    bindCredentials: bindCredentials(getState),
  });

export default configureEpics;
