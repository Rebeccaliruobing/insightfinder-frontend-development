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
import VLink from 'valuelink';

import { Container, Input } from '../../../../lib/fui/react';

type Props = {
  intl: Object,
  projectName: String,
  currentLoadingComponents: Object,
  data: Object,
  saveProjectSettings: Function,
};

class DataDisqualifiersSetting extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.learningStateKey = 'learningSkippingPeriod';
    this.detectionStateKey = 'detectionSkippingPeriod';
    this.learningSubmitLoadingKey = 'sharedUserNames_learning_submit';
    this.detectionSubmitLoadingKey = 'sharedUserNames_detection_submit';
    this.learningPropsPath = ['data', this.learningStateKey];
    this.detectionPropsPath = ['data', this.detectionStateKey];

    this.state = {
      [this.learningStateKey]: get(props, this.learningPropsPath),
      [this.detectionStateKey]: get(props, this.detectionPropsPath),
    };
  }

  componentWillReceiveProps(newProps) {
    const newLearningSkippingPeriod = get(newProps, this.learningPropsPath);
    const newDetectionSkippingPeriod = get(newProps, this.detectionPropsPath);

    // If the users prop is changed, set the local state.
    if (
      !R.equals(newLearningSkippingPeriod, get(this.props, this.learningPropsPath)) ||
      !R.equals(newDetectionSkippingPeriod, get(this.props, this.detectionPropsPath))
    ) {
      this.setState({
        [this.learningStateKey]: newLearningSkippingPeriod || undefined,
        [this.detectionStateKey]: newDetectionSkippingPeriod || undefined,
      });
    }
  }

  @autobind handleLearningSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const learningSkippingPeriod = this.state.learningSkippingPeriod || '';
    saveProjectSettings(
      projectName,
      { learningSkippingPeriod },
      { [this.learningSubmitLoadingKey]: true },
    );
  }

  @autobind handleDetectionSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const detectionSkippingPeriod = this.state.detectionSkippingPeriod || '';
    saveProjectSettings(
      projectName,
      { detectionSkippingPeriod },
      { [this.detectionSubmitLoadingKey]: true },
    );
  }

  render() {
    const learningSkippingPeriodLink = VLink.state(this, this.learningStateKey);
    const detectionSkippingPeriodLink = VLink.state(this, this.detectionStateKey);
    const hasError = learningSkippingPeriodLink.error || detectionSkippingPeriodLink.error;
    const isLearningSubmitting = get(
      this.props.currentLoadingComponents,
      this.learningSubmitLoadingKey,
      false,
    );
    const isDetectionSubmitting = get(
      this.props.currentLoadingComponents,
      this.learningSubmitLoadingKey,
      false,
    );

    return (
      <Container fullHeight className="overflow-y-auto">
        <form className={`ui ${hasError ? 'error' : ''} form`} style={{ fontSize: 12, width: 800 }}>
          <h3>Time-Based Exclusions</h3>
          <p>
            As InsightFinder continuously learns about your
            environment, you will identify times that reflect
            invalid data that should <i>not</i> be used to
            identify performance baselines for your systems.
            These periods may include service windows, scheduled
            or unscheduled downtime, etc.
          </p>
          <p>
            You may specify your timeframe here as either a
            one-time or recurring period.  Examples include:
          </p>
          <ul>
            <li>Recurring: Every Sunday</li>
            <li>Recurring: Every Saturday 00:00-01:00 GMT</li>
            <li>One-Time: 2016-12-25 02:00-07:00 GMT</li>
          </ul>
          <p>
            If you need assistance or have questions, please contact
            us at support@insightfinder.com.
          </p>
          <div className="input field">
            <Input valueLink={learningSkippingPeriodLink} />
          </div>
          <div className="field">
            <div
              className={`ui button ${isLearningSubmitting ? 'loading' : ''} blue`}
              {...(isLearningSubmitting ? {} : { onClick: this.handleLearningSaveClick })}
            >
              Update Learning Settings
            </div>
          </div>
          <div className="input field">
            <Input valueLink={learningSkippingPeriodLink} />
          </div>
          <div className="field">
            <div
              className={`ui button ${isDetectionSubmitting ? 'loading' : ''} blue`}
              {...(isDetectionSubmitting ? {} : { onClick: this.handleDetectionSaveClick })}
            >
              Update Detection Settings
            </div>
          </div>
        </form>
      </Container>
    );
  }
}

export default DataDisqualifiersSetting;
