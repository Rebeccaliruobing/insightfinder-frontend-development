import React, {Component}   from 'react';
import store                from 'store';
import {Link, IndexLink}    from 'react-router';
import RcSlider             from '../../ui/rc-slider';
import HeatMapCard          from '../../ui/heat-map-card';
import {
  Modal, Console, ButtonGroup, Button, Popup, Dropdown, Accordion, Message
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
      heatMaps: [],
      dateIndex: 0,
      timeIndex: 0,
      showAddPanel: true,
      marks: [],
      params: {
        projects: [],
        weeks: weeks,
        endTime: moment(new Date()).toDate(),
        startTime: moment(new Date()).add(-7 * weeks, 'days')
      },
      data: {}
    };
    this.handleDateIndexChange = this.handleDateIndexChange.bind(this)
  }

  componentDidMount() {
  }

  handleState(state) {
    this.setState(state, ()=> this.setHeatMap(0, 0))
  }

  setHeatMap(dateIndex = 0) {
    let mark = this.state.marks[dateIndex];
    let [startTime, endTime] = mark.split("\n");
    let model = this.state.modelData.find((d)=>d.startTime == startTime);
    let maps = [];
    if (model) {
      maps = model.mapData.filter((data)=> !!data.NASValues).map((data, index)=> {
        let dataArray = [];
        data.NASValues.forEach((line, index) => {
          var lineArray = line.split(",");
          var colIndex = lineArray[0];
          dataArray.push({
              colIndex: colIndex % 32,
              rowIndex: parseInt(index / 32),
              value: lineArray[1]
          });
        });

        let title, groupId, params = {
          projectName: this.state.projectName,
          startTime,
          endTime
        };
        if (data.instanceName) {
          title = data.instanceName;
          params.instanceName = data.instanceName;
        } else {
          params.groupId = groupId = data.groupId;
        }

        return {
          key: `${dateIndex}-${index}`,
          duration: 120,
          itemSize: 4,
          title,
          data: dataArray,
          link: `/projectDataOnly?${$.param(params)}`
        }
      });
    } else {
      maps = [{}]
    }


    this.setState({heatMaps: maps, dateIndex});
  }

  handleDateIndexChange(markIndex) {
    this.setHeatMap(parseInt(markIndex))
  }

  handleToggleFilterPanel() {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleFilterChange(data) {
    let startTime = moment(data.startTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let endTime = moment(data.endTime).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    this.setState({loading: true}, () => {
      apis.postCloudOutlierDetection(startTime, endTime, data.projectName, 'cloudoutlier').then((resp)=> {
        if (resp.success) {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    });
          let state = {};
          state.projectName = data.projectName;
          state.originData = Object.assign({}, resp.data);
          state.splitByInstanceModelData = JSON.parse(resp.data.splitByInstanceModelData);
          state.holisticModelData = JSON.parse(resp.data.holisticModelData);
          state.splitByGroupModelData = JSON.parse(resp.data.splitByGroupModelData);
          state.modelData = state.splitByInstanceModelData;
          state.marks = new Array(
            ...new Set(_.sortBy(state.holisticModelData.filter((d)=>!!d.startTime), (d)=>d.startTime)
              .map((d)=>`${d.startTime}\n${d.endTime}`)
            )
          );
          this.handleState(state);
        }
        this.setState({loading: false});
      }).catch(()=> {
        this.setState({loading: false});
      })
    });
  }

  renderSlider() {
    let marks = this.state.marks;
    if (!marks && marks.length == 0) return;

    const dateIndex = this.state.dateIndex;

    marks = marks.map((mark, index)=> {
      return !(index % Math.max(parseInt(marks.length / 10), 1)) ? mark.split("\n").map((date)=>date.substring(5, 16).split("T").join(" ")).join("\n") : ''
    });

    return (
      <div className="padding40">
        {this.state.data && (
          <RcSlider onChange={this.handleDateIndexChange} max={marks.length - 1} value={dateIndex} marks={marks}/>
        )}
      </div>
    )
  }

  render() {
    const {showAddPanel} = this.state;
    const {userInstructions} = this.context;
    const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';
    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>

          <div className="ui vertical segment filterPanel"
               ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>
            <FilterBar loading={this.state.loading} {...this.props} onSubmit={this.handleFilterChange.bind(this)}/>
            <Message dangerouslySetInnerHTML={{__html: userInstructions.cloudoutlier}}/>
          </div>

          <div className="ui vertical segment">
            <div className="ui info message">
              Each heat map models the behavior of one instance. Red areas represent frequent behaviors
              (i.e. normal states) and the size of the red areas indicates the ranges of different metric
              values.
            </div>
            {this.renderSlider()}
            <div className="ui four cards">
              {this.state.heatMaps.map((heatObj)=><HeatMapCard {...heatObj}/>)}
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }
}
