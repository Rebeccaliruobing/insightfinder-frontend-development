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

class GroupSetting extends React.PureComponent {
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
            <h3>Instance Grouping Settings</h3>
            <div
              className="ui orange button "
              style={{ position: 'absolute', top: '1em', right: 0 }}
            >
              Add New
            </div>
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
                  <Column width={200} label="Group Name" dataKey="name" />
                  <Column width={200} label="Grouping Criteria" dataKey="name" />
                  <Column width={80} label="Key" dataKey="max" />
                  <Column width={80} label="Value Pattern" dataKey="min" />
                  <Column width={80} label="Separate mode" dataKey="min" />
                  <Column width={30} label="" dataKey="min" />
                </Table>
              )}
            </AutoSizer>
          </Container>
          <Container className="field text-right">
            <div
              className={`ui button ${isSubmitting ? 'loading' : ''} ${hasError ? 'disabled' : ''} blue`}
              {...(isSubmitting || hasError ? {} : { onClick: this.handleSaveClick })}
            >
              Update Instance Grouping
            </div>
          </Container>
        </form>
      </Container>
    );
  }
}

export default GroupSetting;
