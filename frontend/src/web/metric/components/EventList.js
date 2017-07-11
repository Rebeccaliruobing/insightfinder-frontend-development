/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { isNumber } from 'lodash';
import moment from 'moment';
import { autobind } from 'core-decorators';

import { Table, Column, CellMeasurer, CellMeasurerCache } from '../../../lib/fui/react';
import { createEventShape, calculateRGBByAnomaly } from '../../../../components/utils';

type Props = {
  incidents: Array<Object>,
  maxAnomalyRatio: Number,
  minAnomalyRatio: Number,
  width: Number,
  height: Number,
};

class EventList extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    this.timeFormat = 'MM-DD HH:mm';
    this.startTimeRenderer = ({ cellData }) => moment(cellData).format(this.timeFormat);
    this.durationRenderer = ({ cellData }) => (isNumber(cellData) ? `${cellData} min` : 'N/A');
    this.actionRenderer = ({ rowData }) => {
      return rowData.anomalyRatio === 0
        ? 'N/A'
        : <div className="ui compact blue button">Action</div>;
    };

    this.cellMeasureCache = new CellMeasurerCache({
      fixedWidth: true,
      minHeight: 40,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.props.width) {
      this.cellMeasureCache.clearAll();
    }
  }

  @autobind
  severityRenderer({ rowData }) {
    const incident = rowData;
    const { maxAnomalyRatio, minAnomalyRatio } = this.props;
    const color = calculateRGBByAnomaly(
      incident.anomalyRatio,
      maxAnomalyRatio,
      minAnomalyRatio,
      incident.numberOfAnomalies,
    );
    const eventTypes = incident.eventTypes || [];

    return (
      <svg width={incident.eventTypes.length * 10} height={26}>
        {eventTypes.map((event, index) => createEventShape(event, index, color))}
      </svg>
    );
  }

  @autobind
  eventTypesRenderer(props) {
    const { key, parent, rowIndex, cellData, style } = props;
    return (
      <CellMeasurer
        cache={this.cellMeasureCache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div className="white-pre" style={{ ...style }}>
          {cellData}
        </div>
      </CellMeasurer>
    );
  }

  @autobind
  render() {
    const { incidents, width, height } = this.props;

    return (
      <Table
        className="with-border"
        width={width}
        height={height}
        deferredMeasurementCache={this.cellMeasureCache}
        headerHeight={40}
        rowHeight={this.cellMeasureCache.rowHeight}
        rowCount={incidents.length}
        rowGetter={({ index }) => incidents[index]}
      >
        <Column width={50} label="Id" dataKey="id" />
        <Column
          width={140}
          label="Severity"
          headerClassName="text-center"
          className="text-center"
          dataKey="id"
          cellRenderer={this.severityRenderer}
        />
        <Column
          width={80}
          label="Start Time"
          dataKey="startTimestamp"
          cellRenderer={this.startTimeRenderer}
        />
        <Column
          width={80}
          label="Duration"
          headerClassName="text-right"
          className="text-right"
          dataKey="duration"
          cellRenderer={this.durationRenderer}
        />
        <Column
          width={200}
          flexGrow={1}
          label="Event Type"
          dataKey="rootCauseTypes"
          cellRenderer={this.eventTypesRenderer}
        />
        <Column
          width={80}
          label="Control"
          headerClassName="text-center"
          className="text-center"
          dataKey="id"
          cellRenderer={this.actionRenderer}
        />
      </Table>
    );
  }
}

export default EventList;
