import { REHYDRATE } from 'redux-persist/constants';
import createActionBuffer from 'redux-action-buffer';

const configureMiddleware = () => {
  const middlewares = [
    createActionBuffer(REHYDRATE),
  ];

  return middlewares;
};

export default configureMiddleware;
