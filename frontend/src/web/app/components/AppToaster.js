import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import type { State } from '../../../common/types';

type Props = {
  intl: Object,
};

const AppToasterCore = ({
  intl,
}: Props) => {
  return null;
};

const AppToaster = injectIntl(AppToasterCore);

export default connect(
  (state: State) => ({
  }),
)(AppToaster);
