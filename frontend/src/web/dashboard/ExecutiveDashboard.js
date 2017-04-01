import React from 'react';
import { connect } from 'react-redux';
import { Container } from '../../lib/fui/react';
import { hideAppLoader } from '../../common/app/actions';

type Props = {
  hideAppLoader: Function,
  match: Object,
};

class ExecutiveDashboard extends React.Component {
  props: Props;

  componentDidMount() {
    this.props.hideAppLoader();
  }

  render() {
    const { match } = this.props;
    const view = match.params.view || 'anomaly';
    return (
      <Container fullHeight>
        <Container className="toolbar">
          {view}
        </Container>
      </Container>
    );
  }
}

export default connect(
  () => ({}),
  { hideAppLoader },
)(ExecutiveDashboard);
