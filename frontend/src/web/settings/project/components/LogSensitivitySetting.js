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

import { Container, Input } from '../../../../lib/fui/react';
import { AnomalyThresholdSensitivity, DurationThreshold } from '../../../app/components/Selectors';
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
    this.cvalueStateKey = 'cvalue';
    this.derivedpvalueStateKey = 'derivedpvalue';
    this.logFreqWindowStateKey = 'logFreqWindow';
    this.submitLoadingKey = 'setting_alertsensitivity_submit';

    this.pvaluePropsPath = ['data', this.pvalueStateKey];
    this.cvaluePropsPath = ['data', this.cvalueStateKey];
    this.derivedpvaluePropsPath = ['data', this.derivedpvalueStateKey];
    this.logFreqWindowPropsPath = ['data', this.logFreqWindowStateKey];

    const pvalue = get(props, this.pvaluePropsPath);
    const cvalue = get(props, this.cvaluePropsPath);
    const derivedpvalue = get(props, this.derivedpvaluePropsPath);
    const logFreqWindow = get(props, this.logFreqWindowPropsPath);
    this.state = { pvalue, cvalue, derivedpvalue, logFreqWindow };
  }

  componentWillReceiveProps(newProps) {
    const pvalue = get(newProps, this.pvaluePropsPath);
    const cvalue = get(newProps, this.cvaluePropsPath);
    const derivedpvalue = get(newProps, this.derivedpvaluePropsPath);
    const logFreqWindow = get(newProps, this.logFreqWindowPropsPath);

    // If the props is changed, set the local state.
    if (
      pvalue !== get(this.props, this.pvaluePropsPath) ||
      cvalue !== get(this.props, this.cvaluePropsPath) ||
      derivedpvalue !== get(this.props, this.derivedpvaluePropsPath) ||
      logFreqWindow !== get(this.props, this.logFreqWindowPropsPath)
    ) {
      this.setState({ pvalue, cvalue, derivedpvalue, logFreqWindow });
    }
  }

  @autobind handleSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const pvalue = this.state[this.pvalueStateKey];
    const cvalue = this.state[this.cvalueStateKey];
    const derivedpvalue = this.state[this.derivedpvalueStateKey];
    const logFreqWindow = this.state[this.logFreqWindowStateKey];

    saveProjectSettings(
      projectName,
      { pvalue, cvalue, derivedpvalue, logFreqWindow },
      { [this.submitLoadingKey]: true },
    );
  }

  render() {
    const { intl } = this.props;
    const pvalueLink = VLink.state(this, this.pvalueStateKey).check(
      x => Boolean(x),
      intl.formatMessage(settingsMessages.errorEmptySelection),
    );
    const cvalueLink = VLink.state(this, this.cvalueStateKey).check(
      x => Boolean(x),
      intl.formatMessage(settingsMessages.errorEmptySelection),
    );
    const derivedpvalueLink = VLink.state(this, this.derivedpvalueStateKey).check(
      x => Boolean(x),
      intl.formatMessage(settingsMessages.errorEmptySelection),
    );
    const logFreqWindowLink = VLink.state(this, this.logFreqWindowStateKey)
      .check(x => Boolean(x), intl.formatMessage(settingsMessages.errorEmptyInput))
      .check(x => !isNaN(x), intl.formatMessage(settingsMessages.errorNotNumberInput));

    const hasError =
      pvalueLink.error || cvalueLink.error || derivedpvalueLink.error || logFreqWindowLink.error;
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);

    return (
      <Container fullHeight className="overflow-y-auto">
        <form className={`ui ${hasError ? 'error' : ''} form`} style={{ fontSize: 12, width: 800 }}>
          <h3>Clustering Sensitivity</h3>
          <p>
            This setting controls the sensitivity with which
            InsightFinder will cluster logs and detect anomalous
            logs. With higher sensitivity, system detects more anomalies.
          </p>
          <div className="select field" style={{ width: 180 }}>
            <label>Anomaly Sensitivity</label>
            <AnomalyThresholdSensitivity valueLink={pvalueLink} />
          </div>
          <div className="select field" style={{ width: 180 }}>
            <label>Number of Samples</label>
            <DurationThreshold valueLink={cvalueLink} />
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
          <div className="input field" style={{ width: 180 }}>
            <label>Number of Samples</label>
            <Input valueLink={logFreqWindowLink} />
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
      </Container>
    );
  }
}

export default LogSensitivitySetting;
