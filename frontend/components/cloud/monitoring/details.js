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

  convertEventsToSummaryAndGroupData(eventsData, startTimestamp, endTimestamp) {
    const groupedEvents = {};
    const groupedAnnos = {};
    const sdata = [];
    const highlights = [];
    const annotations = [];
    const startTime = parseInt(startTimestamp, 10);
    const endTime = parseInt(endTimestamp, 10);
    const metricEvents = {};
    const eventsGroupsData = {};

    // Group the events by timestamp.
    R.forEach(e => {
      const timestamps = R.filter(
        s => Boolean(s.trim()),
        get(e, 'timestampsString', '').split(','),
      );

      // Get the metric names
      const anomalyMap = get(e, 'anomalyMapJson', {});
      let metrics = [];
      R.forEachObjIndexed(val => {
        metrics = R.concat(metrics, R.keys(val));
      }, anomalyMap);
      metrics = R.uniq(metrics);

      R.addIndex(R.forEach)((t, idx) => {
        const group = groupedEvents[t] || [];
        group.push(e);
        groupedEvents[t] = group;

        // Only add the anno for the first timestamp
        if (idx === 0) {
          const annos = groupedAnnos[t] || [];
          annos.push(e);
          groupedAnnos[t] = annos;
        }

        // Prepare highlights for metrics
        R.forEach(m => {
          const metric = metricEvents[m] || {};
          const highlights = metric[t] || [];
          highlights.push(e);
          metric[t] = highlights;
          metricEvents[m] = metric;
        }, metrics);
      }, timestamps);

      // Use the endtime, add a empty array to indicate it's 0.
      if (isNumber(e.endTimestamp)) {
        const endKey = e.endTimestamp.toString();
        if (!groupedEvents[endKey]) {
          groupedEvents[endKey] = [];
        }
      }
    }, eventsData);

    // Convert object to array
    const groupedEventsArr = R.sort(
      (a, b) => parseInt(a, 10) - parseInt(b, 10),
      R.toPairs(groupedEvents),
    );

    sdata.push([new Date(startTime), null]);

    let index = 0;
    R.forEach(([ts, events]) => {
      const timestamp = parseInt(ts, 10);
      const time = new Date(timestamp);
      const annos = groupedAnnos[ts];

      // Get the max anomalyRatio for this timestamp
      const ratios = R.map(v => v.anomalyRatio, events);
      const maxAnomalyRatio = R.reduce(R.max, 0, ratios);

      if (maxAnomalyRatio >= 0) {
        highlights.push({
          start: timestamp,
          end: timestamp,
          val: Math.min(10, maxAnomalyRatio),
        });
      }

      sdata.push([time, maxAnomalyRatio]);

      if (annos) {
        index += 1;
        const details = R.filter(
          d => Boolean(d.trim()),
          R.map(v => get(v, ['rootCauseJson', 'rootCauseDetails'], ''), annos),
        );
        annotations.push({
          series: 'Y1',
          x: time.valueOf(),
          shortText: index.toString(),
          text: details.join('\n'),
        });
      }
    }, groupedEventsArr);
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

    // Cacl the highlights for metric
    R.forEachObjIndexed((mevents, m) => {
      const highlights = [];
      const mEventsArr = R.sort((a, b) => parseInt(a, 10) - parseInt(b, 10), R.toPairs(mevents));
      R.forEach(([ts, events]) => {
        const timestamp = parseInt(ts, 10);
        // Get the max anomalyRatio for this timestamp
        const ratios = R.map(v => v.anomalyRatio, events);
        const maxAnomalyRatio = R.reduce(R.max, 0, ratios);

        if (maxAnomalyRatio >= 0) {
          highlights.push({
            start: timestamp,
            end: timestamp,
            val: Math.min(10, maxAnomalyRatio),
          });
        }
      }, mEventsArr);

      eventsGroupsData[m] = { highlights };
    }, metricEvents);
    return {
      eventsSummaryData: summaryData,
      eventsGroupsData,
    };
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
        const update = {};
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
              const {
                eventsSummaryData,
                eventsGroupsData,
              } = this.convertEventsToSummaryAndGroupData(events, startTimestamp, endTimestamp);
              update.eventsSummaryData = eventsSummaryData;
              update.eventsGroupsData = eventsGroupsData;
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

    let { loading, data, eventsSummaryData, eventsGroupsData } = this.state;
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
          eventsGroupsData={eventsGroupsData}
          enablePublish
          onRefresh={() => this.updateLiveAnalysis()}
        />
      </Console>
    );
  }
};

export default ReactTimeout(ProjectDetails);
