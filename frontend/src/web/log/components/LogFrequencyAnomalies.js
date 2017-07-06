/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { get } from 'lodash';
import R from 'ramda';
import { autobind } from 'core-decorators';
import VLink from 'valuelink';

import { DataChart } from '../../../../components/share/charts';
import { Container, AutoSizer, Table, Column } from '../../../lib/fui/react';
import EventGroup from '../../../../components/log/loganalysis/event-group';
import PatternNameModal from './PatternNameModal';

type Props = {
  data: Object,
  currentLoadingComponents: Object,
  projectName: String,
  incidentId: String,
  startTimeMillis: Number,
  endTimeMillis: Number,
  currentPatternId: String,
  currentEventList: Array<Object>,
  selectLogPattern: Function,
  loadLogEventList: Function,
  setLogPatternName: Function,
};

class LogFrequencyAnomalies extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);
    this.viewName = 'freq';
    this.loadingComponentPath = 'log_freq_eventlist';

    this.patternsPropsPath = ['data', 'patterns'];
    this.state = {
      selectedStartTs: null,
      showNameModal: false,
      newPatternName: '',
    };
  }

  componentDidMount() {
    const patterns = get(this.props, this.patternsPropsPath, []);
    if (patterns.length > 0) {
      const patternId = patterns[0].nid;
      this.reloadPattern(this.props, patternId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const patterns = get(nextProps, this.patternsPropsPath);
    if (!R.identical(patterns, get(this.props, this.patternsPropsPath))) {
      const { currentPatternId } = this.props;
      if (!currentPatternId) {
        if (patterns.length > 0) {
          const patternId = patterns[0].nid;
          this.reloadPattern(nextProps, patternId);
          // Reset the selected start and end ts
          this.setState({
            selectedStartTs: null,
          });
        }
      }
    }
  }

  @autobind
  handlePatternClick({ rowData: pattern }) {
    this.reloadPattern(this.props, pattern.nid);
  }

  @autobind
  reloadPattern(props, patternId) {
    const { projectName, startTimeMillis, selectLogPattern, loadLogEventList } = props;
    selectLogPattern(this.viewName, patternId);
    loadLogEventList(
      projectName,
      this.viewName,
      { dayTimeMillis: startTimeMillis, patternId },
      { [this.loadingComponentPath]: true },
    );
  }
  @autobind
  handlePatternPointClick(startTs) {
    this.setState({
      selectedStartTs: startTs,
    });
  }

  getSelectedTimeRange() {
    // If not selected, get the first ts in the freq ts.
    let startTs = this.state.selectedStartTs;
    let endTs = null;
    const patterns = get(this.props, this.patternsPropsPath, []);
    const { currentPatternId } = this.props;
    const patternInfo = R.find(p => p.nid === currentPatternId, patterns) || {};
    const freqTsData = patternInfo.freqTsData || [];

    if (!startTs) {
      const idx = R.findIndex(f => f[1] > 0, freqTsData);
      if (idx >= 0) {
        startTs = freqTsData[idx][0].valueOf();

        // Check the next item still exist
        if (idx < freqTsData.length - 1) {
          endTs = freqTsData[idx + 1][0].valueOf();
        }
      }
    } else {
      const idx = R.findIndex(f => f[0].valueOf() === startTs, freqTsData);
      if (idx >= 0) {
        endTs = freqTsData[idx + 1] ? freqTsData[idx + 1][0].valueOf() : null;
      }
    }

    return { startTs, endTs };
  }

  getSelectedTimeData() {
    const patterns = get(this.props, this.patternsPropsPath, []);
    const { currentPatternId, currentEventList } = this.props;
    let eventList = currentEventList || [];
    const patternInfo = R.find(p => p.nid === currentPatternId, patterns) || {};

    const { startTs, endTs } = this.getSelectedTimeRange();
    if (startTs) {
      eventList = R.filter(e => e.datetime >= startTs, eventList);
    }
    if (endTs) {
      eventList = R.filter(e => e.datetime < endTs, eventList);
    }

    const anomaly = get(patternInfo, ['anomalies', startTs]);
    let anomalyText = '';
    if (anomaly) {
      const pct = anomaly.pct;
      anomalyText = `Frequency of this pattern is ${Math.abs(pct).toFixed(2)}% ${pct > 0
        ? 'higher'
        : 'lower'} then normal.`;
    }
    return { anomaly, anomalyText, eventList, startTs };
  }

  @autobind
  handlePatternNameClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showNameModal: true,
    });
  }

  @autobind
  handleModalClose() {
    this.setState({
      showNameModal: false,
      newPatternName: '',
    });
  }

  render() {
    const patterns = get(this.props, this.patternsPropsPath, []);
    const { eventList, anomalyText } = this.getSelectedTimeData();
    const {
      currentPatternId,
      projectName,
      incidentId,
      currentLoadingComponents,
      setLogPatternName,
    } = this.props;
    const patternInfo = R.find(p => p.nid === currentPatternId, patterns) || {};
    const { freqTsData, keywords, barColors } = patternInfo;
    const isLoading = get(this.props.currentLoadingComponents, this.loadingComponentPath, false);

    const { showNameModal } = this.state;
    const newPatternNameLink = VLink.state(this, 'newPatternName').check(
      x => x,
      'Pattern name cannot be empty',
    );

    const clusterRowClassName = ({ index }) => {
      // Ignore header row.
      if (index >= 0) {
        const item = patterns[index];
        if (item.nid === currentPatternId) {
          return 'active';
        }
      }
      return '';
    };

    return (
      <Container fullHeight className="flex-row">
        <Container fullHeight style={{ marginRight: '1em' }}>
          <AutoSizer disableWidth>
            {({ height }) =>
              <Table
                className="with-border"
                width={420}
                height={height}
                headerHeight={40}
                rowHeight={40}
                rowCount={patterns.length}
                rowGetter={({ index }) => patterns[index]}
                rowClassName={clusterRowClassName}
                onRowClick={this.handlePatternClick}
              >
                <Column width={300} label="Cluster" dataKey="name" />
                <Column width={50} label="Events" className="text-right" dataKey="eventsCount" />
                <Column
                  width={70}
                  label="Anomalies"
                  className="text-right"
                  dataKey="anomalyCount"
                />
              </Table>}
          </AutoSizer>
        </Container>
        <Container className="flex-grow">
          <Container fullHeight className={`flex-col ${isLoading ? 'loading' : ''}`}>
            <h3 className="pattern-name" style={{ marginBottom: 0 }}>
              <span>
                {patternInfo.name || ''}
              </span>
              <i className="write icon" onClick={this.handlePatternNameClick} />
            </h3>
            {showNameModal &&
              <PatternNameModal
                newNameLink={newPatternNameLink}
                projectName={projectName}
                patternName={patternInfo.name}
                viewName={this.viewName}
                patternId={currentPatternId}
                incidentId={incidentId}
                setLogPatternName={setLogPatternName}
                currentLoadingComponents={currentLoadingComponents}
                onClose={this.handleModalClose}
              />}
            {keywords &&
              keywords.length > 0 &&
              <div
                style={{ marginLeft: 16, marginBottom: '0.5em' }}
              >{`Top keywords: ${keywords.join(',')}`}</div>}
            {freqTsData &&
              <div>
                <DataChart
                  chartType="bar"
                  barColors={barColors}
                  data={{ sdata: freqTsData, sname: ['Time', 'Frequency'] }}
                  annotations={[]}
                  onClick={this.handlePatternPointClick}
                />
                <div style={{ color: 'red', fontSize: '1.1rem', margin: '0.5em 0 0 2em' }}>
                  {anomalyText}
                </div>
              </div>}
            <Container className="flex-grow" style={{ margin: '0 0 0 2em' }}>
              <AutoSizer>
                {({ height, width }) =>
                  <EventGroup
                    style={{ height, width, paddingLeft: 0 }}
                    className="flex-item flex-col-container"
                    name=""
                    eventDataset={eventList}
                  />}
              </AutoSizer>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default LogFrequencyAnomalies;
