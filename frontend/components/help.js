import React from 'react';
import {Console, Link} from '../artui/react/index';

export default class Help extends React.Component {
  render() {
    return (
      <Console.Wrapper className="single-page">
        <div className="ui container">
          <div className="text-center" style={{padding: '0 50px 20px'}}>
            <h2>Welcome!</h2>
            <p>Thanks for choosing InsightFinder to monitor and manage your applications and systems. We provide a general use guide here to help answer some of the questions you may have. We will be glad to receive your contributions and suggestions both with respect to the content we outline below and other areas that you feel may need better or more in-depth explanation. If you need to get in touch with us, please send an email to info@insightfinder.com.
            </p>
          </div>
          <div className="ui grid three columns text-center">
            <div className="column">
              <div className="card">
                <i className="info circle icon"></i>
                <h3>How to get started?</h3>
                <Link to="/settings/project-list" className="item">Step 1: Register your project in settings. Choose from Insight Agent and/or AWS CloudWatch, Google Cloud Monitoring.</Link>
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
                <Link to="/cloud/monitoring" className="item">&bull; View realtime anomaly detection and root cause analysis results.</Link>
                <Link to="/cloud/behavior-change-detection" className="item">&bull; View system behavior change in behavior change detection.</Link>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <i className="settings icon"></i>
                <h3>Settings</h3>
                <Link to="/settings/project-list" className="item">&bull; Add/remove cloud projects. </Link>
                <Link to="/settings/threshold" className="item">&bull; Anomaly detection and metric threshold settings. </Link>
                <Link to="/settings/extsvc" className="item">&bull; Third party incident reporting service. </Link>
              </div>
            </div>
            <div className="column">
              <div className="card">
                <i className="find icon"></i>
                <h3>Benchmarks</h3>
                <Link to="/usecase" className="item">You can find various anomaly benchmark data shared with you by either us or other InsightFinder users. We encourage everyone to share their anomaly benchmark data with the community. </Link>
              </div>
            </div>
          </div>
        </div>
      </Console.Wrapper>
    )
  }
}