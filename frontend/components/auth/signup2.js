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
    var errorPresentInForm = false;
    if (this._$el) {
      var passForm = $("#form_pass1");
      var passFormConfirm = $("#form_pass2");
      var emailForm = $("#form_email");

      $(".required").on("keyup blur", function() {
          var input = $(this).val();
          if (input == "") {
            $(this).addClass("invalid").removeClass("valid");
            $(this).parent().find("span").text("Field Required").addClass("invalid");
            $(this).parent().find("i").removeClass("checkmark valid placeholder").addClass("remove invalid icon");
          }
          else {
            $(this).addClass("valid").removeClass("invalid");
            $(this).parent().find("span").text("").removeClass("invalid");
            $(this).parent().find("i").removeClass("remove invalid placeholder").addClass("checkmark valid");
          }
      }); //end general requirement

      emailForm.on("keyup blur", function() {
        var email = $(this).val();
        var isError = false;
        if (email == "") {
          $("#form_email_error").text("Field Required");
          isError = true;
        }
        else if (!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
          $("#form_email_error").text("Invalid Email Address");
          isError = true;
        }

        if (isError) {
            $("#form_email_error").addClass("invalid");
            $(this).addClass("invalid").removeClass("valid");
            $("#icon_email").removeClass("checkmark valid placeholder");
            $("#icon_email").addClass("remove icon invalid");
        }
        else {
            $("#form_email_error").removeClass("invalid");
            $("#form_email_error").text("");
            $(this).addClass("valid").removeClass("invalid");
            $("#icon_email").removeClass("remove invalid placeholder");
            $("#icon_email").addClass("checkmark valid icon");
        }

      }); //end emailform

      passForm.on("keyup blur", function() {
        var passwd = $(this).val();
        var passwdConfirm = passFormConfirm.val();
        var isError = false;
        if (passwd.length < 8){
            $("#form_pass1_error").text("Password must be at least 8 characters long");
            isError = true;
        }
        else if (!passwd.match(/[a-z]/)) {
            $("#form_pass1_error").text("Password must have at least 1 lowercase letter");
            isError = true;
        }
        else if (!passwd.match(/[A-Z]/)) {
            $("#form_pass1_error").text("Password must have at least 1 uppercase letter");
            isError = true;
        }
        else if (!passwd.match(/[~!@#$%^&*_+?]/)) {
            $("#form_pass1_error").text("Password must have at least 1 symbol from ~!@#$%^&*_+?");
            isError = true;
        }
        else if (passwd != passwdConfirm && passwdConfirm != "") {
            $("#form_pass2_error").text("Password confirmation must match password");
            $("#icon_pass2").removeClass("checkmark valid");
            $("#icon_pass2").addClass("remove icon invalid");
            passFormConfirm.addClass("invalid").removeClass("valid");
           
            //form 1 is okay
            isError = false;
        }
        if (isError) {
            $("#form_pass1_error").addClass("invalid");
            $(this).addClass("invalid").removeClass("valid");
            $("#icon_pass1").removeClass("checkmark valid placeholder");
            $("#icon_pass1").addClass("remove icon invalid");
        }
        else {
            $("#form_pass1_error").removeClass("invalid");
            $("#form_pass1_error").text("");
            $(this).addClass("valid").removeClass("invalid");
            $("#icon_pass1").removeClass("remove invalid placeholder");
            $("#icon_pass1").addClass("checkmark valid icon");
        }
      }); //end passwordform
             
      passFormConfirm.on("keyup blur", function() {
        var passwdConfirm = $(this).val();
        var passwdOrig = passForm.val();
       
        if (passwdConfirm != passwdOrig) {
            $("#form_pass2_error").text("Password confirmation must match password").addClass("invalid");
            $(this).addClass("invalid").removeClass("valid");
            $("#icon_pass2").removeClass("checkmark valid placeholder");
            $("#icon_pass2").addClass("remove icon invalid");
        }
        else if (passwdConfirm !="") {
            $("#form_pass2_error").text("").removeClass("invalid");
            $(this).addClass("valid").removeClass("invalid");
            $("#icon_pass2").removeClass("remove invalid placeholder");
            $("#icon_pass2").addClass("checkmark valid icon");
        }
      }); //end passwordconfirm form       
     
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
            /*
            this.setState({
              error: 'Please input correct email address.'
            });
            */
            return false;
          }
          let pass1 = this.state['pass1'];
          let pass2 = this.state['pass2'];
          if (pass1.length < 8){
            //this.setState({error: "Please confirm password is at least 8 characters long."});
            return false;
          } else if (null === pass1.match(/[0-9]/g)){
            //this.setState({error: "Please confirm password contains number."});
            return false;
          } else if (null === pass1.match(/[A-Z]/g)){
            //this.setState({error: "Please confirm password contains upper-case letter."});
            return false;
          } else if (null === pass1.match(/[a-z]/g)){
            //this.setState({error: "Please confirm password contains lower-case letter."});
            return false;
          } else if (null === pass1.match(/[~!@#$%^&*_+?:]/g)){
            this.setState({error: "Please confirm password contains special character."});
            return false;
          } else if ( pass1 != pass2) {
            //this.setState({error: "Please confirm password matches."});
            return false;
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
                  <input type="text" className="required" placeholder="Sign code"
                         value={this.state['signCode']}
                         onChange={(e) => this.setState({error: '', signCode: e.target.value})}
                         id="form_signcode"/>
                  <i id="icon_signcode" className="placeholder checkmark icon"></i> 
                  <span className="errorbox"></span>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>User Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" className="required" placeholder="User name"
                         value={this.state['userName']}
                         onChange={(e) => this.setState({error: '', userName: e.target.value})}
                         id="form_username" />
                  <i id="icon_username" className="placeholder checkmark icon"></i> 
                  <span className="errorbox"></span>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Email</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="email" className="required" placeholder="Email"
                         value={this.state['email']}
                         onChange={(e) => this.setState({error: '', email: e.target.value})}
                         id="form_email" />
                  <i id="icon_email" className="placeholder checkmark icon"></i> 
                  <span id="form_email_error" className="errorbox"></span>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>First Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" className="required" placeholder="First Name"
                         value={this.state['fname']}
                         onChange={(e) => this.setState({error: '', fname: e.target.value})}
                         id="form_fname" />
                  <i id="icon_fname" className="placeholder checkmark icon"></i> 
                  <span className="errorbox"></span>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Last Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" className="required" placeholder="Last Name"
                         value={this.state['lname']}
                         onChange={(e) => this.setState({error: '', lname: e.target.value})}
                         id="form_lname" />
                  <i id="icon_lname" className="placeholder checkmark icon"></i> 
                  <span className="errorbox"></span>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Company Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" className="required" placeholder="Company Name"
                         value={this.state['companyName']}
                         onChange={(e) => this.setState({error: '', companyName: e.target.value})}/>
                  <i className="placeholder checkmark icon"></i>
                  <span className="errorbox"></span>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Password</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="password" placeholder="Password"
                         title="Length >= 8, include at least one upper-case letter, one lower-case letter, one number and one special character from ~!@#$%^&*_+?:"
                         value={this.state['pass1']}
                         onChange={(e) => this.setState({error: '', pass1: e.target.value})}
                         id="form_pass1"/>
                  <i id="icon_pass1" className="placeholder checkmark icon"></i> 
                  <span className="errorbox" id="form_pass1_error"></span>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Confirm Password</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="password" placeholder="Confirm Password"
                         value={this.state['pass2']}
                         onChange={(e) => this.setState({error: '', pass2: e.target.value})}
                         id="form_pass2"/>
                  <i id="icon_pass2" className="placeholder checkmark icon"></i> 
                  <span className="errorbox" id="form_pass2_error"></span>
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
