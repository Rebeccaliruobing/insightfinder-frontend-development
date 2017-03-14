/* @flow */
import type { AuthState, Action } from '../types';

const initialState = {
  loggedIn: false,
  userName: null,
  token: null,
};

const reducer = (
  state: AuthState = initialState,
  action: Action) => {
  switch (action.type) {

    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: true, ...action.payload };

    default:
      return state;
  }
};

export default reducer;
