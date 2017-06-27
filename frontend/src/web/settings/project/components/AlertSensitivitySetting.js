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
import { AnomalyThresholdSensitivity, DurationThreshold } from '../../../app/components/Selectors';
import { settingsMessages } from '../../../../common/settings/messages';

type Props = {
  intl: Object,
  projectName: String,
  currentLoadingComponents: Object,
  data: Object,
  saveProjectSettings: Function,
};

class AlertSensitivitySetting extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.pvalueStateKey = 'pvalue';
    this.cvalueStateKey = 'cvalue';
    this.emailpvalueStateKey = 'emailpvalue';
    this.emailcvalueStateKey = 'emailcvalue';
    this.submitLoadingKey = 'settings_alertsensitivity_submit';

    this.pvaluePropsPath = ['data', this.pvalueStateKey];
    this.cvaluePropsPath = ['data', this.cvalueStateKey];
    this.emailpvaluePropsPath = ['data', this.emailpvalueStateKey];
    this.emailcvaluePropsPath = ['data', this.emailcvalueStateKey];

    const pvalue = get(props, this.pvaluePropsPath);
    const cvalue = get(props, this.cvaluePropsPath);
    const emailpvalue = get(props, this.emailpvaluePropsPath);
    const emailcvalue = get(props, this.emailcvaluePropsPath);
    this.state = { pvalue, cvalue, emailpvalue, emailcvalue };
  }

  componentWillReceiveProps(newProps) {
    const pvalue = get(newProps, this.pvaluePropsPath);
    const cvalue = get(newProps, this.cvaluePropsPath);
    const emailpvalue = get(newProps, this.emailpvaluePropsPath);
    const emailcvalue = get(newProps, this.emailcvaluePropsPath);

    // If the props is changed, set the local state.
    if (
      pvalue !== get(this.props, this.pvaluePropsPath) ||
      cvalue !== get(this.props, this.cvaluePropsPath) ||
      emailpvalue !== get(this.props, this.emailpvaluePropsPath) ||
      emailcvalue !== get(this.props, this.emailcvaluePropsPath)
    ) {
      this.setState({ pvalue, cvalue, emailpvalue, emailcvalue });
    }
  }

  @autobind handleSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const pvalue = this.state[this.pvalueStateKey];
    const cvalue = this.state[this.cvalueStateKey];
    const emailpvalue = this.state[this.emailpvalueStateKey];
    const emailcvalue = this.state[this.emailcvalueStateKey];

    saveProjectSettings(
      projectName,
      { pvalue, cvalue, emailpvalue, emailcvalue },
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
    const emailpvalueLink = VLink.state(this, this.emailpvalueStateKey).check(
      x => Boolean(x),
      intl.formatMessage(settingsMessages.errorEmptySelection),
    );
    const emailcvalueLink = VLink.state(this, this.emailcvalueStateKey).check(
      x => Boolean(x),
      intl.formatMessage(settingsMessages.errorEmptySelection),
    );
    const hasError =
      pvalueLink.error || cvalueLink.error || emailpvalueLink.error || emailcvalueLink.error;
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);

    return (
      <Container fullHeight className="overflow-y-auto">
        <form className={`ui ${hasError ? 'error' : ''} form`} style={{ fontSize: 12, width: 800 }}>
          <h3>Dashboard Alert</h3>
          <p>
            This setting controls the sensitivity with which
            InsightFinder will detect and create anomaly events and
            display them in the Dashboard. With higher sensitivity,
            system detects more anomalies.
          </p>
          <div className="select field" style={{ width: 180 }}>
            <label>Anomaly Sensitivity</label>
            <AnomalyThresholdSensitivity valueLink={pvalueLink} />
          </div>
          <div className="select field" style={{ width: 180 }}>
            <label>Number of Samples</label>
            <DurationThreshold valueLink={cvalueLink} />
          </div>
          <h3>Email Alert</h3>
          <p>
            This setting controls when InsightFinder will notify you via
            email and any configured External Service. With higher sensitivity,
            system detects more anomalies.
          </p>
          <div className="select field" style={{ width: 180 }}>
            <label>Anomaly Sensitivity</label>
            <AnomalyThresholdSensitivity valueLink={emailpvalueLink} />
          </div>
          <div className="select field" style={{ width: 180 }}>
            <label>Number of Samples</label>
            <DurationThreshold valueLink={emailcvalueLink} />
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

export default AlertSensitivitySetting;
