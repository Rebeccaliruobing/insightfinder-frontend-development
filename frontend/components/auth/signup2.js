import $ from 'jquery';
import React from 'react';
import cx from 'classnames';
import {BaseComponent, PropTypes, Input, Link} from '../../artui/react';

const logo = require('../../images/logo.png');

class SignupStep2 extends BaseComponent {

  constructor(props) {
    super(props);
    this._$el = null;

    this.state = {
      userName: '',
      email: '',
      signCode: '',
      pass1: '',
      pass2: '',
      fname: '',
      lname: '',
      companyName: '',
      error: ''
    }
  }

  componentDidMount() {
    if (this._$el) {
      this._$el.find('.ui.submit.button').api({
        action: 'signup2',
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

          let pass1 = this.state['pass1'];
          let pass2 = this.state['pass2'];
          if (pass1.length < 8){
            this.setState({error: "Please confirm password is at least 8 characters long."});
            return false;
          } else if (null === pass1.match(/[0-9]/g)){
            this.setState({error: "Please confirm password contains number."});
            return false;
          } else if (null === pass1.match(/[A-Z]/g)){
            this.setState({error: "Please confirm password contains upper-case letter."});
            return false;
          } else if (null === pass1.match(/[a-z]/g)){
            this.setState({error: "Please confirm password contains lower-case letter."});
            return false;
          } else if (null === pass1.match(/[~!@#$%^&*_+?:]/g)){
            this.setState({error: "Please confirm password contains special character."});
            return false;
          } else if ( pass1 != pass2) {
            this.setState({error: "Please confirm password matches."});
            return false;
          }

          let {error, signCode, ...rest} = this.state;
          settings.data = {
            'signup-code': signCode,
            ...rest
          };
          return settings;
        },
        beforeXHR: function(xhr) {
          xhr.setRequestHeader ('accept', 'application/json');
          return xhr;
        },
        onSuccess: (resp) => {
          console.error(resp.message);
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

    const {userName, email, signCode, pass1, pass2, fname, lname, companyName, error} = this.state;
    let disabled = !(userName && email && signCode && pass1 && pass2 && lname && fname && companyName);

    return (
      <div className="auth ui middle center aligned container" style={{maxWidth: 400, width: 400}}>
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
              <h4 className="ui header center aligned">Sign up</h4>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Sign Code</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" placeholder="Sign code"
                         value={this.state['signCode']}
                         onChange={(e) => this.setState({error: '', signCode: e.target.value})}/>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>User Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" placeholder="User name"
                         value={this.state['userName']}
                         onChange={(e) => this.setState({error: '', userName: e.target.value})}/>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Email</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" placeholder="email"
                         value={this.state['email']}
                         onChange={(e) => this.setState({error: '', email: e.target.value})}/>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>First Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" placeholder="first name"
                         value={this.state['fname']}
                         onChange={(e) => this.setState({error: '', fname: e.target.value})}/>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Last Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" placeholder="last name"
                         value={this.state['lname']}
                         onChange={(e) => this.setState({error: '', lname: e.target.value})}/>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Company Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" placeholder="company name"
                         value={this.state['companyName']}
                         onChange={(e) => this.setState({error: '', companyName: e.target.value})}/>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Password</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="password" placeholder="password"
                         value={this.state['pass1']}
                         onChange={(e) => this.setState({error: '', pass1: e.target.value})}/>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Confirm Password</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="password" placeholder="confirm password"
                         value={this.state['pass2']}
                         onChange={(e) => this.setState({error: '', pass2: e.target.value})}/>
                </div>
              </div>
              <div className="field">
                <div className={cx('ui fluid orange submit button', {disabled:disabled})}>Submit</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SignupStep2;
