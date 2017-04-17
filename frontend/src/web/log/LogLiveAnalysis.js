import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import R from 'ramda';
import { injectIntl } from 'react-intl';
import { autobind } from 'core-decorators';
import { push } from 'react-router-redux';
import { Container, Select } from '../../lib/fui/react';
import { appFieldsMessages, appMenusMessages } from '../../common/app/messages';
import { State } from '../../common/types';
import { loadLogStreaming } from '../../common/log/actions';

type Props = {
  projects: Array<Object>,
  streamingInfos: Object,
  intl: Object,
  match: Object,
  loadLogStreaming: Function,
};

class LogLiveAnalysisCore extends React.PureComponent {
  props: Props;

  componentDidMount() {
    const { projectId, instanceId } = this.props.match.params;
    this.props.loadLogStreaming(projectId, instanceId, this.props.match);
  }

  @autobind
  handleProjectChange(newValue) {
    const { match } = this.props;
    const projectId = newValue ? newValue.value : null;
    this.props.loadLogStreaming(projectId, null, match, true);
  }

  render() {
    const { intl, projects, streamingInfos, match } = this.props;
    const { projectId, instanceId } = match.params;
    const projectInfo = get(streamingInfos, projectId, {});
    const logInfo = get(projectInfo, instanceId, null);

    return (
      <Container fullHeight withGutter>
        <Container toolbar>
          <div className="section">
            <span className="label">{intl.formatMessage(appMenusMessages.logAnalysis)}</span>
            <span className="divider">/</span>
            <Select
              name="project" inline
              options={R.map(p => ({ label: p.name, value: p.name }), projects)}
              value={projectId || ''} onChange={this.handleProjectChange}
              placeholder={`${intl.formatMessage(appFieldsMessages.project)}...`}
            />
            {logInfo && <span className="divider">/</span>}
            {logInfo && <span>{logInfo.name || ''}</span>}
          </div>
        </Container>
      </Container>
    );
  }
}

const LogLiveAnalysis = injectIntl(LogLiveAnalysisCore);
export default connect(
  (state: State) => {
    const { streamingInfos } = state.log;
    return {
      projects: R.filter(p => p.hasLogData, state.app.projects),
      streamingInfos,
    };
  },
  {
    push, loadLogStreaming,
  },
)(LogLiveAnalysis);
