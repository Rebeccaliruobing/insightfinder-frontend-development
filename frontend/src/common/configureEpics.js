import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { epics as authEpics } from './auth/actions';
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
