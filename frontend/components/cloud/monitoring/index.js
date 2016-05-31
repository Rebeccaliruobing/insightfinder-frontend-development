import React from 'react';
import ReactDOM from 'react-dom';
import {Link, IndexLink} from 'react-router';
import {
  BaseComponent, Console, ButtonGroup, Button,
  Dropdown, Accordion, Message
} from '../../../artui/react';
import {ProjectSelection, ModelType, AnomalyThreshold, DurationThreshold} from '../../selections';
import ProjectsSummary from './summary';
import ProjectMetric from './metric';

import apis from '../../../apis';

import FilterBar from './filter-bar';

class LiveMonitoring extends BaseComponent {

  static contextType = {
    router: React.PropTypes.object,
    userInstructions: React.PropTypes.object

  };

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


  handleToggleFilterPanel() {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleFilterChange(data) {
    this.$filterPanel.slideUp();
    alert(JSON.stringify(data));
    apis.postLiveAnalysis(data.projectName, data.modelType, data.anomalyThreshold, data.durationHours).then((resp) => {
      console.log(resp);
    });
  }

  render() {


    const {view, showAddPanel, addedProjects} = this.state;
    const userInstructions = this.context.userInstructions;

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
              <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                <i className="ellipsis horizontal icon"/>
              </Button>
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

          <div className="ui vertical segment filterPanel" style={{display: 'none'}}
               ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>

            <i className="close link icon" style={{float:'right', marginTop: '-10px'}}
               onClick={this.handleToggleFilterPanel.bind(this)}/>

            <FilterBar {...this.props} onSubmit={this.handleFilterChange.bind(this)}/>
            <Message dangerouslySetInnerHTML={{__html: userInstructions && userInstructions.cloudmonitor}}/>
          </div>


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