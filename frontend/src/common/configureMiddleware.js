import { createEpicMiddleware } from 'redux-observable';
import configureEpics from './configureEpics';

const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action,
  );

const configureMiddleware = () => {
  const deps = {}; // TODO: Add deps to be used in actions.
  const rootEpic = configureEpics(deps);
  const epicMiddleware = createEpicMiddleware(rootEpic);

  const middlewares = [
    injectMiddleware(deps),
    epicMiddleware,
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
