import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
import { autobind } from 'core-decorators';
import { Console } from '../../../artui/react/index';

import FilterBar from './filter-bar';

export default class IncidentDetection extends Component {

  constructor(props) {
    super(props);
    const weeks = 1;
    this.state = {
      view: 'chart',
      dateIndex: 0,
      timeIndex: 0,
      loading: false,
      params: {
        projects: [],
        weeks,
        endTime: moment(new Date()).toDate(),
        startTime: moment(new Date()).add(-7 * weeks, 'days'),
      },
    };
  }

  @autobind
  handleFilterSubmit(data) {
    let { projectName, pvalue, cvalue, minPts, epsilon, modelType, isReplay, isExistentIncident, incidentKey } = data;
    const startTime = moment(data.startTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const endTime = moment(data.endTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const modelStartTime = moment(data.modelStartTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const modelEndTime = moment(data.modelEndTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    if (!isExistentIncident) {
      incidentKey = '';
    }
    if (modelType === 'DBScan') {
      pvalue = epsilon;
      cvalue = minPts;
    }
    window.open(`/incidentAnalysis?${$.param(Object.assign({}, {
      startTime,
      endTime,
      projectName,
      pvalue,
      cvalue,
      modelType,
      modelStartTime,
      modelEndTime,
      incidentKey,
      isReplay,
      isExistentIncident,
    }))}`, '_blank');
  }

  render() {
    return (
      <Console.Content>
        <div className="ui main tiny container">
          <div className="ui vertical segment filterPanel">
            <FilterBar {...this.props} onSubmit={this.handleFilterSubmit} />
          </div>
        </div>
      </Console.Content>
    );
  }
}
