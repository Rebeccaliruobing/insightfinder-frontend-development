import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { State } from '../../common/types';
import { Container } from '../../lib/fui/react';
import { appMenusMessages } from '../../common/app/messages';
import './log.scss';

type Props = {
  projects: Array<Object>,
  streamingInfos: Object,
  streamingIncidentInfos: Object,
  intl: Object,
  match: Object,
  location: Object,
  loadLogStreaming: Function,
};

class LogAnalysisCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);
    this.defaultParams = {
      rareEventThreshold: '3',
      derivedPvalue: '0.9',
    };
  }

  componentDidMount() {
  }

  render() {
    const { intl, match } = this.props;

    return (
      <Container fullHeight withGutter className="flex-col log-live">
        <Container toolbar>
          <div className="section">
            <span className="label">{intl.formatMessage(appMenusMessages.logAnalysis)}</span>
            <span className="divider">/</span>
          </div>
        </Container>
      </Container>
    );
  }
}

const LogAnalysis = injectIntl(LogAnalysisCore);
export default connect(
  (state: State) => {
    return { };
  },
  {},
)(LogAnalysis);
