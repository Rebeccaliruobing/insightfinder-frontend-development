import React from 'react';
import ReactTimeout from 'react-timeout'
import store from 'store';
import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../../artui/react';
import apis from '../../../apis';
import LiveAnalysisCharts from '../liveanalysis'
import {ChartsRefreshInterval} from '../../storeKeys';

const FileDetails = class extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false
    }
  }

  componentDidMount() {
    this.updateLiveAnalysis();
  }

  componentWillUnmount() {
    this.props.clearTimeout(this.timeout);
  }

  updateLiveAnalysis() {

    let { query } = this.props.location;
    let {filename, pvalue, cvalue, modelType, modelName} = query;
    let refreshInterval = parseInt(store.get(ChartsRefreshInterval, 5));

    this.props.clearTimeout(this.timeout);

    this.setState({ loading: true });
    apis.postUploadDetection(cvalue, pvalue, modelType, modelName, filename).then(resp => {
        let update = {};
        if (resp.success) {
          update.data = resp.data;
        } else {
          alert(resp.message);
        }
        update.loading = false;
        this.setState(update);
        if (refreshInterval > 0) {
          this.timeout = this.props.setTimeout(this.updateLiveAnalysis.bind(this), refreshInterval * 1000 * 60);
        }
      })
      .catch(msg=> {
        this.setState({ loading: false });
        console.log('load data error');
        console.error(msg);
      });
  }

  render() {

    const { query } = this.props.location;
    const { filename } = query;

    let { loading, data } = this.state;
    let debugData = undefined;
    const title =
      `Data is for display only.<br/>`;
    return (
      <Console>
        <Console.Topbar logo={require('../../../images/logo.png')}>
          <div className="topbar-text">
            <div className="title" dangerouslySetInnerHTML={{ __html: title }}/>
            <div className="legend">
              <div>Anomaly color map:</div>
              <div className="colormap2">
                <div style={{ float: 'left' }}>Normal</div>
                <div style={{ float: 'right' }}>Abnormal</div>
              </div>
            </div>
          </div>
        </Console.Topbar>
        <LiveAnalysisCharts {...query} data={data} loading={loading} debugData={debugData} onRefresh={() => this.updateLiveAnalysis()}/>
      </Console>
    )
  }
};

export default ReactTimeout(FileDetails);
