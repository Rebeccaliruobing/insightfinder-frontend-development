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
    let {pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData, modelStartTime, modelEndTime} = query;

    this.setState({loading: true}, ()=> {
      apis.postUseCase(pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData, modelStartTime, modelEndTime).then((resp)=> {
        resp.loading = false;
        this.setState(resp);
      }).catch((err)=> {
        this.setState({loading: false});
      });
    });

  }

  render() {
    let {query} = this.props.location;
    let {projectName, modelName, pvalue, cvalue, modelType} = query;
    let {data, loading} = this.state;
    if (projectName === '') {
      projectName = modelName;
    }

    return (
    <Console>
      <Console.Topbar logo={require('../../images/logo.png')}>
        <div className="topbar-text">
          <div className="title">
            Please view anomaly detection result for project <b>{projectName}</b><br/>
            with model type <b>{modelType}</b>, anomaly threshold <b>{pvalue}</b>, duration threshold: <b>{cvalue}</b>. 
          </div>
          <div className="legend">
            <div>Anomaly color map:</div>
            <div className="colormap2">
              <div style={{float:'left'}}>Normal</div>
              <div style={{float:'right'}}>Abnormal</div>
            </div>
          </div>
        </div>
      </Console.Topbar>
      <LiveAnalysisCharts projectName={projectName} data={data} loading={loading}/>
    </Console>
    );
  }
};

export default ReactTimeout(ProjectDetails);
