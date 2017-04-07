import React from 'react';
import { connect } from 'react-redux';
import { Container } from '../../lib/fui/react';
import { hideAppLoader } from '../../common/app/actions';

type Props = {
  hideAppLoader: Function,
  match: Object,
};

class LogLiveAnalysis extends React.Component {
  props: Props;

  componentDidMount() {
    this.props.hideAppLoader();
  }

  render() {
    const { match } = this.props;
    const { projectName } = match.params;
    return (
      <Container fullHeight withGutter>
        <Container offsetGutter className="toolbar">
          {projectName}
        </Container>
      </Container>
    );
  }
}

export default connect(
  () => ({}),
  { hideAppLoader },
)(LogLiveAnalysis);
