import React from 'react';
import store from 'store';
import {Console, Link} from '../artui/react/index';

export default class AccountInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: store.get('userInfo'),
    }
  }

  handleLogoff() {
    store.clearAll();
    window.location.reload();
  }

  render() {
    return (
      <Console.Wrapper className="single-page">
        <div className="ui container">
          <h4>User Account Information:</h4>
          <table className="ui small table" style={{width: '40%',}}>
            <tbody>
              <tr>
                <td className="bold" style={{width: '15%'}}>Username:</td>
                <td style={{width: '25%'}}>{this.state.userInfo.userName}</td>
              </tr>
              <tr>
                <td className="bold" style={{width: '15%'}}>Full Name:</td>
                <td style={{width: '25%'}}>{this.state.userInfo.fullName}</td>
              </tr>
              <tr>
                <td className="bold" style={{width: '15%'}}>Email:</td>
                <td style={{width: '25%'}}>{this.state.userInfo.email}</td>
              </tr>
              <tr>
                <td className="bold" style={{width: '15%'}}>Company Name:</td>
                <td style={{width: '25%'}}>{this.state.userInfo.companyName}</td>
              </tr>
              <tr title='Use this license key for agent deployment.'>
                <td className="bold" style={{width: '15%'}}>License Key:</td>
                <td style={{width: '25%'}}>{this.state.userInfo.licenseKey}</td>
              </tr>
            </tbody>
          </table>
  
  
          <button className="ui small gray action button"
                   onClick={this.handleLogoff.bind(this)}>
            <i className="icon power"></i>Log Out
          </button>
        </div>
      </Console.Wrapper>
    )
  }
}