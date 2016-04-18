import React from 'react';
import $ from 'jquery';
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';
import {Console, Accordion, Message} from '../../../artui/react';

import Project from './project';
import {ModelType, AnomalyThreshold, DurationThreshold} from '../../selections';

class LiveMonitoring extends React.Component {

  constructor(props) {
    super(props);

    this._el = null;
    this.state = {
      selectProjects: [],
      showInfo: true 
    };
    this.handleAddMonitoring.bind(this);
  }

  componentDidMount() {
    if (this._el) {
      $(this._el).find('.ui.dropdown').dropdown({
      });
    }
  }

  componentWillUnmount() {
    if (this._el) {
      $(this._el).find('.ui.dropdown').dropdown('destroy');
    }
  }
  
  handleAddMonitoring() {
    let projects = this.state['selectProjects'];
    projects.push('app1AWS');
    this.setState({
      'selectProjects': projects
    });
  }

  renderProjects() {
    let projects = this.state.selectProjects;
    let elems = [];
    projects.map((project) => {
      elems.push(
        (
          <Accordion className="ui tiny orange dividing accordion">
            <div className="active title"><i className="dropdown icon"/>{project}</div>
            <Project/>
          </Accordion>
        )
      )
    });
    
    return elems;
  }
  
  render() {
    return (
      <Console.Content>
        <div className="main ui container" ref={c => this._el = c}>
          <Console.Breadcrumb>
              <IndexLink to="/" className="section">Home</IndexLink>
              <i className="right angle icon divider"/>
              <Link to="/monitoring" className="section">Cloud Monitoring</Link>
              <i className="right angle icon divider"/>
              <div className="active section">Live Monitoring</div>
          </Console.Breadcrumb>
          {
            this.state.showInfo &&
            <Message className="ui tiny message" 
                     closable={true} onClose={() => this.setState({showInfo: false})}>
              <i className="close icon" />
              <ul>
                <li><b>Model Name</b>:
                  choose your model and model type. A model can have two model types: the Holistic model type uses a single model induced from all metrics, and the Split model type uses a group of models, each induced from one metric. </li>
                <li><b>Anomaly Threshold</b>:
                  choose a number in [0,1) to configure the sensitivity of your anomaly detection tool. Lower values detect a larger variety of anomalies.
                </li>
                <li><b>Duration Threshold</b>:
                  number of continuous anomalies to trigger an alert.
                </li>
              </ul>
            </Message>
          }
          <div className="ui segment">
            <div className="ui small form equal width">
              <div className="fields">
                <div className="inline field">
                  <label>Project Name</label>
                  <select className="ui fluid dropdown">
                    <option value="app1AWS">app1AWS</option>
                    <option value="app2AWS">app2AWS</option>
                    <option value="appWestAWS">appWestAWS</option>
                    <option value="insightfinderGAE">insightfinderGAE</option>
                    <option value="app2AWStest">app2AWStest</option>
                  </select>
                </div>
                <ModelType className="inline field"/>
                <AnomalyThreshold className="inline field"/>
                <DurationThreshold className="inline field" />
                <button className="ui orange button orange" 
                        onClick={this.handleAddMonitoring.bind(this)}>Add</button>
              </div>
            </div>
          </div>
          {this.renderProjects()}
        </div>
      </Console.Content>
    )
  }
}

export default LiveMonitoring;