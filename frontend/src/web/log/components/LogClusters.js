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

import {
  Container,
  AutoSizer,
  Table,
  Column,
  defaultTableRowRenderer,
} from '../../../lib/fui/react';
import EventGroup from '../../../../components/log/loganalysis/event-group';
import PatternNameModal from './PatternNameModal';

type Props = {
  data: Object,
  currentLoadingComponents: Object,
  projectName: String,
  incidentId: String,
  startTimeMillis: Number,
  endTimeMillis: Number,
  currentEventTotalCount: Number,
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
    this.pageSize = 50;
    this.state = {
      showNameModal: false,
      newPatternName: '',
      pageNo: 1,
    };
  }

  componentDidMount() {
    const patterns = get(this.props.data, 'patterns', []);
    if (patterns.length > 0) {
      const patternId = patterns[0].nid;
      this.reloadPattern(this.props, patternId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const patterns = get(nextProps.data, 'patterns');
    if (!R.identical(patterns, get(this.props.data, 'patterns'))) {
      const { currentPatternId } = this.props;
      if (!currentPatternId) {
        if (patterns.length > 0) {
          const patternId = patterns[0].nid;
          this.reloadPattern(nextProps, patternId);
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
    this.setState({ pageNo: 1 });
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
      { startTimeMillis, endTimeMillis, patternId, pageNo: 1, pageSize: this.pageSize },
      { [this.loadingComponentPath]: true },
    );
  }

  @autobind
  handlePageChanged(pageNo) {
    const {
      projectName,
      startTimeMillis,
      endTimeMillis,
      currentPatternId,
      loadLogEventList,
    } = this.props;
    this.setState({ pageNo });
    loadLogEventList(
      projectName,
      this.viewName,
      {
        startTimeMillis,
        endTimeMillis,
        patternId: currentPatternId,
        pageNo,
        pageSize: this.pageSize,
      },
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

  @autobind
  clusterNameRenderer({ cellData, rowData }) {
    const episodes = get(rowData, 'episodes', []);
    if (episodes.length > 0) {
      return `${cellData}\nEpisodes: ${episodes.join(',')}`;
    }
    return cellData;
  }

  render() {
    const patterns = get(this.props.data, 'patterns', []);
    const eventList = this.props.currentEventList || [];
    const totalCount = this.props.currentEventTotalCount;
    const {
      currentPatternId,
      projectName,
      incidentId,
      setLogPatternName,
      currentLoadingComponents,
    } = this.props;
    const patternInfo = R.find(p => p.nid === currentPatternId, patterns) || {};
    const isLoading = get(this.props.currentLoadingComponents, this.loadingComponentPath, false);
    const { pageNo } = this.state;

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

    const rowRenderer = (props: { rowData: Object }) => {
      const { rowData } = props;
      const pct = isFinite(rowData.totalPercent) ? rowData.totalPercent : 0.0;
      const width = `${Math.max(0.0, pct) * 100}%`;
      const bgElem = <div key="bg_percent" className="pattern-percent" style={{ width }} />;
      const columns = [...props.columns, bgElem];
      return defaultTableRowRenderer({ ...props, columns });
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
                rowRenderer={rowRenderer}
                rowGetter={({ index }) => patterns[index]}
                onRowClick={this.handlePatternClick}
              >
                <Column
                  width={330}
                  label="Cluster"
                  dataKey="name"
                  className="space-pre"
                  cellRenderer={this.clusterNameRenderer}
                />
                <Column width={50} label="Events" className="text-right" dataKey="eventsCount" />
              </Table>}
          </AutoSizer>
        </Container>
        <Container className={`flex-grow flex-col ${isLoading ? 'loading' : ''}`}>
          <h3 className="pattern-name">
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
          <Container className="flex-grow">
            <AutoSizer>
              {({ height }) =>
                <EventGroup
                  style={{ height, width: 900 }}
                  className="flex-item flex-col-container"
                  eventDataset={eventList}
                  showFE
                  totalCount={totalCount}
                  pageSize={this.pageSize}
                  pageNo={pageNo}
                  onPageChanged={this.handlePageChanged}
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
