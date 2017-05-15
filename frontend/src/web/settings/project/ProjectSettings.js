import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import { Container, Box } from '../../../lib/fui/react';
import { BaseUrls } from '../../app/Constants';
import { buildUrl } from '../../../common/utils';
import { appMenusMessages } from '../../../common/app/messages';
import { hideAppLoader } from '../../../common/app/actions';
import { State } from '../../../common/types';

type Props = {
  intl: Object,
  match: Object,
  hideAppLoader: Function,
};

class ProjectSettingsCore extends React.Component {
  props: Props;

  componentDidMount() {
    const { hideAppLoader } = this.props;
    hideAppLoader();
  }

  render() {
    const { intl, match } = this.props;
    const { projectId } = match.params;

    return (
      <Container fullHeight withGutter className="flex-col">
        <Container breadcrumb>
          <div className="section">
            <NavLink to={BaseUrls.Settings}>
              <span className="label">{intl.formatMessage(appMenusMessages.settings)}</span>
            </NavLink>
            <span className="divider">/</span>
            <NavLink to={BaseUrls.SettingsProjectList}>
              <span className="label">Projects</span>
            </NavLink>
            <span className="divider">/</span>
            <span>{projectId}</span>
          </div>
          <div className="section float-right">
            <NavLink to={BaseUrls.ProjectWizard}>
              <div className="ui orange button">Add New Project...</div>
            </NavLink>
          </div>
        </Container>
        <Container
          fullHeight className="overflow-y-auto"
          style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}
        >
          <Box style={{ minHeight: '100%' }}>Project Setting</Box>
        </Container>
      </Container>
    );
  }
}

const ProjectSettings = injectIntl(ProjectSettingsCore);

export default connect(
  (state: State) => {
    const { projects } = state.app;
    return {
      projects,
    };
  },
  {
    push, hideAppLoader,
  },
)(ProjectSettings);
