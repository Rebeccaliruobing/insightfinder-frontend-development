import React, {Component} from 'react';
import store from 'store';
import {autobind} from 'core-decorators';
import moment from 'moment';
import {Console, Button} from '../../artui/react';
import DateTimePicker from "../../components/ui/datetimepicker/index";
import {ThreeValueBox,HourlyHeatmap,Top5Grid,AutoFixHistory} from "../../components/statistics";

import apis from '../../apis';
import { LiveProjectSelection, ProjectSelection, GroupSelection, NumberOfDays, EventSummaryModelType
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
		
		// Adding two dummy groups and an "All" placeholder
		projects.unshift({ projectName:"All Instances" });
		projects.push({ projectName:"GroupName1" },{ projectName:"GroupName2" });

		this.context.dashboardUserValues = projects;
		//
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
      endTimestamp: moment().endOf('day'),
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
  handleEndTimeChange(value, endTimestamp) {
    let newEndTime = moment(value).endOf('day');
    let curTime = moment();
    if(newEndTime>curTime){
      newEndTime = curTime;
    }

    let { projectName } = this.state;
    this.setState({
      endTimestamp: newEndTime,
    }, () => {
      this.refreshProjectName(projectName);
    });
  }

  refreshProjectName(projectName) {
    const {numberOfDays,endTimestamp,modelType} = this.state;
    console.log(this.state);
    store.set('liveAnalysisProjectName', projectName);
    this.setState({ loading: true, projectName },()=>{
			if ( projectName !== undefined && projectName.length > 0 &&
					 endTimestamp !== undefined &&
					 numberOfDays !== undefined && numberOfDays > 0 &&
					 modelType !== undefined && modelType.length > 0 ) {
	    	apis.getExecDBStatisticsData(projectName, endTimestamp.format('YYYY-MM-DD HH:mm'), modelType, numberOfDays, true)
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
      endTimestamp, numberOfDays, modelType} = this.state;

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
              <ProjectSelection value={projectName} onChange={this.handleProjectChange} style={{minWidth: 200}}/>
            </div>
            <div className="field">
              <label style={{ fontWeight: 'bold' }}>End date:</label>
                <div className="ui input">
                  <DateTimePicker className='ui input' style={{'width': '50%'}}
                              dateValidator={this.modelDateValidator.bind(this)}
                              dateTimeFormat='YYYY-MM-DD' value={endTimestamp}
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
            style={{ background: 'white', margin: '5px 0px', borderBottom: 0 }}
          >
						<h2>&nbsp;Detected/Predicted Anomaly Overview</h2>
						<div className="ui compact equal width grid">
							<div className="ui statistic column">
 		           	<ThreeValueBox title='Anomaly Score' duration={numberOfDays}  
									previousValue={data.prevTotalAnomalyScore}
								  currentValue={data.totalAnomalyScore} predictValue={data.predAnomalyScore}	/
								>
							</div>
							<div className="ui statistic column">
	 	           	<ThreeValueBox title='Total Anomaly Events' 
									duration={numberOfDays} 
									previousValue={data.prevTotalAnomalyEventCount}
									currentValue={data.totalAnomalyEventCount} 
									predictValue={data.predAnomalyEventCount}	/
								>
							</div>
							<div className="ui statistic column">
 		           	<ThreeValueBox title='Total Anomalies' duration={numberOfDays} 
									previousValue={data.prevTotalAnomalyCount}
									currentValue={data.totalAnomalyCount} predictValue={data.predTotalAnomalyCount}	/
								>
							</div>
						</div>
					</div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 0, margin: '20px 0', borderBottom: 0 }}
          >
						<div style={{ background: 'white', padding: 4 }} >
						<h2>Top 5 Projects / Groups</h2>
							<Top5Grid />
         		</div>
          </div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 0, margin: '20px 0', borderBottom: 0 }}
          >
						<div style={{ background: 'white', padding: 4 }} >
						<h2>Hourly Heatmap of Anomalies Detected & Predicted</h2>
							<HourlyHeatmap />
         		</div>
          </div>
          <div
            className="ui vertical segment"
            style={{ background: 'white', padding: 0, margin: '20px 0', borderBottom: 0 }}
          >
						<div style={{ background: 'white', padding: 4 }} >
						<h2>AutoFix Action History</h2>
							<AutoFixHistory />
         		</div>
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default ExecutiveDashboard;
