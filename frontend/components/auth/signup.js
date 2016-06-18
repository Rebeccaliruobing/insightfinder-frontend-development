import $ from 'jquery';
import React from 'react';
import cx from 'classnames';
import {BaseComponent, PropTypes, Input, Link} from '../../artui/react';

const logo = require('../../images/logo.png');

class Signup extends BaseComponent {

  constructor(props) {
    super(props);
    this._$el = null;

    this.state = {
      userName: '',
      email: '',
      checked: false,
      error: ''
    }
  }
  
  componentDidMount() {
    if (this._$el) {
      this._$el.find('.ui.submit.button').api({
        action: 'signup',
        method: 'POST',
        beforeSend: (settings) => {
          this.setState({
            error: ''
          });
          
          let email = this.state['email'];
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(email)) {
            this.setState({
              error: 'Please input correct email address.'
            });
            return false;
          }
          
          settings.data = {
            'username': this.state['userName'],
            'email': this.state['email'],
            'accept': true
          };
          return settings;
        },
        beforeXHR: function(xhr) {
          xhr.setRequestHeader ('accept', 'application/json');
          return xhr;
        },
        onSuccess: (resp) => {
          window.alert(resp.message);
          window.location.href = '/signup2';
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

    const {userName, email, checked, error} = this.state;
    let disabled = !userName || !email ||!checked;

    return (
      <div className="auth ui middle center aligned container">
        <div>
          <form className={cx('ui', {error: !!error}, 'form')}
                ref={c=>this._$el = $(c)} >
            <h2 className="ui image header">
              <img src={logo} className="image"/>
            </h2>
            {!!error &&
            <div className="ui error mini message">{error}</div>
            }
            <div className="ui segment left aligned">
              <h4 className="ui header center aligned">Get a sign up code now</h4>
              <div style={{fontSize:13, borderBottom: '1px solid #ccc', marginBottom:12}}>
                <Link to="/signup2">Already have a signup code?</Link>
              </div>
              <div className="field required">
                <label>User Name</label>
                <div className="ui icon input">
                  <i className="user icon"/>
                  <input type="text" name="userName" value={userName}
                         onChange={(e) => this.setState({error: '', userName: e.target.value})} />
                </div>
              </div>
              <div className="field required" style={{marginBottom: 8}}>
                <label>Email</label>
                <div className="ui icon input">
                  <i className="mail icon"/>
                  <input type="text" name="email"
                         value={email}
                         onChange={(e) => this.setState({error: '', email: e.target.value})}/>
                </div>
              </div>
              <div className="inline field" style={{fontSize: 13}}>
                <div className="ui checkbox">
                  <input type="checkbox" tabindex="0" class="hidden" checked={checked} 
                         onChange={(e) => this.setState({error: '', checked: e.target.checked})} />
                  <label>I agree to
                    <a href="https://insightfinder.com/terms-of-use" target="_blank">&nbsp;Terms of Use</a> and
                    <a href="https://insightfinder.com/privacy-policy" target="_blank">&nbsp;Privacy Policy</a>.</label>
                </div>
              </div>
              <div className="field">
                <div className={cx('ui fluid orange submit button', {disabled:disabled})}>Sign Up</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Signup;
