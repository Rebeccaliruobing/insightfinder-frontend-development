/* @flow */
import { combineReducers } from 'redux';
import app from './app/reducer';
import auth from './auth/reducer';

const configureReducer = () => {
  const reducer = combineReducers({
    app,
    auth,
  });

  return reducer;
};

export default configureReducer;
