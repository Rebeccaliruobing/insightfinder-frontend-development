import React from 'react';
import ReactTimeout from 'react-timeout';
import { get } from 'lodash';
import R from 'ramda';
import { Console } from '../../../artui/react';
import apis from '../../../apis';
import LiveAnalysisCharts from '../liveanalysis';

const ProjectDetails = class extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      eventsSummaryData: {},
    };
  }

  componentDidMount() {
    this.updateLiveAnalysis();
  }

  convertEventsToSummaryData(events) {
    console.log(events);

    let sdata = [];
    let highlights = [];
    let annotations = [];

    R.addIndex(R.forEach)((a, idx) => {
      const timestamp = a.timestamp;
      const time = new Date(timestamp);

      highlights.push({
        start: timestamp,
        end: timestamp,
        val: a.anomalyRatio < 0 ? 0 : Math.min(10, a.anomalyRatio),
      });

      sdata.push([time, a.anomalyRatio]);
      annotations.push({
        series: 'Y1',
        x: time.valueOf(),
        shortText: idx.toString(),
        text: get(a, ['rootCauseJson', 'rootCauseDetails'], ''),
      });
    }, events);

    sdata = R.sort((a, b) => a[0] - b[0], sdata);
    highlights = R.sort(R.prop('start'), highlights);
    annotations = R.sort(R.prop('x'), annotations);

    const incidentSummary = [];
    const summaryData = {
      id: 'summary',
      div_id: 'summary',
      title: 'Analysis Summary',
      unit: 'Anomaly Degree',
      sdata,
      sname: ['X', 'Y1'],
      highlights,
      annotations,
      incidentSummary,
    };
    return summaryData;
  }

  updateLiveAnalysis() {
    let { query } = this.props.location;
    let {
      projectName,
      instanceGroup,
      modelType,
      pvalue,
      cvalue,
      numberOfDays,
      endTimestamp,
      startTimestamp,
      groupId,
      instanceName,
      metricName,
      avgEndTimestamp,
      avgNumberOfDays,
      predictedFlag,
      version,
    } = query;
    if (!version) {
      version = '1';
    }
    this.setState({ loading: true });
    apis
      .postLiveAnalysis(
        projectName,
        instanceGroup,
        modelType,
        pvalue,
        cvalue,
        numberOfDays,
        endTimestamp,
        startTimestamp,
        groupId,
        instanceName,
        metricName,
        avgEndTimestamp,
        avgNumberOfDays,
        predictedFlag,
        version,
        true, // disableAnomalies
      )
      .then(resp => {
        let update = {};
        if (resp.success) {
          update.data = resp.data;

          apis
            .loadEvents(
              projectName,
              instanceGroup,
              startTimestamp,
              endTimestamp,
              predictedFlag === 'false' ? 'detected' : 'predicted',
            )
            .then(resp1 => {
              let gname = instanceGroup;
              if (instanceGroup.indexOf(':') >= 0) {
                gname = instanceGroup.split(':')[1];
              }

              const events = resp1[gname] || [];
              update.eventsSummaryData = this.convertEventsToSummaryData(events);
              update.loading = false;
              this.setState(update);
            })
            .catch(msg1 => {
              this.setState({ loading: false });
              console.log('load data error');
              console.error(msg1);
            });
        } else {
          alert(resp.message);
        }
      })
      .catch(msg => {
        this.setState({ loading: false });
        console.log('load data error');
        console.error(msg);
      });
  }

  render() {
    const { query } = this.props.location;
    const { projectName, pvalue, cvalue, numberOfDays, endTimestamp, modelType } = query;

    let { loading, data, eventsSummaryData } = this.state;
    let debugData = undefined;
    const title =
      modelType === 'DBScan'
        ? `Please view anomaly detection result for project <b>${projectName}</b><br/>` +
          `with model type <b>${modelType}</b>, MinPts <b>${pvalue}</b>, Epsilon: <b>${cvalue}</b>.`
        : `Please view anomaly detection result for project <b>${projectName}</b><br/>` +
          `with model type <b>${modelType}</b>.`;
    return (
      <Console>
        <Console.Topbar logo={require('../../../images/logo_white.png')}>
          <div className="topbar-text">
            <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
            <div className="legend">
              <div>Anomaly color map:</div>
              <div className="colormap2">
                <div style={{ float: 'left' }}>Normal</div>
                <div style={{ float: 'right' }}>Abnormal</div>
              </div>
            </div>
          </div>
        </Console.Topbar>
        <LiveAnalysisCharts
          {...query}
          data={data}
          loading={loading}
          debugData={debugData}
          eventsSummaryData={eventsSummaryData}
          enablePublish={true}
          onRefresh={() => this.updateLiveAnalysis()}
        />
      </Console>
    );
  }
};

export default ReactTimeout(ProjectDetails);
