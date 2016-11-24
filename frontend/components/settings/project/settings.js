import React, { Component } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import { autobind } from 'core-decorators';
import { Console, Link } from '../../../artui/react/index';

import apis from '../../../apis';

import {
  ProjectSelection,
} from '../../selections';

class ProjectSettings extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
    root: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      currentProjectName: null,
      loading: false,
    };
  }

  componentDidMount() {
    // TODO: Set the currentProjectName from store or first one.
  }

  @autobind
  handleProjectChange(name) {
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
