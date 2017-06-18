import $ from 'jquery';
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link, BaseComponent } from '../../artui/react';
import { hideAppLoader } from '../../src/common/app/actions';

const logo = require('../../images/logo.png');

class ForgotUsername extends BaseComponent {

  constructor(props) {
    super(props);
    this._$el = null;

    this.state = {
      email: '',
      error: '',
    };
  }

  componentDidMount() {
    this.props.hideAppLoader();
    if (this._$el) {
      this._$el.find('.ui.submit.button').api({
        action: 'get username reminder',
        method: 'POST',
        beforeSend: (settings) => {
          this.setState({
            error: '',
          });
          settings.data = {
            email: this.state.email,
          };
          return settings;
        },
        beforeXHR (xhr) {
          xhr.setRequestHeader('accept', 'application/json');
          return xhr;
        },
        onSuccess: (resp) => {
          alert(resp.message);
          window.location.href = '/login';
        },
        onFailure: (resp) => {
          if (resp && resp.message) {
            this.setState({
              error: resp.message,
            });
          }
        },
      });
    }
  }

  render() {
    const { email, error } = this.state;
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const disabled = !re.test(email);

    return (
      <div className="auth ui middle center aligned container">
        <div>
          <form
className={cx('ui', { error: !!error }, 'form')}
            ref={c => this._$el = $(c)}
          >
            <h2 className="ui image header">
              <img src={logo} className="image"  />
            </h2>
            {!!error &&
            <div className="ui error mini message">{error}</div>
            }
            <div className="ui segment left aligned">
              <h4 className="ui header center aligned">Get username reminder email</h4>
              <div className="field required">
                <label>Email</label>
                <div className="ui icon input">
                  <i className="mail icon"  />
                  <input
type="text" name="email"
                    value={email}
                    onChange={e => this.setState({ error: '', email: e.target.value })}  
                  />
                </div>
              </div>
              <div className="field" style={{ textAlign: 'right' }}>
                <Link to="/forgotPassword">Forgot password?</Link>
              </div>
              <div className="field">
                <div className={cx('ui fluid orange submit button', { disabled })}>Submit</div>
              </div>
              <div className="field" style={{ borderTop: '1px solid #ccc', paddingTop: 10, textAlign: 'right' }}>
                <Link to="/login">
                  <div className="ui orange basic button">Sign In</div>
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
  () => ({}),
  { hideAppLoader },
)(ForgotUsername);
