import React from 'react';
import _ from 'lodash';
import store from 'store';
import ReactDOM from 'react-dom';
import {Link, IndexLink} from 'react-router';
import {
  BaseComponent, Console, ButtonGroup, Button, Popup, Modal, Dropdown, Message
} from '../../../artui/react';

import ProjectSummary from './summary';
import FilterBar from './filter-bar';

class Settings extends BaseComponent {

  constructor(props) {
    super(props);
  }
  
  render(){
    return (
      <Modal {...this.props} size="tiny" closable={true}>
        <div className="content">
          <form className="ui inline form">
            <div className="field">
              <label>Charts per line</label>
              <Dropdown className="compact" mode="select"
                        onChange={(value, text) => {this.setState({view: value, viewText: text})}}>
                <div className="menu">
                  <div className="item" data-value="one">1</div>
                  <div className="item" data-value="two">2</div>
                  <div className="item" data-value="three">3</div>
                  <div className="item" data-value="four">4</div>
                  <div className="item" data-value="five">5</div>
                  <div className="item" data-value="six">6</div>
                </div>
              </Dropdown>
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui button deny">Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange">
              <i className="save icon"/>Save
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

class LiveMonitoring extends BaseComponent {

  static contextType = {
    userInstructions: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this._el = null;
    this._skey = store.get('userName') + '_real_time_alert_addedProject';
    this.state = {
      showAddPanel: true,
      addedProjects: store.has(this._skey) ? store.get(this._skey) : []
    };
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
    let storeName = project['projectName'] + '_' + project['modelType'] + '_' +
      project['pvalue'] + '_' + project['cvalue'];
    store.remove(storeName);
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
            <ButtonGroup className="right floated basic icon">
              <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                <Popup position="bottom right">
                  <i className={panelIconStyle}/>
                  <span className="ui mini popup">Expand & Close Add Panel</span>
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
            <div className="ui three cards">
              {addedProjects.map((p, index) => {
                let key = p.projectName + p.modelType + 
                  p.pvalue.toString() + p.cvalue.toString();
                return <ProjectSummary {...p} key={key}
                                       onClose={() => this.handleProjectRemove(p)} />
              })}
            </div>
          </div>
        </div>
        { showSettings &&
        <Settings onClose={() => this.setState({showSettings: false})} />
        }
      </Console.Content>
    )
  }
}

export default LiveMonitoring;