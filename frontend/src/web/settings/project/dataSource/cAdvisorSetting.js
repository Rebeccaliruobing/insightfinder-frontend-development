import React from 'react';
import { projectWizardMessages } from '../../../../common/settings/messages';

type Props = {
  intl: Object,
};

class cAdvisorSetting extends React.PureComponent {
  props: Props;

  render() {
    const { intl } = this.props;
    return (
      <div className="precedure">
        <div
          className="header" style={{ paddingBottom: '1em' }}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(projectWizardMessages.cAdvisorIntro),
          }}
        />
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(projectWizardMessages.cAdvisorAgent),
          }}
        />
      </div>
    );
  }
}

export default cAdvisorSetting;
