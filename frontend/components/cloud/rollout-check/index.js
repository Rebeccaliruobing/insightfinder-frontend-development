import React, {Component} from 'react';
import store from 'store';
import {Link, IndexLink} from 'react-router';
import RcSlider from '../../ui/rc-slider';
import HeatMapCard from '../../ui/heat-map-card';
import {
  Modal, Console, ButtonGroup, Button, Popup, Dropdown, Accordion, Message
} from '../../../artui/react/index';
import {Dygraph} from '../../../artui/react/dataviz';

import apis from '../../../apis';

import FilterBar from './filter-bar';


export default class RolloutCheck extends Component {
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
      showAddPanel: true,
      params: {
        projects: [],
        weeks: weeks,
        endTime: moment(new Date()).toDate(),
        startTime: moment(new Date()).add(-7 * weeks, 'days')
      },
      data: {},
      tabStates: {
        holistic: 'active',
        split: ''
      }
    };
  }

  componentDidMount() {
  }

  handleData(data) {
    this.setState({data: data}, ()=> {
      this.setHeatMap(_.keys(this.state.data.modelData)[1]);
    })
  }

  setHeatMap(groupId = 1) {
    let modelData = this.state.data && this.state.data.modelData;
    if (!modelData) return;
    let holisticGroup, splitGroup;
    let handleGroup = (group, groupId)=> {
      return group.map((data, index)=> {
        let dataArray = [];
        let title
          , startTime = data.startTime.substr(5, 11).replace("T", " ")
          , endTime = data.endTime.substr(5, 11).replace("T", " ");
        data.NASValues.forEach((line, index) => {
          var lineArray = line.split(",");
          var colIndex = lineArray.splice(0, 1);
          dataArray.push({
            colIndex: colIndex % 32,
            rowIndex: parseInt(index / 32),
            value: lineArray[lineArray.length - 2]
          });
        });

        let params = {
          projectName: this.state.data.projectName,
          startTime: data.startTime,
          endTime: data.endTime
        };


        let metricNames = "";
        if (data.metricNameList && data.metricNameList != undefined) {
          metricNames = `(${new Array(...new Set(data.metricNameList.map((m)=>m.split("[")[0]))).join(",")})`
        }
        if (!groupId) {
          title = <span>Holistic {metricNames}<br/>{startTime}-{endTime} </span>
        } else {
          title = <span>Group {groupId} {metricNames}<br/>{startTime}-{endTime}</span>
        }

        if (!groupId) {
          params.pvalue = this.state.data.pvalue;
          params.cvalue = this.state.data.cvalue;
          params.isExistentIncident = true;
          params.modelType = "Holistic";
          params.modelStartTime = params.startTime;
          params.modelEndTime = params.endTime;
        }
        if (data.instanceName) {
          title = data.instanceName;
          params.instanceName = data.instanceName;
        } else {
          params.groupId = data.groupId;
        }


        if (!groupId) {
            return {
              key: `${groupId}-${index}`,
              duration: 120,
              itemSize: 4,
              title: title,
              data: dataArray,
              link: `/incidentAnalysis?${$.param(params)}`
            };
        }
        else {
            return {
              key: `${groupId}-${index}`,
              duration: 120,
              itemSize: 4,
              title: title,
              data: dataArray,
              link: `/projectDataOnly?${$.param(params)}`
            };
        }
      })
    };
    if (modelData[0]) {
      holisticGroup = handleGroup(modelData[0], 0)
    }
    if (modelData[groupId]) {
      splitGroup = handleGroup(modelData[groupId], groupId)
    }

    this.setState({holisticGroup, splitGroup, groupId: groupId});
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
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    });

          resp.data.originData = Object.assign({}, resp.data);
          resp.data.projectName = data.projectName;

          resp.data.rolloutCheckModelKeyList = JSON.parse(resp.data.rolloutCheckModelKeyList);
          resp.data.splitByInstanceModelData = JSON.parse(resp.data.splitByInstanceModelData);
          resp.data.holisticModelData = JSON.parse(resp.data.holisticModelData);
          resp.data.splitByGroupModelData = JSON.parse(resp.data.splitByGroupModelData);
          resp.data.modelData = resp.data.rolloutCheckModelKeyList;
          
          resp.data.pvalue = data.pvalue;
          resp.data.cvalue = data.cvalue;
          let groups = {};
          resp.data.modelData.forEach((dataArray)=> {
            dataArray.mapData.forEach((data)=> {
              if (!groups[data.groupId]) {
                groups[data.groupId] = []
              }
              groups[data.groupId].push(Object.assign({}, data, {
                startTime: dataArray.startTime,
                endTime: dataArray.endTime
              }));
            });
          });
          resp.data.modelData = groups;
          this.handleData(resp.data);
        }
        this.setState({loading: false});
      }).catch(()=> {
        this.setState({loading: false});
      })
    });
  }

  renderSlider() {

    let data = this.state.data.modelData;
    if (data === undefined) return;
    let marks = data && data.map((item, index)=> `
      ${moment(item.startTime).format('MM-DD HH:mm')} \n
      ${moment(item.endTime).format('MM-DD HH:mm')}
    `).sort();
    if (!marks) return;
    if (marks === undefined) return;
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

  selectTab(e, tab) {
    var tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, function (val) {
      return '';
    });
    tabStates[tab] = 'active';
    this.setState({tabStates: tabStates});
  }

  render() {
    const {showAddPanel, tabStates} = this.state;
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
            <FilterBar loading={this.state.loading} {...this.props} onSubmit={this.handleFilterChange.bind(this)}/>
            <Message dangerouslySetInnerHTML={{__html: userInstructions.cloudrollout}}/>
          </div>

          <div className="ui vertical segment">
            <div className="ui info message">
              Each heat map models the behavior of one instance. Red areas represent frequent behaviors
              (i.e. normal states) and the size of the red areas indicates the ranges of different metric
              values.
            </div>

            <Console.Content>
              <div className="ui main tiny container" ref={c => this._el = c}>
                <div className="ui clearing vertical segment">

                </div>
                <div className="ui pointing secondary menu">
                  <a className={tabStates['holistic'] + ' item'}
                     onClick={(e) => this.selectTab(e, 'holistic')}>Holistic</a>
                  <a className={tabStates['split'] + ' item'}
                     onClick={(e) => this.selectTab(e, 'split')}>Split</a>
                </div>
                <div className={tabStates['holistic'] + ' ui tab '}>
                  {tabStates['holistic'] === 'active' ? (
                    <div className="ui four cards">
                      {this.state.holisticGroup && this.state.holisticGroup.map((data,)=> <HeatMapCard {...data}/>)}
                    </div>
                  ) : null}
                </div>
                <div className={tabStates['split'] + ' ui tab '}>
                  {tabStates['split'] === 'active' ? (
                    <div>
                      <div style={{padding: '10px 0'}}>
                        <Dropdown keys={_.keys(this.state.data.modelData).length} mode="select"
                                  value={`Group ${this.state.groupId}`} onChange={(v)=>this.setHeatMap(v)}>
                          <i className="dropdown icon"/>
                          <div className="menu">
                            {_.keys(this.state.data.modelData).map((g)=> {
                              return g > 0 && <div className="item" key={g} data-value={g}>Group {g}</div>
                            })}
                          </div>
                        </Dropdown>
                      </div>
                      <div className="ui four cards">
                        {this.state.splitGroup && this.state.splitGroup.map((data,)=> <HeatMapCard {...data}/>)}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </Console.Content>
          </div>
        </div>
      </Console.Content>
    );
  }
}
