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
    const metrics = get(props, this.propsPath, []);

    this.localMetrics = R.clone(metrics);
    this.state = {
      changedMetrics: [],
    };
  }

  componentWillReceiveProps(newProps) {
    const metrics = get(newProps, this.propsPath, []);
    // If metrics changes, reset the changed state.
    if (!R.identical(metrics, get(this.props, this.propsPath))) {
      this.localMetrics = R.clone(metrics);
      console.log('reset');
      this.setState({
        changedMetrics: [],
      });
    }
  }

  @autobind handleSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const projectSettings = R.map(
      m => ({
        smetric: m.name,
        isKPI: true,
      }),
      R.filter(m => m.isChanged, this.localMetrics),
    );
    console.log(projectSettings);
    saveProjectSettings(projectName, { projectSettings }, { [this.submitLoadingKey]: true });
  }

  @autobind handleInputChanged(rowData, dataKey) {
    return (e) => {
      e.stopPropagation();
      e.preventDefault();

      const target = e.target;
      const name = rowData.name;
      let newVal = target.value || '';

      if (dataKey === 'isKPI') {
        newVal = target.checked;
      }

      console.log('changed', newVal);

      rowData[dataKey] = newVal;
      rowData.isChanged = true;
      this.table.forceUpdateGrid();
      /*
      let { changedMetrics } = this.state;

      let changed = null;
      const idx = R.findIndex(m => m.name === name, changedMetrics);
      if (idx >= 0) {
        changed = { ...changedMetrics[idx], [dataKey]: newVal };
        changedMetrics = [
          ...R.slice(0, idx, changedMetrics),
          changed,
          ...R.slice(idx + 1, Infinity, changedMetrics),
        ];
      } else {
        changed = { name, [dataKey]: newVal };
        changedMetrics = [...changedMetrics, changed];
      }

      if (changed) {
        this.setState({ changedMetrics }, () => {
          if (this.table) {
            this.table.forceUpdateGrid();
          }
        });
      }
      */
    };
  }

  @autobind inputCellRender({ dataKey, rowData, cellData }) {
    return (
      <input
        key={dataKey}
        className="fui input"
        value={cellData}
        onChange={this.handleInputChanged(rowData, dataKey)}
      />
    );
  }

  @autobind checkboxCellRender({ dataKey, rowData, cellData }) {
    console.log('cell', cellData, rowData);
    return (
      <input
        className="fui input"
        type="checkbox"
        checked={cellData || false}
        onChange={this.handleInputChanged(rowData, dataKey)}
      />
    );
  }

  getMergedMetrics() {
    const metrics = get(this.props, this.propsPath, []);
    const { changedMetrics } = this.state;

    const mergedMetrics = [];
    R.forEach((m) => {
      const { name, ...rest } = m;
      const cm = R.find(cm => cm.name === name, changedMetrics);
      if (cm) {
        console.log('found', cm);
        mergedMetrics.push({ name, ...rest, ...cm });
      } else {
        console.log('copy', cm);
        mergedMetrics.push({ ...m });
      }
    }, metrics);

    console.log(mergedMetrics);

    return mergedMetrics;
  }

  render() {
    const { intl } = this.props;
    const metrics = this.localMetrics;
    const hasError = false;
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);
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
