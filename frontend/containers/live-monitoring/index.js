import React, {Component} from 'react';
import ReactTimeout from 'react-timeout'
import store from 'store';

import {LIVE_MONITORING_REFRESH_INTERVAL} from '../storeKeys';
import {Console} from '../../artui/react';
import Header from '../../components/header';
import apis from '../../apis';
import {ProjectStatistics} from '../../components/statistics';
import {IncidentsList, IncidentsTreeMap} from '../../components/incidents';

class LiveMonitoring extends Component {

  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      data: {
        statistics: {},
        summary: {},
        incidents: [],
        incidentsTreeMap: [],
      },
      loading: true,
    };

    const { query } = this.props.location;
    const { projectName, pvalue, cvalue, modelType } = query;

    this.headerTitle = modelType === 'DBScan' ?
    `Please view anomaly detection result for project <b>${projectName}</b><br/>` +
    `with model type <b>${modelType}</b>, MinPts <b>${pvalue}</b>, Epsilon: <b>${cvalue}</b>.`
      :
    `Please view anomaly detection result for project <b>${projectName}</b><br/>` +
    `with model type <b>${modelType}</b>, anomaly threshold <b>${pvalue}</b>, duration  threshold: <b>${cvalue}</b>.`;

    // Get refresh interval in minutes
    this.refreshInterval = parseInt(store.get(LIVE_MONITORING_REFRESH_INTERVAL, 0)) * 1000 * 60;
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    this.props.clearTimeout(this.timeout);
  }

  loadData() {

    let { query } = this.props.location;
    let { projectName, modelType, pvalue, cvalue } = query;
    let refreshInterval = this.refreshInterval;

    this.props.clearTimeout(this.timeout);

    this.setState({ loading: true });
    apis.retrieveLiveAnalysis(projectName, modelType, pvalue, cvalue)
      .then(data => {
        this.setState({
          loading: false,
          data,
        });
        if (refreshInterval > 0) {
          this.timeout = this.props.setTimeout(this.loadData.bind(this), refreshInterval);
        }
      })
      .catch(msg => {
        this.setState({ loading: false });
        alert(msg);
      });
  }

  render() {
    let { loading, data} = this.state;

    return (
      <Console>
        <Header title={this.headerTitle}/>
        <Console.Wrapper>
          <Console.Content style={{ paddingLeft: 0 }} className={ loading ? 'ui form loading' : ''}>
            <div className="ui main tiny container"
                 style={{ minHeight: '100%', display: loading && 'none' }}>
              <div className="ui vertical segment">
                <ProjectStatistics data={data} />
              </div>
              <div className="ui vertical segment">
                <div className="ui incidents grid">
                  <div className="label row">
                    <div className="seven wide column">Incidents TreeMap:</div>
                    <div className="nine wide column">Incidents List:</div>
                  </div>
                  <div className="row" style={{height: 528}}>
                    <div className="seven wide column" style={{height: 500}}>
                      <IncidentsTreeMap data={data.incidentsTreeMap} />
                    </div>
                    <div className="nine wide column" style={{height: 500}}>
                      <IncidentsList incidents={data.incidents} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Console.Content>
        </Console.Wrapper>
      </Console>
    )
  }
}

export default ReactTimeout(LiveMonitoring);
