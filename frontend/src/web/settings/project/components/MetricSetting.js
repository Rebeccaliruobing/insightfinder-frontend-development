/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import { get } from 'lodash';
import { autobind } from 'core-decorators';

import { Table, Column, AutoSizer, Container } from '../../../../lib/fui/react';

type Props = {
  intl: Object,
  projectName: String,
  currentLoadingComponents: Object,
  data: Object,
  saveProjectSettings: Function,
};

class MetricSetting extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.stateKey = 'metrics';
    this.propsPath = ['data', this.stateKey];
    this.submitLoadingKey = 'settings_metric_submit';
    this.booleanCellRender = ({ cellData }) => (cellData ? 'Yes' : 'No');
    this.inputCellRender = ({ dataKey, rowData, cellData }) => (
      <input
        className="fui input"
        value={cellData}
        onChange={this.handleInputChanged(rowData, dataKey)}
      />
    );
    this.checkboxCellRender = ({ dataKey, rowData, cellData }) => (
      <input
        className="fui input"
        type="checkbox"
        checked={cellData || false}
        onChange={this.handleInputChanged(rowData, dataKey)}
      />
    );

    const metrics = get(props, this.propsPath, []);
    // Make a full copy of the data to avoid side affect with other components.
    this.localMetrics = R.clone(metrics);
    const checked = !R.find(m => !m.isKPI, this.localMetrics);

    // State
    this.state = {
      isKpiAll: checked,
    };
  }

  componentWillReceiveProps(newProps) {
    const metrics = get(newProps, this.propsPath, []);
    // If metrics changes, reset the changed state, and get an new clone.
    if (!R.identical(metrics, get(this.props, this.propsPath))) {
      this.localMetrics = R.clone(metrics);
      // If any one is not kpi, unselected.
      const checked = !R.find(m => !m.isKPI, this.localMetrics);
      this.setState({ isKpiAll: checked });
    }
  }

  @autobind handleSaveClick() {
    const metrics = get(this.props, this.propsPath, []);

    const diff = R.difference(this.localMetrics, metrics);
    const { saveProjectSettings, projectName } = this.props;
    const projectSettings = R.map(
      m => ({
        smetric: m.name,
        isKPI: m.isKPI ? true : undefined,
        thresholdAlert: m.thresholdAlert,
        thresholdNoAlert: m.thresholdNoAlert,
        groupId: m.groupId,
      }),
      diff,
    );
    saveProjectSettings(projectName, { projectSettings }, { [this.submitLoadingKey]: true });
  }

  @autobind handleInputChanged(rowData, dataKey) {
    return (e) => {
      const target = e.target;
      const newVal = target.type === 'checkbox' ? target.checked : target.value || '';

      // Save the data and force update.
      rowData[dataKey] = newVal;
      this.table.forceUpdateGrid();
    };
  }

  @autobind handleIsKpiAllChecked(e) {
    const checked = e.target.checked;

    R.forEach((m) => {
      m.isKPI = checked;
    }, this.localMetrics);
    this.setState({ isKpiAll: checked });
  }

  render() {
    const { intl } = this.props;
    const metrics = this.localMetrics;

    const hasError = false;
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);

    const checkAllHeaderRender = () => {
      const { isKpiAll } = this.state;
      return (
        <div>
          <span>isKPI</span>
          <input
            className="fui input"
            type="checkbox"
            checked={isKpiAll}
            onChange={this.handleIsKpiAllChecked}
          />
        </div>
      );
    };

    return (
      <Container fullHeight className="overflow-y-auto">
        <form
          className={`ui ${hasError ? 'error' : ''} form full-height flex-col`}
          style={{ fontSize: 12, width: 1048 }}
        >
          <Container className="field">
            <h3>Metric Override Thresholds</h3>
            <p>
              <i>
                Note: This setting is optional and is not required for
                for basic alerting and notifications.
              </i>
            </p>
            <p>
              If you have a negotiated SLA and would like InsightFinder
              to notify you when that specific threshold value is
              violated, you may configure that value here.
            </p>
          </Container>
          <Container className="flex-grow field">
            <AutoSizer>
              {({ width, height }) => (
                <Table
                  className="with-border"
                  width={width}
                  height={height}
                  headerHeight={50}
                  rowHeight={40}
                  rowCount={metrics.length}
                  rowGetter={({ index }) => metrics[index]}
                  ref={(c) => {
                    this.table = c;
                  }}
                >
                  <Column width={200} flexGrow={1} label="Metric" dataKey="name" />
                  <Column
                    width={80}
                    label="Unit"
                    dataKey="unit"
                    className="text-right"
                    headerClassName="text-right"
                  />
                  <Column
                    width={80}
                    label="Custom Metric"
                    dataKey="isCustomMetric"
                    className="text-center"
                    headerClassName="text-center no-wrap"
                    cellRenderer={this.booleanCellRender}
                  />
                  <Column
                    width={180}
                    label="Normalization Group"
                    dataKey="groupId"
                    cellRenderer={this.inputCellRender}
                  />
                  <Column
                    width={180}
                    label="Alert Threshold"
                    dataKey="thresholdAlert"
                    cellRenderer={this.inputCellRender}
                  />
                  <Column
                    width={180}
                    label="No Alert Threshold"
                    dataKey="thresholdNoAlert"
                    cellRenderer={this.inputCellRender}
                  />
                  <Column
                    width={60}
                    label="KPI"
                    dataKey="isKPI"
                    className="text-center"
                    headerClassName="text-center"
                    headerRenderer={checkAllHeaderRender}
                    cellRenderer={this.checkboxCellRender}
                  />
                </Table>
              )}
            </AutoSizer>
          </Container>
          <Container className="field text-right">
            <div
              className={`ui button ${isSubmitting ? 'loading' : ''} ${hasError ? 'disabled' : ''} blue`}
              {...(isSubmitting || hasError ? {} : { onClick: this.handleSaveClick })}
            >
              Update Threshold Settings
            </div>
          </Container>
        </form>
      </Container>
    );
  }
}

export default MetricSetting;
