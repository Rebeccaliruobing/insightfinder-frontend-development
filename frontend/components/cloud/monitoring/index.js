import React from 'react';
import _ from 'lodash';
import store from 'store';
import cx from 'classnames';
import ReactDOM from 'react-dom';
import {Link, IndexLink} from 'react-router';
import {
  BaseComponent, Console, ButtonGroup, Button, Popup, Modal
  Dropdown, Accordion, Message
} from '../../../artui/react';

import ProjectSummary from './summary';
import FilterBar from './filter-bar';

function Settings(props) {
  return (
    <Modal {...props} size="tiny" closable={true}>
      <div className="content">
        <form className="ui inline form">
          <div className="field">
            <label>Charts per line</label>
            <input type="number" name="" />
          </div>
          <div className="field">
            <label>Project ID</label>
            <input type="text" name="project_id" />
          </div>
        </form>
      </div>
      <div className="actions">
        <div className="ui button deny">Cancel</div>
        <div className="ui button approve labeled">
          <div className="ui button orange">
            <i className="save icon"/>Register
          </div>
        </div>
      </div>
    </Modal>
  )
}

class LiveMonitoring extends BaseComponent {

  static contextType = {
    userInstructions: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this._el = null;
    this._skey = 'cloud_monitoring_addedProject';
    this.state = {
      showAddPanel: true,
      addedProjects: store.has(this._skey) ? store.get(this._skey) : []
    };
    
    this.handleProjectSelected.bind(this);
  }

  componentDidMount() {
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
      
      store.set(this._skey, addedProjects);
      this.setState({addedProjects: addedProjects});
    }
  }
  
  handleProjectRemove(project) {
    let {addedProjects} = this.state;
    _.remove(addedProjects, (p) => {
      return _.isEqual(p, project)
    });
    
    store.set(this._skey, addedProjects);
    this.setState({addedProjects});
  }

  render() {
    const {addedProjects, showAddPanel, showSettings} = this.state;
    const userInstructions = this.context.userInstructions;
    
    const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';

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
                <Popup position="bottom right">
                  <i className={panelIconStyle}/>
                  <span className="ui mini popup">Expand & Close Add Panel</span>
                </Popup>
              </Button>
              <Button onClick={() => this.setState({showSettings: true})}>
                <Popup position="bottom right">
                  <i className="setting icon"/>
                  <span className="ui mini popup">Layout Setting</span>
                </Popup>
              </Button>
            </ButtonGroup>
          </div>

          <div className="ui vertical segment filterPanel"
               ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>
            
            {userInstructions && userInstructions.cloudmonitor &&
            <Message dangerouslySetInnerHTML={{__html: userInstructions.cloudmonitor}}/>}
            <FilterBar onSubmit={this.handleFilterChange.bind(this)}/>
          </div>

          <div className="ui vertical segment">
            <div className="ui four cards">
              {addedProjects.map((project, index) => {
                return <ProjectSummary {...project} key={index}
                                       onClose={() => this.handleProjectRemove(project)} />
              })}
            </div>
          </div>
        </div>
        { showSettings && <Settings onClose={() => this.setState({showSettings: false})}/> } 
      </Console.Content>
    )
  }
}

export default LiveMonitoring;