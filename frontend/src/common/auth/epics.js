/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import { login as loginApi, loadInitData } from '../apis';
import { showAppLoader, appError, setInitData } from '../app/actions';
import { appMessages } from '../app/messages';
import { loginSuccess, loginFailure } from './actions';
import { PermissionError } from '../errors';
import { authMessages } from './messages';

const loginEpic = (action$: any) =>
  action$.ofType('LOGIN')
    .concatMap(action =>
      Observable
        .from(loginApi(action.payload))
        .concatMap((d) => {
          return Observable.concat(
            Observable.of(
              showAppLoader(),
              loginSuccess(d.credentials, d.userInfo),
            ),
            Observable
              .from(loadInitData(d.credentials))
              .map(data => setInitData(data))
              .takeUntil(action$.ofType('APP_STOP'))
              .catch(err => Observable.of(
                appError(appMessages.errorsServer, err),
              )),
          );
        })
        .catch((err) => {
          console.error(['API call failed', err]);
          if (err instanceof PermissionError) {
            return Observable.of(
              loginFailure(authMessages.errorsWrongCredential, err),
            );
          }
          return Observable.of(
            loginFailure(authMessages.errorsLoginFailure, err),
          );
        }));

const epics = [
  loginEpic,
];

export default epics;
