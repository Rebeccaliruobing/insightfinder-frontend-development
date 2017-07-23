import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { autobind } from 'core-decorators';
import R from 'ramda';
import VLink from 'valuelink';
import momenttz from 'moment-timezone';

import type { State } from '../src/common/types';
import { Container, Select } from '../src/lib/fui/react';
import { logoff, sessionInvalid } from '../src/common/auth/actions';
import { hideAppLoader, updateDefaultTimezone } from '../src/common/app/actions';

type Props = {
  userInfo: Object,
  logoff: Function,
  sessionInvalid: Function,
  defaultTimezone: String,
  hideAppLoader: Function,
  currentLoadingComponents: Object,
  updateDefaultTimezone: Function,
};

class AccountInfo extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.timezoneLoadingKey = 'accountinfo_timezone';
    this.timezoneOptions = R.map(t => ({ label: t, value: t }), momenttz.tz.names());

    this.state = {
      defaultTimezone: props.defaultTimezone,
    };
  }

  componentDidMount() {
    this.props.hideAppLoader();
  }

  componentWillReceiveProps(nextProps) {
    const defaultTimezone = get(nextProps, 'defaultTimezone', '');
    if (defaultTimezone !== this.props.defaultTimezone) {
      this.setState({ defaultTimezone });
    }
  }

  @autobind
  handleTimezoneClick() {
    const { updateDefaultTimezone } = this.props;
    const { defaultTimezone } = this.state;
    updateDefaultTimezone(defaultTimezone, { [this.timezoneLoadingKey]: true });
  }

  render() {
    const { logoff, sessionInvalid, userInfo = {}, currentLoadingComponents } = this.props;

    if (!userInfo.userName) {
      sessionInvalid();
      return null;
    }
    const timezoneLink = VLink.state(this, 'defaultTimezone').check(
      s => Boolean(s),
      'Please select timezone to update',
    );
    const hasError = timezoneLink.error;
    const isSubmitting = get(currentLoadingComponents, this.timezoneLoadingKey, false);

    return (
      <Container withGutter style={{ paddingTop: 30 }}>
        <h4>User Account Information:</h4>
        <table className="ui small table" style={{ width: '40%' }}>
          <tbody>
            <tr>
              <td className="bold" style={{ width: '15%' }}>
                Username:
              </td>
              <td style={{ width: '25%' }}>
                {userInfo.userName}
              </td>
            </tr>
            <tr>
              <td className="bold" style={{ width: '15%' }}>
                Full Name:
              </td>
              <td style={{ width: '25%' }}>
                {userInfo.fullName}
              </td>
            </tr>
            <tr>
              <td className="bold" style={{ width: '15%' }}>
                Email:
              </td>
              <td style={{ width: '25%' }}>
                {userInfo.email}
              </td>
            </tr>
            <tr>
              <td className="bold" style={{ width: '15%' }}>
                Company Name:
              </td>
              <td style={{ width: '25%' }}>
                {userInfo.companyName}
              </td>
            </tr>
            <tr title="Use this license key for agent deployment.">
              <td className="bold" style={{ width: '15%' }}>
                License Key:
              </td>
              <td style={{ width: '25%' }}>
                {userInfo.licenseKey}
              </td>
            </tr>
            <tr>
              <td className="bold" style={{ width: '15%' }}>
                Default Timezone
              </td>
              <td>
                <div style={{ width: 240, float: 'left' }}>
                  <Select name="timezone" options={this.timezoneOptions} valueLink={timezoneLink} />
                </div>
                <div
                  className={`ui button ${isSubmitting ? 'loading' : ''} ${hasError
                    ? 'disabled'
                    : ''} blue`}
                  {...(isSubmitting || hasError ? {} : { onClick: this.handleTimezoneClick })}
                  style={{ float: 'right' }}
                >
                  Update Timezone
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <button className="ui small gray action button" onClick={() => logoff()}>
          <i className="icon power" />Log Out
        </button>
      </Container>
    );
  }
}

export default connect(
  (state: State) => {
    const { currentLoadingComponents, defaultTimezone } = state.app;
    return {
      userInfo: state.auth.userInfo,
      defaultTimezone,
      currentLoadingComponents,
    };
  },
  { logoff, sessionInvalid, hideAppLoader, updateDefaultTimezone },
)(AccountInfo);
