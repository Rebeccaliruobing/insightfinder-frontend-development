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
  currentSequenceId: String,
  currentEventList: Array<Object>,
  currentSequenceEventList: Array<Array<Object>>,
  selectLogPattern: Function,
  selectLogPatternSequence: Function,
  loadLogEventList: Function,
  loadLogSequenceEventList: Function,
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
    const sequence = R.find(s => s.isSequence, sequences);
    if (sequence) {
      const { patterns, id } = sequence;
      this.reloadPatternSequence(this.props, id, patterns);
    }
  }

  componentWillReceiveProps(nextProps) {
    const sequences = get(nextProps.data, this.statePath);
    if (!R.identical(sequences, get(this.props.data, this.statePath))) {
      const sequence = R.find(s => s.isSequence, sequences);
      if (sequence) {
        const { patterns, id } = sequence;
        this.reloadPatternSequence(nextProps, id, patterns);
      }
    }
  }

  @autobind handlePatternClick({ rowData: sequence }) {
    if (sequence.isPattern) {
      this.reloadPattern(this.props, sequence.id);
    } else if (sequence.isSequence) {
      this.reloadPatternSequence(this.props, sequence.id, sequence.patterns);
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

  @autobind reloadPatternSequence(props, sequenceId, patterns) {
    const {
      projectName,
      startTimeMillis,
      endTimeMillis,
      selectLogPatternSequence,
      loadLogSequenceEventList,
    } = props;
    selectLogPatternSequence(this.viewName, sequenceId, patterns);
    loadLogSequenceEventList(
      projectName,
      this.viewName,
      { startTimeMillis, endTimeMillis, patterns },
      { [this.loadingComponentPath]: true },
    );
  }

  render() {
    const sequences = get(this.props.data, this.statePath, []);
    const eventList = this.props.currentEventList || [];
    const sequenceEventList = this.props.currentSequenceEventList || [];
    const { currentPatternId, currentSequenceId } = this.props;
    const sequenceInfo = R.find(
      s => s.id === currentPatternId || s.id === currentSequenceId,
      sequences,
    ) || {};
    const isSequence = sequenceInfo.isSequence;
    const isLoading = get(this.props.currentLoadingComponents, this.loadingComponentPath, false);

    const nameRender = ({ rowData }) => {
      if (rowData.isPattern) {
        return <span style={{ marginLeft: '1em' }}>{rowData.name}</span>;
      }
      return rowData.name;
    };

    return (
      <Container fullHeight className="flex-row">
        <Container fullHeight style={{ width: 380, marginRight: '1em' }}>
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
                  width={340}
                  label="Pattern Sequences"
                  dataKey="name"
                  cellRenderer={nameRender}
                />
                <Column width={40} label="Count" className="text-right number" dataKey="count" />
              </Table>
            )}
          </AutoSizer>
        </Container>
        {isSequence &&
          <Container className={`flex-col flex-grow ${isLoading ? 'loading' : ''}`}>
            <h4>{sequenceInfo.name || ''}</h4>
            <div className="flex-grow overflow-y-auto">
              {R.addIndex(R.map)((seqEvents, idx) => {
                return (
                  <EventGroup
                    name=""
                    key={idx}
                    className="flex-item flex-col-container"
                    eventDataset={seqEvents}
                    showFE={false}
                  />
                );
              }, sequenceEventList)}
            </div>
          </Container>}
        {!isSequence &&
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
          </Container>}
      </Container>
    );
  }
}

export default LogPatternSequences;
