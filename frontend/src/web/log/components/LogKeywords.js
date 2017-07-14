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
  currentPatternId: String,
  currentEventList: Array<Object>,
  selectLogPattern: Function,
  loadLogEventList: Function,
  setLogPatternName: Function,
};

class LogKeywords extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.viewName = 'keywords';
    this.dataPath = 'keywordList';
    this.loadingComponentPath = 'log_keywords_eventlist';
  }

  componentDidMount() {
    const keywords = get(this.props.data, this.dataPath, []);
    if (keywords.length > 0) {
      const patternId = keywords[0].name;
      this.reloadPattern(this.props, patternId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const keywords = get(nextProps.data, this.dataPath);
    if (!R.identical(keywords, get(this.props.data, this.dataPath))) {
      const { currentPatternId } = this.props;
      if (!currentPatternId) {
        if (keywords.length > 0) {
          const patternId = keywords[0].name;
          this.reloadPattern(nextProps, patternId);
        }
      }
    }
  }

  @autobind
  handlePatternClick({ rowData: Keyword }) {
    this.reloadPattern(this.props, Keyword.name);
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
      { startTimeMillis, endTimeMillis, keyword: patternId },
      { [this.loadingComponentPath]: true },
    );
  }

  render() {
    const keywords = get(this.props.data, this.dataPath, []);
    const eventList = this.props.currentEventList || [];
    const { currentPatternId } = this.props;
    const patternInfo = R.find(p => p.name === currentPatternId, keywords) || {};
    const isLoading = get(this.props.currentLoadingComponents, this.loadingComponentPath, false);

    const clusterRowClassName = ({ index }) => {
      // Ignore header row.
      if (index >= 0) {
        const item = keywords[index];
        if (item.id === currentPatternId) {
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
                rowCount={keywords.length}
                rowClassName={clusterRowClassName}
                rowGetter={({ index }) => keywords[index]}
                onRowClick={this.handlePatternClick}
              >
                <Column width={330} label="Keyword" dataKey="name" />
                <Column width={50} label="Count" dataKey="count" />
              </Table>}
          </AutoSizer>
        </Container>
        <Container className={`flex-grow flex-col ${isLoading ? 'loading' : ''}`}>
          <h3 className="pattern-name">
            <span>
              {patternInfo.name || ''}
            </span>
          </h3>
          <Container className="flex-grow">
            <AutoSizer>
              {({ height }) =>
                <EventGroup
                  style={{ height, width: 900 }}
                  className="flex-item flex-col-container"
                  eventDataset={eventList}
                  showFE
                />}
            </AutoSizer>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default LogKeywords;
