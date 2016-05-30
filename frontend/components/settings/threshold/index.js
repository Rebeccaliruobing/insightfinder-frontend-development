import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';
import {Console, ButtonGroup, Button, Dropdown, Accordion, Message} from '../../../artui/react/index';


import FilterBar from  './filter-bar';

export default class ThresholdSettings extends React.Component {
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
      params: {
        showAddPanel: false,
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
    this.$filterPanel.slideUp();
    alert(JSON.stringify(data));
  }

  render() {
    const {view} = this.state;
    const {userInstructions} = this.context;
    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
            <div className="ui breadcrumb">
              <IndexLink to="/" className="section">Home</IndexLink>
              <i className="right angle icon divider"/>
              <Link to="/settings" className="section">Settings</Link>
              <i className="right angle icon divider"/>
              <div className="active section">Threshold</div>
            </div>
            <ButtonGroup className="right floated basic icon">
              <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                <i className="ellipsis horizontal icon"/>
              </Button>
              <Button>
                <i className="setting icon"/>
              </Button>
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

          <div className="ui vertical segment filterPanel" style={{display: 'none'}}
               ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>
            <i className="close link icon" style={{float:'right'}}
               onClick={this.handleToggleFilterPanel.bind(this)}/>
            <FilterBar {...this.props} onSubmit={this.handleFilterChange.bind(this)}/>
            <Message dangerouslySetInnerHTML={{__html: ""}}/>
          </div>

          <div className="ui vertical segment">

          </div>
        </div>
      </Console.Content>
    );
  }
}