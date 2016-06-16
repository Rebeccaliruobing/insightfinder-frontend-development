import React, {Component} from 'react';
import store from 'store';
import {Link, IndexLink} from 'react-router';
import RcSlider from '../../ui/rc-slider';
import HeatMapCard from '../../ui/heat-map-card';
import {
  Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
} from '../../../artui/react/index';
import {Dygraph} from '../../../artui/react/dataviz';

import apis from '../../../apis';

import FilterBar from './filter-bar';


export default class SoftwareRolloutCheck extends Component {
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
      },
      data: {}
    };
  }

  componentDidMount() {
  }

  handleData(data) {
    this.setState({data: data}, ()=> {
      this.setHeatMap(0, 0);
    })
  }

  setHeatMap(dateIndex = 0) {
    let {mapData, startTime, endTime} = this.state.data.modelData[dateIndex];
    let groupIds = [];
    let maps = mapData.map((data, index)=> {
      let dataArray = [];
      data.NASValues.forEach((line, index) => {
        var lineArray = line.split(",");
        var colIndex = lineArray.splice(0, 1);
        dataArray.push({
          colIndex: colIndex % 32,
          rowIndex: parseInt(index / 32),
          value: lineArray[lineArray.length - 2]
        });
      });

      let title, params = {
        projectName: this.state.data.projectName,
        startTime,
        endTime
      };

      if (data.instanceName) {
        title = data.instanceName;
        params.instanceName = data.instanceName;
      } else if (data.groupId + '' == '0') {
        title = 'Holistic(Split model unavailable for this time)';
      } else {
        let metricNames = "";
        if (data.metricNameList) {
          metricNames = `(${new Array(...new Set(data.metricNameList.map((m)=>m.split("[")[0]))).join(",")})`
        }
        title = <span>{`Group ${data.groupId}`}{metricNames}</span>;
        params.groupId = data.groupId;
        groupIds.push(params.groupId);
      }
      return {
        key: `${dateIndex}-${index}`,
        duration: 120,
        itemSize: 4,
        title: title,
        data: dataArray,
        link: `/incidentAnalysis?${$.param(params)}`
      };
    });

    this.setState({heatMaps: maps, dateIndex, groupIds});
  }

  handleDateIndexChange(startIndex) {
    return (value) => this.setHeatMap(parseInt(value + startIndex))
  }

  handleToggleFilterPanel() {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleFilterChange(data) {
    let startTime = moment(data.startTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let endTime = moment(data.endTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    this.setState({loading: true}, () => {
      apis.postCloudRolloutCheck(startTime, endTime, data.projectName, 'cloudrollout').then((resp)=> {
        if (resp.success) {

          resp.data.originData = Object.assign({}, resp.data);
          resp.data.projectName = data.projectName;

          resp.data.splitByInstanceModelData = JSON.parse(resp.data.splitByInstanceModelData);
          resp.data.holisticModelData = JSON.parse(resp.data.holisticModelData);
          resp.data.splitByGroupModelData = JSON.parse(resp.data.splitByGroupModelData);
          resp.data.modelData = resp.data.holisticModelData.concat(resp.data.splitByGroupModelData);
          this.handleData(resp.data);
          this.$filterPanel.slideUp()
        }
        this.setState({loading: false});
      }).catch(()=> {
        this.setState({loading: false});
      })
    });
  }

  renderSlider() {

    let data = this.state.data.modelData;
    let marks = data && data.map((item, index)=> `
      ${moment(item.startTime).format('MM-DD HH:mm')} \n
      ${moment(item.endTime).format('MM-DD HH:mm')}
    `).sort();
    if (!marks) return;
    const dateIndex = this.state.dateIndex;
    marks = marks.map((mark, index)=> !(index % Math.max(parseInt(marks.length / 10), 1)) ? mark : '');
    return (
      <div className="padding40">
        {this.state.data && (
          <RcSlider onChange={this.handleDateIndexChange(0)} max={marks.length - 1} value={dateIndex} marks={marks}/>
        )}
      </div>
    )
  }

  render() {
    const {userInstructions} = this.context;
    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
            <div className="ui breadcrumb">
              <IndexLink to="/" className="section">Home</IndexLink>
              <i className="right angle icon divider"/>
              <Link to="/cloud/monitoring" className="section">Cloud Monitoring</Link>
              <i className="right angle icon divider"/>
              <div className="active section">Software Rollout Check</div>
            </div>
            <ButtonGroup className="right floated basic icon">
              <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                <i className="ellipsis horizontal icon"/>
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
            <FilterBar loading={this.state.loading} {...this.props} onSubmit={this.handleFilterChange.bind(this)}/>
            <Message dangerouslySetInnerHTML={{__html: userInstructions.cloudrollout}}/>
          </div>

          <div className="ui vertical segment">
            <div className="ui info message">
              Each heat map models the behavior of one instance. Red areas represent frequent behaviors
              (i.e. normal states) and the size of the red areas indicates the ranges of different metric
              values.
            </div>
            {this.renderSlider()}
            <div className="ui four cards">
              {this.state.heatMaps.map((data,)=> {
                return <HeatMapCard {...data}/>
              })}
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }
}