import React from 'react';
import { autobind } from 'core-decorators';
import VLink from 'valuelink';
import { Input, Select } from '../../../../lib/fui/react';
import { projectWizardMessages } from '../../../../common/settings/messages';

type Props = {
  intl: Object,
};

type States = {
  instanceTypes: Array<string>,
  region: string,
  iamAccessKey: string,
  secretAccessKey: string,
};

class AWSCloudWatchSetting extends React.PureComponent {
  props: Props;
  state: States = {
    instanceTypes: [],
  };

  @autobind
  handleRegisterClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { instanceTypes, region } = this.state;
    console.log([instanceTypes, region]);
  }

  render() {
    const { intl } = this.props;
    const regionLink = VLink.state(this, 'region')
      .check(x => x, 'The region is required');
    const instanceTypesLink = VLink.state(this, 'instanceTypes')
      .check(x => x.length > 0, 'Select at least one instance type');
    const iamAccessKeyLink = VLink.state(this, 'iamAccessKey')
      .check(x => x, 'IAM Access Key is required');
    const secretAccessKeyLink = VLink.state(this, 'secretAccessKey')
      .check(x => x, 'Secret Access Key is required');
    const valid = !regionLink.error && !instanceTypesLink.error &&
      !iamAccessKeyLink.error && !secretAccessKeyLink.error;

    return (
      <div style={{ fontSize: 14 }}>
        <div
          className="text" style={{ paddingBottom: '1em' }}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(projectWizardMessages.AWSCloudWatchIntro),
          }}
        />
        <div className="field">
          <label>Instance Type</label>
          <Select
            multi valueLink={instanceTypesLink}
            options={[
              { label: 'EC2', value: 'EC2' },
              { label: 'RDS', value: 'RDS' },
              { label: 'DynamoDB', value: 'DynamoDB' },
            ]}
          />
        </div>
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
        </div>
        <div className="field">
          <label>IAM Access Key ID</label>
          <Input valueLink={iamAccessKeyLink} />
        </div>
        <div className="field">
          <label>Secret Access Key</label>
          <Input valueLink={secretAccessKeyLink} />
        </div>
        <div className="inline field text-right">
          <div
            className={`ui blue button ${valid ? '' : 'disabled'}`}
            {...valid ? { onClick: this.handleRegisterClick } : {}}
          >Register</div>
        </div>
      </div>
    );
  }
}

export default AWSCloudWatchSetting;
