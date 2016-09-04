import React from 'react';
import apis from '../../../apis';
import $ from 'jquery';
//import pdSrc from './images/pd-connect.png';
import {Console, Dropdown, Accordion, Message} from '../../../artui/react/index';
import SlackModal from './slack_modal';

export default class ExtSvc extends React.Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };
  onRemove(infoId,e){
    $(e.target).addClass('loading');
    apis.postServiceIntegration(infoId).then((resp)=>{
      console.log(resp);
      if(resp.success){
        alert(resp.message);
        window.location.reload();
      }
    });
  }

  constructor(props) {
      super(props);
      this.state = {
          showModal: false
      };
  }

  handleModalClose = () => this.setState({showModal: false});

  handleAddSlack(){
    this.setState({showModal: true});
  }

  render() {
    let extServiceAllInfo = this.context.dashboardUservalues.extServiceAllInfo;
    let pagerDutyImg = 'https://pagerduty.com/assets/pd_connect_button.png';
    let slackImg = 'https://slack.com/img/slack_logo_240.png';
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
            <img alt="Connect_button" height='40px' src={slackImg}  /><br />
            <button id="btn-slack" className="ui small positive action button"
              onClick={(e) => {this.setState({showModal: true})}}>
              Add WebHook
            </button>
          <hr />
          <h3>Currently Registered External Services</h3>
          {extServiceAllInfo.length ? (
            <div>
              <table className="ui basic table">
                <thead>
                <tr>
                  <th>Service Type</th>
                  <th>Account</th>
                  <th>ServiceKey</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                {extServiceAllInfo.map((info, index)=>(
                  <tr key={index}>
                    <td>{info.serviceProvider}</td>
                    <td>{info.account}</td>
                    <td>{info.serviceKey}</td>
                    <td><div className="ui ui mini red button button" onClick={(e)=>this.onRemove(info.id,e)}>Remove</div></td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text">No external service registered.</div>
          )}
          {
              this.state.showModal &&
              <SlackModal onClose={this.handleModalClose} onCancel={this.handleModalCancel}/>
          }
        </div>
      </Console.Content>
    )
  }
}