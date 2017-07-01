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

import { Container, AutoSizer } from '../../../lib/fui/react';
import { DataChart } from '../../../../components/share/charts';
import EventGroup from '../../../../components/log/loganalysis/event-group';

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

  componentWillReceiveProps(newProps) {
    const events = get(newProps.data, 'events', []);
    const eventBuckets = get(newProps.data, 'eventBuckets', {});

    // If the users prop is changed, set the local state.
    if (!R.identical(events, get(this.props.data, 'events'))) {
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
    const { events, tsEvents, totalEventsCount } = data;
    const barData = { sdata: tsEvents, sname: ['Datetime', 'Events Count'] };
    const selectedEvents = get(selectedBucket, 'events', []);

    return (
      <Container fullHeight className="flex-col">
        <h4 className="ui header">{`Total Rare Events: ${events.length}, Total Events: ${totalEventsCount}`}</h4>
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
            {({ height, width }) => (
              <EventGroup
                style={{ height, width }}
                className="flex-item flex-col-container"
                name=""
                eventDataset={selectedEvents}
                showFE={false}
              />
            )}
          </AutoSizer>
        </Container>
      </Container>
    );
  }
}

export default LogRareEvents;
