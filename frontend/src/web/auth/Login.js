import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import type { State } from '../../common/types';
import { Link } from '../../../artui/react';
import logo from '../../../images/logo.png';
import { login } from '../../common/auth/actions';

// TODO: Not used
type Props = {
  isLoggingIn: bool,
};

class Login extends React.Component {
  props: Props;
  static defaultProps = {
    isLoggingIn: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      error: '',
    };
  }

  componentDidMount() {
  }

  render() {
    const { userName, password, error } = this.state;
    const disabled = !userName || !password;

    return (
      <div className="auth ui middle center aligned container">
        <div>
          <form
            className={cx('ui', { error: !!error }, 'form')}
            ref={c => this._$el = $(c)}
          >
            <h2 className="ui image header">
              <img src={logo} className="image" />
            </h2>
            {!!error &&
              <div className="ui error mini message">{error}</div>
            }
            <div className="ui segment left aligned">
              <div className="field required">
                <label>Username</label>
                <div className="ui icon input">
                  <i className="user icon" />
                  <input type="text" name="userName" value={userName}
                    onChange={(e) => this.setState({ userName: e.target.value })} />
                </div>
              </div>
              <div className="field required">
                <label>Password</label>
                <div className="ui icon input">
                  <i className="lock icon" />
                  <input
                    type="password" name="password" className="password"
                    value={password}
                    onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
              </div>
              <div className="field" style={{ textAlign: 'right' }}>
                <Link to="/forgotPassword">Forgot password?</Link> or <Link to="/forgotUsername">username?</Link>
              </div>
              <div className="field">
                <div className={cx('ui fluid orange submit button', { disabled: disabled })}>Sign In</div>
              </div>
              <div className="field" style={{ borderTop: '1px solid #ccc', paddingTop: 10, textAlign: 'right' }}>
                <div style={{ float: 'left', marginTop: 7 }}>New user? </div>
                <Link to="/signup">
                  <div className='ui orange basic button'>Sign Up</div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: State) => ({
    isLoggingIn: state.auth.isloggingIn,
  }),
  { login },
)(Login);
