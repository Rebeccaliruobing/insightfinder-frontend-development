const BaseUrls = {
  Help: '/help',
  Metric: '/metric',
  MetricSummary: '/metric/summary/:projectId?',
  MetricSummaryBase: '/metric/summary', // Used for redirect
  Usecase: '/usecase/:system?',
  UsecaseBase: '/usecase',
  Settings: '/settings',
  SettingsProjectList: '/settings/projects',
  SettingsProject: '/settings/projects/:projectId',
  SettingsProjectWizard: '/settings/project-wizard',
  AccountInfo: '/account-info',
};

export default BaseUrls;
