import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import VLink from 'valuelink';
import { Container, Box, Input } from '../../../lib/fui/react';
import { BaseUrls } from '../../app/Constants';
import { appMenusMessages } from '../../../common/app/messages';
import { hideAppLoader } from '../../../common/app/actions';
import { State } from '../../../common/types';

type Props = {
  intl: Object,
  hideAppLoader: Function,
};

type States = {
  projectName: string,
}

class ProjectWizardCore extends React.Component {
  props: Props;
  state: States = {
    projectName: '',
  }

  componentDidMount() {
    const { hideAppLoader } = this.props;
    hideAppLoader();
  }

  render() {
    const { intl } = this.props;
    const projectNameLink = VLink.state(this, 'projectName');

    return (
      <Container fullHeight withGutter className="flex-col settings">
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
            <span>Add New Project...</span>
          </div>
        </Container>
        <Container style={{ marginTop: '0.5em' }}>
          <div className="ui ordered steps">
            <div className="active step">
              <div className="content">
                <div className="title">Basic Information</div>
                <div className="description">Set project name and users</div>
              </div>
            </div>
            <div className="step">
              <div className="content">
                <div className="title">Data Sources</div>
                <div className="description">Choose and config data source</div>
              </div>
            </div>
            <div className="step">
              <div className="content">
                <div className="title">Submit</div>
                <div className="description">Submit</div>
              </div>
            </div>
          </div>
        </Container>
        <Container
          fullHeight className="overflow-y-auto wizard"
          style={{ paddingTop: '1px', paddingBottom: '0.5em' }}
        >
          <Box style={{ minHeight: '100%' }}>
            <div className="ui form" style={{ width: 608 }}>
              <div className="inline field required">
                <div className="label">Project Name:</div>
                <Input valueLink={projectNameLink} />
              </div>
              <div className="inline field">
                <div className="label">Description:</div>
                <Input valueLink={projectNameLink} />
              </div>
              <div className="inline field">
                <div className="label">Sharing:</div>
                <Input valueLink={projectNameLink} />
                <div className="desc">
                If you are collaborating with other users, you may invite them to view data associated with your Projects.
                </div>
              </div>
              <div className="inline field">
                <div className="ui orange button">Next</div>
              </div>
            </div>
          </Box>
        </Container>
      </Container>
    );
  }
}

const ProjectWizard = injectIntl(ProjectWizardCore);
export default connect(
  (state: State) => {
    return {};
  },
  {
    push, hideAppLoader,
  },
)(ProjectWizard);
