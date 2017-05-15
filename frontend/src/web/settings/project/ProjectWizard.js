import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import { Container, Box } from '../../../lib/fui/react';
import { BaseUrls } from '../../app/Constants';
import { appMenusMessages } from '../../../common/app/messages';
import { hideAppLoader } from '../../../common/app/actions';
import { State } from '../../../common/types';

type Props = {
  intl: Object,
  hideAppLoader: Function,
};

class ProjectWizardCore extends React.Component {
  props: Props;

  componentDidMount() {
    const { hideAppLoader } = this.props;
    hideAppLoader();
  }

  render() {
    const { intl } = this.props;
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
            <span>Add New Project...</span>
          </div>
        </Container>
        <Container
          fullHeight className="overflow-y-auto"
          style={{ paddingTop: '1em', paddingBottom: '1em' }}
        >
          <Box style={{ minHeight: '100%' }}>Project Wizard</Box>
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
