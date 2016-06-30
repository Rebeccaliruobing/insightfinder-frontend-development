import React from 'react';
import {Console, Dropdown, Accordion, Message} from '../../artui/react/index';
import pdSrc from './images/pd-connect.png';

export default class ExtSvc extends React.Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object,
  };

  render() {
    let extServiceAllInfo = this.context.dashboardUservalues.extServiceAllInfo;
    return (
      <Console.Content>
        <h4>Current external services</h4>
        {extServiceAllInfo ? (
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
          <div className="text-muted">No external service registered.</div>
        )}
        <hr/>
        <h4>PagerDuty Settings</h4>
        <div className="text-muted">You can manage your alerts with your PagerDuty account. Click the button below to
          integrate your account alerts with PagerDuty.
        </div>
        <a target="_blank"
           href="https://connect.pagerduty.com/connect?vendor=ad2938f1f094d65d86fa&amp;callback=https://app.insightfinder.com/service-integration">
          <img alt="Connect_button" src={pdSrc}/>
        </a>
      </Console.Content>
    )
  }
}