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
      <div style={{ fontSize: 14 }}>
        <div
          className="text" style={{ paddingBottom: '1em' }}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(projectWizardMessages.cAdvisorIntro),
          }}
        />
        <div
          className="text"
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage(projectWizardMessages.cAdvisorAgent),
          }}
        />
      </div>
    );
  }
}

export default cAdvisorSetting;
