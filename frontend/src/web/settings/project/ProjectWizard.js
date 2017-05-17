import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import VLink from 'valuelink';
import R from 'ramda';
import { autobind } from 'core-decorators';
import { Container, Box, Input } from '../../../lib/fui/react';
import { BaseUrls } from '../../app/Constants';
import { appMenusMessages } from '../../../common/app/messages';
import { projectWizardMessages } from '../../../common/settings/messages';
import { hideAppLoader } from '../../../common/app/actions';
import { dataSourcesMetadata } from './dataSource';
import { State } from '../../../common/types';

type Props = {
  intl: Object,
  hideAppLoader: Function,
};

type States = {
  projectName: string,
  description: string,
  sharedUsers: string,
  dataSourceName: string,
  currentStep: number,
  currentDataSourceType: string,
  currentDataSourceComponent: any,
}

class ProjectWizardCore extends React.Component {
  props: Props;
  state: States = {
    projectName: '',
    description: '',
    sharedUsers: '',
    dataSourceName: '',
    currentStep: 1,
  }

  constructor(props) {
    super(props);

    // Use deep tuple to create group => [ datasource, ] array.
    this.dataSourcesMetadataByGroup = R.map((group) => {
      const dataSources = R.filter(([name, gname]) => {
        return gname.toLowerCase() === group.toLowerCase();
      }, dataSourcesMetadata);
      return [group, dataSources];
    }, ['Public Cloud', 'Insight Agent']);
  }

  componentDidMount() {
    const { hideAppLoader } = this.props;
    hideAppLoader();
  }

  @autobind
  setNextStep(step) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.setState({
        currentStep: step,
      });
    };
  }

  @autobind
  handleDataSourceClick(name, component) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.setState({
        currentDataSourceType: name,
        currentDataSourceComponent: component,
      });
    };
  }

  @autobind
  handleSubmit() {
    console.log('submit');
  }

  renderStep1() {
    const projectNameLink = VLink.state(this, 'projectName')
      .check(x => x, 'Project Name is required');
    const descriptionLink = VLink.state(this, 'description');
    const sharedUsersLink = VLink.state(this, 'sharedUsers');
    const inputsValid = !projectNameLink.error;

    return (
      <Box style={{ height: '100%' }}>
        <div className="ui form" style={{ width: 600 }}>
          <div>
            If you are collaborating with other users, you may invite them to view data associated with your Projects.
        </div>
          <div className="inline field required">
            <label>Project Name:</label>
            <Input valueLink={projectNameLink} />
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
            <div
              className={`ui orange button ${inputsValid ? '' : 'disabled'}`}
              {...inputsValid ? { onClick: this.setNextStep(2) } : {}}
            >Next</div>
          </div>
        </div>
      </Box>
    );
  }

  renderStep2() {
    const { intl } = this.props;
    const { currentDataSourceComponent } = this.state;
    const inputsValid = true;
    return (
      <Box style={{ height: '100%' }}>
        <div className="ui form flex-col" style={{ width: 960, height: '100%' }}>
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(projectWizardMessages.step2Introduction),
            }}
          />
          <div className="flex-row">
            <div className="overflow-y-auto">
              <div className="ui vertical secondary pointing menu">
                <div className="menu">
                  {
                    // Create header item for group and item for each data source
                    R.map(c => c, R.reduce((acc, [group, dss]) => {
                      // Data structure [group, [[name, group, component]]]
                      acc.push((<div key={group} className="header item">{group}</div>));

                      R.forEach(([name, g, component]) => {
                        acc.push((<a
                          key={`${g}-${name}`}
                          className="item"
                          onClick={this.handleDataSourceClick(name, component)}
                        >{name}</a>));
                      }, dss);
                      return acc;
                    }, [], this.dataSourcesMetadataByGroup))
                  }
                </div>
              </div>
            </div>
            <div className="overflow-y-auto flex-grow" style={{ marginLeft: '1em' }}>
              <div>
                {!!currentDataSourceComponent && React.createElement(currentDataSourceComponent)}
              </div>
            </div>
          </div>
          <div className="inline field text-right">
            <div
              style={{ float: 'left' }} className="ui button"
              onClick={this.setNextStep(1)}
            >Back</div>
            <div className="ui button" onClick={this.setNextStep(3)}>Skip</div>
            <div
              className={`ui orange button ${inputsValid ? '' : 'disabled'}`}
              {...inputsValid ? { onClick: this.setNextStep(3) } : {}}
            >Next</div>
          </div>
        </div>
      </Box>
    );
  }

  renderStep3() {
    return (
      <Box style={{ height: '100%' }}>
        <div className="ui form" style={{ width: 800 }}>
          <div className="ui info message">
            Project will be created with the following information.
          <br />
            If you have choose a data source, it might take several minutes for the agent to collect
          the data, please go to project setting to check the status.
        </div>
          <div className="inline field text-right">
            <div
              style={{ float: 'left' }} className="ui button"
              onClick={this.setNextStep(2)}
            >Back</div>
            <div className="ui orange button" onClick={this.handleSubmit}>Submit</div>
          </div>
        </div>
      </Box>
    );
  }

  render() {
    const { intl } = this.props;
    const { currentStep } = this.state;

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
            <div className={`${currentStep === 1 ? 'active' : 'completed'} step`}>
              <div className="content">
                <div className="title">Create Project</div>
                <div className="description">Choose name and users</div>
              </div>
            </div>
            <div
              className={`${currentStep === 2 ? 'active' :
                (currentStep > 2 ? 'completed' : '')} step`}
            >
              <div className="content">
                <div className="title">Data Source</div>
                <div className="description">Choose and add data source</div>
              </div>
            </div>
            <div className={`${currentStep === 3 ? 'active' : ''} step`}>
              <div className="content">
                <div className="title">Finish</div>
                <div className="description">Advanced Settings</div>
              </div>
            </div>
          </div>
        </Container>
        <Container
          fullHeight className="overflow-y-auto wizard"
          style={{ paddingTop: '1px', paddingBottom: '0.5em' }}
        >
          {currentStep === 1 && this.renderStep1()}
          {currentStep === 2 && this.renderStep2()}
          {currentStep === 3 && this.renderStep3()}
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
