/* @flow */
import { combineReducers } from 'redux';
import app from './app/reducer';
import session from './session/reducer';

const configureReducer = () => {
  const reducer = combineReducers({
    app,
    session,
  });

  return reducer;
};

export default configureReducer;
