/* @flow */
import type { SessionState, Action } from '../types';

const initialState = {
  loggedIn: false,
};

const reducer = (
  state: SessionState = initialState,
  action: Action) => {
  switch (action.type) {

    case 'USER_LOGIN_SUCCEED':
      return { ...state, loggedIn: true };

    default:
      return state;
  }
};

export default reducer;
