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
  name: string,
  description: string,
  sharedUsers: string,
}

class ProjectWizardCore extends React.Component {
  props: Props;
  state: States = {
    name: null,
    description: null,
    sharedUsers: null,
  }

  componentDidMount() {
    const { hideAppLoader } = this.props;
    hideAppLoader();
  }

  render() {
    const { intl } = this.props;
    const nameLink = VLink.state(this, 'name')
      .check(x => x, 'Project Name is required');
    const descriptionLink = VLink.state(this, 'description');
    const sharedUsersLink = VLink.state(this, 'sharedUsers');

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
            <div className="ui form" style={{ width: 600 }}>
              <div className="ui info message">
                If you are collaborating with other users, you may invite them to view data associated with your Projects.
              </div>  
              <div className="inline field required">
                <label>Project Name:</label>
                <Input valueLink={nameLink} />
              </div>
              <div className="inline field">
                <label>Description:</label>
                <Input valueLink={descriptionLink} />
              </div>
              <div className="inline field">
                <label>Sharing:</label>
                <Input valueLink={sharedUsersLink} />
                <div className="desc">
                To share your project, enter their User ID(s) in the above field.
                </div>
              </div>
              <div className="inline field text-right">
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
