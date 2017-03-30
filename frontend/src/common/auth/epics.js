/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import store from 'store';
import { login as loginApi, retrieveInitData } from '../apis';
import { showAppLoader, appFatalError, setInitData } from '../app/actions';
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
          // TODO: [Deprecated 1.0] Remove store dependence
          store.set('token', d.credentials.token);
          store.set('userName', d.credentials.userName);
          store.set('userInfo', d.userInfo);

          return Observable.concat(
            Observable.of(
              showAppLoader(),
              loginSuccess(d.credentials, d.userInfo),
            ),
            Observable
              .from(retrieveInitData(d.credentials))
              .map(data => setInitData(data))
              .takeUntil(action$.ofType('APP_STOP'))
              .catch(err => Observable.of(
                appFatalError(appMessages.errorsServer, err),
              )),
          );
        })
        .catch((err) => {
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
