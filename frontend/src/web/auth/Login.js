import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import VLink from 'valuelink';
import cx from 'classnames';
import { get } from 'lodash';
import momenttz from 'moment-timezone';
import R from 'ramda';
import { autobind } from 'core-decorators';
import { injectIntl } from 'react-intl';
import type { State, Message } from '../../common/types';
import { hideAppLoader } from '../../common/app/actions';
import { login } from '../../common/auth/actions';
import { appFieldsMessages } from '../../common/app/messages';
import { authMessages } from '../../common/auth/messages';
import { Input, Select } from '../../lib/fui/react';
import { CenterPage, LocaleSelector } from '../app/components';

type Props = {
  appLoaderVisible: boolean,
  isLoggedIn: boolean,
  isLoggingIn: boolean,
  intl: Object,
  hideAppLoader: Function,
  login: Function,
  loginReason: Message,
  location: Object,
};

class LoginCore extends React.Component {
  props: Props;

  constructor(props) {
    super(props);

    this.timezoneOptions = R.map(t => ({ label: t, value: t }), momenttz.tz.names());
    this.state = {
      userName: '',
      password: '',
      timezone: momenttz.tz.guess(),
    };
  }

  componentDidMount() {
    if (this.props.appLoaderVisible) {
      this.props.hideAppLoader();
    }
  }

  @autobind
  handleSignIn(e) {
    e.preventDefault();
    const { userName, password, timezone } = this.state;
    this.props.login(userName, password, { timezone });
  }

  @autobind
  handleEnterSubmit(e) {
    const { userName, password, timezone } = this.state;
    if (e.key === 'Enter' && userName && password) {
      e.preventDefault();
      this.props.login(userName, password, { timezone });
    }
  }

  render() {
    const { intl, isLoggingIn, isLoggedIn, location, loginReason } = this.props;

    const userNameLink = VLink.state(this, 'userName').check(
      x => x,
      intl.formatMessage(authMessages.errorsUserNameRequired),
    );
    const passwordLink = VLink.state(this, 'password').check(
      x => x,
      intl.formatMessage(authMessages.errorsPasswordRequired),
    );
    const timezoneLink = VLink.state(this, 'timezone');
    const disabled = userNameLink.error || passwordLink.error || isLoggingIn;
    const from = get(location, 'state.from', '/');
    const hasError = !isLoggedIn && loginReason;

    if (isLoggedIn) {
      if (from && from.pathname && from.pathname === '/account-info') {
        return <Redirect to="/" />;
      }
      return <Redirect to={from} />;
    }

    return (
      <CenterPage className="auth">
        <form className={`ui ${hasError ? 'error' : ''} form`}>
          <LocaleSelector style={{ marginBottom: 10 }} />
          {hasError &&
            <div className="ui error message">
              {intl.formatMessage(loginReason)}
            </div>}
          <div className="input field required">
            <label>
              {intl.formatMessage(appFieldsMessages.userName)}
            </label>
            <Input valueLink={userNameLink} icon="user icon" />
          </div>
          <div className="input field required">
            <label>
              {intl.formatMessage(appFieldsMessages.password)}
            </label>
            <Input
              type="password"
              valueLink={passwordLink}
              icon="lock icon"
              onKeyPress={this.handleEnterSubmit}
            />
          </div>
          <div className="field">
            <label>
              {intl.formatMessage(appFieldsMessages.timezone)}
            </label>
            <Select name="timezone" options={this.timezoneOptions} valueLink={timezoneLink} />
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

const Login = injectIntl(LoginCore);
export default connect(
  (state: State) => ({
    appLoaderVisible: state.app.appLoaderVisible,
    loginReason: state.auth.loginReason,
    isLoggedIn: state.auth.loggedIn,
    isLoggingIn: state.auth.loggingIn,
  }),
  { login, hideAppLoader },
)(Login);
