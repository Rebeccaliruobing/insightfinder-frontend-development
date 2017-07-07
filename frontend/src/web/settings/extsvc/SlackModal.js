/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { autobind } from 'core-decorators';
import VLink from 'valuelink';
import { get } from 'lodash';

import { Modal } from '../../../../artui/react';
import { Input } from '../../../lib/fui/react';
import { appButtonsMessages } from '../../../common/app/messages';

type Props = {
  intl: Object,
  currentLoadingComponents: Object,
  addExternalService: Function,
  onClose: Function,
};

class SlackModal extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.loadingComponentPath = 'settings_extsvc_slack';
    this.sumbitting = false;

    this.state = {
      account: '',
      webhook: '',
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { currentLoadingComponents } = nextProps;
    const isLoading = get(currentLoadingComponents, this.loadingComponentPath, false);
    if (!isLoading && this.sumbitting) {
      this.sumbitting = false;
      this.modal.close();
    }
  }

  @autobind
  handleSumbit() {
    const { addExternalService } = this.props;
    const { account, webhook } = this.state;
    this.sumbitting = true;
    addExternalService('addSlack', { account, webhook }, { [this.loadingComponentPath]: true });
  }

  render() {
    const { intl, onClose, currentLoadingComponents } = this.props;
    const accountLink = VLink.state(this, 'account').check(x => x, 'This field is required');
    const webhookLink = VLink.state(this, 'webhook').check(x => x, 'This field is required');
    const hasError = accountLink.error || webhookLink.error;
    const isLoading = get(currentLoadingComponents, this.loadingComponentPath, false);
    return (
      <Modal
        ref={c => (this.modal = c)}
        size="tiny"
        closable={false}
        onClose={onClose}
        onCancel={onClose}
      >
        <div className="content">
          <form className={`ui ${hasError ? 'error' : ''} form`}>
            <div className="input field required">
              <label>Type</label>
              <Input valueLink={accountLink} placeholder="eg. 'private' or '#general' or '@team'" />
            </div>
            <div className="input field required">
              <label>Webhook</label>
              <Input valueLink={webhookLink} placeholder="https://hooks.slack.com/services/..." />
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui button deny" onClick={onClose}>
            {intl.formatMessage(appButtonsMessages.cancel)}
          </div>
          <div className={`ui button labeled ${hasError ? 'disabled' : ''}`}>
            <div
              className={`ui button orange ${isLoading ? 'loading' : ''}`}
              onClick={this.handleSumbit}
            >
              <i className="save icon" />
              <span>
                {intl.formatMessage(appButtonsMessages.submit)}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default SlackModal;
