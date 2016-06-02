import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import {Link, IndexLink} from 'react-router';
import {
  BaseComponent, Console, ButtonGroup, Button,
  Dropdown, Accordion, Message
} from '../../../artui/react';

import ProjectSummary from './summary';
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
      showAddPanel: false,
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
    let {addedProjects} = this.state;
    if (_.find(addedProjects, p => {
        return _.isEqual(p, project);
      })) {
      alert('The project with same parameters already exist');
    } else {
      addedProjects.push(project);
      this.setState({addedProjects: addedProjects});
    }
  }
  
  handleProjectRemove(project) {
    let {addedProjects} = this.state;
    _.remove(addedProjects, (p) => {
      return _.isEqual(p, project)
    });
    
    this.setState({addedProjects});
  }

  render() {
    const {addedProjects} = this.state;
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
          </div>

          <div className="ui vertical segment filterPanel"
               ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>
            <i className="close link icon" style={{position:'absolute', top: 10, right:0, zIndex:1}}
               onClick={this.handleToggleFilterPanel.bind(this)}/>
            
            {userInstructions && userInstructions.cloudmonitor &&
            <Message dangerouslySetInnerHTML={{__html: userInstructions.cloudmonitor}}/>}
            <FilterBar onSubmit={this.handleFilterChange.bind(this)}/>
          </div>

          <div className="ui vertical segment">
            <div className="ui four cards">
              {addedProjects.map((project, index) => {
                return <ProjectSummary {...project} key={index}
                                       onSelected={() => this.handleProjectSelected(project)}
                                       onClose={() => this.handleProjectRemove(project)} />
              })}
            </div>
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default LiveMonitoring;