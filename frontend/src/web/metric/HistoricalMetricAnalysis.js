/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { push } from 'react-router-redux';
import { State } from '../../common/types';
import { Container } from '../../lib/fui/react';
import { hideAppLoader } from '../../common/app/actions';

type Props = {
  projects: Array<Object>,
  hideAppLoader: Function,
};

class HistoricalMetricAnalysisCore extends React.PureComponent {
  props: Props;

  componentDidMount() {
    this.props.hideAppLoader();
  }

  render() {
    const { projects } = this.props;
    return (
      <Container fullHeight>
        <div>Historical Metric Projects</div>
        {R.map((p) => {
          return (<div key={p.projectName}>{p.projectName}</div>);
        }, projects)}
      </Container>
    );
  }
}

const HistoricalMetricAnalysis = injectIntl(HistoricalMetricAnalysisCore);
export default connect(
  (state: State) => {
    return {
      projects: R.filter(p => p.isMetric, state.app.projects),
    };
  },
  { push, hideAppLoader },
)(HistoricalMetricAnalysis);
