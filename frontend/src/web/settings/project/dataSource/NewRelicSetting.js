/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { autobind } from 'core-decorators';
import VLink from 'valuelink';
import { Input, Select } from '../../../../lib/fui/react';
import { projectWizardMessages } from '../../../../common/settings/messages';

type Props = {
  intl: Object,
  projectName: String,
  projectCreationStatus: String,
  createProject: Function,
  onSuccess: Function,
};

type States = {
  appKey: string,
  apiKey: string,
  samplingInterval: String,
};

class NewRelicSetting extends React.PureComponent {
  props: Props;
  state: States = {
    apiKey: '',
    samplingInterval: '',
  };

  @autobind
  handleRegisterClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { projectName } = this.props;
    const { apiKey, samplingInterval } = this.state;
    this.props.createProject(projectName, 'NewRelic', {
      apiKey,
      samplingInterval,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { projectCreationStatus, onSuccess } = nextProps;
    if (projectCreationStatus === 'success') {
      onSuccess();
    }
  }

  render() {
    const { intl, projectCreationStatus } = this.props;
    const samplingIntervalLink = VLink.state(this, 'samplingInterval').check(
      x => x,
      'The sampling interal is required',
    );
    const apiKeyLink = VLink.state(this, 'apiKey').check(x => x, 'The api key is required');
    const hasError = samplingIntervalLink.error || apiKeyLink.error;

    const isSubmitting = projectCreationStatus === 'creating';

    return (
      <div style={{ fontSize: 14 }}>
        <div
          className="text"
          style={{ paddingBottom: '1em' }}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(projectWizardMessages.PublicNewRelicIntro),
          }}
        />
        <div className="field">
          <label>API Key</label>
          <Input valueLink={apiKeyLink} />
        </div>
        <div className="field">
          <label>Sampling Interval</label>
          <Select
            valueLink={samplingIntervalLink}
            options={[
              { label: '1 minute', value: '1' },
              { label: '5 minutes', value: '5' },
              { label: '10 minutes', value: '10' },
              { label: '15 minutes', value: '15' },
              { label: '30 minutes', value: '30' },
              { label: '60 minutes', value: '60' },
            ]}
          />
        </div>
        <div className="inline field text-right">
          <div
            className={`ui button ${isSubmitting ? 'loading' : ''} ${hasError
              ? 'disabled'
              : ''} blue`}
            {...(isSubmitting || hasError ? {} : { onClick: this.handleRegisterClick })}
          >
            Register
          </div>
        </div>
      </div>
    );
  }
}

export default NewRelicSetting;
