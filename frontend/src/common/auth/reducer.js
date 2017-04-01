/* @flow */
/* eslint-disable no-console */
import store from 'store';
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
    // TODO: [Deprecated 1.0] Remove store dependence
    store.set('token', credentials.token);
    store.set('userName', credentials.userName);
    store.set('userInfo', userInfo);

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
    // TODO: [Depreciated] Remove store dependence.
    store.clearAll();

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
