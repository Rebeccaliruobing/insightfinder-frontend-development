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

class LogPatternSequences extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.viewName = 'seq';
    this.statePath = 'sequences';
    this.loadingComponentPath = 'log_seq_eventlist';
  }

  componentDidMount() {
    const sequences = get(this.props.data, this.statePath, []);
    // Find the first patterns in the sequences.
    const pattern = R.find(s => s.isPattern, sequences);
    if (pattern) {
      const patternId = pattern.id;
      this.reloadPattern(this.props, patternId);
    }
  }

  componentWillReceiveProps(newProps) {
    const sequences = get(newProps.data, this.statePath);
    if (!R.identical(sequences, get(this.props.data, this.statePath))) {
      const pattern = R.find(s => s.isPattern, sequences);
      if (pattern) {
        const patternId = pattern.id;
        this.reloadPattern(this.props, patternId);
      }
    }
  }

  @autobind handlePatternClick({ rowData: sequence }) {
    if (sequence.isPattern) {
      this.reloadPattern(this.props, sequence.id);
    }
  }

  @autobind reloadPattern(props, patternId) {
    if (R.isNil(patternId)) {
      return;
    }

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
    const sequences = get(this.props.data, this.statePath, []);
    const eventList = this.props.currentEventList || [];
    const { currentPatternId } = this.props;
    const sequenceInfo = R.find(s => s.id === currentPatternId, sequences) || {};
    const isLoading = get(this.props.currentLoadingComponents, this.loadingComponentPath, false);

    const nameRender = ({ rowData }) => {
      if (rowData.isPattern) {
        return <span style={{ marginLeft: '1em' }}>{rowData.name}</span>;
      }
      return rowData.name;
    };

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
                rowCount={sequences.length}
                rowGetter={({ index }) => sequences[index]}
                onRowClick={this.handlePatternClick}
              >
                <Column
                  width={380}
                  label="Pattern Sequences"
                  dataKey="name"
                  cellRenderer={nameRender}
                />
                <Column width={40} label="Count" className="text-right number" dataKey="count" />
              </Table>
            )}
          </AutoSizer>
        </Container>
        <Container className={`flex-grow ${isLoading ? 'loading' : ''}`}>
          <AutoSizer>
            {({ height }) => (
              <EventGroup
                style={{ height, width: 900 }}
                name={sequenceInfo.name || ''}
                className="flex-item flex-col-container"
                keywords={get(sequenceInfo, 'keywords', [])}
                episodes={get(sequenceInfo, 'episodes', [])}
                eventDataset={eventList}
                showFE
              />
            )}
          </AutoSizer>
        </Container>
      </Container>
    );
  }
}

export default LogPatternSequences;
