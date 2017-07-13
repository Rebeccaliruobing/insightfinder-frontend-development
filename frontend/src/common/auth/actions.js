/* @flow */
import type { Action, Credentials, Message } from '../types';
import { authMessages } from './messages';

export const login = (userName: String, password: String, params: Object): Action => ({
  type: 'LOGIN',
  payload: { userName, password, params },
});

export const loginSuccess = (credentials: Credentials, userInfo: ?Object = null): Action => ({
  type: 'LOGIN_SUCCESS',
  payload: { credentials, userInfo },
});

export const loginFailure = (message: ?Message = null, error: ?Error = null): Action => ({
  type: 'LOGIN_FAILURE',
  payload: { message, error },
});

export const sessionInvalid = (error: ?Error = null): Action => ({
  type: 'LOGIN_FAILURE',
  payload: {
    message: authMessages.errorsTokenInvalid,
    error,
  },
});

export const logoff = (): Action => ({
  type: 'LOGOFF',
});
