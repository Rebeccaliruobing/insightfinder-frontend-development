import React from 'react';
import {Link, IndexLink} from 'react-router';
import {BaseComponent, Console, ButtonGroup, Button, 
  Dropdown, Accordion, Message} from '../../../artui/react';
import {ProjectSelection, 
  ModelType, AnomalyThreshold, DurationThreshold} from '../../selections';
import ProjectsSummary from './summary';
import ProjectMetric from './metric';

class LiveMonitoring extends BaseComponent {

  constructor(props) {
    super(props);

    this._el = null;
    this.state = {
      view: 'summary',
      showAddPanel: false,
      addedName: '',
      
      addedProjects: ['app2AWS', 'appWestAWS']
    };
    
    this.handleAddMonitoring.bind(this);
  }

  componentDidMount() {
  }
  
  handleAddMonitoring() {
    let {addedProjects, addedName} = this.state;
    addedProjects.push(addedName);
    this.setState({
      'addedProjects': addedProjects
    });
  }

  handleProjectSelected(project) {
    window.open('/liveMonitoring?project=' + project);
  }

  render() {
    
    const {view, showAddPanel, addedProjects} = this.state;
    
    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
            <div className="ui breadcrumb">
              <IndexLink to="/" className="section">Home</IndexLink>
              <i className="right angle icon divider"/>
              <Link to="/cloud/monitoring" className="section">Cloud Monitoring</Link>
              <i className="right angle icon divider"/>
              <div className="active section">Live Monitoring</div>
            </div>
            <ButtonGroup className="right floated basic icon">
              <Button><i className="add icon" onClick={() => this.setState({showAddPanel: true})} /></Button>
              <Button><i className="setting icon"/></Button>
            </ButtonGroup>
            <ButtonGroup className="right floated basic icon">
              <Button active={view == 'summary'} onClick={()=>this.setState({view:'summary'})}>
                <i className="line chart icon"/>
              </Button>
              <Button active={view == 'metric'} onClick={()=>this.setState({view:'metric'})}>
                <i className="table icon"/>
              </Button>
            </ButtonGroup>
          </div>
          {
            showAddPanel &&
            <div className="ui vertical segment">
              <label>Projects </label>
              <ProjectSelection onChange={(value, text) => {this.setState({addedName: text})}} />
              <span>Model Type </span>
              <ModelType />
              <span>Anomaly Threshold </span>
              <AnomalyThreshold />
              <span>Duration Threshold (minute) </span>
              <DurationThreshold />
              <Button className="orange"
                      onClick={this.handleAddMonitoring.bind(this)}>Add</Button>
              <Button className="orange">Add & Save</Button>
              <i className="close link icon" style={{float:'right'}} 
                 onClick={() => this.setState({showAddPanel: false})}/>
            </div>
          }
          { (view == 'summary') &&
          <ProjectsSummary projects={addedProjects}
                           onProjectSelected={(project) => this.handleProjectSelected(project)}/>
          }
          { (view == 'metric') &&
          <ProjectMetric projects={addedProjects}
                         onProjectSelected={(project) => this.handleProjectSelected(project)}/>
          }
        </div>
      </Console.Content>
    )
  }
}

export default LiveMonitoring;