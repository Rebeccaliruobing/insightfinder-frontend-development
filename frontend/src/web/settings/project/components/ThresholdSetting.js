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

class ThresholdSetting extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);
    this.submitLoadingKey = 'settings_threshold_submit';
  }

  @autobind handleSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    saveProjectSettings(projectName, {}, { [this.submitLoadingKey]: true });
  }

  render() {
    const { intl } = this.props;
    const hasError = false;
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);
    const testData = [
      { name: 'test', max: 10, min: 20 },
      { name: 'test', max: 10, min: 20 },
      { name: 'test', max: 10, min: 20 },
      { name: 'test', max: 10, min: 20 },
    ];
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
                  headerHeight={40}
                  rowHeight={40}
                  rowCount={testData.length}
                  rowGetter={({ index }) => testData[index]}
                >
                  <Column
                    width={140}
                    className="no-wrap"
                    flexGrow={1}
                    label="Metric"
                    dataKey="metric"
                  />
                  <Column width={50} label="Unit" dataKey="name" />
                  <Column width={200} label="Normalization Group" dataKey="name" />
                  <Column width={140} label="Alert Threshold" dataKey="max" />
                  <Column width={140} label="No Alert Threshold" dataKey="min" />
                  <Column width={140} label="KPI" dataKey="min" />
                  <Column width={100} label="Custom Metric" dataKey="min" />
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

export default ThresholdSetting;
