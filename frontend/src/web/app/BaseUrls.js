/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/**
 * The urls used for creating routing, and also for generating links. Keep all
 * urls here will make change urls easy.
 *
 * For urls with parameters, there is a base version of the url, the base version
 * is used for redirect or link with parameters.
 **/
const BaseUrls = {
  Help: '/help',
  AccountInfo: '/account-info',

  Metric: '/metric',
  MetricAnalysis: '/metric/live-analysis/:projectId?',
  MetricAnalysisBase: '/metric/live-analysis',
  MetricEvents: '/metric/events',
  MetricAppForecast: '/metric/app-forecast',
  MetricLineCharts: '/metric/line-charts',
  MetricHistoricalMetricAnalysis: '/metric/historical-metric-analysis',

  Usecase: '/usecase/:system?',
  UsecaseBase: '/usecase',

  Log: '/log',
  LogAnalysis: '/log/live-analysis/:projectId?/:month?/:incidentId?',
  LogAnalysisBase: '/log/live-analysis',
  LogHistoricalLogAnalysis: '/log/historical-log-analysis/:projectId?/:incidentId?',
  LogHistoricalLogAnalysisBase: '/log/historical-log-analysis',

  Settings: '/settings',
  SettingsProjectList: '/settings/projects',
  SettingsProject: '/settings/projects/:projectId',
  SettingsProjectWizard: '/settings/project-wizard',
};

export default BaseUrls;
