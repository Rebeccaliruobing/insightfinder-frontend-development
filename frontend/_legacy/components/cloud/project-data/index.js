import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import {Console, ButtonGroup, Button, Popup, Dropdown, Accordion, Message} from '../../../artui/react/index';
import apis from '../../../apis';

import FilterBar from  './filter-bar';

export default class ProjectData extends Component {

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

  handleFilterChange(data) {

    let {projectName, pvalue, cvalue, modelType, modelKey} = data;
    let startTime = moment(data.startTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let endTime = moment(data.endTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    window.open(`/projectData?${$.param(Object.assign({}, {
      startTime,
      endTime,
      projectName,
      pvalue,
      cvalue,
      modelType,
      modelKey
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

            <FilterBar {...this.props} onSubmit={this.handleFilterChange.bind(this)}/>
            <Message dangerouslySetInnerHTML={{__html: userInstructions.cloudprojectdata}}/>
          </div>

          <div className="ui vertical segment">
          </div>
        </div>
      </Console.Content>
    );
  }
}
