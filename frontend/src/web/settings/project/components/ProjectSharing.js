/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import React from 'react';
import R from 'ramda';
import { get } from 'lodash';
import { autobind } from 'core-decorators';
import VLink from 'valuelink';

import { Input } from '../../../../lib/fui/react';

type Props = {
  intl: Object,
  projectName: String,
  currentLoadingComponents: Object,
  data: Object,
  saveProjectSettings: Function,
  submitIsLoading: Boolean,
};

class ProjectSharing extends React.PureComponent {
  props: Props;

  constructor(props) {
    super(props);

    this.stateKey = 'sharedUserNames';
    this.submitLoadingKey = 'sharedUserNames_submit';
    this.namesSeparator = ',';
    this.propsPath = ['data', this.stateKey];

    const users = get(props, this.propsPath, []);
    this.state = {
      [this.stateKey]: users.join(this.namesSeparator),
    };
  }

  componentWillReceiveProps(newProps) {
    const newUsers = get(newProps, this.propsPath, []);

    // If the users prop is changed, set the local state.
    if (!R.equals(newUsers, get(this.props, this.propsPath, []))) {
      this.setState({
        [this.stateKey]: newUsers.join(this.namesSeparator),
      });
    }
  }

  @autobind handleSaveClick() {
    const { saveProjectSettings, projectName } = this.props;
    const sharedUserNamesStr = this.state.sharedUserNames || '';
    // The user might input , or ; as the seperators, convert string to array and remove empty names
    const sharedUserNames = R.filter(R.identical, sharedUserNamesStr.split(/\s*[,;]\s*/));
    saveProjectSettings(projectName, { sharedUserNames }, { [this.submitLoadingKey]: true });
  }

  render() {
    const namesLink = VLink.state(this, 'sharedUserNames');
    const hasError = namesLink.error;
    const isSubmitting = get(this.props.currentLoadingComponents, this.submitLoadingKey, false);

    return (
      <form className={`ui ${hasError ? 'error' : ''} form`} style={{ fontSize: 12, width: 800 }}>
        <h3>Project Sharing</h3>
        <p>
          If you are collaborating with other users, you may invite
          them to view data associated with your Projects.
        </p>
        <p>
          To share your project, enter their User ID(s) in the
          field below and click "Update Sharing Settings".  Those
          users will be able to view your project on their next login.
        </p>
        <div className="input field">
          <Input valueLink={namesLink} />
        </div>
        <div className="field">
          <div
            className={`ui button ${isSubmitting ? 'loading' : ''} blue`}
            {...(isSubmitting ? {} : { onClick: this.handleSaveClick })}
          >
            Update Sharing Settings
          </div>
        </div>
      </form>
    );
  }
}

export default ProjectSharing;
