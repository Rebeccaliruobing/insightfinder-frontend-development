import React, {Component} from 'react';
import store from 'store';
import {autobind} from 'core-decorators';
import moment from 'moment';
import {Console, Button} from '../../artui/react';
import DateTimePicker from "../../components/ui/datetimepicker/index";
import {ThreeValueBox,HourlyHeatmap,Top5Grid} from "../../components/statistics";

import apis from '../../apis';
import { LiveProjectSelection, NumberOfDays, EventSummaryModelType
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
      },
    };
  }
// TODO  Add concept of "groups"
// TODO  Add "All Projects/Groups" option where appropriate
  componentDidMount() {
    let projects = (this.context.dashboardUservalues || {}).projectSettingsAllInfo || [];
    projects = projects.filter((item, index) => item.fileProjectType!=0);
    // remember select
    if (projects.length > 0) {
      let projectName = store.get('liveAnalysisProjectName') || projects[0].projectName;
      this.handleProjectChange(projectName, projectName);
    }
  }

  @autobind
  handleModelTypeChange(value, modelType) {
    let { projectName } = this.state;
    this.setState({
      modelType:modelType,
    }, () => {
      this.refreshProjectName(projectName);
    });
  }

  @autobind
  handleProjectChange(value, projectName) {
    this.setState({
      projectName,
      endTime: moment().endOf('day'),
      numberOfDays: "7",
      modelType:"Holistic",
      currentTreemapData: undefined,
    }, () => {
      this.refreshProjectName(projectName);
    });
  }

  @autobind
  handleDayChange(value, numberOfDays) {
    let { projectName } = this.state;
    this.setState({
      numberOfDays:numberOfDays.toString(),
    }, () => {
      this.refreshProjectName(projectName);
    });
  }

  @autobind
  handleEndTimeChange(value, endTime) {
    let newEndTime = moment(value).endOf('day');
    let curTime = moment();
    if(newEndTime>curTime){
      newEndTime = curTime;
    }

    let { projectName } = this.state;
    this.setState({
      endTime: newEndTime,
    }, () => {
      this.refreshProjectName(projectName);
    });
  }

  refreshProjectName(projectName) {
    const {numberOfDays,endTime,modelType} = this.state;
    console.log(this.state);
    store.set('liveAnalysisProjectName', projectName);
    this.setState({ loading: true, projectName },()=>{
			if ( projectName !== undefined && projectName.length > 0 &&
					 endTime !== undefined &&
					 numberOfDays !== undefined && numberOfDays > 0 &&
					 modelType !== undefined && modelType.length > 0 ) {
	    	apis.getExecDBStatisticsData(projectName, endTime.format('YYYY-MM-DD HH:mm'), modelType, numberOfDays, true)
 	     	.then(data => {
 	      	this.setState({
 	        	loading: false,
 	         	data
 	       	})  
				})
 	     	.catch(msg => {
 	       	this.setState({ loading: false });
 	       	console.log(msg);
 	       	// alert(msg);
 	     	});
			}
  	});
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
    let { loading, data, projectName,
      endTime, numberOfDays, modelType} = this.state;
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
              <label style={{ fontWeight: 'bold' }}>Project Name:</label>
              <LiveProjectSelection value={projectName} onChange={this.handleProjectChange} style={{minWidth: 200}}/>
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
              <div className="ui orange button" tabIndex="0" onClick={()=>this.refreshProjectName(projectName)}>Refresh</div>
            </div>
          </div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', margin: '8px 0', borderBottom: 0 }}
          >
						<div className="ui compact equal width grid">
							<div className="ui statistic column">
 		           	<ThreeValueBox title='Anomaly Score' duration={numberOfDays}  
									previousValue={data.previousAnomalyScore}
								  currentValue={data.currentAnomalyScore} predictValue={1000}	/
								>
							</div>
							<div className="ui statistic column">
	 	           	<ThreeValueBox title='Total Anomaly Events' 
									duration={numberOfDays} 
									previousValue={data.previousAnomalyScore}
									currentValue={data.currentAnomalyScore} predictValue={1000}	/
								>
							</div>
							<div className="ui statistic column">
 		           	<ThreeValueBox title='Total Anomalies' duration={numberOfDays} 
									previousValue={data.previousAnomalyScore}
									currentValue={data.currentAnomalyScore} predictValue={1000}	/
								>
							</div>
						</div>
					</div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 0, margin: '8px 0', borderBottom: 0 }}
          >
						<div style={{ background: 'white', padding: 4 }} >
							<Top5Grid />
         		</div>
          </div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 0, margin: '8px 0', borderBottom: 0 }}
          >
						<div style={{ background: 'white', padding: 4 }} >
							<HourlyHeatmap />
         		</div>
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default ExecutiveDashboard;
