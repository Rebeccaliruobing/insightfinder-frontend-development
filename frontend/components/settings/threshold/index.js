import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {autobind} from 'core-decorators';
import _ from 'lodash';
import {Console, ButtonGroup, Button, Dropdown, Accordion, Message, Alert} from '../../../artui/react/index';
import store from 'store';
import WaringButton from '../../cloud/monitoring/waringButton';
import ModelSettings from './model';

import './threshold.less';
import apis from '../../../apis';

import {
  ProjectSelection,
  DurationThreshold,
  PredictionWindowHour,
  AnomalyThresholdSensitivity,
  GroupingCriteriaSelection,
  GroupingMatchOpSelection,
  GroupingSeperateModelSelection,
} from '../../selections';

const baseUrl = window.API_BASE_URL || '/api/v1/';

export default class ThresholdSettings extends React.Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    root: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    let weeks = 1;
    // TODO: Hack way to keep the tab.
    // The context causes routing change and recreate this component.
    const selectedTab = store.get('insfdr_setting_selectedTab0', 'learning');
    const tabStates0 = {
      learning: '',
      alert: '',
      sharing: '',
      threshold: '',
      prediction: '',
      episodeword: '',
      logthreshold: '',
      grouping: '',
    };
    tabStates0[selectedTab] = 'active';

    this.state = {
      view: 'chart',
      loading: false,
      indexLoading: false,
      dateIndex: 0,
      timeIndex: 0,
      params: {
        showAddPanel: false,
        projects: [],
        weeks: weeks,
        endTime: moment(new Date()).toDate(),
        startTime: moment(new Date()).add(-7 * weeks, 'days')
      },
      data: {},
      tempSharedUsernames: '',
      tempLogFreqWindow: '',
      tempLearningSkippingPeriod: '',
      tempDetectionSkippingPeriod: '',
      metricSettings: [],
      episodeList: [],
      wordList: [],
      tabStates: {
        episode: 'active',
        word: '',
      },
      tabStates0,
      groupingRules: [],
      instanceGroup: '',
      instanceGroups: [],
    };

    this.matchOpMap = {};
    this.matchOpMap["contains"]="contains";
    this.matchOpMap["startwith"]="start with";
    this.matchOpMap["equal"]="=";
    this.matchOpMap["ge"]=">=";
    this.matchOpMap["gt"]=">";
    this.matchOpMap["le"]="<=";
    this.matchOpMap["lt"]="<";
    this.matchOpMap["regex"]="regex";

    this.sensitivityMap = {};
    this.sensitivityMap["0.99"] = "Low";
    this.sensitivityMap["0.95"] = "Medium Low";
    this.sensitivityMap["0.9"] = "Medium";
    this.sensitivityMap["0.75"] = "Medium High";
    this.sensitivityMap["0.5"] = "High";
  }

  componentDidMount() {
    let { dashboardUservalues } = this.context;
    let { projectModelAllInfo, projectString } = dashboardUservalues;
    let projectNames = projectModelAllInfo.map((info)=>info.projectName);

    let refreshName = store.get('liveAnalysisProjectName') ? store.get('liveAnalysisProjectName') : projectNames[0];
    if (projectNames.length > 0) {
      this.handleProjectChange(refreshName);
    }
  }

  @autobind
  selectTab(e, tab) {
    var tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, () => '');
    tabStates[tab] = 'active';
    this.setState({ tabStates: tabStates });
  }

  @autobind
  selectTab0(e, tab) {
    var tabStates0 = this.state['tabStates0'];
    tabStates0 = _.mapValues(tabStates0, () => '');
    tabStates0[tab] = 'active';
    store.set('insfdr_setting_selectedTab0', tab);
    this.setState({ tabStates0: tabStates0 });
  }

  handleToggleFilterPanel() {
    this.setState({ showAddPanel: !this.state.showAddPanel }, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleFilterChange(data) {
    this.$filterPanel.slideUp();
  }

  @autobind
  handleProjectChange(projectName) {
    let { dashboardUservalues } = this.context;
    let { projectModelAllInfo, projectSettingsAllInfo, projectString, sharedProjectString, metricUnitMapping } = dashboardUservalues;
    let project = projectModelAllInfo.find((info) => info.projectName == projectName);
    let projectSetting = projectSettingsAllInfo.find((info) => info.projectName == projectName);
    let metricSettings = (projectSetting && projectSetting.metricSettings) || [];
    let { cvalue, pvalue, derivedpvalue, emailcvalue, emailpvalue, filtercvalue, filterpvalue, predictionWindow, minAnomalyRatioFilter, sharedUsernames, logFreqWindow } = project;
    let projectStr = projectString.split(',').map((s) => s.split(":")).find(v => v[0] == projectName);
    if (!projectStr) {
      projectStr = sharedProjectString.split(',').map((s) => s.split(":")).find(v => (v[0] + '@' + v[3]) == projectName);
    }
    // // 前三部分是名称，数据类型dataType和云类型cloudType
    let dataType = projectStr ? projectStr[1] : null;
    let cloudType = projectStr ? projectStr[2] : '';
    let projectType = "";
    let self = this;
    switch (dataType) {
      case 'AWS':
      case 'EC2':
      case 'RDS':
      case 'DynamoDB':
        projectType = `${dataType}/CloudWatch`;
        break;
      case 'GAE':
      case 'GCE':
        projectType = `${dataType}/CloudMonitoring`;
        break;
      case 'Log':
        projectType = `Log`;
        break;
      default:
        projectType = `${cloudType}/Agent`;
    }
    // apis.loadInstanceGrouping(projectName).then((resp)=> {
    // TODO: Change to the real grouping rules from server.
    // const groupingRules = resp.instanceGrouping;
    // });
    const groupingRules = [{
      groupName: 'EnvGroup',
      criteria: 'Environment',
      matchOp: 'contains',
      matchValue: 'PROD',
      seperateModel: 'yes',
    }, {
      groupName: 'ServiceGroup',
      criteria: 'Service Name',
      matchOp: 'equal',
      matchValue: 'MySQL',
      seperateModel: 'no',
    }];
    const data = Object.assign({}, this.state.data, {
      projectName,
      projectType,
      cvalue,
      pvalue,
      derivedpvalue,
      emailcvalue,
      emailpvalue,
      filtercvalue,
      filterpvalue,
      predictionWindow,
      minAnomalyRatioFilter,
      sharedUsernames,
      logFreqWindow,
      pvalueText: this.sensitivityMap[pvalue],
      derivedpvalueText: this.sensitivityMap[derivedpvalue],
      emailpvalueText: this.sensitivityMap[emailpvalue],
    });

    // Get project groups 
    this.setState({
      metricSettings,
      data,
      groupingRules,
      tempSharedUsernames: (data.sharedUsernames || '').replace('[', '').replace(']', ''),
      tempLogFreqWindow: (data.logFreqWindow || ''),
      tempLearningSkippingPeriod: (data.learningSkippingPeriod || ''),
      tempDetectionSkippingPeriod: (data.detectionSkippingPeriod || ''),
      loading: true,
    }, () => {
      apis.loadInstanceGrouping(projectName, 'getGrouping')
        .then((resp) => {
          if (resp.groupingString) {
            let groups = resp.groupingString.split(',').sort();
            const pos = groups.indexOf('All');
            if (pos !== -1) {
              const len = groups.length;
              groups = groups.slice(1, len).concat(groups.slice(0, 1));
            }
            const instanceGroup = (groups && groups.length > 0) ? groups[0] : '';
            const instanceGroups = groups;
            this.setState({
              instanceGroup,
              instanceGroups,
              loading: projectSetting.fileProjectType === 0,
            }, () => {
              if (projectSetting.fileProjectType === 0) {
                self.getLogAnalysisList(projectName, project);
              }
              this.selectTab0(null, _.findKey(this.state.tabStates0, s => s === 'active'));
              store.set('liveAnalysisProjectName', projectName);
            });
          }
        });
    });
  }

  getLogAnalysisList(projectName, project) {
    let self = this;
    apis.postLogAnalysis(projectName, '', '', '', '', '', '', '', '', true, '', "readonly").then((resp)=> {
      if(!resp.data){
        alert(resp);
        return;
      }
      self.setState({
        episodeList: resp.data['episodeMapArr'],
        wordList: resp.data['wordCountArr'],
        loading: false
      });
    });
  }

  @autobind
  handleGroupingRuleSelectionFieldChanged(rule, field) {
    return (value) => {
      const { groupingRules } = this.state;
      rule[field] = value;
      // Reset state to update ui
      this.setState({
        groupingRules,
      });
    };
  }

  @autobind
  handleGroupingRuleInputFieldChanged(rule, field) {
    return (e) => {
      const value = e.target.value;
      const { groupingRules } = this.state;
      rule[field] = value;
      // Reset state to update ui
      this.setState({
        groupingRules,
      });
    };
  }

  @autobind
  handleAddNewGroupingRule() {
    let { groupingRules } = this.state;

    groupingRules = groupingRules.concat({
      // TODO: Need to choose the default value for the new rule.
      groupName: '',
      criteria: '',
      matchOp: 'contains',
      matchValue: '',
      seperateModel: 'no',
    });

    this.setState({
      groupingRules,
    });
  }

  @autobind
  handleRemoveGroupingRule(index) {
    return () => {
      let { groupingRules } = this.state;
      groupingRules = _.filter(groupingRules, (v, i) => i !== index);
      this.setState({
        groupingRules,
      });
    };
  }

  @autobind
  handleSaveGroupingRules() {
    const { groupingRules } = this.state;
    const invalid = _.find(groupingRules, (rule) => {
      return !!_.findKey(rule, (value) => {
        return value === null || value === undefined || value === '';
      });
    });

    if (invalid) {
      alert('Please input all fields');
      return;
    }

    // TODO: Call api to update the grouping rule to server.
    console.log(groupingRules);
  }

  handleValueChange(name) {
    return (v) => {
      this.setState({
        data: Object.assign({}, this.state.data, _.fromPairs([[name, v]]))
      });
    };
  }

  handleValueTextChange(val, text) {
    return (v,t) => {
      this.setState({
        data: Object.assign({}, this.state.data, _.fromPairs([[val, v],[text, t]]))
      });
    };
  }

  handleLearningSkippingPeriodChange(e) {
    let v = e.target.value;
    this.setState({
      tempLearningSkippingPeriod: v,
      data: Object.assign({}, this.state.data, { learningSkippingPeriod: v })
    });
  }

  handleDetectionSkippingPeriodChange(e) {
    let v = e.target.value;
    this.setState({
      tempDetectionSkippingPeriod: v,
      data: Object.assign({}, this.state.data, { detectionSkippingPeriod: v })
    });
  }

  handleLogFreqWindowChange(e) {
    let v = e.target.value;
    this.setState({
      tempLogFreqWindow: v,
      data: Object.assign({}, this.state.data, { logFreqWindow: v })
    });
  }

  handleSharingChange(e) {
    let v = e.target.value;
    this.setState({
      tempSharedUsernames: v,
      data: Object.assign({}, this.state.data, { sharedUsernames: JSON.stringify(v.split(",")) })
    });
  }

  handleMetricSetting(index, name) {
    return (e) => {
      let metricSettings = this.state.metricSettings;
      metricSettings[index][name] = e.target.value;
      this.setState({ metricSettings });
    }
  }  

  handleMetricSettingChecked(index, name) {
    return (e) => {
        let metricSettings = this.state.metricSettings;
        if (e.target.checked) {
            metricSettings[index][name] = "on";
        } else {
            metricSettings[index][name] = undefined;
        }
        this.setState({ metricSettings });
    }
  }

  getEpisodeIndexNumber(index, e) {
    let { episodeList, wordList } = this.state;
    if (!e.target.checked) {
      $('#checkAllEpisode').prop('checked', false);
    }
    else {
      $('input[name="indexCheckEpisode"]:checked').size() == episodeList.length ? $('#checkAllEpisode').prop('checked', true) : "";
    }
  }

  getWordIndexNumber(index, e) {
    let { episodeList, wordList } = this.state;
    if (!e.target.checked) {
      $('#checkAllWord').prop('checked', false);
    }
    else {
      $('input[name="indexCheckWord"]:checked').size() == wordList.length ? $('#checkAllWord').prop('checked', true) : "";
    }
  }

  setCheckboxAllEpisode(e) {
    if (e.target.checked) {
      $('input[name="indexCheckEpisode"]').prop("checked", true);
    }
    else {
      $('input[name="indexCheckEpisode"]').prop("checked", false);
    }
  }

  setCheckboxAllWord(e) {
    if (e.target.checked) {
      $('input[name="indexCheckWord"]').prop("checked", true);
    }
    else {
      $('input[name="indexCheckWord"]').prop("checked", false);
    }
  }


  fileUploadRef(r) {
    $(ReactDOM.findDOMNode(r))
      .fileupload({
        dataType: 'json',
        url: `${baseUrl}cloudstorage/${store.get('userName')}/${this.state.data.projectName}/wordMap.csv`,
        sequentialUploads: true,
        multipart: false
      })
      .bind('fileuploadadd', (e, data) => {
        this.setState({ settingLoading: true, projectName: data.files[0]['name'] });
      })
      .bind('fileuploadprogress', (e, data) => {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        this.setState({ settingLoading: true });
      })
      .bind('fileuploadfail', (e, data) => {
        var resp = data.response().jqXHR.responseJSON;
        this.setState({ settingLoading: false });
      })
      .bind('fileuploaddone', (e, data) => {
        var resp = data.response().jqXHR.responseJSON;
        this.setState({
          projectHintMapFilename: data['data']['name'],
          data: Object.assign({}, this.state.data, { projectHintMapFilename: resp.filename }),
          settingLoading: false
        });
      });
  }

  handleSaveProjectSetting() {
    let { projectName, cvalue, pvalue, derivedpvalue, emailcvalue, emailpvalue, filtercvalue, filterpvalue, predictionWindow, minAnomalyRatioFilter, sharedUsernames, projectHintMapFilename, logFreqWindow, } = this.state.data;
    let { tempSharedUsernames, tempLogFreqWindow, data } = this.state;
    this.setState({ settingLoading: true }, ()=> {
      apis.postProjectSetting(projectName, cvalue, pvalue, derivedpvalue, emailcvalue, emailpvalue, filtercvalue, filterpvalue, predictionWindow, minAnomalyRatioFilter, tempSharedUsernames, tempLogFreqWindow, projectHintMapFilename).then((resp)=> {
        if (!resp.success) {
          window.alert(resp.message);
        }
        this.setState({ settingLoading: false }, this.context.root.loadData)
      });
    });
  }

  handleSaveMapArrSetting() {
    let selectedIndexArr = [];
    $('input[name="indexCheckEpisode"]:checked').each(function () {
      selectedIndexArr.push($(this).data('id'));
    });
    $('input[name="indexCheckWord"]:checked').each(function () {
      selectedIndexArr.push($(this).data('id'));
    });
    this.setState({ indexLoading: true }, ()=> {
      apis.postDashboardUserValuesMapArr('updatefrequencyvector', this.state.data.projectName, JSON.stringify(selectedIndexArr)
      ).then((resp)=> {
        if (resp.success) {
          window.alert("Interesting patterns updated.");
        }
        this.setState({ indexLoading: false });
      });
    });

  }

  handleSaveMetricSetting() {
    this.setState({ uservaluesLoading: true }, ()=> {
      apis.postDashboardUserValues('updateprojsettings', {
        projectName: this.state.data.projectName,
        projectSettings: JSON.stringify(this.state.metricSettings)
      }).then((resp)=> {
        this.setState({ uservaluesLoading: false }, this.context.root.loadData)
      });
    });
  }

  @autobind
  handleInstanceGroupChange(instanceGroup) {
    this.setState({
      loading: true,
      instanceGroup,
    }, () => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    let labelStyle = {};
    let {
      data, tempSharedUsernames, tempLearningSkippingPeriod, tempDetectionSkippingPeriod, tempLogFreqWindow,
      loading, metricSettings, episodeList, wordList, indexLoading, tabStates, tabStates0,
      groupingRules, instanceGroup, instanceGroups,
    } = this.state;
    let { dashboardUservalues } = this.context;
    let { projectModelAllInfo, projectSettingsAllInfo, projectString,metricUnitMapping } = dashboardUservalues;
    let project = projectModelAllInfo.find((info)=>info.projectName == data.projectName);
    let projectSetting = projectSettingsAllInfo.find((info)=>info.projectName == data.projectName);
    let isLogProject = (projectSetting != undefined && projectSetting['fileProjectType'] == 0);
    const projectName = data.projectName;

    let metricUnitMap = {};
    if(metricUnitMapping){
      $.parseJSON(metricUnitMapping).map(function (item, index) {
        metricUnitMap[item.metric] = item.unit;
      });
    }
    let self = this;
    return (
      <Console.Content className={loading ? "loading" : ""}>
        <div className="ui main tiny container project-settings" ref={c => this._el = c}>
          <div className="ui right aligned vertical inline segment" style={{ zIndex: 200 }}>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <ProjectSelection
                key={projectName} value={projectName}
                style={{ minWidth: 200 }} onChange={this.handleProjectChange}
              />
            </div>
            {tabStates0['model'] === 'active' &&
              <div className="field">
                <label style={{ fontWeight: 'bold' }}>Group:</label>
                <Dropdown
                  key={projectName}
                  mode="select"
                  searchable
                  value={instanceGroup}
                  onChange={this.handleInstanceGroupChange}
                  style={{ minWidth: 150 }}
                >
                  <div className="menu">
                    {
                      instanceGroups.map(g => (
                        <div className="item" key={g} data-value={g}>{g}</div>
                      ))
                    }
                  </div>
                </Dropdown>
              </div>
            }
          </div>
          <div className="ui vertical segment">
            <div className="ui pointing secondary menu">
              {isLogProject && <a className={tabStates0['episodeword'] + ' item'}
                                    onClick={(e) => this.selectTab0(e, 'episodeword')}>Episode and Word Selection</a>}
              {isLogProject && <a className={tabStates0['logthreshold'] + ' item'}
                                    onClick={(e) => this.selectTab0(e, 'logthreshold')}>Sensitivity Settings</a>}
              {!isLogProject && <a className={tabStates0['learning'] + ' item'}
                                   onClick={(e) => this.selectTab0(e, 'learning')}>Data Disqualifiers</a>}
              {!isLogProject && <a className={tabStates0['alert'] + ' item'}
                                    onClick={(e) => this.selectTab0(e, 'alert')}>Alert Sensitivity</a>}
              {!isLogProject && <a className={tabStates0['prediction'] + ' item'}
                                    onClick={(e) => this.selectTab0(e, 'prediction')}>Prediction</a>}
              {['admin','guest'].indexOf(store.get('userName'))!=-1 && 
                                    !isLogProject && <a className={tabStates0['model'] + ' item'}
                                    onClick={(e) => this.selectTab0(e, 'model')}>Model Picking</a>}
              <a className={tabStates0['sharing'] + ' item'} 
                                    onClick={(e) => this.selectTab0(e, 'sharing')}>Project Sharing</a>
              {!isLogProject && <a className={tabStates0['grouping'] + ' item'}
                                    onClick={(e) => this.selectTab0(e, 'grouping')}>Grouping</a>}
              {!isLogProject && <a className={tabStates0['threshold'] + ' item'}
                                    onClick={(e) => this.selectTab0(e, 'threshold')}>Threshold Overrides</a>}
            </div>
            <div className={`ui grid two columns form ${!!this.state.settingLoading ? 'loading' : ''}`}
                 style={{ 'paddingTop': '10px', margin: 0 }}>
              {!isLogProject && <div className={tabStates0['prediction'] + ' ui tab'}>
                <div className="field">
                  <label style={labelStyle}>Prediction Time Window (Hour)</label>
                  <PredictionWindowHour
                    style={{width: 180}}
                    key={data.projectName} value={data.predictionWindow} 
                    onChange={this.handleValueChange('predictionWindow')} />
                </div>
                <Button className="blue"
                        onClick={this.handleSaveProjectSetting.bind(this)}>Update Alert Settings</Button>
              </div>}
              {isLogProject && <div className={tabStates0['logthreshold'] + ' ui tab'}>
                <h3>Clustering Sensitivity</h3>
                <p>
                  This setting controls the sensitivity with which  
                  InsightFinder will cluster logs and detect anomalous 
                  logs. With higher sensitivity, system detects more anomalies. 
                </p>
                <div className="field">
                  <label style={labelStyle}>Anomaly Sensitivity</label>
                  <AnomalyThresholdSensitivity
                    style={{width: 180}}
                    key={data.projectName} value={data.pvalue} text={data.pvalueText}
                    onChange={this.handleValueTextChange('pvalue', 'pvalueText')} />
                </div>
                <div className="field">
                  <label style={labelStyle}>Number of Samples</label>
                  <DurationThreshold
                    style={{width: 180}}
                    key={data.projectName} value={data.cvalue}
                    onChange={this.handleValueChange('cvalue')} />
                </div>
                <h3>Frequency Anomaly Detection Settings</h3>
                <p>
                  Sensitivity: This setting controls sensitivity InsightFinder will 
                  alert on frequency anomaly in given a time window. 
                  With higher sensitivity, system detects more anomalies. 
                </p>
                <div className="field">
                  <AnomalyThresholdSensitivity
                    style={{width: 180}}
                    key={data.projectName} value={data.derivedpvalue} text={data.derivedpvalueText}
                    onChange={this.handleValueTextChange('derivedpvalue', 'derivedpvalueText')} />
                </div>
                <p>
                  Window (minute): This setting controls window in minutes by which frequency are grouped. 
                </p>
                <div className="field">
                  <div className="ui input"
                      style={{width: 180}}>
                    <input type="text"
                      value={tempLogFreqWindow}
                      onChange={this.handleLogFreqWindowChange.bind(this)}/>
                  </div>
                </div>
                <Button className="blue"
                        onClick={this.handleSaveProjectSetting.bind(this)}>Update Alert Settings</Button>
              </div>}
              {!isLogProject && <div className={tabStates0['learning'] + ' ui tab'}>
                <h3>Time-Based Exclusions</h3>
								<p>
									As InsightFinder continuously learns about your 
									environment, you will identify times that reflect
									invalid data that should <i>not</i> be used to 
									identify performance baselines for your systems. 
									These periods may include service windows, scheduled
									or unscheduled downtime, etc.
								</p>
								<p>
									You may specify your timeframe here as either a 
									one-time or recurring period.  Examples include:
								</p>
								<ul>
									<li>Recurring: Every Sunday</li>
									<li>Recurring: Every Saturday 00:00-01:00 GMT</li>
									<li>One-Time: 2016-12-25 02:00-07:00 GMT</li>
								</ul>
								<p>
									If you need assistance or have questions, please contact
									us at support@insightfinder.com.
								</p>
                <div className="field">
                  <div className="ui input">
                    <input key={data.projectName} type="text"
                           value={tempLearningSkippingPeriod}
                           onChange={this.handleLearningSkippingPeriodChange.bind(this)}/>
                  </div>
                </div>
                <div className="wide column">
                  <Button className="blue"
                          onClick={this.handleSaveProjectSetting.bind(this)}>Update Learning Settings</Button>
                </div>
                <br />
                <div className="field">
                  <div className="ui input">
                    <input key={data.projectName} type="text"
                           value={tempDetectionSkippingPeriod}
                           onChange={this.handleDetectionSkippingPeriodChange.bind(this)}/>
                  </div>
                </div>
                <div className="wide column">
                  <Button className="blue"
                          onClick={this.handleSaveProjectSetting.bind(this)}>Update Detection Settings</Button>
                </div>
              </div>}
              {!isLogProject && <div className={tabStates0['alert'] + ' ui tab'}>
                <h3>Dashboard Alert</h3>
                <p>
                  This setting controls the sensitivity with which  
                  InsightFinder will detect and create anomaly events and 
                  display them in the Dashboard. With higher sensitivity, 
                  system detects more anomalies. 
                </p>
                <div className="field">
                  <label style={labelStyle}>Anomaly Sensitivity</label>
                  <AnomalyThresholdSensitivity
                    style={{width: 180}}
                    key={data.projectName} value={data.pvalue} text={data.pvalueText}
                    onChange={this.handleValueTextChange('pvalue', 'pvalueText')} />
                </div>
                <div className="field">
                  <label style={labelStyle}>Number of Samples</label>
                  <DurationThreshold
                    style={{width: 180}}
                    key={data.projectName} value={data.cvalue}
                    onChange={this.handleValueChange('cvalue')} />
                </div>
                <h3>Email Alert</h3>
                <p>
                  This setting controls when InsightFinder will notify you via
                  email and any configured External Service. With higher sensitivity, 
                  system detects more anomalies. 
                </p>
                <div className="field">
                  <label style={labelStyle}>Anomaly Sensitivity</label>
                  <AnomalyThresholdSensitivity
                    style={{width: 180}}
                    key={data.projectName} value={data.emailpvalue} text={data.emailpvalueText}
                    onChange={this.handleValueTextChange('emailpvalue', 'emailpvalueText')} />
                </div>
                <div className="field">
                  <label style={labelStyle}>Number of Samples</label>
                  <DurationThreshold
                    style={{width: 180}}
                    key={data.projectName} value={data.emailcvalue}
                    onChange={this.handleValueChange('emailcvalue')} />
                </div>
                <Button className="blue"
                        onClick={this.handleSaveProjectSetting.bind(this)}>Update Alert Settings</Button>
              </div>}
              <div className={tabStates0['sharing'] + ' ui tab'}>
                <h3>Project Sharing</h3>
								<p>
									If you are collaborating with other users, you may invite
									them to view data associated with your Projects.
								</p>
								<p>
									To share your project, enter their User ID(s) in the 
									field below and click 'Update Sharing Settings'.  Those 
									users will be able to view your project on their next login.
								</p>
                <div className="field">
                  <div className="ui input">
                    <input key={data.projectName} type="text"
                           value={tempSharedUsernames}
                           onChange={this.handleSharingChange.bind(this)}/>
                  </div>
                </div>
                <Button className="blue"
                        onClick={this.handleSaveProjectSetting.bind(this)}>Update Sharing Settings</Button>
              </div>
              {!isLogProject && <div className={tabStates0['threshold'] + ' ui tab'}>
                <h3>Metric Override Thresholds</h3>
								<p>
									<i>Note: This setting is optional and is not required for
									for basic alerting and notifications.</i>
								</p>
								<p>
									If you have a negotiated SLA and would like InsightFinder
									to notify you when that specific threshold value is 
									violated, you may configure that value here.
								</p>
                <table className="ui celled table">
                  <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Unit</th>
                    <th>Normalization Group</th>
                    <th>Alert Threshold</th>
                    <th>No Alert Threshold</th>
                    <th>KPI</th>
                    <th>Custom Metric</th>
                  </tr>
                  </thead>
                  <tbody>
                  {metricSettings.map((setting, index)=> {
                    let smetric = setting.smetric;
                    let pos = smetric.indexOf('/');
                    if(pos!=-1){
                      smetric = smetric.substring(0,pos);
                    }
                    let unit = metricUnitMap[smetric] || "";
                    let pos2 = unit.indexOf('(');
                    let pos3 = unit.indexOf(')');
                    if(pos2!=-1&&pos3!=-1){
                      unit = unit.substring(pos2+1,pos3);
                    }
                    let isCustomMetric = false;
                    if((!$.isNumeric(setting.groupId) || ($.isNumeric(setting.groupId) && parseInt(setting.groupId)<1000)) && unit == ""){
                      // has group id<1000 and not AWS/GAE metrics
                      isCustomMetric = true;
                    }
                    return (
                      <tr key={`${data.projectName}-${index}`}>
                        <td>{setting.smetric}</td>
                        <td>{unit}</td>
                        <td><input value={setting.groupId}
                                   onChange={this.handleMetricSetting(index, 'groupId')}/></td>
                        <td><input value={setting.thresholdAlert}
                                   onChange={this.handleMetricSetting(index, 'thresholdAlert')}/>
                        </td>
                        <td><input value={setting.thresholdNoAlert}
                                   onChange={this.handleMetricSetting(index, 'thresholdNoAlert')}/>
                        </td>
                        <td><input type='checkbox' defaultChecked={setting.isKPI || false}
                                   onChange={this.handleMetricSettingChecked(index, 'isKPI')}/>
                        </td>
                        <td><input type='checkbox' disabled defaultChecked={isCustomMetric}/>
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
                <Button className="blue" onClick={this.handleSaveMetricSetting.bind(this)}>Update Threshold
                  Settings</Button>
              </div>}
              {!isLogProject && <div className={tabStates0['grouping'] + ' ui tab'}>
                <h3>Instance Grouping Settings</h3>
                <Button className="orange" onClick={this.handleAddNewGroupingRule}>Add New</Button>
                <div className='ui vertical segment' style={{ borderBottom: 0}}>
                  <table className="ui celled table grouping-table" style={{ tableLayout: 'fixed' }}>
                    <thead>
                    <tr>
                      <th>Group Name</th>
                      <th>Grouping Criteria</th>
                      <th>Key</th>
                      <th>Value Pattern</th>
                      <th>Separate model</th>
                      <th width="40px"/>
                    </tr>
                    </thead>
                    <tbody>
                    {groupingRules.map((rule, index) => {
                      let matchOpText = self.matchOpMap[rule.matchOp];
                      return (
                        <tr key={`${data.projectName}-${index}`}>
                          <td><input
                            style={{ fontSize: 13 }}
                            value={rule.groupName}
                            onChange={this.handleGroupingRuleInputFieldChanged(rule, 'groupName')} /></td>
                          <td><GroupingCriteriaSelection
                            value={rule.criteria}
                            onChange={this.handleGroupingRuleSelectionFieldChanged(rule, 'criteria')}
                            style={{ width: '100%' }} /></td>
                          <td><GroupingMatchOpSelection
                            value={rule.matchOp}
                            text={matchOpText}
                            onChange={this.handleGroupingRuleSelectionFieldChanged(rule, 'matchOp')}
                            style={{ width: '100%' }} /></td>
                          <td><input
                            style={{ fontSize: 13 }}
                            value={rule.matchValue}
                            onChange={this.handleGroupingRuleInputFieldChanged(rule, 'matchValue')} /></td>
                          <td><GroupingSeperateModelSelection
                            value={rule.seperateModel}
                            onChange={this.handleGroupingRuleSelectionFieldChanged(rule, 'seperateModel')}
                            style={{ width: '100%' }} /></td>
                          <td width="40px">
                            <i
                              className="icon remove" style={{ cursor: 'pointer', fontSize: 14, width: 20 }}
                              onClick={this.handleRemoveGroupingRule(index)}
                            /></td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
                <Button className="blue" onClick={this.handleSaveGroupingRules}>Update Instance
                  Grouping</Button>
              </div>}
              {isLogProject && <div className={tabStates0['episodeword'] + ' ui tab'} style={{ 'paddingTop': '10px' }}>
                <Button className={indexLoading ? "loading blue" : "blue"}
                        onClick={this.handleSaveMapArrSetting.bind(this)}> Submit</Button>
                <div className="ui pointing secondary menu">
                  <a className={tabStates['episode'] + ' item'}
                     onClick={(e) => this.selectTab(e, 'episode')}>Frequent Episode List</a>
                  <a className={tabStates['word'] + ' item'}
                     onClick={(e) => this.selectTab(e, 'word')}>Word List</a>
                </div>
                <div className={tabStates['episode'] + ' ui tab '}>
                  <table className="episode-table ui celled table">
                    <thead>
                    <tr>
                      <th>Pattern</th>
                      <th>Count</th>
                      <th><input type="checkbox" id="checkAllEpisode" defaultChecked="false"
                                 onChange={(e)=>self.setCheckboxAllEpisode(e)}/>Interesting
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {episodeList && episodeList.map((value, index)=> {
                    // .slice(0, 200)
                      return (
                        <tr key={`${data.projectName}-${index}-1`}>
                          <td>{value['pattern']}</td>
                          <td>{value['count']}</td>
                          <td><input type="checkbox" data-id={value['index']} name="indexCheckEpisode"
                                     defaultChecked={value['selected']}
                                     onChange={(e)=>self.getEpisodeIndexNumber(value['index'], e)}/></td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>
                </div>
                <div className={tabStates['word'] + ' ui tab '}>
                  <table className="word-table ui celled table">
                    <thead>
                    <tr>
                      <th>Word</th>
                      <th>Count</th>
                      <th><input type="checkbox" id="checkAllWord" defaultChecked="false"
                                 onChange={(e)=>self.setCheckboxAllWord(e)}/>Interesting
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {wordList && wordList.map((value, index)=> {
                    // .slice(0, 200)
                      return (
                        <tr key={`${data.projectName}-${index}-1`}>
                          <td>{value['pattern']}</td>
                          <td>{value['count']}</td>
                          <td><input type="checkbox" data-id={value['index']} name="indexCheckWord"
                                     defaultChecked={value['selected']}
                                     onChange={(e)=>self.getEpisodeIndexNumber(value['index'], e)}/></td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>
                </div>
              </div>}
              {!isLogProject &&
                <div className={tabStates0['model'] + ' ui tab'} style={{ width: '100%', paddingBottom: 10 }}>
                  <ModelSettings projectName={projectName} instanceGroup={instanceGroup} />
                </div>
              }
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }
}
