import React from 'react';
import { connect } from 'react-redux';
import type { State } from '../src/common/types';
import { Container } from '../src/lib/fui/react';
import { logoff, sessionInvalid } from '../src/common/auth/actions';
import { hideAppLoader } from '../src/common/app/actions';
import { SinglePage } from '../src/web/app/components';

type Props = {
  userInfo: Object,
  logoff: Function,
  sessionInvalid: Function,
  hideAppLoader: Function,
};

class AccountInfo extends React.PureComponent {
  props: Props;

  componentDidMount() {
    this.props.hideAppLoader();
  }

  render() {
    const { logoff, sessionInvalid, userInfo = {} } = this.props;

    if (!userInfo.userName) {
      sessionInvalid();
      return null;
    }

    return (
      <Container withGutter style={{ paddingTop: 30 }}>
        <h4>User Account Information:</h4>
        <table className="ui small table" style={{ width: '40%' }}>
          <tbody>
            <tr>
              <td className="bold" style={{ width: '15%' }}>Username:</td>
              <td style={{ width: '25%' }}>{userInfo.userName}</td>
            </tr>
            <tr>
              <td className="bold" style={{ width: '15%' }}>Full Name:</td>
              <td style={{ width: '25%' }}>{userInfo.fullName}</td>
            </tr>
            <tr>
              <td className="bold" style={{ width: '15%' }}>Email:</td>
              <td style={{ width: '25%' }}>{userInfo.email}</td>
            </tr>
            <tr>
              <td className="bold" style={{ width: '15%' }}>Company Name:</td>
              <td style={{ width: '25%' }}>{userInfo.companyName}</td>
            </tr>
            <tr title="Use this license key for agent deployment.">
              <td className="bold" style={{ width: '15%' }}>License Key:</td>
              <td style={{ width: '25%' }}>{userInfo.licenseKey}</td>
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
  (state: State) => ({
    userInfo: state.auth.userInfo,
  }),
  { logoff, sessionInvalid, hideAppLoader },
)(AccountInfo);
