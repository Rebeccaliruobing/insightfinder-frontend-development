import $ from 'jquery';
import React from 'react';
import cx from 'classnames';
import {BaseComponent, PropTypes, Input, Link} from '../../artui/react';

const logo = require('../../images/logo.png');

class SignupSecond extends BaseComponent {

  constructor(props) {
    super(props);
    this._$el = null;

    this.state = {
      userName: '',
      email: '',
      error: ''
    }
  }

  render() {

    const {userName, email, error} = this.state;
    let disabled = !userName || !email;

    return (
      <form className={cx('ui', {error: !!error}, 'form')}
            ref={c=>this._$el = $(c)} >
        <h2 className="ui image header">
          <img src={logo} className="image"/>
        </h2>
        {!!error &&
        <div className="ui error mini message">{error}</div>
        }
        <div className="ui segment left aligned">
        </div>
      </form>
    )
  }
}

export default SignupSecond;
