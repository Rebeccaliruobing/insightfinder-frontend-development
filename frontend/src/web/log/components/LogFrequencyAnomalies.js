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
  }

  componentDidMount() {
    const patterns = get(this.props.data, 'patterns', []);
    if (patterns.length > 0) {
      const patternId = patterns[0].nid;
      this.reloadPattern(this.props, patternId);
    }
  }

  componentWillReceiveProps(newProps) {
    const patterns = get(newProps.data, 'patterns');
    if (!R.identical(patterns, get(this.props.data, 'patterns'))) {
      if (patterns.length > 0) {
        const patternId = patterns[0].nid;
        this.reloadPattern(newProps, patternId);
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

  render() {
    const patterns = get(this.props.data, 'patterns', []);
    const eventList = this.props.currentEventList || [];
    const { currentPatternId } = this.props;
    const patternInfo = R.find(p => p.nid === currentPatternId, patterns) || {};
    const isLoading = get(this.props.currentLoadingComponents, this.loadingComponentPath, false);

    return (
      <Container fullHeight className="flex-row">
        <Container fullHeight style={{ width: 420, marginRight: '1em' }}>
          <AutoSizer>
            {({ width, height }) => (
              <Table
                className="with-border"
                width={width}
                height={height}
                headerHeight={40}
                rowHeight={40}
                rowCount={patterns.length}
                rowGetter={({ index }) => patterns[index]}
                onRowClick={this.handlePatternClick}
              >
                <Column width={380} label="Cluster" dataKey="name" />
                <Column
                  width={40}
                  label="Count"
                  className="text-right number"
                  dataKey="eventsCount"
                />
              </Table>
            )}
          </AutoSizer>
        </Container>
        <Container className={`flex-grow ${isLoading ? 'loading' : ''}`}>
          <AutoSizer>
            {({ height }) => (
              <EventGroup
                style={{ height, width: 900 }}
                name={patternInfo.name || ''}
                className="flex-item flex-col-container"
                eventDataset={eventList}
                showFE
                keywords={get(patternInfo, 'keywords', [])}
                episodes={get(patternInfo, 'episodes', [])}
              />
            )}
          </AutoSizer>
        </Container>
      </Container>
    );
  }
}

export default LogFrequencyAnomalies;
