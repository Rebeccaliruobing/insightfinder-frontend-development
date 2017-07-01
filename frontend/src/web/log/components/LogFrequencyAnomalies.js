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

import { DataChart } from '../../../../components/share/charts';
import { Container, AutoSizer, Table, Column } from '../../../lib/fui/react';
import EventGroup from '../../../../components/log/loganalysis/event-group';

type Props = {
  data: Object,
  currentLoadingComponents: Object,
  projectName: String,
  startTimeMillis: Number,
  endTimeMillis: Number,
  currentPatternId: String,
  currentEventList: Array<Object>,
  selectLogPattern: Function,
  loadLogEventList: Function,
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
    };
  }

  componentDidMount() {
    const patterns = get(this.props, this.patternsPropsPath, []);
    if (patterns.length > 0) {
      const patternId = patterns[0].nid;
      this.reloadPattern(this.props, patternId);
    }
  }

  componentWillReceiveProps(newProps) {
    const patterns = get(newProps, this.patternsPropsPath);
    if (!R.identical(patterns, get(this.props, this.patternsPropsPath))) {
      if (patterns.length > 0) {
        const patternId = patterns[0].nid;
        this.reloadPattern(newProps, patternId);
        // Reset the selected start and end ts
        this.setState({
          selectedStartTs: null,
        });
      }
    }
  }

  @autobind handlePatternClick({ rowData: pattern }) {
    this.reloadPattern(this.props, pattern.nid);
  }

  @autobind reloadPattern(props, patternId) {
    const {
      projectName,
      startTimeMillis,
      endTimeMillis,
      selectLogPattern,
      loadLogEventList,
    } = props;
    selectLogPattern(this.viewName, patternId);
    loadLogEventList(
      projectName,
      this.viewName,
      { startTimeMillis, endTimeMillis, patternId },
      { [this.loadingComponentPath]: true },
    );
  }
  @autobind handlePatternPointClick(startTs, position) {
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
      if (freqTsData.length > 0) {
        // The time in freq vector is a Date object
        startTs = freqTsData[0][0].valueOf();
      }
      if (freqTsData.length > 1) {
        endTs = freqTsData[1][0].valueOf();
      }
    } else {
      const idx = R.findIndex(f => f[0].valueOf() === startTs, freqTsData);
      if (idx >= 0) {
        endTs = freqTsData[idx + 1] ? freqTsData[idx + 1][0].valueOf() : null;
      }
    }

    return { startTs, endTs };
  }

  getSelectedEventList() {
    let eventList = this.props.currentEventList || [];
    const { startTs, endTs } = this.getSelectedTimeRange();

    if (startTs) {
      eventList = R.filter(e => e.datetime >= startTs, eventList);
    }
    if (endTs) {
      eventList = R.filter(e => e.datetime < endTs, eventList);
    }
    return eventList;
  }

  render() {
    const patterns = get(this.props, this.patternsPropsPath, []);
    const eventList = this.getSelectedEventList();
    const { currentPatternId } = this.props;
    const patternInfo = R.find(p => p.nid === currentPatternId, patterns) || {};
    const { freqTsData, keywords, barColors } = patternInfo;
    const isLoading = get(this.props.currentLoadingComponents, this.loadingComponentPath, false);

    return (
      <Container fullHeight className="flex-row">
        <Container fullHeight style={{ marginRight: '1em' }}>
          <AutoSizer disableWidth>
            {({ height }) => (
              <Table
                className="with-border"
                width={380}
                height={height}
                headerHeight={40}
                rowHeight={40}
                rowCount={patterns.length}
                rowGetter={({ index }) => patterns[index]}
                onRowClick={this.handlePatternClick}
              >
                <Column width={380} label="Cluster" dataKey="name" />
              </Table>
            )}
          </AutoSizer>
        </Container>
        <Container className="flex-grow">
          <Container fullHeight className={`flex-col ${isLoading ? 'loading' : ''}`}>
            <h3 className="ui header" style={{ marginBottom: 0 }}>
              {patternInfo.name || ''}
            </h3>
            {keywords &&
              keywords.length > 0 &&
              <div style={{ marginBottom: '0.5em' }}>{`Top keywords: ${keywords.join(',')}`}</div>}
            {freqTsData &&
              <DataChart
                chartType="bar"
                barColors={barColors}
                data={{ sdata: freqTsData, sname: ['Time', 'Frequency'] }}
                annotations={[]}
                onClick={this.handlePatternPointClick}
              />}
            <Container className="flex-grow" style={{ margin: '1em 0 0 2em' }}>
              <AutoSizer>
                {({ height, width }) => (
                  <EventGroup
                    style={{ height, width, paddingLeft: 0 }}
                    className="flex-item flex-col-container"
                    name=""
                    eventDataset={eventList}
                  />
                )}
              </AutoSizer>
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default LogFrequencyAnomalies;
