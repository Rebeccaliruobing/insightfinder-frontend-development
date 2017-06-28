/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { get } from 'lodash';
import { autobind } from 'core-decorators';

import { Container } from '../../../../lib/fui/react';
import { Table, Column, AutoSizer } from '../../../../lib/fui/react';

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

    const metrics = get(props, this.propsPath, []);
    this.state = {
      [this.stateKey]: metrics,
    };
  }

  componentWillReceiveProps(newProps) {
    const metrics = get(newProps, this.propsPath, []);
    if (metrics !== get(this.props, this.propsPath)) {
      this.setState({
        [this.stateKey]: metrics,
      });
    }
  }

  @autobind handleSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const { metrics } = this.state;
    saveProjectSettings(projectName, { metrics }, { [this.submitLoadingKey]: true });
  }

  render() {
    const { intl } = this.props;
    const { metrics } = this.state;
    const hasError = false;
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);
    return (
      <Container fullHeight className="overflow-y-auto">
        <form
          className={`ui ${hasError ? 'error' : ''} form full-height flex-col`}
          style={{ fontSize: 12, width: 900 }}
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
                  headerHeight={40}
                  rowHeight={40}
                  rowCount={metrics.length}
                  rowGetter={({ index }) => metrics[index]}
                >
                  <Column
                    width={140}
                    className="no-wrap"
                    flexGrow={1}
                    label="Metric"
                    dataKey="smetric"
                  />
                  <Column width={80} label="Unit" dataKey="unit" />
                  <Column width={80} label="Custom Metric" dataKey="isCustomMetric" />
                  <Column width={80} label="Short Metric" dataKey="shortMetric" />
                  <Column width={140} label="Normalization Group" dataKey="groupId" />
                  <Column width={180} label="Alert Threshold" dataKey="thresholdAlert" />
                  <Column width={180} label="No Alert Threshold" dataKey="thresholdNoAlert" />
                  <Column width={40} label="KPI" dataKey="isKPI" />
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
