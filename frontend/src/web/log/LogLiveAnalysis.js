import React from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import { injectIntl } from 'react-intl';
import { autobind } from 'core-decorators';
import { Container, Select } from '../../lib/fui/react';
import { appFieldsMessages } from '../../common/app/messages';
import { State } from '../../common/types';
import { hideAppLoader, showPageLoader, hidePageLoader } from '../../common/app/actions';
import { loadLogStreaming, setLogStreamingSelection } from '../../common/log/actions';

type Props = {
  projects: Array<Object>,
  currentProject: ?Object,
  logs: Array<Object>,
  currentLog: ?Object,
  intl: Object,
  match: Object,
  hideAppLoader: Function,
  showPageLoader: Function,
  hidePageLoader: Function,
  loadLogStreaming: Function,
  setLogStreamingSelection: Function,
};

class LogLiveAnalysisCore extends React.Component {
  props: Props;

  componentDidMount() {
    const { projectName, logName } = this.props.match.params;
    this.props.loadLogStreaming(projectName, logName);
  }

  @autobind
  handleProjectChange(newValue) {
    const { setLogStreamingSelection, currentLog } = this.props;
    const project = newValue ? newValue.value : null;
    setLogStreamingSelection(project, currentLog);
  }

  render() {
    const { intl, projects, currentProject, logs, currentLog } = this.props;
    if (currentLog) {
    }

    return (
      <Container fullHeight withGutter>
        <Container toolbar>
          <div className="section">
            <span className="label">{intl.formatMessage(appFieldsMessages.project)}</span>
            <Select
              name="project" style={{ width: 100 }}
              options={projects}
              value={currentProject} onChange={this.handleProjectChange}
            />
          </div>
        </Container>
      </Container>
    );
  }
}

const LogLiveAnalysis = injectIntl(LogLiveAnalysisCore);
export default connect(
  (state: State) => {
    const { streamingProjects: projects,
      currentStreamingProject: projectName } = state.log;
    const currentProject = R.find(p => p.name === projectName, projects);
    return {
      projects,
      currentProject,
    };
  },
  {
    hideAppLoader,
    showPageLoader, hidePageLoader,
    loadLogStreaming, setLogStreamingSelection,
  },
)(LogLiveAnalysis);
