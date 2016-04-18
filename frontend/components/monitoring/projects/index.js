import React from 'react';
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';
import {Console} from '../../../artui/react';
import AmazonProjects from './amazon';
import ProjectsGoogle from './google';


class Projects extends React.Component {

  constructor(props) {
    super(props);
    this.selectTab.bind(this);
    this._el = null;

    this.state = {
      tabStates: {
        amazon: 'active',
        google: ''
      }
    }
  }

  selectTab(e, tab) {
    var tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, function(val){ return ''; });
    tabStates[tab] = 'active';
    this.setState({tabStates: tabStates});
  }

  render() {

    var tabStates = this.state['tabStates'];

    return (
      <Console.Content>
        <div className="main ui container" ref={c => this._el = c}>
          <Console.Breadcrumb>
            <IndexLink to="/" className="section">Home</IndexLink>
            <i className="right angle icon divider"/>
            <Link to="/monitoring" className="section">Cloud Monitoring</Link>
            <i className="right angle icon divider"/>
            <div className="active section">Projects</div>
          </Console.Breadcrumb>
          {tabStates['amazon'] === 'active' &&
          <div className="ui message attached">
            <ul>
              <li><b>Project Name</b>: pick a nickname for your cloud project.</li>
              <li><b>AWS Access Key ID/Secret Access Key</b>:</li>
              <ol>
                <li>Create a new group and attach CloudWatchReadOnlyAccess policy to the group.</li>
                <li>Create a new user, click on Show User Security Credentials link, and copy the Access Key ID and Secret Access Key for your record.</li>
                <li>Add to the group under Groups tab and Add User to Groups button to enable user for cloudwatch.</li>
                For more details refer to AWS documentation.
              </ol>
              <li><b>Availability Zone</b>: zone associated with your EC2 account.</li>
            </ul>
          </div>
          }
          {tabStates['google'] === 'active' &&
          <div className="ui message attached">
            <ul>
              <li><b>Project Name</b>: pick a nickname for your cloud project.</li>
              <li><b>Project ID</b>: find Project ID under Projects in your Google Developer Console.</li>
              <li><b>Project Type</b>: choose between GAE and GCE.</li>
              <li><b>Service Account Email/.p12 key file</b>:</li>
              <ol>
                <li>Create a new service account and keep the automatically downloaded .p12 key file.</li>
                <li>Check your project here and make sure Cloud Monitoring API is enabled. </li>
              </ol>
              <li>For more details, refer to <a target="_blank" href="https://cloud.google.com/storage/docs/authentication#service_accounts">Google Cloud documentation</a>.
              </li>
            </ul>
          </div>
          }
          <div className="ui pointing secondary menu">
            <a className={tabStates['amazon'] + ' item'}
               onClick={(e) => this.selectTab(e, 'amazon')}>Amazon Cloud</a>
            <a className={tabStates['google'] + ' item'}
               onClick={(e) => this.selectTab(e, 'google')}>Google Cloud</a>
          </div>
          <div className={tabStates['amazon'] + ' ui tab segment'}>
            {tabStates['amazon'] === 'active' ? <AmazonProjects/> : null}
          </div>
          <div className={tabStates['google'] + ' ui tab segment'}>
            {tabStates['google'] === 'active' ? <ProjectsGoogle/> : null}
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default Projects;