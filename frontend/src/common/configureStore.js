/* @flow */
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, autoRehydrate } from 'redux-persist';
import configureStorage from './configureStorage';
import configureReducer from './configureReducer';
import configureMiddleware from './configureMiddleware';
import type { State } from './types';

type Options = {
  initialState: State,
  platformDeps?: Object,
};

const configureStore = (options: Options) => {
  const { initialState, platformDeps } = options;

  const rootReducer = configureReducer();
  const middlewares = configureMiddleware();

  // Use redux devtools, need to install browser extension
  // https://github.com/zalmoxisus/redux-devtools-extension

  // Use createActionBuffer to buffer any actions before the REHYDRATE
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewares),
      autoRehydrate(),
    ),
  );

  if (platformDeps && platformDeps.storageEngine) {
    const config = configureStorage(
      initialState.app.appName,
      platformDeps.storageEngine,
    );
    persistStore(store, config);
  }

  // Enable hot reloading for reducers.
  if (module.hot && typeof module.hot.accept === 'function') {
    // React Native for some reason needs accept without the explicit path.
    // facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html
    if (initialState.app.isReactNative) {
      module.hot.accept(() => {
        const configureReducer = require('./configureReducer').default;
        store.replaceReducer(configureReducer());
      });
    } else {
      module.hot.accept('../common/configureReducer', () => {
        const configureReducer = require('./configureReducer').default;
        store.replaceReducer(configureReducer());
      });
    }
  }

  return store;
};

export default configureStore;
