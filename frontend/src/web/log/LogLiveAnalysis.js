import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import R from 'ramda';
import { injectIntl } from 'react-intl';
import { autobind } from 'core-decorators';
import { push } from 'react-router-redux';
import { Container, Select } from '../../lib/fui/react';
import { appFieldsMessages } from '../../common/app/messages';
import { State } from '../../common/types';
import { loadLogStreaming } from '../../common/log/actions';

type Props = {
  projects: Array<Object>,
  streamingInfos: Object,
  currentProjectId: ?string,
  currentLogId: ?string,
  intl: Object,
  match: Object,
  loadLogStreaming: Function,
};

class LogLiveAnalysisCore extends React.PureComponent {
  props: Props;

  componentDidMount() {
    const { logId } = this.props.match.params;
    const { projects } = this.props;
    let { projectId } = this.props.match.params;
    if (!projectId) {
      projectId = (projects[0] || {}).name || null;
    }
    this.props.loadLogStreaming(projectId, logId);
  }

  @autobind
  handleProjectChange(newValue) {
    const projectId = newValue ? newValue.value : null;
    this.props.loadLogStreaming(projectId, null);
  }

  render() {
    const { intl, projects, streamingInfos, currentProjectId, currentLogId } = this.props;
    const projectInfo = get(streamingInfos, currentProjectId, {});
    const logInfo = get(projectInfo, currentLogId, null);

    return (
      <Container fullHeight withGutter>
        <Container toolbar>
          <div className="section">
            <span className="label">{intl.formatMessage(appFieldsMessages.project)}</span>
            <Select
              name="project" style={{ width: 100 }}
              options={R.map(p => ({ label: p.name, value: p.name }), projects)}
              value={currentProjectId} onChange={this.handleProjectChange}
            />
            {logInfo && <span>{currentLogId}</span>}
          </div>
        </Container>
      </Container>
    );
  }
}

const LogLiveAnalysis = injectIntl(LogLiveAnalysisCore);
export default connect(
  (state: State) => {
    const {
      currentStreamingProject: currentProjectId,
      currentStreamingLog: currentLogId,
      streamingInfos,
    } = state.log;
    return {
      projects: R.filter(p => p.hasLogData, state.app.projects),
      currentProjectId,
      currentLogId,
      streamingInfos,
    };
  },
  {
    push, loadLogStreaming,
  },
)(LogLiveAnalysis);
