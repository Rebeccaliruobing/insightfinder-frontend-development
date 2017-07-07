/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { autobind } from 'core-decorators';

import { Container, Table, Column, AutoSizer } from '../../../lib/fui/react';
import { BaseUrls } from '../../app/Constants';
import { appButtonsMessages } from '../../../common/app/messages';
import { settingsButtonMessages } from '../../../common/settings/messages';
import {
  loadExternalServiceList,
  removeExternalService,
  addExternalService,
} from '../../../common/settings/actions';
import { State } from '../../../common/types';
import SlackModal from './SlackModal';

type Props = {
  intl: Object,
  externalServiceList: Array<Object>,
  currentLoadingComponents: Object,
  loadExternalServiceList: Function,
  removeExternalService: Function,
};

class ExternalServiceListCore extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      showSlackModal: false,
    };

    const { intl } = props;

    // Column renderer for remove button
    this.removeRenderer = ({ cellData, rowData }) => {
      return (
        <div
          className={`hover-show ui grey button ${rowData.status === 'removing' ? 'loading' : ''}`}
          onClick={this.handleExtsvcRemove(cellData)}
        >
          {intl.formatMessage(appButtonsMessages.remove)}
        </div>
      );
    };
  }

  componentDidMount() {
    this.props.loadExternalServiceList();
  }

  @autobind
  handleExtsvcRemove(serviceId) {
    return () => {
      if (serviceId) {
        this.props.removeExternalService(serviceId);
      }
    };
  }

  @autobind
  handleShowSlackModal() {
    this.setState({
      showSlackModal: true,
    });
  }

  @autobind
  handleSlackModalClose() {
    this.setState({
      showSlackModal: false,
    });
  }

  render() {
    const { intl, externalServiceList, currentLoadingComponents, addExternalService } = this.props;
    const { showSlackModal } = this.state;
    return (
      <Container fullHeight withGutter className="flex-col" style={{ padding: '1em 0' }}>
        <h3>PagerDuty Settings</h3>
        <Container>
          <div className="text">
            You can manage your alerts with your PagerDuty account. Click the button below to
            integrate your account alerts with PagerDuty.
          </div>
          <a target="_blank" rel="noopener noreferrer" href={BaseUrls.PagerDutyUrl}>
            <img alt="PagerDuty" height="40px" src={BaseUrls.PagerDutyImg} />
          </a>
          <hr />
        </Container>
        <h3>Slack Integration</h3>
        <Container>
          <div className="text">
            Register your Incoming WebHook from Slack to integrate your account alerts with Slack.
          </div>
          <img alt="Slack" height="40px" src={BaseUrls.SlackImg} />
          <br />
          <div className="ui small positive action button" onClick={this.handleShowSlackModal}>
            {intl.formatMessage(settingsButtonMessages.addWebHook)}
          </div>
          <hr />
          {showSlackModal &&
            <SlackModal
              intl={intl}
              currentLoadingComponents={currentLoadingComponents}
              addExternalService={addExternalService}
              onClose={this.handleSlackModalClose}
            />}
        </Container>
        <h3 style={{ marginBottom: '1em' }}>Currently Registered External Services</h3>
        <Container fullHeight className="flex-grow">
          <AutoSizer disableWidth>
            {({ height }) =>
              <Table
                className="with-border"
                width={1000}
                height={height}
                headerHeight={40}
                rowHeight={40}
                rowCount={externalServiceList.length}
                rowGetter={({ index }) => externalServiceList[index]}
              >
                <Column width={400} label="Service Type" dataKey="serviceProvider" />
                <Column width={250} label="Account" dataKey="account" />
                <Column width={250} label="ServiceKey" dataKey="serviceKey" />
                <Column
                  width={100}
                  label=""
                  className="text-right"
                  cellRenderer={this.removeRenderer}
                  dataKey="id"
                />
              </Table>}
          </AutoSizer>
        </Container>
      </Container>
    );
  }
}

const ExternalServiceList = injectIntl(ExternalServiceListCore);

export default connect(
  (state: State) => {
    const { externalServiceList } = state.settings;
    const { currentLoadingComponents } = state.app;
    return { externalServiceList, currentLoadingComponents };
  },
  { loadExternalServiceList, removeExternalService, addExternalService },
)(ExternalServiceList);
