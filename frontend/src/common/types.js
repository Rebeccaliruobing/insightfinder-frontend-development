/* @flow */
export type Deps = {
  getState: () => Object,
};

export type Message = {
  id: string,
  defaultMessage: string,
};

export type Filters = {
  project?: string,
  instanceGroup?: string,
  instance?: string,
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
  rehydrated: boolean,
  starting: boolean,
  started: boolean,
  inited: boolean,
  appLoaderVisible: boolean,
  pageLoaderVisible: boolean,
  lastError: ?ErrorMessage,
  alerts: Array<AlertMessage>,
  projects: Array<Object>,
  filters: Filters,
  enabledDataSourceIds: Array<string>,

  // The map used to store the name of components in loading status.
  currentLoadingComponents: Object,
};

export type AuthState = {
  loggedIn: boolean,
  loggingIn: boolean,
  credentials: ?Credentials,
  userInfo: ?Object,
  loginReason: ?string,
};

export type MetricState = {
  currentHourlyEvents: ?Object,
  currentHourlyEventsLoading: boolean,
  currentWeeklyAnomalies: ?Object,
  currentErrorMessage: ?Message,

  // The main error message to show in the main content.
  mainError: ?Message,

  // Event summary data for each view
  eventSummary: Object,

  // Event summary parameters for each view used to get data.
  eventSummaryParams: Object,
};

export type LogState = {
  fileInfos: Object,
  fileIncidentInfos: Object,
  streamingInfos: Array<Object>,
  streamingInfosParams: Object,
  streamingIncidentInfos: Object,
  streamingIncidentInfosParams: Object,
  streamingErrorMessage: ?Message,

  // The current list of log incidents.
  incidentList: Array<Object>,

  // The params used to get log incidents list.
  incidentListParams: Object,

  // The current log incident.
  incident: Object,

  // The params used to get the current log incident.
  incidentParams: Object,

  // The current error message, set to null if no errors.
  currentError: ?Message,

  // The object used to store the states for each view. The key is the view name.
  viewsState: Object,
};

export type SettingsState = {
  // Object used to store current project's settings.
  projectSettings: Object,

  // Parameters get the current project's setting, used to check reload needed.
  projectSettingsParams: Object,

  // The current project's groups
  projectGroups: Array<String>,

  // Current parameters for each APIs, used to check whether API call is needed.
  currentApisParams: Object,

  // The current error message, set to null if no errors.
  currentErrorMessage: ?Message,

  // The project creation status
  projectCreationStatus: String,

  // External service list
  externalServiceList: Array<Object>,
};

export type UseCaseState = {
  opensourceSystemNames: Array<string>,
  bugRepository: Object,
};

export type State = {
  app: AppState,
  auth: AuthState,
  metric: MetricState,
  log: LogState,
  settings: SettingsState,
  usecase: UseCaseState,
};

// Actions
export type Action =
  | { type: 'SET_CURRENT_LOCALE', payload: { locale: string } }
  | { type: 'SET_CURRENT_THEME', payload: { theme: string } }
  | { type: 'SET_VIEWPORT', payload: { width: number, height: number } }
  | { type: 'APP_REHYDRATED' }
  | { type: 'APP_START' }
  | { type: 'APP_STARTED' }
  | { type: 'APP_STOP' }
  | { type: 'SET_INIT_DATA', payload: Object }
  | { type: 'SHOW_APP_LOADER' }
  | { type: 'HIDE_APP_LOADER' }
  | { type: 'SHOW_APP_ALERT', payload: { type: string, message: Message, params: ?Object } }
  | { type: 'HIDE_APP_ALERT', payload: { ids: Array<string> } }
  | { type: 'SET_APP_FILTERS', payload: Filters }
  | { type: 'APP_ERROR', payload: { message: ?Message, error: ?Error } }
  | { type: 'LOGIN', payload: { userName: string, password: string } }
  | { type: 'LOGIN_SUCCESS', payload: { credentials: Credentials, userInfo: ?Object } }
  | { type: 'LOGIN_FAILURE', payload: { message: ?Message, error: ?Error } }
  | { type: 'LOGOFF' }
  | {
      type: 'LOAD_LOG_FILE',
      payload: {
        projectId: ?string,
        incidentId: ?string,
        match: Object,
        params: ?Object,
        forceReload?: boolean,
      },
    }
  | {
      type: 'SET_LOG_FILE',
      payload: {
        projectId: string,
        projectInfo: Object,
        incidentId: ?string,
        incidentInfo: ?Object,
      },
    }
  | {
      type: 'LOAD_LOG_STREAMING_LIST',
      payload: {
        projectName: ?string,
        month: ?string,
      },
    }
  | {
      type: 'SET_LOG_STREAMING',
      payload: {
        projectId: string,
        projectInfo: Object,
        incidentId: ?string,
        incidentInfo: ?Object,
      },
    }
  | { type: 'LOAD_BUG_REPOSITORY', payload: {} }
  | { type: 'SET_BUG_REPOSITORY', payload: { bugRepository: Object } };
