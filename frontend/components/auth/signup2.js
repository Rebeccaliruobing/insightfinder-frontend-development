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

  renderField(display, name) {
    return (
      <div className="inline field">
        <label style={{width: '80px'}}>{display}</label>
        <div className="ui icon input">
          <input type="text" name="userName" placeholder={display}
                 value={this.state[name]}
                 onChange={(e) => this.setState(_.fromPairs([name, e.target.value]))} />
        </div>
      </div>
    )
  }

  render() {

    const {userName, email, signCode, pass1, pass2, fname, lname, companyName, error} = this.state;
    let disabled = !(userName && email && signCode && pass1 && pass2 && lname && fname && companyName);

    // 姓名 公司 email
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
              <h4 className="ui header center aligned">Sign up</h4>
              {this.renderField("User Name", 'userName')}
              {this.renderField("Email", 'email')}
              {this.renderField("First Name", 'fname')}
              {this.renderField("Last Name", 'lname')}
              {this.renderField("Company Name", 'companyName')}
              {this.renderField("Sign Code", 'signCode')}
              {this.renderField("Password", 'pass1')}
              {this.renderField("Confirm Password", 'pass2')}

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
