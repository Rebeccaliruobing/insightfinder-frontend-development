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
  instanceType: string,
  dataType: String,
  samplingInterval: String,
  region: string,
  iamAccessKey: string,
  secretAccessKey: string,
  processName: String,
};

class InsightAgentSetting extends React.PureComponent {
  props: Props;
  state: States = {
    instanceType: '',
    dataType: '',
    samplingInterval: '',
    region: '',
    iamAccessKey: '',
    secretAccessKey: '',
    processName: '',
  };

  @autobind handleRegisterClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { projectName } = this.props;
    const {
      instanceType,
      dataType,
      samplingInterval,
      region,
      iamAccessKey,
      secretAccessKey,
      processName,
    } = this.state;
    this.props.createProject(projectName, 'InsightAgent', {
      instanceType,
      dataType,
      samplingInterval,
      region,
      iamAccessKey,
      secretAccessKey,
      processName,
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
    const { dataType, instanceType } = this.state;

    const showInterval = instanceType !== 'LogFile' && dataType !== 'Log';
    const isAWS = instanceType === 'AWS';
    const isLog = instanceType === 'LogFile' || dataType === 'Log';
    const isSysCall = dataType === 'SysCall';

    const instanceTypeLink = VLink.state(this, 'instanceType').check(
      x => x,
      'The instance type is required',
    );
    const dataTypeLink = VLink.state(this, 'dataType').check(x => x, 'The data type is required');
    const samplingIntervalLink = VLink.state(this, 'samplingInterval').check(
      x => x,
      'The sampling interal is required',
    );
    const regionLink = VLink.state(this, 'region').check(x => x, 'The region is required');
    const iamAccessKeyLink = VLink.state(this, 'iamAccessKey').check(
      x => Boolean(x),
      'IAM Access Key is required',
    );
    const secretAccessKeyLink = VLink.state(this, 'secretAccessKey').check(
      x => Boolean(x),
      'Secret Access Key is required',
    );

    const processNameLink = VLink.state(this, 'processName');

    let hasError = dataTypeLink.error || instanceTypeLink.error;
    if (!hasError) {
      if (!isLog) {
        hasError = samplingIntervalLink.error;
      }

      if (!hasError && isAWS) {
        hasError = regionLink.error || iamAccessKeyLink.error || secretAccessKeyLink.error;
      }
    }

    const isSubmitting = projectCreationStatus === 'creating';

    return (
      <div style={{ fontSize: 14 }}>
        <div
          className="text"
          style={{ paddingBottom: '1em' }}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(projectWizardMessages.InsightAgentIntro),
          }}
        />
        <div className="field">
          <label>Instance Type</label>
          <Select
            valueLink={instanceTypeLink}
            options={[
              { label: 'AWS', value: 'AWS' },
              { label: 'GCE', value: 'GCE' },
              { label: 'Private Cloud', value: 'PrivateCloud' },
              { label: 'Metric File Replay', value: 'MetricFile' },
              { label: 'Log File Replay', value: 'LogFile' },
            ]}
          />
        </div>
        <div className="field">
          <label>Data Type</label>
          <Select
            valueLink={dataTypeLink}
            options={[
              { label: 'Metric', value: 'Metric' },
              { label: 'Log', value: 'Log' },
              { label: 'SysCall', value: 'SysCall' },
            ]}
          />
        </div>
        {showInterval &&
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
          </div>}
        {isAWS &&
          <div className="field">
            <label>Region</label>
            <Select
              valueLink={regionLink}
              options={[
                { label: 'us-east-1', value: 'us-east-1' },
                { label: 'us-west-2', value: 'us-west-2' },
                { label: 'eu-west-1', value: 'eu-west-1' },
                { label: 'eu-central-1', value: 'eu-central-1' },
                { label: 'ap-northeast-1', value: 'ap-northeast-1' },
                { label: 'ap-northeast-2', value: 'ap-northeast-2' },
                { label: 'ap-southeast-1', value: 'ap-southeast-1' },
                { label: 'ap-southeast-2', value: 'ap-southeast-2' },
                { label: 'sa-east-1', value: 'sa-east-1' },
              ]}
            />
          </div>}
        {isAWS &&
          <div className="field">
            <label>IAM Access Key ID</label>
            <Input valueLink={iamAccessKeyLink} />
          </div>}
        {isAWS &&
          <div className="field">
            <label>Secret Access Key</label>
            <Input valueLink={secretAccessKeyLink} />
          </div>}
        {isSysCall &&
          <div className="field">
            <label>Process Names (comma separated), eg. "httpd,apache"</label>
            <Input valueLink={processNameLink} />
          </div>}
        <div className="inline field text-right">
          <div
            className={`ui button ${isSubmitting ? 'loading' : ''} ${hasError ? 'disabled' : ''} blue`}
            {...(isSubmitting || hasError ? {} : { onClick: this.handleRegisterClick })}
          >
            Register
          </div>
        </div>
      </div>
    );
  }
}

export default InsightAgentSetting;
