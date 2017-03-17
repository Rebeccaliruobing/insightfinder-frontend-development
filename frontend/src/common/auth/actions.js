/* @flow */
import type { Action, Credentials } from '../types';

export const loginSuccess = (credentials: Credentials): Action => ({
  type: 'LOGIN_SUCCESS',
  payload: { credentials },
});

export const epics = [
];
