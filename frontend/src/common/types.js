/* @flow */

export type AppState = {
  appName: string,
  appVersion: string,
  currentTheme: ?string,
  currentLocale: ?string,
  windowSize: Object,
  locales: ?Array<string>,
  messages: ?Object,
  started: boolean,
  error: ?Error,
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
  | { type: 'SET_WINDOW_SIZE'; payload: { width: number, height: number } }
  | { type: 'APP_START' }
  | { type: 'APP_STARTED' }
  | { type: 'APP_STOP' }
  ;
