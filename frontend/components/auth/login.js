import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import {BaseComponent, PropTypes, Input} from '../../artui/react';

const logo = require('../../images/logo.png');

class Login extends BaseComponent {
  static propTypes = {};
  static defaultProps = {};
  
  constructor(props) {
    super(props);
    this._$el = null;
  }
  
  componentDidMount() {
    if (this._$el) {
      this._$el.find('.ui.submit.button').api({
        action: 'login',
        method: 'POST',
        beforeSend: (settings) => {
          settings.data = {
            'userName': 'guest',
            'password': 'Have1insight!'
          };
          return settings;
        },
        onSuccess: (resp) => {
          console.log(resp);
          alert('设置成功!');
          window.location.reload();
        },
        onFailure: (resp) => {
          console.log(resp);
        }
      })
    }
  }
  
  render() {
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
              <input type="text" name="userName"/>
            </div>
          </div>
          <div className="field required">
            <label>Password</label>
            <div className="ui icon input">
              <i className="lock icon"/>
              <input type="password" name="password"/>
            </div>
          </div>
          <div className="ui fluid orange submit button">Sign In</div>
        </div>
      </form>
    )
  }
}

export default Login;
