import $ from 'jquery';
import React from 'react';
import cx from 'classnames';
import {BaseComponent, PropTypes, Input} from '../../artui/react';

const logo = require('../../images/logo.png');

class Login extends BaseComponent {
  static propTypes = {};
  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this._$el = null;
    this.state = {
      userName: '',
      password: ''
    }
  }
  
  componentDidMount() {
    if (this._$el) {
      this._$el.find('.ui.submit.button').api({
        action: 'login',
        method: 'POST',
        beforeSend: (settings) => {
          settings.data = {
            'userName': this.state['userName'],
            'password': this.state['password']
          };
          return settings;
        },
        onSuccess: (resp) => {
          window.location.href = '/';
        },
        onFailure: (resp) => {
          console.log(resp);
        }
      })
    }
  }
  
  render() {
    const {userName, password} = this.state;
    let disabled = !userName || !password;
    
    return (
      <form className="ui form" ref={c=>this._$el = $(c)} >
        <h2 className="ui image header">
          <img src={logo} className="image"/>
        </h2>
        <div className="ui segment left aligned">
          <div className="field required">
            <label>User Name</label>
            <div className="ui icon input">
              <i className="user icon"/>
              <input type="text" name="userName" value={userName}
                     onChange={(e) => this.setState({userName: e.target.value})} />
            </div>
          </div>
          <div className="field required">
            <label>Password</label>
            <div className="ui icon input">
              <i className="lock icon"/>
              <input type="password" name="password" 
                     value={password}
                     onChange={(e) => this.setState({password: e.target.value})}/>
            </div>
          </div>
          <div className={cx('ui fluid orange submit button', {disabled:disabled})}>Sign In</div>
        </div>
      </form>
    )
  }
}

export default Login;
