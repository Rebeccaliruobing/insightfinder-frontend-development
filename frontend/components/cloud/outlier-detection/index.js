import React, {Component} from 'react';
import store from 'store';
import {Link, IndexLink} from 'react-router';
import RcSlider from '../../ui/rc-slider';
import HeatMap from '../../ui/graph/HeatMap';
import {
  Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
} from '../../../artui/react/index';
import {Dygraph} from '../../../artui/react/dataviz';

import apis from '../../../apis';

import mockData from '../../../mock/cloud/OutlierDetection.json';

import FilterBar from './filter-bar';


class DisplayChart extends Component {

  handleHighlight(v) {
    return Math.max.apply(Math, v) > 850 ? "rgba(255, 255, 102, 1.0)" : "rgba(102, 255, 102, 1.0)"
  }

  render() {
    return (
      <Dygraph
        data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
        labels={['x', 'y']}
        style={{height: 150}}
        highlightCircleSize={2}
        highlightSeriesOpts={{
                  strokeWidth: 3,
                  strokeBorderWidth: 1,
                  highlightCircleSize: 5}}
        highlightCallback={this.handleHighlight}/>

    )
  }
}

class HeatMapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      chart: <DisplayChart/>
    };
  }

  handleHighlight(v) {
    return Math.max.apply(Math, v) > 850 ? "rgba(255, 255, 102, 1.0)" : "rgba(102, 255, 102, 1.0)"
  }

  showPopup() {
    this.setState({showPopup: true});
  }

  hidePopup() {
    this.setState({showPopup: false});
  }

  render() {
    let {showPopup} = this.state;
    let {duration, itemSize, dateIndex, data} = this.props;

    let groups = [
      'Summary',
      'Normalization Group 1', 'Normalization Group 2', 'Normalization Group 3',
      // 'Normalization Group 4', 'Normalization Group 5', 'Normalization Group 6'
    ];
    return (
      <div className="ui card">
        <div className="image">
          <a target="_blank" onClick={this.showPopup.bind(this)}>
            <HeatMap duration={duration} itemSize={itemSize} data={data}/>
          </a>
        </div>
        <div className="content">
          <div className="meta">
              <span className="date">
                  {moment(this.props.title).format('YYYY-MM-DD HH:mm')}
              </span>
          </div>
        </div>
        {showPopup &&
        <div className="ui dimmer modals page transition visible active"
             style={{display: 'block !important', overflow: 'auto'}} key={Date.now()}>
          <div className="ui standard test modal transition visible active scrolling"
               style={{display: 'block !important', top: 188}}>
            <div className="header">
              Group 1
            </div>
            <div className="content">
              <div style={{width: '100%'}}>

                <Dygraph
                  data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                  labels={['x', 'y']}
                  style={{height: 150, width: '100%'}}
                  highlightCircleSize={2}
                  highlightSeriesOpts={{
                                          strokeWidth: 3,
                                          strokeBorderWidth: 1,
                                          highlightCircleSize: 5}}
                  highlightCallback={this.handleHighlight}/>
              </div>
              <div style={{width: '100%'}}>
                <Dygraph
                  data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                  labels={['x', 'y']}
                  style={{height: 150, width: '100%'}}
                  highlightCircleSize={2}
                  highlightSeriesOpts={{
                                          strokeWidth: 3,
                                          strokeBorderWidth: 1,
                                          highlightCircleSize: 5}}
                  highlightCallback={this.handleHighlight}/>
              </div>
              <div style={{width: '100%'}}>
                <Dygraph
                  data={_.range(0, 100).map((item, index)=>[index, Math.random() * 1000])}
                  labels={['x', 'y']}
                  style={{height: 150, width: '100%'}}
                  highlightCircleSize={2}
                  highlightSeriesOpts={{
                                          strokeWidth: 3,
                                          strokeBorderWidth: 1,
                                          highlightCircleSize: 5}}
                  highlightCallback={this.handleHighlight}/>
              </div>
            </div>
            <div className="actions">
              <div className="ui black deny button" onClick={this.hidePopup.bind(this)}>
                Close
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default class OutlierDetection extends Component {
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

  handleData(data) {
    this.setState({data: data}, ()=> {
      this.setHeatMap(0, 0);
    })
  }

  setHeatMap(dateIndex = 0, timeIndex = 0) {
    let maps;
    if (_.isArray(this.state.data.splitByInstanceModelData[dateIndex].mapData)) {
      maps = this.state.data.splitByInstanceModelData[dateIndex].mapData.map((data, index)=> {
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
        return <HeatMapCard key={`${dateIndex}-${index}`} duration={300} itemSize={4} title={data.startTime}
                            dateIndex={dateIndex} data={dataArray}/>;
      });
    } else {
      let dataArray = [];
      this.state.data.splitByInstanceModelData[dateIndex].mapData.NASValues.forEach((line, index) => {
        var lineArray = line.split(",");
        var colIndex = lineArray.splice(0, 1);
        dataArray.push({
          colIndex: colIndex % 32,
          rowIndex: parseInt(index / 32),
          value: lineArray[lineArray.length - 2]
        });
      });
      maps = <HeatMapCard key={`${dateIndex}`} duration={300} itemSize={4}
                          title={this.state.data.splitByInstanceModelData[dateIndex].startTime}
                          dateIndex={dateIndex} data={dataArray}/>
    }

    this.setState({heatMaps: maps});
  }

  handleDateIndexChange(value) {
    this.setState({
      dateIndex: parseInt(value),
    }, ()=> {
      this.setHeatMap(this.state.dateIndex, this.state.timeIndex);
    })
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
      apis.postCloudOutlierDetection(startTime, endTime, data.projectName, 'cloudoutlier').then((resp)=> {
        if (resp.success) {
          resp.data.splitByInstanceModelData = JSON.parse(resp.data.splitByInstanceModelData);
          resp.data.holisticModelData = JSON.parse(resp.data.holisticModelData);
          resp.data.splitByGroupModelData = JSON.parse(resp.data.splitByGroupModelData);
          this.handleData(resp.data);
          this.$filterPanel.slideUp()
        }
        this.setState({loading: false});
      }).catch(()=> {
        this.setState({loading: false});
      })
    });
  }

  render() {
    const {view, showAddPanel, params} = this.state;
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
              <div className="active section">Outlier Detection</div>
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
            <i className="close link icon" style={{float:'right', marginTop: '-10px'}}
               onClick={this.handleToggleFilterPanel.bind(this)}/>
            <FilterBar loading={this.state.loading} {...this.props} onSubmit={this.handleFilterChange.bind(this)}/>
            <Message dangerouslySetInnerHTML={{__html: userInstructions.cloudoutlier}}/>
          </div>

          <div className="ui vertical segment">
            <div className="ui info message">
              Each heat map models the behavior of one instance. Red areas represent frequent behaviors
              (i.e. normal states) and the size of the red areas indicates the ranges of different metric
              values.
            </div>
            <div className="padding40">
              {this.state.data && (
                <RcSlider max={this.state.data.splitByInstanceModelData.length - 1}
                          value={this.state.dateIndex}
                          marks={this.state.data.splitByInstanceModelData.map((item, index)=> moment(item.startTime).format('YYYY-MM-DD HH:mm')).sort()}
                          onChange={this.handleDateIndexChange.bind(this)}/>
              )}
            </div>
            <div className="ui four cards">
              {this.state.heatMaps}
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }
}