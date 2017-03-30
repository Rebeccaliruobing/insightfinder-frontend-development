/* @flow */
/* eslint-disable no-console */
import type { AuthState, Action } from '../types';

const initialState = {
  loggedIn: false,
  loggingIn: false,
  credentials: null,
  userInfo: null,
  loginReason: null,
};

const reducer = (
  state: AuthState = initialState,
  action: Action) => {
  if (action.type === 'LOGIN') {
    return { ...state, loggingIn: true };
  } else if (action.type === 'LOGIN_SUCCESS') {
    const { credentials, userInfo } = action.payload;

    return {
      ...state,
      loggedIn: true, loggingIn: false,
      credentials,
      userInfo: userInfo || state.userInfo,
    };
  } else if (action.type === 'LOGIN_FAILURE') {
    if (action.payload.error) {
      console.error(action.payload.error);
    }

    return {
      ...state,
      loggedIn: false, loggingIn: false,
      loginReason: action.payload.message,
    };
  } else if (action.type === 'LOGOFF') {
    return {
      ...state,
      loggedIn: false,
      loginReason: null,
      credentials: null,
      userInfo: null,
    };
  }

  return state;
};

export default reducer;
