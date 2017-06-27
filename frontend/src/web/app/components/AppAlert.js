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
      setTimeout(this.cleanOutdatedAlerts, Math.min(1000, timeout));
    }
  }

  componentDidUpdate() {
    const { alertMessages, setTimeout, timeout } = this.props;
    if (alertMessages.length > 0) {
      setTimeout(this.cleanOutdatedAlerts, Math.min(1000, timeout));
    }
  }

  @autobind
  cleanOutdatedAlerts() {
    const { alertMessages, hideAppAlert, setTimeout, timeout } = this.props;
    const expired = Date.now().valueOf() - timeout;
    // Get the outdated alerts based on the id.
    const ids = R.map(a => a.id, R.filter(a => parseInt(a.id, 0) <= expired, alertMessages));
    if (ids.length > 0) {
      hideAppAlert(ids);
    } else {
      setTimeout(this.cleanOutdatedAlerts, Math.min(1000, timeout));
    }
  }

  render() {
    const { intl, alertMessages, hideAppAlert } = this.props;
    if (alertMessages.length > 0) {
      return (
        <div className="fui alert container" style={{ paddingTop: 80, paddingBottom: 16 }}>
          {alertMessages.map((alert) => {
            // Get locale message and replace placeholders with params.
            const { params } = alert;
            const message = intl.formatMessage(alert.message, params);

            return (<div
              className={`fui ${alert.type} message`}
              key={alert.id}
            >
              <Icon name="close" onClick={() => { hideAppAlert([alert.id]); }} />
              <span className="title" dangerouslySetInnerHTML={{ __html: message }} />
            </div>
            );
          })}
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
