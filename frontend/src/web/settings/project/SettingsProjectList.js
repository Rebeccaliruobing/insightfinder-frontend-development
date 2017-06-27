/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import { autobind } from 'core-decorators';
import { Container, Table, Column, AutoSizer } from '../../../lib/fui/react';
import { BaseUrls } from '../../app/Constants';
import { buildLocation } from '../../../common/utils';
import { appMenusMessages } from '../../../common/app/messages';
import { settingsMessages } from '../../../common/settings/messages';
import { hideAppLoader, showAppAlert } from '../../../common/app/actions';
import { State } from '../../../common/types';

type Props = {
  intl: Object,
  projects: Array<Object>,
  push: Function,
  hideAppLoader: Function,
  showAppAlert: Function,
};

class SettingsProjectListCore extends React.Component {
  props: Props;

  componentDidMount() {
    const { projects, push, hideAppLoader, showAppAlert } = this.props;
    if (projects.length === 0) {
      showAppAlert('info', settingsMessages.alertNoProject);
      push(BaseUrls.SettingsProjectWizard);
    } else {
      hideAppLoader();
    }
  }

  @autobind handleProjectClick({ rowData: project }) {
    const { push } = this.props;
    push(
      buildLocation(BaseUrls.SettingsProject, {
        projectName: project.projectName,
      }),
    );
  }

  render() {
    const { intl, projects } = this.props;

    return (
      <Container fullHeight withGutter className="flex-col">
        <Container breadcrumb>
          <div className="section">
            <NavLink to={BaseUrls.SettingsProjectList}>
              <span className="label">{intl.formatMessage(appMenusMessages.settings)}</span>
            </NavLink>
            <span className="divider">/</span>
            <span>Projects</span>
          </div>
          <div className="section" style={{ fontSize: 12, marginLeft: 40 }}>
            <NavLink to={BaseUrls.SettingsProjectWizard}>
              <div className="ui orange button">Add New Project...</div>
            </NavLink>
          </div>
        </Container>
        <Container
          fullHeight
          className="overflow-y-auto"
          style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
        >
          <AutoSizer>
            {({ width, height }) => (
              <Table
                className="with-border"
                width={width}
                height={height}
                headerHeight={40}
                rowHeight={40}
                rowCount={projects.length}
                rowGetter={({ index }) => projects[index]}
                onRowClick={this.handleProjectClick}
              >
                <Column width={240} label="Name" dataKey="projectName" />
                <Column width={120} label="Project Type" dataKey="projectType" />
                <Column width={240} label="Cloud Type" dataKey="cloudType" />
                <Column width={240} label="Data Type" dataKey="dataType" />
                <Column width={120} label="Status" dataKey="status" />
                <Column width={120} label="Owner" dataKey="owner" />
                <Column width={240} flexGrow={1} label="Description" dataKey="desc" />
              </Table>
            )}
          </AutoSizer>
        </Container>
      </Container>
    );
  }
}

const SettingsProjectList = injectIntl(SettingsProjectListCore);

export default connect(
  (state: State) => {
    const { projects } = state.app;
    return { projects };
  },
  { push, hideAppLoader, showAppAlert },
)(SettingsProjectList);
