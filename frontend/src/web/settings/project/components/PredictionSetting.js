/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { get } from 'lodash';
import { autobind } from 'core-decorators';
import VLink from 'valuelink';

import { Select } from '../../../../lib/fui/react';
import { settingsMessages } from '../../../../common/settings/messages';

type Props = {
  intl: Object,
  projectName: String,
  currentLoadingComponents: Object,
  data: Object,
  saveProjectSettings: Function,
};

class ProjectSharing extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.stateKey = 'predictionWindow';
    this.submitLoadingKey = 'predictionWindow_submit';
    this.propsPath = ['data', this.stateKey];
    this.predictionWindowHours = [
      { label: '4', value: '4' },
      { label: '12', value: '12' },
      { label: '24', value: '24' },
      { label: '48', value: '48' },
    ];

    const predictionWindow = get(props, this.propsPath);
    this.state = {
      [this.stateKey]: predictionWindow,
    };
  }

  componentWillReceiveProps(newProps) {
    const predictionWindow = get(newProps, this.propsPath);

    // If the users prop is changed, set the local state.
    if (predictionWindow !== get(this.props, this.propsPath)) {
      this.setState({
        [this.stateKey]: predictionWindow,
      });
    }
  }

  @autobind handleSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const predictionWindow = this.state[this.stateKey];
    // The user might input , or ; as the seperators, convert string to array and remove empty names
    saveProjectSettings(projectName, { predictionWindow }, { [this.submitLoadingKey]: true });
  }

  render() {
    const { intl } = this.props;
    const predictionWindowLink = VLink.state(this, this.stateKey).check(
      x => Boolean(x),
      intl.formatMessage(settingsMessages.errorEmptySelection),
    );
    const hasError = predictionWindowLink.error;
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);

    return (
      <form className={`ui ${hasError ? 'error' : ''} form`} style={{ fontSize: 12, width: 800 }}>
        <div className="select field" style={{ width: 200 }}>
          <label>Prediction Time Window (Hour)</label>
          <Select
            name={this.stateKey}
            multi={false}
            options={this.predictionWindowHours}
            valueLink={predictionWindowLink}
          />
        </div>
        <div className="field">
          <div
            className={`ui button ${isSubmitting ? 'loading' : ''} ${hasError ? 'disabled' : ''} blue`}
            {...(isSubmitting || hasError ? {} : { onClick: this.handleSaveClick })}
          >
            Update Alert Settings
          </div>
        </div>
      </form>
    );
  }
}

export default ProjectSharing;
