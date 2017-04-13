import React from 'react';
import { injectIntl } from 'react-intl';
import R from 'ramda';
import { connect } from 'react-redux';
import ReactTimeout from 'react-timeout';
import { autobind } from 'core-decorators';
import type { State, AlertMessage } from '../../../common/types';
import { Icon } from '../../../lib/fui/react';
import { hideAppAlert } from '../../../common/app/actions';

type Props = {
  timeout: number,
  intl: Object,
  alertMessages: Array<AlertMessage>,
  hideAppAlert: Function,
  setTimeout: Function,
};

class AppAlertCore extends React.Component {
  props: Props;

  static defaultProps = {
    timeout: 5000,
  };

  componentDidMount() {
    const { alertMessages, setTimeout, timeout } = this.props;
    if (alertMessages.length > 0) {
      setTimeout(this.cleanOutdatedAlerts, timeout);
    }
  }

  componentDidUpdate() {
    const { alertMessages, setTimeout, timeout } = this.props;
    if (alertMessages.length > 0) {
      setTimeout(this.cleanOutdatedAlerts, timeout);
    }
  }

  @autobind
  cleanOutdatedAlerts() {
    const { alertMessages, hideAppAlert } = this.props;
    const now = Date.now().valueOf();
    // Get the outdated alerts based on the id.
    const ids = R.map(a => a.id, R.filter(a => parseInt(a.id, 0) <= now, alertMessages));
    if (ids.length > 0) {
      hideAppAlert(ids);
    }
  }

  render() {
    const { intl, alertMessages, hideAppAlert } = this.props;
    if (alertMessages.length > 0) {
      return (
        <div className="fui alert container" style={{ paddingTop: 48, paddingBottom: 16 }}>
          {alertMessages.map(alert => (
            <div
              className={`fui ${alert.type} message`}
              key={alert.id}
            >
              <Icon name="close" onClick={() => { hideAppAlert([alert.id]); }} />
              <span>{intl.formatMessage(alert.message)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }
}

const AppAlert = injectIntl(ReactTimeout(AppAlertCore));

export default connect(
  (state: State) => ({
    alertMessages: state.app.alerts,
  }), {
    hideAppAlert,
  },
)(AppAlert);
