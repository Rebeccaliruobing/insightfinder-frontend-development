import React, { Component } from 'react';
import cx from 'classnames';
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
      currentProjectName: null,
      saving: false,
      loading: false,
    };
  }

  componentDidMount() {
    // Get the current project from localstorage and verify it.
    const { projectModelAllInfo } = this.context.dashboardUservalues;
    const names = projectModelAllInfo.map(info => info.projectName);
    const projectName = store.get('liveAnalysisProjectName') || names[0];
    if (projectName) {
      this.handleProjectChange(projectName);
    }
  }

  @autobind
  handleProjectChange(projectName) {
    store.set('liveAnalysisProjectName', projectName);

    const { dashboardUservalues } = this.context;
    const { projectModelAllInfo, projectSettingsAllInfo,
      projectString, sharedProjectString } = dashboardUservalues;

    const project = projectModelAllInfo.find(
      info => info.projectName === projectName);
    const projectSetting = projectSettingsAllInfo.find(
      info => info.projectName === projectName);
    const metricSettings =
      (projectSetting && projectSetting.metricSettings) || [];
    const { cvalue, pvalue, emailcvalue, emailpvalue, filtercvalue, 
      filterpvalue, minAnomalyRatioFilter, sharedUsernames 
    } = project;

    let projectStr = projectString.split(',').map(s => s.split(':')).find(v => v[0] === projectName);
    if (!projectStr) {
      projectStr = sharedProjectString.split(',')
        .map(s => s.split(':'))
        .find(v => `${v[0]}@${v[3]}` === projectName);
    }
    // // 前三部分是名称，数据类型dataType和云类型cloudType
    const dataType = projectStr ? projectStr[1] : null;
    const cloudType = projectStr ? projectStr[2] : '';
    const instanceGrouping = {};

    let projectType = '';
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
      default:
        projectType = `${cloudType}/Agent`;
    }

    this.setState({
      currentProjectName: projectName,
    });
  }

  @autobind
  handleSaveProjectSetting(settings) {
    this.setState({
      saving: true,
    }, () => {
      const { projectName,
        cvalue, pvalue,
        emailcvalue, emailpvalue,
        filtercvalue, filterpvalue,
        minAnomalyRatioFilter,
        sharedUsernames, projectHintMapFilename,
      } = settings;
      const { tempSharedUsernames, data } = this.state;

      apis.postProjectSetting(
        projectName,
        cvalue, pvalue,
        emailcvalue, emailpvalue,
        filtercvalue, filterpvalue,
        minAnomalyRatioFilter,
        tempSharedUsernames,
        projectHintMapFilename)
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
    const { loading, currentProjectName, isLogProject } = this.state;
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
              {this.props.children}
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default ProjectSettings;
