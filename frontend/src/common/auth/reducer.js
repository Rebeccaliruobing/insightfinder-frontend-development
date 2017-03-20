/* @flow */
import type { AuthState, Action } from '../types';

const initialState = {
  loggedIn: false,
  loggingIn: false,
  credentials: {},
  userInfo: {},
  loginReason: {},
};

const reducer = (
  state: AuthState = initialState,
  action: Action) => {
  if (action.type === 'LOGGINGIN') {
    return { ...state, loggingIn: true };
  } else if (action.type === 'LOGIN_SUCCESS') {
    const { userName, token, ...rest } = action.payload;
    return {
      ...state,
      loggedIn: true, loggingIn: false,
      credentials: {
        userName,
        token,
      },
      userInfo: {
        userName,
        ...rest,
      },
    };
  } else if (action.type === 'LOGIN_FAILURE') {
    return {
      ...state,
      loggedIn: false, loggingIn: false,
      loginReason: action.payload,
    };
  } else if (action.type === 'REDIRECT_LOGIN') {
    return {
      ...state,
      loggedIn: false, credentials: {},
      loginReason: action.payload,
    };
  }

  return state;
};

export default reducer;
