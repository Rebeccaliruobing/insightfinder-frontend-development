/* @flow */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app/reducer';
import auth from './auth/reducer';
import metric from './metric/reducer';
import log from './log/reducer';
import usecase from './usecase/reducer';

const configureReducer = () => {
  const reducer = combineReducers({
    router: routerReducer,
    app,
    auth,
    metric,
    log,
    usecase,
  });

  return reducer;
};

export default configureReducer;
