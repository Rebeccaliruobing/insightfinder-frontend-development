import React from 'react';
import ReactTimeout from 'react-timeout'
import cx from 'classnames';
import store from 'store';
import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import apis from '../../../apis';
import LiveAnalysisCharts from '../liveanalysis'
import {ChartsRefreshInterval} from '../../storeKeys';

const ProjectDetails = class extends React.Component {

  static propTypes = {
    updateData: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      loading: false
    }
  }

  componentDidMount() {
    (this.props.updateData || this.updateLiveAnalysis.bind(this))(this);
  }

  updateLiveAnalysis() {
    let {query} = this.props.location;
    let {projectName, modelType, anomalyThreshold, durationThreshold} = query;
    let refreshInterval = store.get(ChartsRefreshInterval, 5);

    this.setState({loading: true});
    apis.postLiveAnalysis(projectName, modelType, anomalyThreshold, durationThreshold)
      .then(resp => {
        let update = {};
        if (resp.success) {
          update.data = resp.data;
        } else {
          alert(resp.message);
        }
        update.loading = false;
        this.setState(update);
        this.props.setTimeout(this.updateLiveAnalysis.bind(this), refreshInterval * 1000 * 60);
      })
      .catch(msg=> {
        alert(msg);
      });
  }

  render() {
    let {query} = this.props.location;
    const {projectName, anomalyThreshold, durationThreshold, modelType} = query;
    
    let {data, loading} = this.state;

    return (
    <Console>
      <Console.Topbar logo={require('../../../images/logo.png')}>
        <div className="topbar-text">
          <div className="title">
            Please view anomaly detection result for project <b>{projectName}</b><br/>
            with model type <b>{modelType}</b>, anomaly threshold <b>{anomalyThreshold}</b>, duration threshold: <b>{durationThreshold}</b>. 
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
      <LiveAnalysisCharts {...query} data={data} loading={loading} onRefresh={() => this.updateLiveAnalysis()} />
    </Console>
    )
  }
};

export default ReactTimeout(ProjectDetails);
