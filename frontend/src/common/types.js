/* @flow */
export type Deps = {
  getState: () => Object,
  bindCredentials: (Function) => Function,
};

export type Message = {
  id: string,
  defaultMessage: string,
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
  appLoaderVisible: boolean,
  fatalError: ?Error,
  error: ?Error,
  lastError: ?Error,
};

export type AuthState = {
  loggedIn: bool,
  loggingIn: bool,
  credentials: ?Credentials,
  userInfo: ?Object,
  loginReason: ?string,
};

export type State = {
  app: AppState,
  auth: AuthState,
};

// Actions
export type Action =
  { type: 'SET_CURRENT_LOCALE'; payload: { locale: string } }
  | { type: 'SET_CURRENT_THEME'; payload: { theme: string } }
  | { type: 'SET_VIEWPORT'; payload: { width: number, height: number } }
  | { type: 'APP_REHYDRATED' }
  | { type: 'APP_START' }
  | { type: 'APP_STARTED' }
  | { type: 'APP_STOP' }
  | { type: 'SET_INIT_DATA'; payload: Object }
  | { type: 'SHOW_APPLOADER' }
  | { type: 'HIDE_APPLOADER' }
  | { type: 'APP_FATAL_ERROR'; payload: { error: Error } }
  | { type: 'APP_ERROR'; payload: { error: Error } }
  | { type: 'LOGIN'; payload: { userName: string, password: string } }
  | { type: 'LOGIN_SUCCESS'; payload: { credentials: Credentials, userInfo: ?Object } }
  | { type: 'LOGIN_FAILURE'; payload: { message: ?Message, error: ?Error } },
  | { type: 'LOGIN' }
  ;
