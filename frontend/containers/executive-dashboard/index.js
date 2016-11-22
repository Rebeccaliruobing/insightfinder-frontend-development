import React, {Component} from 'react';
import store from 'store';
import {autobind} from 'core-decorators';
import {Console, Button} from '../../artui/react';
import DateTimePicker from "../../components/ui/datetimepicker/index";

import apis from '../../apis';
import {GroupStatistics} from '../../components/statistics';
import { LiveGroupSelection,NumberOfDays, EventSummaryModelType
} from '../../components/selections';

class ExecutiveDashboard extends Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {
        statistics: {},
        summary: {},
        eventStats:{},
      },
      loading: true,
      groupName: undefined,
      selectedIncident: undefined,
      numberOfDays: "7",
      endTime: moment(),
      modelType:"Holistic",
      selectedInstance: undefined,
    };
  }
// TO-DO  Add concept of "groups"
  componentDidMount() {
    let groups = (this.context.dashboardUservalues || {}).groupSettingsAllInfo || [];
    //projects = projects.filter((item, index) => item.fileProjectType!=0);
    // remember select
    if (groups.length > 0) {
      let refreshName = store.get('lastUsedGroupName')?store.get('lastUsedGroupName'): groups[0].groupName;
      this.handleGroupChange(refreshName, refreshName);
    } else {
      const url = `/newgroup/group-list/custom`;
      window.open(url, '_self');
    }
  }

  @autobind
  handleModelTypeChange(value, modelType) {
    let { groupName } = this.state;
    this.setState({
      modelType:modelType,
    }, () => {
      this.refreshGroupName(groupName);
    });
  }

  @autobind
  handleDayChange(value, numberOfDays) {
    let { groupName } = this.state;
    this.setState({
      numberOfDays:numberOfDays.toString(),
    }, () => {
      this.refreshGroupName(groupName);
    });
  }

  @autobind
  handleEndTimeChange(value, endTime) {
    let newEndTime = moment(value).endOf('day');
    let curTime = moment();
    if(newEndTime>curTime){
      newEndTime = curTime;
    }

    let { groupName } = this.state;
    this.setState({
      endTime: newEndTime,
    }, () => {
      this.refreshGroupName(groupName);
    });
  }

  refreshGroupName(groupName) {
    const {numberOfDays,endTime,modelType} = this.state;
    let groupParams = (this.context.dashboardUservalues || {}).groupModelAllInfo || [];
    let groupParam = groupParams.find((p) => p.groupName == groupName);
    let pvalue = groupParam ? groupParam.pvalue : "0.99";
    let cvalue = groupParam ? groupParam.cvalue : "1";
    let endTimestamp = +moment(endTime);
    store.set('mostRecentGroupName', groupName);
    this.setState({ loading: true, groupName });
    apis.getGroupStats(groupName, modelType, pvalue, cvalue, endTimestamp, numberOfDays, 2)
      .then(data => {
        let anomalyRatioLists = data.incidents.map(function (value,index) {
          return value['anomalyRatio']
        });
        this.setState({
          loading: false,
          data,
					duration,
          endTimestamp: data.endTimestamp
        	}, ()=>{} 
					}})
      .catch(msg => {
        this.setState({ loading: false });
        console.log(msg);
        // alert(msg);
      });
  }

  @autobind
  handleGroupChange(value,groupName){
    this.setState({
      endTime: moment(),
      numberOfDays: "7",
      modelType:"Holistic",
      currentTreemapData: undefined,
    });
    this.refreshGroupName(groupName);
  }

  modelDateValidator(date) {
    let timestamp = moment(date);
    let curTimestamp = moment();
    return timestamp<=curTimestamp;
  }

  @autobind
  feedbackData(data) {
    if(data){
      this.setState({
        currentTreemapData: data,
        selectedInstance: data.instanceName,
        startTimestamp: data.startTimestamp,
        endTimestamp: data.endTimestamp,
      });
    }
  }

  render() {
    let { loading, data, groupName,
      endTime, numberOfDays, modelType} = this.state;
    let latestTimestamp = data['instanceMetricJson'] ? data['instanceMetricJson']['latestDataTimestamp'] : undefined;
    let instanceStatsMap = data['instanceMetricJson'] ? data['instanceMetricJson']['instanceStatsJson'] : {};
    let instanceMetaData = data['instanceMetaData'] ? data['instanceMetaData'] : {};
    let refreshName = store.get('liveAnalysisProjectName')?store.get('liveAnalysisProjectName'): projectName;
    let groupType = data['groupType']?data['groupType']:'';
    return (
      <Console.Content
        className={loading ? 'Loading...' : ''}
        style={{ background: '#f5f5f5' }}
      >
        <div className="ui main tiny container" style={{ minHeight: '100%', display: loading && 'none' }}>
          <div
            className="ui right aligned vertical inline segment"
            style={{ zIndex: 1, margin: '0 -16px', padding: '9px 16px', background: 'white' }}
          >
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Group Name:</label>
              <LiveGroupSelection value={groupName} onChange={this.handleGroupChange} style={{minWidth: 200}}/>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>End date:</label>
                <div className="ui input">
                  <DateTimePicker className='ui input' style={{'width': '50%'}}
                              dateValidator={this.modelDateValidator.bind(this)}
                              dateTimeFormat='YYYY-MM-DD' value={endTime}
                              onChange={this.handleEndTimeChange}/>
                </div>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Number of Days:</label>
              <NumberOfDays style={{width: 120}}
                                    value={numberOfDays} onChange={this.handleDayChange}/>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>Model Type:</label>
              <EventSummaryModelType style={{width: 120}}
                                    value={modelType} onChange={this.handleModelTypeChange}/>
            </div>
            <div className="field">
              <div className="ui orange button" tabIndex="0" onClick={()=>this.refreshProjectName(refreshName)}>Refresh</div>
            </div>
          </div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 0, margin: '8px 0', borderBottom: 0 }}
          >
            <GroupStatistics data={data} dur={numberOfDays} />
          </div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 4 }}
          >
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default ExecutiveDashboard;
