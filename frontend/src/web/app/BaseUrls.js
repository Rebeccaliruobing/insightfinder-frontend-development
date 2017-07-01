/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/**
 * The urls used for creating routing, and also for generating links. Keep all
 * urls here will make change urls easy.
 **/
const BaseUrls = {
  Help: '/help',
  AccountInfo: '/account-info',

  Metric: '/metric',
  MetricAnalysis: '/metric/live-analysis',
  MetricEvents: '/metric/events',
  MetricAppForecast: '/metric/app-forecast',
  MetricLineCharts: '/metric/line-charts',
  MetricHistoricalMetricAnalysis: '/metric/historical-metric-analysis',

  Usecase: '/usecase/:system?',
  UsecaseBase: '/usecase',

  Log: '/log',
  LogAnalysis: '/log/analysis',
  // LogAnalysis: '/log/live-analysis/:projectId?/:month?/:incidentId?',
  LogHistoricalLogAnalysis: '/log/historical-log-analysis/:projectId?/:incidentId?',
  LogHistoricalLogAnalysisBase: '/log/historical-log-analysis',

  Settings: '/settings',
  SettingsProjectList: '/settings/projects',
  SettingsProject: '/settings/projects/:projectName',
  SettingsProjectWizard: '/settings/project-wizard',
};

export default BaseUrls;
