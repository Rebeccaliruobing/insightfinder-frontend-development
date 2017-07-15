/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import R from 'ramda';
import { autobind } from 'core-decorators';

import { Container, Box } from '../../../lib/fui/react';
import { appMenusMessages, appButtonsMessages } from '../../../common/app/messages';
import { State, Message } from '../../../common/types';
import SystemGeneral from './General';

type Props = {
  intl: Object,
  currentErrorMessage: ?Message,
};

class SystemSettingsCore extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    this.defaultView = 'general';
    this.viewsInfo = [{ key: 'general', name: 'General', component: SystemGeneral }];
  }

  @autobind
  handleRefreshClick() {}

  render() {
    const { intl, currentErrorMessage } = this.props;
    const hasError = false;
    const view = 'general';
    const viewInfo = R.find(v => v.key === view, this.viewsInfo);

    return (
      <Container fullHeight withGutter className="flex-col">
        <Container breadcrumb>
          <div className="section">
            <span className="label">
              {intl.formatMessage(appMenusMessages.settings)}
            </span>
            <span className="divider">/</span>
            <span>
              {intl.formatMessage(appMenusMessages.system)}
            </span>
          </div>
          <div className="section float-right clearfix" style={{ fontSize: 12, marginRight: 0 }}>
            <div className="ui orange button" tabIndex="0" onClick={this.handleRefreshClick}>
              {intl.formatMessage(appButtonsMessages.refresh)}
            </div>
          </div>
        </Container>
        {hasError &&
          <Container fullHeight>
            <div
              className="ui error message"
              style={{ marginTop: 16 }}
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage(currentErrorMessage, {}),
              }}
            />
          </Container>}
        {!hasError &&
          <Container
            fullHeight
            className="overflow-y-auto"
            style={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}
          >
            <Box className="flex-col" style={{ height: '100%', paddingTop: 0 }}>
              <div className="ui pointing secondary menu">
                {R.map(
                  info =>
                    <a key={info.key} className={`${info.key === view ? 'active' : ''} item`}>
                      {info.name}
                    </a>,
                  this.viewsInfo,
                )}
              </div>
              <div className="flex-grow" style={{ overflow: 'hidden' }}>
                {viewInfo && React.createElement(viewInfo.component, { intl })}
              </div>
            </Box>
          </Container>}
      </Container>
    );
  }
}

const SystemSettings = injectIntl(SystemSettingsCore);

export default connect((state: State) => {
  const { currentErrorMessage } = state.settings;
  return { currentErrorMessage };
}, {})(SystemSettings);
