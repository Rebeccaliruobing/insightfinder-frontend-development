import React from 'react';
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';
import {Console, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import Project from './project';
import {ProjectSelection, ModelType} from '../../selections';

class LiveMonitoring extends React.Component {

  constructor(props) {
    super(props);

    this._el = null;
    this.state = {
      projects: ['app2AWS', 'appWestAWS', 'AppGAE'],
      selectProjects: [],
      showInfo: false 
    };
    this.handleAddMonitoring.bind(this);
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
    const projects = this.state['projects'] || [];
    
    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui vertical segment">
            <div className="ui breadcrumb">
              <IndexLink to="/" className="section">Home</IndexLink>
              <i className="right angle icon divider"/>
              <Link to="/monitoring" className="section">Cloud Monitoring</Link>
              <i className="right angle icon divider"/>
              <div className="active section">Live Monitoring</div>
            </div>
          </div>
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
          <div className="ui vertical segment">
            <span>Projects: </span>
            <ProjectSelection onChange={(value, text) => {console.log(value)}} />
            <Button className="orange"
                    onClick={this.handleAddMonitoring.bind(this)}>Add</Button>
            <Button className="orange ">中文</Button>
          </div>
          {this.renderProjects()}
        </div>
      </Console.Content>
    )
  }
}

export default LiveMonitoring;