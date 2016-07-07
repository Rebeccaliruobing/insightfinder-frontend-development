import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

import {Console, ButtonGroup, Button, Popup, Dropdown, Accordion, Message} from '../../../artui/react';
import FilterBar from './filter-bar';
import apis from '../../../apis';

export default class SummaryReport extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    let weeks = 1;
    this.state = {
      view: 'chart',
      dateIndex: 0,
      timeIndex: 0,
      summaryReport: '',
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

  handleRefresh(){
    this.handleFilterSubmit(this.state.projectName);
  }

  handleToggleFilterPanel() {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleFilterChange(data) {
    //this.$filterPanel.slideUp();
    apis.postDashboardDailySummaryReport(false).then((resp) => {
      this.setState({summaryReport: resp.data.content, projectName: data.projectName})
    }).catch(()=> {

    });
  }

  handleFilterSubmit(data) {
    //this.$filterPanel.slideUp();
    apis.postDashboardDailySummaryReport(true).then((resp) => {
      this.setState({summaryReport: resp.data.content, projectName: data.projectName})
    }).catch(()=> {

    });
  }

  render() {
    const {view, showAddPanel, params} = this.state;
    const {userInstructions} = this.context;
    const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';
    var summaryReport = this.state.summaryReport;
    summaryReport = summaryReport.split("<\/th>").join("").split("<\/td>").join("");
    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
            <ButtonGroup className="left floated">
              <Button className="labeled icon " onClick={this.handleRefresh.bind(this)}>
                <i className="icon refresh"/>Refresh
              </Button>
            </ButtonGroup>
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
            <FilterBar {...this.props} onSubmit={this.handleFilterSubmit.bind(this)} onChange={this.handleFilterChange.bind(this)}/>
            {userInstructions.clouddailysummary &&
            <Message dangerouslySetInnerHTML={{__html: summaryReport}}/>
            }
          </div>

          <div key={Date.now()} className="ui vertical segment"
               dangerouslySetInnerHTML={{__html: this.state.summaryReport}}
               ref={this.summaryRef.bind(this)}></div>
        </div>
      </Console.Content>
    );

  }

  summaryRef(r) {
    // TODO: 接口返回有误,修正后改回

    // true line
    $(ReactDOM.findDOMNode(r)).find(`#dailysummary_${this.state.projectName.replace('@','---')}`).show();

    // temp line
    // $(ReactDOM.findDOMNode(r)).find("[id^=dailysummary_]").show();
  }
}