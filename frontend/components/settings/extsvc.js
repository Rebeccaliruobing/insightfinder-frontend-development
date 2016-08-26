import React from 'react';
import {Console, Dropdown, Accordion, Message} from '../../artui/react/index';
//import pdSrc from './images/pd-connect.png';

export default class ExtSvc extends React.Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object,
  };

  render() {
    let extServiceAllInfo = this.context.dashboardUservalues.extServiceAllInfo;
    let pagerDutyImg = 'https://pagerduty.com/assets/pd_connect_button.png';
    let slackImg = 'https://a.slack-edge.com/ae57/img/slack_api_logo.png';
    return (
      <Console.Content className="single-page">
        <div className="ui container">
          <h3>PagerDuty Settings</h3>
          <div className="text">You can manage your alerts with your PagerDuty account. Click the button below to
            integrate your account alerts with PagerDuty.
          </div>
          <a target="_blank"
             href="https://connect.pagerduty.com/connect?vendor=ad2938f1f094d65d86fa&amp;callback=https://insightfindergae.appspot.com/settings/extsvc">
            <img alt="Connect_button" height='40px' src={pagerDutyImg}/>
          </a>
          <hr />
          <h3>Slack Integration</h3>
          <div className="text">Register your Incoming WebHook from Slack to integrate your account alerts with Slack. 
          </div>
          <a target="_blank"
             href="">
            <img alt="Connect_button" height='40px' src={slackImg}/>
          </a>
          <hr />
          <h3>Currently Registered External Services</h3>
          {extServiceAllInfo.length ? (
            <div>
              <table className="ui basic table">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {extServiceAllInfo.map((info, index)=>(
                  <tr key={index}>
                    <td>{info.id}</td>
                    <td>{info.desc}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text">No external service registered.</div>
          )}
        </div>
      </Console.Content>
    )
  }
}