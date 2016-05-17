import React from 'react';
import {Link, IndexLink} from 'react-router';
import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react';
import {ProjectSelection, ModelType, AnomalyThreshold, DurationThreshold} from '../../selections';
import ProjectsSummary from './summary';
import ProjectMetric from './metric';
import ProjectDetails from './details';


class LiveMonitoring extends React.Component {

  constructor(props) {
    super(props);

    this._el = null;
    
    this.state = {
      view: 'chart',
      showAddPanel: false,
      addedName: '',
      addedProjects: ['app2AWS', 'appWestAWS'],
      detailedProject: ''
    };
    this.handleAddMonitoring.bind(this);
  }

  componentDidMount() {
    $.api({
      action: 'liveAnalysis',
      method: 'POST',
      on: 'now',
      beforeSend: (settings) => {
        settings.data = {
          'pvalue': '',
          'cvalue': '',
          'modelType': ''
        };
        return settings;
      },
      onSuccess: (resp) => {
        alert(resp);
      },
      onError: (error) => {
        alert(error);
      }
    });
  }
  
  handleAddMonitoring() {
    let {addedProjects, addedName} = this.state;
    addedProjects.push(addedName);
    this.setState({
      'addedProjects': addedProjects
    });
  }

  render() {
    const {view, showAddPanel, addedProjects, detailedProject} = this.state;
    
    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
            <div className="ui breadcrumb">
              <IndexLink to="/" className="section">Home</IndexLink>
              <i className="right angle icon divider"/>
              <Link to="/monitoring" className="section">Cloud Monitoring</Link>
              <i className="right angle icon divider"/>
              <div className="active section">Live Monitoring</div>
            </div>
            <ButtonGroup className="right floated basic icon">
              <Button><i className="add icon" onClick={() => this.setState({showAddPanel: true})} /></Button>
              <Button><i className="setting icon"/></Button>
            </ButtonGroup>
            <ButtonGroup className="right floated basic icon">
              <Button active={view == 'chart'} onClick={()=>this.setState({view:'chart'})}>
                <i className="line chart icon"/>
              </Button>
              <Button active={view == 'table'} onClick={()=>this.setState({view:'table'})}>
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
          { (view == 'chart') && 
          <ProjectsSummary projects={addedProjects} 
                           onProjectSelected={(project) => this.setState({detailedProject: project})} />
          }
          { (view == 'table') &&
          <ProjectMetric projects={addedProjects} 
                         onProjectSelected={(project) => this.setState({detailedProject: project})}/>
          }
          { !!detailedProject && <ProjectDetails project={detailedProject} />}
        </div>
      </Console.Content>
    )
  }
}

export default LiveMonitoring;