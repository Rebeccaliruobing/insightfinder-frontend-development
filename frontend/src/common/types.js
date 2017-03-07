/* @flow */

export type AppState = {
  appName: string,
  appVersion: string,
  currentTheme: ?string,
  currentLocale: ?string,
  locales: ?Array<string>,
  messages: ?Object,

  windowWidth: ?number,
  windowHeight: ?number,

  // App loaded, rehydrate finished.
  loaded: boolean,

  started: boolean,
  error: ?Error,
  online: boolean,
};

export type SessionState = {
  loggedIn: boolean,
};

export type State = {
  app: AppState,
  session: SessionState,
};

// Actions
export type Action =
  { type: 'APP_ERROR'; payload: { error: Error } }
  | { type: 'SET_CURRENT_LOCALE'; payload: { locale: string } }
  | { type: 'SET_CURRENT_THEME'; payload: { theme?: string } }
  | { type: 'SET_WINDOW_SIZE'; payload: { windowWidth: number, windowHeight: number } }
  | { type: 'APP_ONLINE'; payload: { online: boolean } }
  | { type: 'APP_START' }
  | { type: 'APP_STARTED' }
  | { type: 'APP_STOP' }
  ;
