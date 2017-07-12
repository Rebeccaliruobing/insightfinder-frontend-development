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
  currentSequenceId: String,
  currentEventList: Array<Object>,
  currentSequenceEventList: Array<Array<Object>>,
  selectLogPattern: Function,
  selectLogPatternSequence: Function,
  loadLogEventList: Function,
  loadLogSequenceEventList: Function,
  setLogPatternName: Function,
};

class LogPatternSequences extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.viewName = 'seq';
    this.statePath = 'sequences';
    this.loadingComponentPath = 'log_seq_eventlist';

    this.state = {
      showNameModal: false,
      newPatternName: '',
    };
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
      const { currentPatternId } = this.props;
      if (!currentPatternId) {
        const sequence = R.find(s => s.isSequence, sequences);
        if (sequence) {
          const { patterns, id } = sequence;
          this.reloadPatternSequence(nextProps, id, patterns);
        }
      }
    }
  }

  @autobind
  handlePatternClick({ rowData: sequence }) {
    if (sequence.isPattern) {
      this.reloadPattern(this.props, sequence.id);
    } else if (sequence.isSequence) {
      this.reloadPatternSequence(this.props, sequence.id, sequence.patterns);
    }
  }

  @autobind
  reloadPattern(props, patternId) {
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

  @autobind
  reloadPatternSequence(props, sequenceId, patterns) {
    const {
      projectName,
      startTimeMillis,
      endTimeMillis,
      selectLogPatternSequence,
      loadLogSequenceEventList,
    } = props;
    selectLogPatternSequence(this.viewName, sequenceId);
    loadLogSequenceEventList(
      projectName,
      this.viewName,
      { startTimeMillis, endTimeMillis, patterns },
      { [this.loadingComponentPath]: true },
    );
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
    const sequences = get(this.props.data, this.statePath, []);
    const eventList = this.props.currentEventList || [];
    const sequenceEventList = this.props.currentSequenceEventList || [];
    const {
      currentPatternId,
      currentSequenceId,
      projectName,
      incidentId,
      setLogPatternName,
      currentLoadingComponents,
    } = this.props;
    const sequenceInfo =
      R.find(s => s.id === currentPatternId || s.id === currentSequenceId, sequences) || {};
    const isSequence = sequenceInfo.isSequence;
    const isLoading = get(this.props.currentLoadingComponents, this.loadingComponentPath, false);
    const { showNameModal } = this.state;
    const newPatternNameLink = VLink.state(this, 'newPatternName').check(
      x => x,
      'Pattern name cannot be empty',
    );

    const nameRender = ({ rowData }) => {
      if (rowData.isPattern) {
        const episodes = get(rowData, 'episodes', []);
        if (episodes.length > 0) {
          return (
            <span style={{ marginLeft: '1em' }}>
              {`${rowData.name}\nEpisodes: ${episodes.join(',')}`}
            </span>
          );
        }
        return (
          <span style={{ marginLeft: '1em' }}>
            {rowData.name}
          </span>
        );
      }
      return rowData.name;
    };

    const sequenceRowClassName = ({ index }) => {
      // Ignore header row.
      if (index >= 0) {
        const item = sequences[index];
        if (item.id === currentPatternId || item.id === currentSequenceId) {
          return 'active';
        }
      }
      return '';
    };

    return (
      <Container fullHeight className="flex-row">
        <Container fullHeight style={{ width: 380, marginRight: '1em' }}>
          <AutoSizer>
            {({ width, height }) =>
              <Table
                className="with-border"
                width={width}
                height={height}
                headerHeight={40}
                rowHeight={40}
                rowCount={sequences.length}
                rowGetter={({ index }) => sequences[index]}
                rowClassName={sequenceRowClassName}
                onRowClick={this.handlePatternClick}
              >
                <Column
                  width={330}
                  label="Pattern Sequences"
                  dataKey="name"
                  cellRenderer={nameRender}
                />
                <Column width={50} label="Count" className="text-right number" dataKey="count" />
              </Table>}
          </AutoSizer>
        </Container>
        {isSequence &&
          <Container className={`flex-col flex-grow ${isLoading ? 'loading' : ''}`}>
            <h4>
              {sequenceInfo.name || ''}
            </h4>
            <div className="flex-grow overflow-y-auto">
              {R.addIndex(R.map)((seqEvents, idx) => {
                return (
                  <Container key={idx}>
                    <div
                      className="ui grey mini label horizontal"
                      style={{ position: 'absolute', top: '1em' }}
                    >
                      {idx + 1}
                    </div>
                    <EventGroup
                      name=""
                      style={{ marginLeft: 20 }}
                      className="flex-item flex-col-container"
                      eventDataset={seqEvents}
                      showFE={false}
                    />
                  </Container>
                );
              }, sequenceEventList)}
            </div>
          </Container>}
        {!isSequence &&
          <Container className={`flex-grow flex-col ${isLoading ? 'loading' : ''}`}>
            <h3 className="pattern-name" style={{ marginBottom: 0 }}>
              <span>
                {sequenceInfo.name || ''}
              </span>
              <i className="write icon" onClick={this.handlePatternNameClick} />
            </h3>
            {showNameModal &&
              <PatternNameModal
                newNameLink={newPatternNameLink}
                projectName={projectName}
                patternName={sequenceInfo.name}
                viewName={this.viewName}
                patternId={currentPatternId}
                incidentId={incidentId}
                setLogPatternName={setLogPatternName}
                currentLoadingComponents={currentLoadingComponents}
                onClose={this.handleModalClose}
              />}
            <Container className="flex-grow">
              <AutoSizer>
                {({ height }) =>
                  <EventGroup
                    style={{ height, width: 900 }}
                    className="flex-item flex-col-container"
                    keywords={get(sequenceInfo, 'keywords', [])}
                    episodes={get(sequenceInfo, 'episodes', [])}
                    eventDataset={eventList}
                    showFE
                  />}
              </AutoSizer>
            </Container>
          </Container>}
      </Container>
    );
  }
}

export default LogPatternSequences;
