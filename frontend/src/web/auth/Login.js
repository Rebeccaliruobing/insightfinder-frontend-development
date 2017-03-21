import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import VLink from 'valuelink';
import cx from 'classnames';
import { get } from 'lodash';
import { compose } from 'ramda';
import { autobind } from 'core-decorators';
import { injectIntl } from 'react-intl';
import type { State } from '../../common/types';
import { hideAppLoader } from '../../common/app/actions';
import { login } from '../../common/auth/actions';
import appFieldsMessages from '../../common/app/appFieldsMessages';
import authMessages from '../../common/auth/authMessages';
import { Input } from '../../lib/fui/react';
import { CenterPage, LocaleSelector } from '../app/components';

type Props = {
  appLoaderVisible: bool,
  isLoggedIn: bool,
  isLoggingIn: bool,
  intl: $IntlShape,
  hideAppLoader: Function,
  login: Function,
  location: Object,
};

type States = {
  userName: string,
  password: string,
}

class Login extends React.Component {
  props: Props;
  state: States = {
    userName: '',
    password: '',
  }

  componentDidMount() {
    if (this.props.appLoaderVisible) {
      this.props.hideAppLoader();
    }
  }

  @autobind
  handleSignIn(e) {
    e.preventDefault();
    const { userName, password } = this.state;
    this.props.login(userName, password);
  }

  @autobind
  handleEnterSubmit(e) {
    const { userName, password } = this.state;
    if (e.key === 'Enter' && userName && password) {
      e.preventDefault();
      const { userName, password } = this.state;
      this.props.login(userName, password);
    }
  }

  render() {
    const { intl, isLoggingIn, isLoggedIn, location } = this.props;
    const userNameLink = VLink.state(this, 'userName')
      .check(x => x, intl.formatMessage(authMessages.errorsUserNameRequired));
    const passwordLink = VLink.state(this, 'password')
      .check(x => x, intl.formatMessage(authMessages.errorsPasswordRequired));
    const disabled = userNameLink.error || passwordLink.error || isLoggingIn;
    const from = get(location, 'state.from', '/');

    if (isLoggedIn) {
      return (<Redirect to={from} />);
    }

    return (
      <CenterPage className="auth">
        <form className="ui form">
          <LocaleSelector style={{ marginBottom: 10 }} />
          <div className="input field required">
            <label>{intl.formatMessage(appFieldsMessages.userName)}</label>
            <Input valueLink={userNameLink} icon="user icon" />
          </div>
          <div className="input field required">
            <label>{intl.formatMessage(appFieldsMessages.password)}</label>
            <Input
              type="password" valueLink={passwordLink} icon="lock icon"
              onKeyPress={this.handleEnterSubmit}
            />
          </div>
          <div className="field" style={{ textAlign: 'right' }}>
            <Link tabIndex={-1} to="/forgotPassword">
              {intl.formatMessage(authMessages.hintsForgotPassword)}
            </Link>
            <span style={{ margin: '0 0.5em' }}>
              {intl.formatMessage(authMessages.hintsOr)}
            </span>
            <Link tabIndex={-1} to="/forgotUsername">
              {intl.formatMessage(authMessages.hintsUserName)}
            </Link>
          </div>
          <div className="field">
            <div
              className={cx('ui fluid orange submit button', { disabled, loading: isLoggingIn })}
              onClick={this.handleSignIn}
            >
              {intl.formatMessage(authMessages.buttonsSignIn)}
            </div>
          </div>
          <div
            className="field"
            style={{ borderTop: '1px solid #ccc', paddingTop: 10, textAlign: 'right' }}
          >
            <div style={{ float: 'left', marginTop: 7 }}>
              {intl.formatMessage(authMessages.hintsNewUser)}
            </div>
            <Link tabIndex={-1} to="/signup">
              <div className="ui orange basic button">
                {intl.formatMessage(authMessages.buttonsSignUp)}
              </div>
            </Link>
          </div>
        </form>
      </CenterPage>
    );
  }
}

export default compose(
  connect(
    (state: State) => ({
      appLoaderVisible: state.app.appLoaderVisible,
      isLoggedIn: state.auth.loggedIn,
      isLoggingIn: state.auth.loggingIn,
    }),
    { login, hideAppLoader },
  ),
  injectIntl,
)(Login);
