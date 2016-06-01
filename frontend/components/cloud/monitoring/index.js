import React from 'react';
import ReactDOM from 'react-dom';
import {Link, IndexLink} from 'react-router';
import {
  BaseComponent, Console, ButtonGroup, Button,
  Dropdown, Accordion, Message
} from '../../../artui/react';
import ProjectSummary from './summary';
import ProjectMetric from './metric';
import {Dygraph} from '../../../artui/react/dataviz';

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
      filterLoading: false,
      addedProjects: []
    };
    
    this.handleProjectSelected.bind(this);
  }

  componentDidMount() {
  }

  handleProjectSelected(project) {
    window.open('#/liveMonitoring?project=' + project.projectName);
  }
  
  handleToggleFilterPanel() {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleFilterChange(project) {
    
    let self = this;
    let {addedProjects} = this.state;
    this.setState({'filterLoading': true}, () => {
      addedProjects.push(project);
      self.setState({addedProjects: addedProjects}, () => {
        self.setState({filterLoading: false});
      });
    });
  }
  
  handleProjectRemove(project) {
    let {addedProjects} = this.state;
    addedProjects = _.remove(addedProjects, (p) => {
      _.isEqual(p, project);
    });
    
    this.setState({addedProjects});
  }

  render() {
    const {view, addedProjects} = this.state;
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
            <i className="close link icon" style={{position:'absolute', top: 10, right:0, zIndex:1}}
               onClick={this.handleToggleFilterPanel.bind(this)}/>
            
            {userInstructions && userInstructions.cloudmonitor &&
            <Message dangerouslySetInnerHTML={{__html: userInstructions.cloudmonitor}}/>}
            <FilterBar loading={this.state.filterLoading} 
                       onSubmit={this.handleFilterChange.bind(this)}/>
          </div>

          { (view == 'summary') &&
          <div className="ui vertical segment">
            <div className="ui four cards">
              {addedProjects.map((project, index) => {
                return <ProjectSummary project={project} key={index}
                                       onSelected={() => this.handleProjectSelected(project)}
                                       onClose={() => this.handleProjectRemove(project)} />
              })}
            </div>
          </div>
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