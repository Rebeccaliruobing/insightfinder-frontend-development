import React, {Component}   from 'react';
import store                from 'store';
import {Link, IndexLink}    from 'react-router';
import RcSlider             from '../../ui/rc-slider';
import HeatMapCard          from '../../ui/heat-map-card';
import {
  Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
import {Dygraph}            from '../../../artui/react/dataviz';
import apis                 from '../../../apis';
import FilterBar            from './filter-bar';

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

    let {mapData, startTime, endTime }= this.state.data.splitByInstanceModelData[dateIndex];
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

      let title, groupId;
      if (data.instanceName) {
        title = data.instanceName;
        groupId = data.instanceName;
      } else {
        title = `Metric Group ${data.groupId}`;
        groupId = data.groupId;
      }
      
      // return <HeatMapCard originData={this.state.data.originData} groupId={groupId} key={`${dateIndex}-${index}`}
      //                     duration={120} itemSize={4} title={title} dateIndex={dateIndex} data={dataArray}
      //                     />;
      return <HeatMapCard originData={this.state.data.originData} groupId={groupId} key={`${dateIndex}-${index}`} duration={120} itemSize={4} title={title}
                          dateIndex={dateIndex} data={dataArray} link={`#/incidentAnalysis?${$.param({
                          metricNameList: data.metricNameList,
                          projectName: this.state.data.projectName, pvalue:0.95,cvalue:3, modelType: "Holistic",
                          startTime, endTime, groupId, instanceName: data.instanceName, modelKey: 'Search by time'
      })}`}/>;
    });

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
          resp.data.projectName = data.projectName;
          resp.data.originData = Object.assign({}, resp.data);
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
          </div>

          <div className="ui vertical segment filterPanel"
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
                          marks={this.state.data.splitByInstanceModelData.map((item, index)=> moment(item.startTime).format('MM-DD HH:mm')).sort()}
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
