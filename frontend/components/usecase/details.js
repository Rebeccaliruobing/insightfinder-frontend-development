import React from 'react';
import ReactTimeout from 'react-timeout'
import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../artui/react';
import {Dygraph} from '../../artui/react/dataviz';
import apis from '../../apis';
import LiveAnalysisCharts from '../cloud/liveanalysis'

const ProjectDetails = class extends React.Component {

  static propTypes = {
    updateData: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      view: 'four',
      viewText: 4,
      loading: false,
      selectedGroup: ''
    }
  }

  componentDidMount() {
    (this.props.updateData || this.updateData.bind(this))(this);
  }

  updateData() {

    let {query} = this.props.location;
    let {pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData, modelStartTime, modelEndTime,latestDataTimestamp} = query;
    let startTimestamp = undefined;
    let endTimestamp = undefined;
    if(dataChunkName && dataChunkName.split('_').length>4){
      let parts = dataChunkName.split('_');
      startTimestamp = +moment(parts[3]);
      endTimestamp = +moment(parts[4]);
    }

    this.setState({loading: true}, ()=> {
      apis.postUseCase(pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData, modelStartTime, modelEndTime, latestDataTimestamp)
      .then((resp)=> {
        resp.loading = false;
        this.setState(resp, ()=>{
          // fetch syscall results
          if(projectName && startTimestamp && endTimestamp){
            let projectName0 = projectName + "@" + fromUser;
            apis.postSysCallResult(projectName0, startTimestamp, endTimestamp).then((resp2)=> {
              if (resp2.success) {
                this.setState({
                  debugData: resp2.data.syscallResults,
                  freqRanking: resp2.data.freqFunctionList,
                  timeRanking: resp2.data.timeFunctionList,
                  showSysCall: true
                });
              } else {
                console.log(resp2.message+", start:"+startTimestamp+",end:"+endTimestamp);
              }
            });
          }
        });
      })
      .catch((err)=> {
        this.setState({loading: false});
      });
    });

  }

  render() {
    let {data, loading,debugData,timeRanking,freqRanking} = this.state;
    let {query} = this.props.location;
    let {projectName, modelName, pvalue, cvalue, modelType, bugId} = query;
    if (projectName === '') {
      projectName = modelName;
    }

    return (
    <Console>
      <Console.Topbar logo={require('../../images/logo.png')}>
        <div className="topbar-text">
          <div className="title">
            Please view incident name / bug ID: <b>{bugId}</b><br/>
          </div>
        </div>
      </Console.Topbar>
      <LiveAnalysisCharts projectName={projectName} data={data} debugData={debugData} timeRanking={timeRanking} freqRanking={freqRanking} bugId={bugId} loading={loading}/>
    </Console>
    );
  }
};

export default ReactTimeout(ProjectDetails);
