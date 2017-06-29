/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { Container, Table, Column, AutoSizer } from '../../../lib/fui/react';
import { DataChart } from '../../../../components/share/charts';

type Props = {
  data: Object,
};

class LogRareEvents extends React.PureComponent {
  props: Props;

  render() {
    const data = this.props.data || {};
    const events = data.events || [];
    const { tsEvents } = data;
    const barData = { sdata: tsEvents, sname: ['Datetime', 'Events Count'] };

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
        <Container className="flex-grow" style={{ marginTop: '1em' }}>
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
                <Column
                  width={40}
                  className="no-wrap"
                  label="#"
                  dataKey="timestamp"
                />
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
