/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import { get } from 'lodash';
import VLink from 'valuelink';
import { connect } from 'react-redux';
import momenttz from 'moment-timezone';

import { Container, Select } from '../../../lib/fui/react';
import { State } from '../../../common/types';
import { hideAppLoader } from '../../../common/app/actions';

type Props = {
  intl: Object,
  currentLoadingComponents: Object,
  hideAppAlert: Function,
};

class SystemGeneral extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    this.timezoneStateKey = 'timezone';
    this.timezoneLoadingKey = 'settings_system_general_timezone';
    this.timezoneOptions = R.map(t => ({ label: t, value: t }), momenttz.tz.names());

    this.state = {
      [this.timezoneStateKey]: '',
    };
  }

  componentDidMount() {
    this.props.hideAppLoader();
  }

  render() {
    const { intl, currentLoadingComponents } = this.props;
    const timezoneLink = VLink.state(this, this.timezoneStateKey);
    const hasError = timezoneLink.error;
    const isSubmitting = get(currentLoadingComponents, this.timezoneLoadingKey, false);

    return (
      <Container fullHeight className="overflow-y-auto">
        <form className={`ui ${hasError ? 'error' : ''} form`} style={{ fontSize: 12, width: 800 }}>
          <h3>Defualt Timezone</h3>
          <p>
            Select the default timezone for the system. The timezone will affect the email
            notification,
          </p>
          <div className="select field" style={{ width: 180 }}>
            <Select name="timezone" options={this.timezoneOptions} valueLink={timezoneLink} />
          </div>
          <div className="field">
            <div
              className={`ui button ${isSubmitting ? 'loading' : ''} blue`}
              {...(isSubmitting ? {} : { onClick: this.handleSaveClick })}
            >
              Update Timezone
            </div>
          </div>
        </form>
      </Container>
    );
  }
}

export default connect(
  (state: State) => {
    const { currentLoadingComponents } = state.app;
    return { currentLoadingComponents };
  },
  { hideAppLoader },
)(SystemGeneral);
