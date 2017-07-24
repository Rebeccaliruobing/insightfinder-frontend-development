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

type Props = {
  intl: Object,
};

class CausalAnalysisCore extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  render() {
    return <div>CausalAnalysis</div>;
  }
}

const CausalAnalysis = injectIntl(CausalAnalysisCore);
export default connect(
  (state: State) => {
    // const {} = state.causal;
    return {};
  },
  { push },
)(CausalAnalysis);
