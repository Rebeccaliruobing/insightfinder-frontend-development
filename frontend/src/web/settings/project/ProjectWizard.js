/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import R from 'ramda';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import VLink from 'valuelink';
import { autobind } from 'core-decorators';

import { Container, Box, Input } from '../../../lib/fui/react';
import { BaseUrls } from '../../app/Constants';
import { appMenusMessages } from '../../../common/app/messages';
import { projectWizardMessages } from '../../../common/settings/messages';
import { hideAppLoader } from '../../../common/app/actions';
import { DataSourceSelector, dataSourcesMetadata } from './dataSource';
import { State } from '../../../common/types';

type Props = {
  intl: Object,
  push: Function,
  projects: Array<Object>,
  hideAppLoader: Function,
};

type States = {
  projectName: string,
  description: string,
  sharedUsers: string,
  currentStep: number,
  selectedDataSources: Array<string>,
  configuredDataSources: Array<string>,
  currentDataSourceName: string,
};

class ProjectWizardCore extends React.Component {
  props: Props;
  state: States = {
    projectName: '',
    description: '',
    sharedUsers: '',
    currentStep: 1,
    selectedDataSources: [],
    configuredDataSources: [],
  };

  componentDidMount() {
    const { hideAppLoader } = this.props;
    hideAppLoader();
  }

  @autobind handleStep1CreateClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      currentStep: 2,
    });
  }

  @autobind handleStep2SkipClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      currentStep: 4,
      selectedDataSources: [],
      configuredDataSources: [],
    });
  }

  @autobind handleStep2SelectedClick(e) {
    e.preventDefault();
    e.stopPropagation();

    // If there are some data sources not be configured, will select the first unconfigured one.
    // Otherwise, select the first data source.
    const { selectedDataSources, configuredDataSources } = this.state;
    const diff = R.difference(selectedDataSources, configuredDataSources);
    const currentDataSourceName = diff.length > 0 ? diff[0] : selectedDataSources[0] || null;
    this.setState({
      currentStep: 3,
      currentDataSourceName,
    });
  }

  @autobind handleStep3AddMoreClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      currentDataSourceName: null,
      currentStep: 2,
    });
  }

  @autobind handleStep3DataSourceClick(name) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.setState({
        currentDataSourceName: name,
      });
    };
  }

  @autobind handleStep3RemoveClick(name) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      let { selectedDataSources } = this.state;
      const index = R.findIndex(d => d === name, selectedDataSources);
      if (index >= 0) {
        selectedDataSources = R.remove(index, 1, selectedDataSources);
        // Get the next data source in the list to display
        const currentDataSourceName = selectedDataSources[index] || selectedDataSources[0] || null;

        this.setState({
          selectedDataSources,
          currentDataSourceName,
        });
      }
    };
  }

  @autobind handleStep3MarkCompletedClick(name) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const { configuredDataSources } = this.state;
      this.setState({
        configuredDataSources: [...configuredDataSources, name],
      });
    };
  }

  @autobind handleStep3ConfiguredClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      currentStep: 4,
    });
  }

  @autobind handleCompleteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.push('/settings/projects');
  }

  renderStep1() {
    const { intl, projects } = this.props;
    const projectNameLink = VLink.state(this, 'projectName')
      .check(x => Boolean(x), 'Project name is required')
      .check(
        name => !R.find(p => p.projectName.toLowerCase(0) === name.toLowerCase(), projects),
        'Project name already exists, please use another one',
      )
      .check(
        name => !/[\s_:@,]/g.test(name),
        'Project name cannot contains special characters: _ : @ , or space.',
      );

    const descriptionLink = VLink.state(this, 'description');
    const sharedUsersLink = VLink.state(this, 'sharedUsers');
    const valid = !projectNameLink.error;

    return (
      <Box style={{ height: '100%' }}>
        <div className="ui form" style={{ width: 980 }}>
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(projectWizardMessages.step1Introduction),
            }}
          />
          <div className="inline field required">
            <label>Project Name:</label>
            <Input valueLink={projectNameLink} />
          </div>
          <div className="inline field">
            <label>Description: (Optional)</label>
            <Input valueLink={descriptionLink} />
          </div>
          <div className="inline field" style={{ display: 'none' }}>
            <label>Sharing: (Optional)</label>
            <Input valueLink={sharedUsersLink} />
            <div className="desc">
              To share your project, enter their User ID(s) in the above field.
            </div>
          </div>
          <div className="inline field text-right">
            <div
              className={`ui orange button ${valid ? '' : 'disabled'}`}
              {...(valid ? { onClick: this.handleStep1CreateClick } : {})}
            >
              Create Project
            </div>
          </div>
        </div>
      </Box>
    );
  }

  renderStep2() {
    const { intl } = this.props;
    const { selectedDataSources, configuredDataSources } = this.state;
    const valid = selectedDataSources.length > 0;
    const skipable = configuredDataSources.length === 0;
    return (
      <Box style={{ height: '100%' }}>
        <div className="ui form flex-col" style={{ width: 960, height: '100%' }}>
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(projectWizardMessages.step2Introduction),
            }}
          />
          <DataSourceSelector
            className="flex-grow"
            intl={intl}
            radioMode
            selectedDataSources={selectedDataSources}
            configuredDataSources={configuredDataSources}
            onSelectionChange={ds =>
              this.setState({
                selectedDataSources: ds,
              })}
          />
          <div className="inline field text-right">
            <div
              className={`ui grey button ${skipable ? '' : 'disabled'}`}
              style={{ display: 'none' }}
              onClick={this.handleStep2SkipClick}
            >
              Skip
            </div>
            <div
              className={`ui orange button ${valid ? '' : 'disabled'}`}
              {...(valid ? { onClick: this.handleStep2SelectedClick } : {})}
            >
              Selected
            </div>
          </div>
        </div>
      </Box>
    );
  }

  renderStep3() {
    const { intl } = this.props;
    const { selectedDataSources, configuredDataSources, currentDataSourceName } = this.state;
    const valid =
      configuredDataSources.length > 0 &&
      selectedDataSources.length === configuredDataSources.length;

    // Get the data source component of the current name.
    let currentDataSourceComponent = null;
    let currentDataSourceConfigured = false;
    let currentDataSourceConfigManually = false;

    if (currentDataSourceName) {
      const dataSource = R.find(d => d[0] === currentDataSourceName, dataSourcesMetadata);
      if (dataSource) {
        currentDataSourceComponent = dataSource[3];
        currentDataSourceConfigManually = dataSource[4];
      }
      currentDataSourceConfigured = !!R.find(
        d => d === currentDataSourceName,
        configuredDataSources,
      );
    }

    return (
      <Box style={{ height: '100%' }}>
        <div className="ui form flex-col" style={{ width: 960, height: '100%' }}>
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(projectWizardMessages.step3Introduction),
            }}
          />
          <div className="flex-row flex-grow">
            <div className="overflow-y-auto">
              <div className="ui vertical secondary pointing menu">
                {R.map((d) => {
                  const selected = currentDataSourceName === d;
                  const configured = !!R.find(c => c === d, configuredDataSources);
                  return (
                    <div
                      key={d}
                      className={`${selected ? 'active ' : ''}item`}
                      onClick={this.handleStep3DataSourceClick(d)}
                    >
                      <span>{d}</span>
                      {configured && <i className="checkmark icon" />}
                    </div>
                  );
                }, selectedDataSources)}
              </div>
            </div>
            <div className="flex-col flex-grow" style={{ marginLeft: '1em' }}>
              {currentDataSourceName &&
                !currentDataSourceConfigured &&
                <div className="text-right" style={{ marginBottom: '0.5em' }}>
                  <div
                    className="ui small grey button"
                    onClick={this.handleStep3RemoveClick(currentDataSourceName)}
                  >
                    Remove this Data Source
                  </div>
                </div>}
              {currentDataSourceComponent &&
                <div className="overflow-y-auto flex-grow">
                  {React.createElement(currentDataSourceComponent, { intl })}
                  {!currentDataSourceConfigured &&
                    currentDataSourceConfigManually &&
                    <div className="inline fiel text-right">
                      <div
                        className="ui small blue button"
                        onClick={this.handleStep3MarkCompletedClick(currentDataSourceName)}
                      >
                        Mark Completed
                      </div>
                    </div>}
                </div>}
            </div>
          </div>
          <div className="inline field text-right">
            <div className="ui grey button" onClick={this.handleStep3AddMoreClick}>
              Select Data Source
            </div>
            <div
              className={`ui orange button ${valid ? '' : 'disabled'}`}
              {...(valid ? { onClick: this.handleStep3ConfiguredClick } : {})}
            >
              Configured
            </div>
          </div>
        </div>
      </Box>
    );
  }

  renderStep4() {
    const { intl } = this.props;
    return (
      <Box style={{ height: '100%' }}>
        <div className="ui form flex-col" style={{ width: 960, height: '100%' }}>
          <div
            className="text"
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage(projectWizardMessages.step4Introduction),
            }}
          />
          <div className="inline field text-right">
            <div className="ui orange button" onClick={this.handleCompleteClick}>Finished</div>
          </div>
        </div>
      </Box>
    );
  }

  render() {
    const { intl } = this.props;
    const { currentStep, selectedDataSources, configuredDataSources } = this.state;

    // Function used to set className for each step.
    const stepState = (step, currentStep) => {
      if (currentStep === step) {
        return 'active';
      }
      return currentStep > step ? 'completed' : '';
    };

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
            <div className={`${stepState(1, currentStep)} step`}>
              <div className="content">
                <div className="title">Create Project</div>
                <div className="description">Choose name and sharing users</div>
              </div>
            </div>
            <div className={`${stepState(2, currentStep)} step`}>
              <div className="content">
                <div className="title">
                  <span>Data Source</span>
                  {selectedDataSources.length > 0 &&
                    <span className="ui grey mini circular label">
                      {selectedDataSources.length}
                    </span>}
                </div>
                <div className="description">Select data sources for project</div>
              </div>
            </div>
            <div className={`${stepState(3, currentStep)} step`}>
              <div className="content">
                <div className="title">
                  <span>Configure</span>
                  {configuredDataSources.length > 0 &&
                    <span className="ui orange mini circular label">
                      {configuredDataSources.length}
                    </span>}
                </div>
                <div className="description">Settings for the data source</div>
              </div>
            </div>
            <div className={`${stepState(4, currentStep)} step`}>
              <div className="content">
                <div className="title">Finish</div>
                <div className="description">Go to advanced settings</div>
              </div>
            </div>
          </div>
        </Container>
        <Container
          fullHeight
          className="overflow-y-auto wizard"
          style={{ paddingTop: '1px', paddingBottom: '0.5em' }}
        >
          {currentStep === 1 && this.renderStep1()}
          {currentStep === 2 && this.renderStep2()}
          {currentStep === 3 && this.renderStep3()}
          {currentStep === 4 && this.renderStep4()}
        </Container>
      </Container>
    );
  }
}

const ProjectWizard = injectIntl(ProjectWizardCore);
export default connect(
  (state: State) => {
    const { projects } = state.app;
    return { projects };
  },
  { push, hideAppLoader },
)(ProjectWizard);
