/* @flow */
export type Deps = {
  getState: () => Object,
};

export type Message = {
  id: string,
  defaultMessage: string,
};

export type ErrorMessage = {
  message: ?Message,
  error: ?Error,
};

export type AlertMessage = {
  id: string,
  type: string,
  message: ?Message,
};

export type Credentials = {
  userName: string,
  token: string,
};

export type AppState = {
  appName: string,
  appVersion: string,
  currentTheme: string,
  currentLocale: ?string,
  viewport: Object,
  locales: Array<string>,
  messages: Array<Message>,
  rehydrated: bool,
  starting: bool,
  started: bool,
  inited: bool,
  appLoaderVisible: boolean,
  pageLoaderVisible: boolean,
  lastError: ?ErrorMessage,
  alerts: Array<AlertMessage>,
  v1store: Object,
  projects: Array<Object>,
};

export type AuthState = {
  loggedIn: bool,
  loggingIn: bool,
  credentials: ?Credentials,
  userInfo: ?Object,
  loginReason: ?string,
};

export type LogState = {
  currentStreamingProject: ?string,
  currentStreamingLog: ?string,
  streamingInfos: Object,
};

export type State = {
  app: AppState,
  auth: AuthState,
  log: LogState,
};

// Actions
export type Action =
  { type: 'SET_CURRENT_LOCALE', payload: { locale: string } }
  | { type: 'SET_CURRENT_THEME', payload: { theme: string } }
  | { type: 'SET_VIEWPORT', payload: { width: number, height: number } }
  | { type: 'APP_REHYDRATED' }
  | { type: 'APP_START' }
  | { type: 'APP_STARTED' }
  | { type: 'APP_STOP' }
  | { type: 'SET_INIT_DATA', payload: Object }
  | { type: 'SHOW_APP_LOADER' }
  | { type: 'HIDE_APP_LOADER' }
  | { type: 'SHOW_APP_ALERT', payload: { type: string, message: Message } }
  | { type: 'HIDE_APP_ALERT', payload: { ids: Array<string> } }
  | { type: 'APP_ERROR', payload: { message: ?Message, error: ?Error } }
  | { type: 'LOGIN', payload: { userName: string, password: string } }
  | { type: 'LOGIN_SUCCESS', payload: { credentials: Credentials, userInfo: ?Object } }
  | { type: 'LOGIN_FAILURE', payload: { message: ?Message, error: ?Error } }
  | { type: 'LOGOFF' }
  | { type: 'LOAD_LOG_STREAMING', payload: { project: ?string, log: ?string } }
  ;
