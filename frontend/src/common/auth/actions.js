/* @flow */
import type { Action } from '../types';

export const loginSuccess = (userName: string, token: string): Action => ({
  type: 'LOGIN_SUCCESS',
  payload: { userName, token },
});

export const epics = [
];
