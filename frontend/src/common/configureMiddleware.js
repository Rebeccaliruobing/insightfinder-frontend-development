import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import configureEpics from './configureEpics';

const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action,
  );

const configureMiddleware = (deps) => {
  const { history } = deps;
  const rootEpic = configureEpics(deps);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middlewares = [
    injectMiddleware(deps),
    epicMiddleware,
    routerMiddleware(history),
  ];

  if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept('./configureEpics', () => {
      const configureEpics = require('./configureEpics').default;

      epicMiddleware.replaceEpic(configureEpics(deps));
    });
  }

  return middlewares;
};

export default configureMiddleware;
