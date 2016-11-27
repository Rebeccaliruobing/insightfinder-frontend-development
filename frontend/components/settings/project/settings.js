import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import store from 'store';
import { autobind } from 'core-decorators';
import { Console, Link } from '../../../artui/react/index';

import apis from '../../../apis';

import {
  ProjectSelection,
} from '../../selections';

class ProjectSettings extends Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object,
    root: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentProjectName: store.get('liveAnalysisProjectName', null),
      saving: false,
      loading: false,
    };
  }

  componentDidMount() {
    // Get the current project from localstorage and use it as current project
    // if it still exists, otherwise use the first project in the list.
    const { projectModelAllInfo } = this.context.dashboardUservalues;
    const names = projectModelAllInfo.map(info => info.projectName);
    let projectName = store.get('liveAnalysisProjectName');
    if (!_.find(names, projectName)) {
      projectName = names.length > 0 ? names[0] : null;
    }

    if (projectName) {
      this.handleProjectChange(projectName);
    }
  }

  getProjectInfo(projectName) {
    const { dashboardUservalues } = this.context;
    const { projectModelAllInfo, projectSettingsAllInfo,
      projectString, sharedProjectString, metricUnitMapping } = dashboardUservalues;

    const modelInfo = projectModelAllInfo.find(i => i.projectName === projectName);
    const settings = projectSettingsAllInfo.find(i => i.projectName === projectName);
    const projectInfo = Object.assign({}, modelInfo, settings);

    if (!projectInfo.metricSettings) {
      projectInfo.metricSettings = [];
    }

    let projectStr = projectString.split(',').map(s => s.split(':')).find(v => v[0] === projectName);
    if (!projectStr) {
      projectStr = sharedProjectString.split(',').map(s => s.split(':')).find(v => `${v[0]}@${v[3]}` === projectName);
    }
    projectInfo.dataType = projectStr ? projectStr[1] : '';
    projectInfo.cloudType = projectStr ? projectStr[2] : '';
    projectInfo.isLogProject = projectInfo.fileProjectType === 0;

    const metricUnitMap = {};
    if (metricUnitMapping) {
      JSON.parse(metricUnitMapping).forEach((item) => {
        metricUnitMap[item.metric] = item.unit;
      });
    }

    projectInfo.metricUnitMap = metricUnitMap;

    return projectInfo;
  }

  @autobind
  handleProjectChange(projectName) {
    store.set('liveAnalysisProjectName', projectName);

    const projectInfo = this.getProjectInfo(projectName);

    this.setState({
      currentProjectName: projectName,
      currentProjectInfo: projectInfo,
      isLogProject: projectInfo.isLogProject,
    });
  }

  @autobind
  handleSaveProjectInfo(changes) {
    const { currentProjectInfo } = this.state;
    const info = Object.assign({}, _.cloneDeep(currentProjectInfo), changes);

    this.setState({
      saving: true,
    }, () => {
      // Submit to server
      apis.postProjectSetting(
        info.projectName,
        info.cvalue, info.pvalue,
        info.emailcvalue, info.emailpvalue,
        info.filtercvalue, info.filterpvalue,
        info.minAnomalyRatioFilter,
        info.tempSharedUsernames,
        info.projectHintMapFilename)
        .then((resp) => {
          if (!resp.success) {
            window.alert(resp.message);
          }
          this.setState({
            saving: false,
          }, this.context.root.loadData);
        });
    });
  }

  render() {
    const { loading, currentProjectName, isLogProject, currentProjectInfo } = this.state;
    return (
      <Console.Content className={loading ? 'ui form loading' : ''}>
        <div className="ui main tiny container">
          <div className="ui right aligned vertical inline segment" style={{ zIndex: 200 }}>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <ProjectSelection
                value={currentProjectName} style={{ minWidth: 200 }}
                onChange={this.handleProjectChange}
              />
            </div>
          </div>
          <div className="ui vertical segment">
            <div className="ui pointing secondary menu">
              {!isLogProject &&
                <Link className="item" to="/settings/data-disqualifiers">Data Disqualifiers</Link>
              }
              {!isLogProject &&
                <Link className="item" to="/settings/alert-sensitivity">Alert Sensitivity</Link>
              }
              <Link className="item" to="/settings/data-sharing">Data Sharing</Link>
              {!isLogProject &&
                <Link className="item" to="/settings/grouping">Grouping</Link>
              }
              {!isLogProject &&
                <Link className="item" to="/settings/threshold">Threshold Overrides</Link>
              }
              {isLogProject &&
                <Link className="item" to="/settings/log-analysis">Log Analysis</Link>
              }
            </div>
            <div 
              className={cx('ui grid two columns form', loading ? 'loading' : '')}
              style={{ paddingTop: 10 }}
            >
              {React.cloneElement(this.props.children, {
                projectInfo: currentProjectInfo || {},
                saveProjectInfo: this.handleSaveProjectInfo,
              })}
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default ProjectSettings;
