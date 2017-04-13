import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import type { State, ErrorMessage } from '../../../common/types';
import CenterPage from './CenterPage';

type Props = {
  appLastError: ?ErrorMessage,
  intl: Object,
};

const AppErrorCore = ({
  appLastError, intl,
}: Props) => {
  const { message } = appLastError || {};
  if (message) {
    return (
      <CenterPage className="error-page">
        <div>{intl.formatMessage(message)}</div>
      </CenterPage>
    );
  }

  return null;
};

const AppError = injectIntl(AppErrorCore);

export default connect(
  (state: State) => ({
    appLastError: state.app.lastError,
  }),
)(AppError);
