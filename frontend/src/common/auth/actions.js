/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import store from 'store';
import type { Action, Credentials, Message } from '../types';
import { login as loginApi } from '../apis';
import { PermissionError } from '../errors';
import authMessages from './authMessages';

export const login = (
  userName: string, password: string): Action => ({
    type: 'LOGIN',
    payload: { userName, password },
  });

export const loginSuccess = (
  credentials: Credentials, userInfo: ?Object = null): Action => ({
    type: 'LOGIN_SUCCESS',
    payload: { credentials, userInfo },
  });

export const loginFailure = (
  message: ?Message = null, error: ?Error = null): Action => ({
    type: 'LOGIN_FAILURE',
    payload: { message, error },
  });

export const logoff = (): Action => ({
  type: 'LOGOFF',
});

const loginEpic = (action$: any) =>
  action$.ofType('LOGIN')
    .concatMap(action =>
      Observable
        .from(loginApi(action.payload))
        .map((d) => {
          // TODO: Remove store dependence
          store.set('token', d.credentials.token);
          store.set('userName', d.credentials.userName);
          store.set('userInfo', d.userInfo);

          return loginSuccess(d.credentials, d.userInfo);
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

export const epics = [
  loginEpic,
];
