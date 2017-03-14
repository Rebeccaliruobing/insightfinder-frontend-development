/* @flow */
export type Deps = {
  getState: () => Object,
};

export type AppState = {
  appName: string,
  appVersion: string,
  currentTheme: ?string,
  currentLocale: ?string,
  windowSize: Object,
  locales: ?Array<string>,
  messages: ?Object,
  started: boolean,
  appLoaderVisible: boolean,
  error: ?Error,
};

export type AuthState = {
  loggedIn: boolean,
  userName: ?string,
  token: ?string,
};

export type State = {
  app: AppState,
  auth: AuthState,
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
  | { type: 'SHOW_APPLOADER' }
  | { type: 'HIDE_APPLOADER' }
  | { type: 'LOGIN_SUCCESS'; payload: { userName: string, token: string } }
  ;
