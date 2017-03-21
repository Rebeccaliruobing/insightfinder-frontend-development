import $ from 'jquery';
import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

const logo = require('../../../images/logo.png');

class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this._$el = null;

    this.state = {
      userName: '',
      email: '',
      error: ''
    }
  }
  
  componentDidMount() {
    if (this._$el) {
      this._$el.find('.ui.submit.button').api({
        action: 'get temp password',
        method: 'POST',
        beforeSend: (settings) => {
          this.setState({
            error: ''
          });
          settings.data = {
            'userName': this.state['userName'],
            'email': this.state['email']
          };
          return settings;
        },
        beforeXHR: function (xhr) {
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
              error: resp.message
            });
          }
        }
      })
    }
  }
  
  render() {
    const { email, error, userName } = this.state;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let disabled = !re.test(email) || !userName;
    
    return (
      <div className="auth ui middle center aligned container">
        <div>
          <form className={cx('ui', { error: !!error }, 'form')}
            ref={c => this._$el = $(c)} >
            <h2 className="ui image header">
              <img src={logo} className="image" />
            </h2>
            {!!error &&
              <div className="ui error mini message">{error}</div>
            }
            <div className="ui segment left aligned">
              <h4 className="ui header center aligned">Get a temporary password</h4>
              <div className="field required">
                <label>Username</label>
                <div className="ui icon input">
                  <i className="user icon" />
                  <input type="text" name="userName" value={userName}
                    onChange={(e) => this.setState({ error: '', userName: e.target.value })} />
                </div>
              </div>
              <div className="field required">
                <label>Email</label>
                <div className="ui icon input">
                  <i className="mail icon" />
                  <input type="text" name="email"
                    value={email}
                    onChange={(e) => this.setState({ error: '', email: e.target.value })} />
                </div>
              </div>
              <div className="field" style={{ textAlign: 'right' }}>
                <Link to="/forgotUsername">Forgot username?</Link>
              </div>
              <div className="field">
                <div className={cx('ui fluid orange submit button', { disabled: disabled })}>Submit</div>
              </div>
              <div className="field" style={{ borderTop: '1px solid #ccc', paddingTop: 10, textAlign: 'right' }}>
                <Link to="/login">
                  <div className='ui orange basic button'>Sign In</div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ForgotPassword;
