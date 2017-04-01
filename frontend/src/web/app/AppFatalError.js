import React from 'react';
import { injectIntl } from 'react-intl';
import CenterPage from './components/CenterPage';
import type { Message } from '../../common/types';

type Props = {
  error: ?Error,
  message: ?Message,
  intl: Object,
};

const AppFatalError = ({
  message, intl,
}: Props) => {
  if (message) {
    return (
      <CenterPage className="error">
        <div>{intl.formatMessage(message)}</div>
      </CenterPage>
    );
  }

  return null;
};

export default injectIntl(AppFatalError);
