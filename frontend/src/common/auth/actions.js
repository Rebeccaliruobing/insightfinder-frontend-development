/* @flow */
import type { Action, Credentials, Message } from '../types';

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
