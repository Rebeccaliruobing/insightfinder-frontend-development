/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import moment from 'moment';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { get } from 'lodash';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import { State } from '../../../common/types';
import { Container, Box, Select } from '../../../lib/fui/react';
import { BaseUrls } from '../../app/Constants';
import {
  loadProjectSettings,
  saveProjectSettings,
  pickProjectModel,
  removeProjectModel,
} from '../../../common/settings/actions';
import { parseQueryString, buildMatchLocation } from '../../../common/utils';
import {
  appMenusMessages,
  appFieldsMessages,
  appButtonsMessages,
} from '../../../common/app/messages';
import {
  AlertSensitivitySetting,
  DataDisqualifiersSetting,
  GroupSetting,
  SharingSetting,
  PredictionSetting,
  LogSensitivitySetting,
  ModelSetting,
  LogEpisodeWordSetting,
  ThresholdSetting,
} from './components';

type Props = {
  match: Object,
  location: Object,
  intl: Object,
  push: Function,
  credentials: Object,
  projects: Array<Object>,
  projectGroups: Array<String>,
  projectSettings: Object,
  currentLoadingComponents: Object,
  projectSettingsParams: Object,
  currentErrorMessage: ?Message,
  loadProjectSettings: Function,
  saveProjectSettings: Function,
  pickProjectModel: Function,
  removeProjectModel: Function,
};

class ProjectSettingsCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    // Helper function
    this.pickNotNil = R.pickBy(a => !R.isNil(a));
    this.ifIn = (i, items) => items.indexOf(i) !== -1;
    this.defaultModelDays = 7;
    this.dateFormat = 'YYYY-MM-DD';
    this.isInternalUser = ['admin', 'guest'].indexOf(props.credentials.userName) !== -1;

    // TODO: cleanup for admin/guest hardcode.
    // Log and metric project has different settings. Meanwhile, model picking is
    // only used internal and shown only for admin/guest account.
    this.metricSettingInfos = [
      { key: 'learning', name: 'Data Disqualifiers', component: DataDisqualifiersSetting },
      { key: 'alert', name: 'Alert Sensitivity', component: AlertSensitivitySetting },
      { key: 'prediction', name: 'Prediction', component: PredictionSetting },
      { key: 'sharing', name: 'Project Sharing', component: SharingSetting },
      { key: 'grouping', name: 'Grouping', component: GroupSetting },
      { key: 'threshold', name: 'Threshold Overrides', component: ThresholdSetting },
    ];
    this.logSettingInfos = [
      { key: 'episodeword', name: 'Episode and Word Selection', component: LogEpisodeWordSetting },
      { key: 'logthreshold', name: 'Sensitivity Settings', component: LogSensitivitySetting },
      { key: 'sharing', name: 'Project Sharing', component: SharingSetting },
    ];
    // Show model picking only for admin/guest
    if (this.isInternalUser) {
      this.metricSettingInfos.push({
        key: 'model',
        name: 'Model Picking',
        component: ModelSetting,
      });
      this.logSettingInfos.push({ key: 'model', name: 'Model Picking', component: ModelSetting });
    }

    this.defaultMetricSetting = this.isInternalUser ? 'model' : 'learning';
    this.defaultLogSetting = 'episodeword';
    this.defaultInstanceGroup = 'All';

    // The settings which need start/end time parameters
    this.timeRangeSettings = ['model'];

    // The settings which need instanceGroup parameters
    this.instanceGroupSettings = ['model'];
  }

  componentDidMount() {
    if (!this.applyParamsAndRedirect(this.props)) {
      this.reloadData(this.props, true);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.applyParamsAndRedirect(newProps)) {
      this.reloadData(newProps);
    }
  }

  applyParamsAndRedirect(props) {
    // This method will set the default parameters in different situation. If parameters
    // are changed, it will redirect to the new url. In this case, we don't need to load
    // data. After redirection, the data will be loaded.
    const { location, match, push, projects } = props;
    const params = parseQueryString(location.search);
    const { projectName } = match.params;
    let { setting, instanceGroup, startTime, endTime } = params;
    let redirect = false;

    // Get the project data type which will decide the settings' profile, if project not
    // exist, select the default metric profile.
    const project = R.find(p => p.projectName === projectName, projects);
    const dataType = get(project, 'dataType', 'metric').toLowerCase();

    // If project changed, we need reset settings for instanceGroup, but keep the start/end time.
    if (projectName !== match.params.projectName) {
      instanceGroup = undefined;
    }

    // If setting not selected or incorrect, use the default setting for each datatype.
    if (dataType === 'metric') {
      if (!setting || !R.find(i => i.key === setting, this.metricSettingInfos)) {
        setting = this.defaultMetricSetting;
      }
    } else if (!setting || !R.find(i => i.key === setting, this.logSettingInfos)) {
      setting = this.defaultLogSetting;
    }

    // If it's setting needs start/end time params, set the default or to valid value.
    // Otherwise, clean these params.
    if (this.ifIn(setting, this.timeRangeSettings)) {
      const mEndTime = endTime ? moment(endTime, this.dateFormat) : moment().endOf('day');
      const mStartTime = startTime
        ? moment(startTime, this.dateFormat)
        : mEndTime.clone().subtract(this.defaultModelDays, 'days').startOf('day');
      startTime = mStartTime.format(this.dateFormat);
      endTime = mEndTime.format(this.dateFormat);
    } else {
      startTime = undefined;
      endTime = undefined;
    }

    // Also set the install group default
    if (this.ifIn(setting, this.instanceGroupSettings)) {
      instanceGroup = R.isNil(instanceGroup) ? this.defaultInstanceGroup : instanceGroup;
    } else {
      instanceGroup = undefined;
    }

    const newParams = this.pickNotNil({ setting, instanceGroup, startTime, endTime });

    // If projectName or params are changed, redirect to new location.
    if (projectName !== match.params.projectName || !R.equals(newParams, this.pickNotNil(params))) {
      redirect = true;
      push(buildMatchLocation(match, { projectName }, newParams));
    }

    return redirect;
  }

  reloadData(props, force = false) {
    // IMPORTANT: Need to compare the new params with last params. If they are the same
    // we cannot dispath the action, which will change the props again and cause a loop.

    const { match, location, projectSettingsParams, loadProjectSettings } = props;
    const params = parseQueryString(location.search);
    const { projectName } = match.params;
    const nextProjectSettingsParams = this.pickNotNil({ projectName, ...params });

    if (force) {
      loadProjectSettings(projectName, params, true);
    } else if (!R.equals(projectSettingsParams, nextProjectSettingsParams)) {
      loadProjectSettings(projectName, params, false);
    }
  }

  @autobind handleProjectChange(newValue) {
    const projectName = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    // Reset setting to default as project type might change.
    const setting = undefined;
    push(buildMatchLocation(match, { projectName }, { ...params, setting }));
  }

  @autobind handleInstanceGroupChange(newValue) {
    const instanceGroup = newValue ? newValue.value : null;
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);
    push(buildMatchLocation(match, match.params, { ...params, instanceGroup }));
  }

  @autobind handleSettingChangeClick(setting) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { match, push, location } = this.props;
      const params = parseQueryString(location.search);
      push(buildMatchLocation(match, match.params, { ...params, setting }));
    };
  }

  @autobind handleStartTimeChange(newDate) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);

    const startTime = newDate.clone().startOf('day').format(this.dateFormat);
    push(buildMatchLocation(match, match.params, { ...params, startTime }));
  }

  @autobind handleEndTimeChange(newDate) {
    const { match, push, location } = this.props;
    const params = parseQueryString(location.search);

    const endTime = newDate.clone().endOf('day').format(this.dateFormat);
    push(buildMatchLocation(match, match.params, { ...params, endTime }));
  }

  @autobind handleRefreshClick() {
    this.reloadData(this.props, true);
  }

  render() {
    const {
      intl,
      match,
      credentials,
      projects,
      projectGroups,
      projectSettings,
      projectSettingsParams,
      currentLoadingComponents,
      saveProjectSettings,
      currentErrorMessage,
      pickProjectModel,
      removeProjectModel,
    } = this.props;
    const { projectName } = match.params;
    const { setting, instanceGroup, startTime, endTime } = parseQueryString(location.search);
    const project = R.find(p => p.projectName === projectName, projects);
    const dataType = get(project, 'dataType', 'metric').toLowerCase();
    const settingInfos = dataType === 'metric' ? this.metricSettingInfos : this.logSettingInfos;
    const settingInfo = R.find(info => info.key === setting, settingInfos);
    const showTimeRange = this.ifIn(setting, this.timeRangeSettings);
    const showInstanceGroup = this.ifIn(setting, this.instanceGroupSettings);
    const hasError = !!currentErrorMessage;

    return (
      <Container fullHeight withGutter className="flex-col">
        <Container breadcrumb>
          <div className="section">
            <span className="label">{intl.formatMessage(appMenusMessages.settings)}</span>
            <span className="divider">/</span>
            <NavLink to={BaseUrls.SettingsProjectList}>
              <span className="label">Projects</span>
            </NavLink>
            <span className="divider">/</span>
            <Select
              name="project"
              inline
              style={{ width: 200 }}
              options={R.map(p => ({ label: p.projectName, value: p.projectName }), projects)}
              value={projectName}
              onChange={this.handleProjectChange}
              placeholder={`${intl.formatMessage(appFieldsMessages.project)}...`}
            />
            {showInstanceGroup && <span className="divider">/</span>}
            {showInstanceGroup &&
              <Select
                clearable
                name="group"
                inline
                style={{ width: 200 }}
                options={R.map(g => ({ label: g, value: g }), projectGroups)}
                value={instanceGroup}
                onChange={this.handleInstanceGroupChange}
                placeholder="Select Group"
              />}
          </div>
          <div className="section float-right clearfix" style={{ fontSize: 12, marginRight: 0 }}>
            <div className="ui orange button" tabIndex="0" onClick={this.handleRefreshClick}>
              {intl.formatMessage(appButtonsMessages.refresh)}
            </div>
          </div>
          {showTimeRange &&
            <div className="section float-right" style={{ fontSize: 12, marginRight: '0.75em' }}>
              <span className="label">Start Date:</span>
              <div className="ui input">
                <DatePicker
                  todayButton="Today"
                  dateFormat={this.dateFormat}
                  selected={moment(startTime, this.dateFormat)}
                  maxDate={moment().endOf('day')}
                  onChange={this.handleStartTimeChange}
                />
              </div>
              <span className="label">End Date:</span>
              <div className="ui input">
                <DatePicker
                  todayButton="Today"
                  dateFormat={this.dateFormat}
                  selected={moment(endTime, this.dateFormat)}
                  maxDate={moment().endOf('day')}
                  onChange={this.handleEndTimeChange}
                />
              </div>
            </div>}
        </Container>
        {hasError &&
          <Container fullHeight>
            <div
              className="ui error message"
              style={{ marginTop: 16 }}
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(currentErrorMessage, { projectName }),
              }}
            />
          </Container>}
        {!hasError &&
          <Container
            fullHeight
            className="overflow-y-auto"
            style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}
          >
            <Box className="flex-col" style={{ height: '100%', paddingTop: 0 }}>
              <div className="ui pointing secondary menu">
                {R.map(
                  info => (
                    <a
                      key={info.key}
                      className={`${info.key === setting ? 'active' : ''} item`}
                      onClick={this.handleSettingChangeClick(info.key)}
                    >
                      {info.name}
                    </a>
                  ),
                  settingInfos,
                )}
              </div>
              <div className="flex-grow" style={{ overflow: 'hidden' }}>
                {settingInfo &&
                  React.createElement(settingInfo.component, {
                    intl,
                    projectName,
                    projectSettingsParams,
                    currentLoadingComponents,
                    data: projectSettings || {},
                    saveProjectSettings,
                    instanceGroup,
                    credentials,
                    pickProjectModel,
                    removeProjectModel,
                  })}
              </div>
            </Box>
          </Container>}
      </Container>
    );
  }
}

const ProjectSettings = injectIntl(ProjectSettingsCore);

export default connect(
  (state: State) => {
    const { projects, currentLoadingComponents } = state.app;
    const { credentials } = state.auth;
    const {
      projectGroups,
      projectSettings,
      projectSettingsParams,
      currentErrorMessage,
    } = state.settings;
    return {
      projects,
      credentials,
      projectGroups,
      projectSettings,
      currentLoadingComponents,
      projectSettingsParams,
      currentErrorMessage,
    };
  },
  { push, loadProjectSettings, saveProjectSettings, pickProjectModel, removeProjectModel },
)(ProjectSettings);
