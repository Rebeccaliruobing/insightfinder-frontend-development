import React from 'react';
import { connect } from 'react-redux';
import type { State } from '../src/common/types';
import { Console } from '../artui/react';
import { logoff, sessionInvalid } from '../src/common/auth/actions';

type Props = {
  logoff: Function,
  sessionInvalid: Function,
  userInfo: Object,
};

const AccountInfo = ({ logoff, sessionInvalid, userInfo = {} }: Props) => {
  if (!userInfo.userName) {
    sessionInvalid();
    return null;
  }

  return (
    <Console.Wrapper className="single-page" style={{ paddingTop: 30 }}>
      <div className="ui container">
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
      </div>
    </Console.Wrapper>
  );
};

export default connect(
  (state: State) => ({
    userInfo: state.auth.userInfo,
  }),
  { logoff, sessionInvalid },
)(AccountInfo);
