import React from 'react';
import ReactTimeout from 'react-timeout';
import { get, isNumber } from 'lodash';
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

  convertEventsToSummaryData(eventsData, startTimestamp, endTimestamp) {
    const groupedEvents = {};
    const sdata = [];
    const highlights = [];
    const annotations = [];
    const startTime = parseInt(startTimestamp, 10);
    const endTime = parseInt(endTimestamp, 10);

    // First get the whole timestamps from the first item, convert and sort it.
    const timestamps = R.sort(
      (a, b) => a - b,
      R.map(
        t => parseInt(t, 10),
        R.filter(s => Boolean(s.trim()), get(eventsData[0], 'timestampsString', '').split(',')),
      ),
    );

    // Then we group the events by timestamp.
    R.forEach(e => {
      const tsKey = e.timestamp.toString();
      if (tsKey) {
        // Convert number to string as the key
        const group = groupedEvents[tsKey] || [];
        group.push(e);
        groupedEvents[tsKey] = group;
      }
    }, eventsData);

    // Add empty data for start & end
    sdata.push([new Date(startTime), null]);
    let index = 0;
    R.forEach(timestamp => {
      const time = new Date(timestamp);
      const tsKey = timestamp.toString();
      const events = groupedEvents[tsKey];

      if (events) {
        index += 1;
        // Get the max anomalyRatio for this timestamp
        const ratios = R.map(v => v.anomalyRatio, events);
        const maxAnomalyRatio = R.reduce(R.max, 0, ratios);
        const details = R.filter(
          d => Boolean(d.trim()),
          R.map(v => get(v, ['rootCauseJson', 'rootCauseDetails'], ''), events),
        );

        highlights.push({
          start: timestamp,
          end: timestamp,
          val: maxAnomalyRatio < 0 ? 0 : Math.min(10, maxAnomalyRatio),
        });

        sdata.push([time, maxAnomalyRatio]);
        annotations.push({
          series: 'Y1',
          x: time.valueOf(),
          shortText: index.toString(),
          text: details.join('\n'),
        });
      }
    }, timestamps);
    sdata.push([new Date(endTime), null]);

    const incidentSummary = []; // Not used
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
              update.eventsSummaryData = this.convertEventsToSummaryData(
                events,
                startTimestamp,
                endTimestamp,
              );
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
