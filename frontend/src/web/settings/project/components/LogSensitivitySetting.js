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

import { Container } from '../../../../lib/fui/react';
import { AnomalyThresholdSensitivity } from '../../../app/components/Selectors';
import { settingsMessages } from '../../../../common/settings/messages';

type Props = {
  intl: Object,
  projectName: String,
  currentLoadingComponents: Object,
  data: Object,
  saveProjectSettings: Function,
};

class LogSensitivitySetting extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.pvalueStateKey = 'pvalue';
    this.derivedpvalueStateKey = 'derivedpvalue';
    this.submitLoadingKey = 'setting_alertsensitivity_submit';

    this.pvaluePropsPath = ['data', this.pvalueStateKey];
    this.derivedpvaluePropsPath = ['data', this.derivedpvalueStateKey];

    const pvalue = get(props, this.pvaluePropsPath);
    const derivedpvalue = get(props, this.derivedpvaluePropsPath);
    this.state = { pvalue, derivedpvalue };
  }

  componentWillReceiveProps(newProps) {
    const pvalue = get(newProps, this.pvaluePropsPath);
    const derivedpvalue = get(newProps, this.derivedpvaluePropsPath);

    // If the props is changed, set the local state.
    if (
      pvalue !== get(this.props, this.pvaluePropsPath) ||
      derivedpvalue !== get(this.props, this.derivedpvaluePropsPath)
    ) {
      this.setState({ pvalue, derivedpvalue });
    }
  }

  @autobind handleSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const pvalue = parseFloat(this.state[this.pvalueStateKey]);
    const derivedpvalue = parseFloat(this.state[this.derivedpvalueStateKey]);

    saveProjectSettings(projectName, { pvalue, derivedpvalue }, { [this.submitLoadingKey]: true });
  }

  render() {
    const { intl } = this.props;
    const pvalueLink = VLink.state(this, this.pvalueStateKey).check(
      x => Boolean(x),
      intl.formatMessage(settingsMessages.errorEmptySelection),
    );
    const derivedpvalueLink = VLink.state(this, this.derivedpvalueStateKey).check(
      x => Boolean(x),
      intl.formatMessage(settingsMessages.errorEmptySelection),
    );

    const hasError = pvalueLink.error || derivedpvalueLink.error;
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);

    return (
      <Container fullHeight className="overflow-y-auto">
        <form className={`ui ${hasError ? 'error' : ''} form`} style={{ fontSize: 12, width: 800 }}>
          <h3>Rare Event Detection Sensitivity</h3>
          <p>
            This setting controls the sensitivity with which
            InsightFinder will cluster logs and detect anomalous
            logs. With higher sensitivity, system detects more anomalies.
          </p>
          <div className="select field" style={{ width: 180 }}>
            <label>Anomaly Sensitivity</label>
            <AnomalyThresholdSensitivity valueLink={pvalueLink} />
          </div>
          <h3>Frequency Anomaly Detection Settings</h3>
          <p>
            Sensitivity: This setting controls sensitivity InsightFinder will
            alert on frequency anomaly in given a time window.
            With higher sensitivity, system detects more anomalies.
          </p>
          <div className="select field" style={{ width: 180 }}>
            <label>Anomaly Sensitivity</label>
            <AnomalyThresholdSensitivity valueLink={derivedpvalueLink} />
          </div>
          <div className="field">
            <div
              className={`ui button ${isSubmitting ? 'loading' : ''} ${hasError ? 'disabled' : ''} blue`}
              {...(isSubmitting || hasError ? {} : { onClick: this.handleSaveClick })}
            >
              Update Settings
            </div>
          </div>
        </form>
      </Container>
    );
  }
}

export default LogSensitivitySetting;
