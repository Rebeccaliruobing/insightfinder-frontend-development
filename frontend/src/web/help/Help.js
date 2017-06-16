import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideAppLoader } from '../../common/app/actions';

type Props = {
  hideAppLoader: Function,
};

class Help extends React.Component {
  props: Props;

  componentDidMount() {
    this.props.hideAppLoader();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <div className="ui container">
            <div className="text-center" style={{ padding: '40px 50px 20px' }}>
              <h2>Welcome!</h2>
              <p>Thanks for choosing InsightFinder to monitor and manage your applications and systems. We provide a general use guide here to help answer some of the questions you may have. We will be glad to receive your contributions and suggestions both with respect to the content we outline below and other areas that you feel may need better or more in-depth explanation. If you need to get in touch with us, please send an email to info@insightfinder.com.
            </p>
            </div>
            <div className="ui grid three columns text-center">
              <div className="column">
                <div className="card">
                  <i className="info circle icon" />
                  <h3>How to get started?</h3>
                  <Link to="/settings/project-list" className="item">Step 1: Register your project according to data source types.</Link>
                  <Link to="/cloud/" className="item">Step 2: View anomaly detection and diagnosis results in Dashboard.</Link>
                  <Link to="/settings/threshold" className="item">Step 3: Configure your projects in settings.</Link>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <i className="help circle icon"></i>
                  <h3>How to install Insight Agent?</h3>
                  <Link to="/account-info" className="item">Step 1: Retrieve your license key here if you forget.</Link>
                  <a href="https://github.com/insightfinder/InsightAgent/wiki" target="_blank" className="item">Step 2: Select the agent(s) you want to install.</a>
                  <a href="https://github.com/insightfinder/InsightAgent/wiki" target="_blank" className="item">Step 3: Deploy one or multiple agents using our deployment code.</a>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <i className="dashboard icon"></i>
                  <h3>Dashboard</h3>
                  <Link to="/cloud/executive-dashboard" className="item">&bull; View and compare group level anomaly or resource statistics of your projects.</Link>
                  <Link to="/cloud/monitoring" className="item">&bull; View realtime anomaly detection and root cause analysis results.</Link>
                  <Link to="/cloud/app-forecast" className="item">&bull; View application level forecast for resource planning.</Link>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <i className="file text icon" />
                  <h3>Log</h3>
                  <Link to="/log/incident-log-analysis" className="item">View log analysis for patterns and anomalies in log files.</Link>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <i className="settings icon" />
                  <h3>Settings</h3>
                  <Link to="/settings/project-list" className="item">&bull; See a list of existing projects, and register/remove project. </Link>
                  <Link to="/settings/project" className="item">&bull; Anomaly detection and metric threshold settings. </Link>
                  <Link to="/settings/project" className="item">&bull; Project sharing with collaborators. </Link>
                  <Link to="/settings/extsvc" className="item">&bull; Third party incident reporting service. </Link>
                </div>
              </div>
              <div className="column">
                <div className="card">
                  <i className="find icon" />
                  <h3>Bug Repository</h3>
                  <Link to="/usecase" className="item">You can find various anomaly/bug data shared with you by either us or other InsightFinder users. We encourage everyone to share their anomaly data with the community.</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  { hideAppLoader },
)(Help);
