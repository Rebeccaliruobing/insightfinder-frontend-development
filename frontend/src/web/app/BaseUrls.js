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
  MetricAnalysis: '/metric/analysis',
  MetricEvents: '/metric/events',

  Causal: '/causal',
  CausalAnalysis: '/causal/analysis',

  MetricAppForecast: '/metric/app-forecast',
  MetricLineCharts: '/metric/line-charts',

  Usecase: '/usecase/:system?',
  UsecaseBase: '/usecase',
  Log: '/log',
  LogAnalysis: '/log/analysis',

  Settings: '/settings',
  SettingsProjectList: '/settings/projects',
  SettingsProject: '/settings/projects/:projectName',
  SettingsProjectWizard: '/settings/project-wizard',
  SettingsExternalServiceList: '/settings/extsvc',
  SettingsSystem: '/settings/system',

  LiveMonitoring: '/liveMonitoring',

  PagerDutyImg: 'https://pagerduty.com/assets/pd_connect_button.png',
  SlackImg: 'https://slack.com/img/slack_logo_240.png',
  PagerDutyUrl:
    'https://connect.pagerduty.com/connect?vendor=ad2938f1f094d65d86fa&amp;callback=https://app.insightfinder.com/settings/extsvc',
};

export default BaseUrls;
