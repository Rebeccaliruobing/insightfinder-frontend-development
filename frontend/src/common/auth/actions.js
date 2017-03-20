/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import type { Action, Credentials, Reason } from '../types';
import { login as loginApi } from '../apis';
import { PermissionError } from '../errors';

export const login = (userName:string, password:string): Action => ({
  type: 'LOGIN',
  payload: {
    userName,
    password,
  },
});

export const loggingIn = (): Action => ({
  type: 'LOGGINGIN',
});

export const loginSuccess = (token: string, userInfo: Object): Action => ({
  type: 'LOGIN_SUCCESS',
  payload: {
    token,
    ...userInfo,
  },
});

export const loginFailure = (reason: Reason): Action => ({
  type: 'LOGIN_FAILURE',
  payload: reason,
});

const loginEpic = (action$: any) =>
  action$.ofType('LOGIN')
    .concatMap(action =>
      Observable.concat(
        Observable.of(loggingIn()),
        Observable
          .from(loginApi(action.payload))
          .map(d => loginSuccess(d.token, d.data))
          .catch((err) => {
            if (err instanceof PermissionError) {
              return Observable.of(loginFailure({ id: '', message: err.message }));
            }
            return Observable.of(loginFailure({ id: '', message: err.message }));
          })));

export const epics = [
  loginEpic,
];
