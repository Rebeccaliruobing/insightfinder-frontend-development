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
      var passForm = $("#form_pass1");
      var passFormConfirm = $("#form_pass2");

      var fnameForm = $("#form_fname");
      var lnameForm = $("#form_lname");
      var emailForm = $("#form_email");
      var signcodeForm = $("#form_signcode");

      $(".required").on("keyup blur", function() {
          var input = $(this).val();
          if (input == "") {
            $(this).parent().find("span").text("required");
            $(this).parent().find("i").removeClass("checkmark");
            $(this).parent().find("i").addClass("remove icon");
          }
          else {
            $(this).parent().find("span").text("");
            $(this).parent().find("i").removeClass("remove");
            $(this).parent().find("i").addClass("checkmark");
          }
      }



      passForm.on("keyup blur", function() {
          var passwd = $(this).val();
          var passwdConfirm = passFormConfirm.val();
          if (passwd.length < 8){
              $("#form_pass1_error").text("Password must be at least 8 characters long");
              $(this).addClass("invalid").removeClass("valid");
              $("#icon_pass1").removeClass("checkmark");
              $("#icon_pass1").addClass("remove icon");
          }
          else if (!passwd.match(/[a-z]/)) {
              $("#form_pass1_error").text("Password must have at least 1 lowercase letter");
              $(this).addClass("invalid").removeClass("valid");
              $("#icon_pass1").removeClass("checkmark");
              $("#icon_pass1").addClass("remove icon");
          }
          else if (!passwd.match(/[A-Z]/)) {
              $("#form_pass1_error").text("Password must have at least 1 uppercase letter");
              $(this).addClass("invalid").removeClass("valid");   
              $("#icon_pass1").removeClass("checkmark");
              $("#icon_pass1").addClass("remove icon");
          }
          else if (!passwd.match(/[~!@#$%^&*_+?]/)) {
              $("#form_pass1_error").text("Password must have at least 1 symbol from ~!@#$%^&*_+?");
              $(this).addClass("invalid").removeClass("valid");           
              $("#icon_pass1").removeClass("checkmark");
              $("#icon_pass1").addClass("remove icon");
          }
          else if (passwd != passwdConfirm && passwdConfirm != "") {
              $("#form_pass2_error").text("Password confirmation must match password");
              $("#icon_pass2").removeClass("checkmark");
              passFormConfirm.addClass("invalid").removeClass("valid");
             
              //form 1 is okay
              $("#form_pass1_error").text("");
              $(this).addClass("valid").removeClass("invalid");
              $("#icon_pass1").removeClass("remove");
              $("#icon_pass1").addClass("checkmark icon");
          }
          else {
              $("#form_pass1_error").text("");
              $(this).addClass("valid").removeClass("invalid");
              $("#icon_pass1").removeClass("remove");
              $("#icon_pass1").addClass("checkmark icon");
          }
      });
             
      passFormConfirm.on("keyup blur", function() {
          var passwdConfirm = $(this).val();
          var passwdOrig = passForm.val();
         
          if (passwdConfirm != passwdOrig) {
              $("#form_pass2_error").text("Password confirmation must match password");
              $(this).addClass("invalid").removeClass("valid");
              $("#icon_pass2").removeClass("checkmark");
              $("#icon_pass2").addClass("remove icon");
          }
          else if (passwdConfirm !="") {
              $("#form_pass2_error").text("");
              $(this).addClass("valid").removeClass("invalid");
              $("#icon_pass2").removeClass("remove");
              $("#icon_pass2").addClass("checkmark icon");
          }
      });       
     
      $(':required').one('blur keydown', function () {
          $(this).addClass('touched');
        });    

      this._$el.find('.ui.submit.button').api({
        action: 'signup2',
        method: 'POST',
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
                  <input type="text" class="required" placeholder="Sign code"
                         value={this.state['signCode']}
                         onChange={(e) => this.setState({error: '', signCode: e.target.value})}
                         id="form_signcode"/>
                  <i id="icon_signcode"></i> 
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>User Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" class="required" placeholder="User name"
                         value={this.state['userName']}
                         onChange={(e) => this.setState({error: '', userName: e.target.value})}
                         id="form_username" />
                  <i id="icon_username"></i> 
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Email</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="email" class="required" placeholder="email"
                         value={this.state['email']}
                         onChange={(e) => this.setState({error: '', email: e.target.value})}
                         id="form_email" />
                  <i id="icon_email"></i> 
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>First Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" class="required" placeholder="first name"
                         value={this.state['fname']}
                         onChange={(e) => this.setState({error: '', fname: e.target.value})}
                         id="form_fname" />
                  <i id="icon_fname"></i> 
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Last Name</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="text" class="required" placeholder="last name"
                         value={this.state['lname']}
                         onChange={(e) => this.setState({error: '', lname: e.target.value})}
                         id="form_lname" />
                  <i id="icon_lname"></i> 
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
                         title="Length >= 8, include at least one upper-case letter, one lower-case letter, one number and one special character from ~!@#$%^&*_+?:"
                         value={this.state['pass1']}
                         onChange={(e) => this.setState({error: '', pass1: e.target.value})}
                         id="form_pass1"/>
                  <i id="icon_pass1"></i> 
                  <span id="form_pass1_error"></span>
                </div>
              </div>
              <div className="inline field" style={{display: 'flex'}}>
                <label style={{width: '120px', lineHeight: '32px'}}>Confirm Password</label>
                <div className="ui input" style={{flex: 1}}>
                  <input type="password" placeholder="confirm password"
                         value={this.state['pass2']}
                         onChange={(e) => this.setState({error: '', pass2: e.target.value})}
                         id="form_pass2"/>
                  <i id="icon_pass2"></i> 
                  <span id="form_pass2_error"></span>
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
