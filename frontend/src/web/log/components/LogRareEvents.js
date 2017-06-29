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

import { Container, Table, Column, AutoSizer } from '../../../lib/fui/react';
import { DataChart } from '../../../../components/share/charts';

type Props = {
  data: Object,
};

class LogRareEvents extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    const { eventBuckets } = props.data || {};
    let selectedBucket = null;

    // Auto select the oldest bucket in the list.
    const keys = R.sort((a, b) => a > b, R.keys(eventBuckets));
    if (keys.length) {
      selectedBucket = eventBuckets[keys[0]];
    }

    this.state = {
      selectedBucket,
    };
  }

  @autobind handleBucketPointClick(startTs) {
    const { eventBuckets } = this.props.data;
    const bucket = eventBuckets[startTs];
    if (bucket) {
      this.setState({
        selectedBucket: bucket,
      });
    }
  }

  render() {
    const data = this.props.data || {};
    const { selectedBucket } = this.state;
    const { tsEvents } = data;
    const barData = { sdata: tsEvents, sname: ['Datetime', 'Events Count'] };
    const events = get(selectedBucket, 'events', []);

    return (
      <Container fullHeight className="flex-col">
        <h4 className="ui header">{`Total Rare Events: ${events.length}`}</h4>
        <DataChart
          style={{ height: 150 }}
          isLogCharts
          chartType="bar"
          data={barData}
          annotations={[]}
          onClick={this.handleBucketPointClick}
        />
        <Container className="flex-grow" style={{ margin: '20px 20px 0' }}>
          <AutoSizer>
            {({ height }) => (
              <Table
                className="with-border"
                width={1048}
                height={height}
                headerHeight={28}
                rowHeight={28}
                rowCount={events.length}
                rowGetter={({ index }) => events[index]}
              >
                <Column width={40} className="no-wrap" label="#" dataKey="timestamp" />
                <Column width={80} label="Time" dataKey="timestamp" />
                <Column width={600} flexGrow={1} label="Event" dataKey="event" />
              </Table>
            )}
          </AutoSizer>
        </Container>
      </Container>
    );
  }
}

export default LogRareEvents;
