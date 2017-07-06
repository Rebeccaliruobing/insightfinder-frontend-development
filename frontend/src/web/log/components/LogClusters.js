/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { get } from 'lodash';
import R from 'ramda';
import VLink from 'valuelink';
import { autobind } from 'core-decorators';

import { Container, AutoSizer, Table, Column } from '../../../lib/fui/react';
import EventGroup from '../../../../components/log/loganalysis/event-group';
import PatternNameModal from './PatternNameModal';

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
  setLogPatternName: Function,
};

class LogClusters extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.viewName = 'cluster';
    this.loadingComponentPath = 'log_cluster_eventlist';

    this.state = {
      showNameModal: false,
      editingPatternId: null,
      editingPatternName: null,
      newPatternName: '',
    };
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

  @autobind
  handlePatternClick({ rowData: pattern }) {
    this.reloadPattern(this.props, pattern.nid);
  }

  @autobind
  reloadPattern(props, patternId) {
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
    const patterns = get(this.props.data, 'patterns', []);
    const eventList = this.props.currentEventList || [];
    const {
      currentPatternId,
      projectName,
      setLogPatternName,
      currentLoadingComponents,
    } = this.props;
    const patternInfo = R.find(p => p.nid === currentPatternId, patterns) || {};
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
        <Container fullHeight style={{ width: 380, marginRight: '1em' }}>
          <AutoSizer>
            {({ width, height }) =>
              <Table
                className="with-border"
                width={width}
                height={height}
                headerHeight={40}
                rowHeight={40}
                rowCount={patterns.length}
                rowClassName={clusterRowClassName}
                rowGetter={({ index }) => patterns[index]}
                onRowClick={this.handlePatternClick}
              >
                <Column width={330} label="Cluster" dataKey="name" />
                <Column width={50} label="Events" className="text-right" dataKey="eventsCount" />
              </Table>}
          </AutoSizer>
        </Container>
        <Container className={`flex-grow flex-col ${isLoading ? 'loading' : ''}`}>
          <h3 className="pattern-name">
            <span>
              {patternInfo.name || ''}
            </span>
            <i
              className="write icon"
              onClick={this.handlePatternNameClick}
              style={{ display: 'none' }}
            />
          </h3>
          {showNameModal &&
            <PatternNameModal
              newNameLink={newPatternNameLink}
              projectName={projectName}
              viewName={this.viewName}
              patternId={currentPatternId}
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
                  eventDataset={eventList}
                  showFE
                  keywords={get(patternInfo, 'keywords', [])}
                  episodes={get(patternInfo, 'episodes', [])}
                />}
            </AutoSizer>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default LogClusters;
