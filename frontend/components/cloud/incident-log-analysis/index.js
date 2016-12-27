import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import { autobind } from 'core-decorators';
import { Console } from '../../../artui/react/index';

import LogAnalysis from './log-analysis';

class IncidentLogAnalysis extends React.Component {

  @autobind
  handleLogFilterSubmit(data) {
    const { projectName, minPts, epsilon, modelType, isExistentIncident } = data;
    const startTime = moment(data.startTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const endTime = moment(data.endTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const modelStartTime = moment(data.modelStartTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const modelEndTime = moment(data.modelEndTime).utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    let { derivedPvalue, pvalue, cvalue } = data;
    if (modelType === 'DBScan') {
      pvalue = epsilon;
      cvalue = minPts;
    }
    const params = $.param(Object.assign({}, {
      projectName,
      modelType,
      startTime,
      endTime,
      derivedPvalue, 
      pvalue,
      cvalue,
      modelStartTime,
      modelEndTime,
      isExistentIncident,
    }));
    window.open(`/incidentLogAnalysis?${params}`, '_blank');
  }

  render() {
    return (
      <Console.Content>
        <div className="ui main tiny container">
          <div className="ui vertical segment filterPanel">
            <LogAnalysis {...this.props} onSubmit={this.handleLogFilterSubmit} />
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default IncidentLogAnalysis;
