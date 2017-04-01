/* @flow */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app/reducer';
import auth from './auth/reducer';

const configureReducer = () => {
  const reducer = combineReducers({
    router: routerReducer,
    app,
    auth,
  });

  return reducer;
};

export default configureReducer;
