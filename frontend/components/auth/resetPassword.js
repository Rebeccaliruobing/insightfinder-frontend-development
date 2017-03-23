import $ from 'jquery';
import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import store from 'store';
import { BaseComponent } from '../../artui/react';
import { hideAppLoader } from '../../src/common/app/actions';

const logo = require('../../images/logo.png');

class ResetPassword extends BaseComponent {

  constructor(props) {
    super(props);
    this._$el = null;

    this.state = {
      userName: '',
      email: '',
      tempPass: '',
      pass1: '',
      pass2: '',
      error: ''
    }
  }
  
  componentDidMount() {
    this.props.hideAppLoader();
    if (this._$el) {
      this._$el.find('.ui.submit.button').api({
        action: 'reset password',
        method: 'POST',
        beforeSend: (settings) => {
          this.setState({
            error: ''
          });
          
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
          
          settings.data = {
            'userName': this.state['userName'],
            'email': this.state['email'],
            'temp-pass': this.state['tempPass'],
            'pass1': this.state['pass1'],
            'pass2': this.state['pass2'],
          };
          return settings;
        },
        beforeXHR: function(xhr) {
          xhr.setRequestHeader ('accept', 'application/json');
          return xhr;
        },
        onSuccess: (resp) => {
          store.clearAll();
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
    const {email, error, userName, tempPass, pass1, pass2} = this.state;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let disabled = !re.test(email) || !userName || !tempPass || !pass1 || !pass2;
    
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
              <h4 className="ui header center aligned">Reset your password</h4>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Username</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" placeholder="Username"
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
                <label style={{width: '120px', lineHeight: '32px'}}>Temp Password</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" placeholder="Temp password"
                         value={this.state['tempPass']}
                         onChange={(e) => this.setState({error: '', tempPass: e.target.value})}/>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Password</label>
                <div className="ui input" style={{flex: 1}}>            
                  <input type="password" placeholder="password"
                         title="Length >= 8, include at least one upper-case letter, one lower-case letter, one number and one special character from ~!@#$%^&*_+?:"
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

export default connect(
  () => ({}),
  { hideAppLoader },
)(ResetPassword);
