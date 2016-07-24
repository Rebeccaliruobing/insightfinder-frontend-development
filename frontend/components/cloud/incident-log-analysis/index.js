import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Popup, Dropdown, Accordion, Message} from '../../../artui/react/index';

import FilterBar from  './filter-bar';

export default class IncidentDetection extends Component {

  static contextTypes = {
    userInstructions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    let weeks = 1;
    this.state = {
      view: 'chart',
      dateIndex: 0,
      timeIndex: 0,
      loading: false,
      showAddPanel: true,
      params: {
        projects: [],
        weeks: weeks,
        endTime: moment(new Date()).toDate(),
        startTime: moment(new Date()).add(-7 * weeks, 'days')
      }
    };
  }

  componentDidMount() {

  }

  handleToggleFilterPanel() {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleLogFilterChange(data) {

    let {projectName, pvalue, cvalue, modelType} = data;
    let startTime = moment(data.startTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let endTime = moment(data.endTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let modelStartTime = moment(data.modelStartTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let modelEndTime = moment(data.modelEndTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let isExistentIncident = data.isExistentIncident;
    window.open(`/incidentLogAnalysis?${$.param(Object.assign({}, {
      startTime,
      endTime,
      projectName,
      pvalue,
      cvalue,
      modelType,
      modelStartTime, 
      modelEndTime,
      isExistentIncident
    }))}`, '_blank');
  }

  handleFilterChange(data) {

    let {projectName, pvalue, cvalue, modelType} = data;
    let startTime = moment(data.startTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let endTime = moment(data.endTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let modelStartTime = moment(data.modelStartTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let modelEndTime = moment(data.modelEndTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let isExistentIncident = data.isExistentIncident;
    window.open(`/incidentAnalysis?${$.param(Object.assign({}, {
      startTime,
      endTime,
      projectName,
      pvalue,
      cvalue,
      modelType,
      modelStartTime, 
      modelEndTime,
      isExistentIncident
    }))}`, '_blank');
  }

  render() {
    const {showAddPanel} = this.state;
    const {userInstructions} = this.context;
    const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';
    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
            <ButtonGroup className="right floated basic icon">
              <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                <Popup position="bottom right">
                  <i className={panelIconStyle}/>
                  <span className="ui mini popup">Expand & Close</span>
                </Popup>
              </Button>
              <Button>
                <i className="setting icon"/>
              </Button>
            </ButtonGroup>
          </div>

          <div className="ui vertical segment filterPanel"
               ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>

            <i className="close link icon" style={{float:'right', marginTop: '-10px'}}
               onClick={this.handleToggleFilterPanel.bind(this)}/>

            <FilterBar {...this.props} onSubmit={this.handleFilterChange.bind(this)} onLogSubmit={this.handleLogFilterChange.bind(this)}/>
            <Message dangerouslySetInnerHTML={{__html: userInstructions.cloudincident}}/>
          </div>

          <div className="ui vertical segment">
          </div>
        </div>
      </Console.Content>
    );
  }
}