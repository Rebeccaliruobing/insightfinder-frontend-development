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
import { settingsMessages } from '../../../common/settings/messages';
import { loadExternalServiceList, removeExternalService } from '../../../common/settings/actions';
import { State } from '../../../common/types';

type Props = {
  intl: Object,
  externalServiceList: Array<Object>,
  loadExternalServiceList: Function,
  removeExternalService: Function,
};

class ExternalServiceListCore extends React.Component {
  props: Props;

  componentDidMount() {
    this.props.loadExternalServiceList();
  }

  @autobind
  handleExtsvcRemove(serviceId) {
    return e => {
      if (serviceId) {
        this.props.removeExternalService(serviceId);
      }
    };
  }

  render() {
    const { intl, externalServiceList } = this.props;
    const removeRenderer = ({ cellData, rowData }) => {
      return (
        <div
          className={`hover-show ui grey button ${rowData.status === 'removing'}`}
          onClick={this.handleExtsvcRemove(cellData)}
        >
          Remove
        </div>
      );
    };

    return (
      <Container fullHeight withGutter className="flex-col" style={{ padding: '1em 0' }}>
        <Container>
          <h3>PagerDuty Settings</h3>
          <div className="text">
            You can manage your alerts with your PagerDuty account. Click the button below to
            integrate your account alerts with PagerDuty.
          </div>
          <a target="_blank" rel="noopener noreferrer" href={BaseUrls.PagerDutyUrl}>
            <img alt="Connect_button" height="40px" src={BaseUrls.PagerDutyImg} />
          </a>
          <hr />
        </Container>
        <Container>
          <h3>Slack Integration</h3>
          <div className="text">
            Register your Incoming WebHook from Slack to integrate your account alerts with Slack.
          </div>
          <img alt="Connect_button" height="40px" src={BaseUrls.SlackImg} />
          <br />
          <button
            id="btn-slack"
            className="ui small positive action button"
            onClick={e => {
              this.setState({ showModal: true });
            }}
          >
            Add WebHook
          </button>
          <hr />
          <h3 style={{ marginBottom: '1em' }}>Currently Registered External Services</h3>
        </Container>
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
                  cellRenderer={removeRenderer}
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
    return { externalServiceList };
  },
  { loadExternalServiceList, removeExternalService },
)(ExternalServiceList);
