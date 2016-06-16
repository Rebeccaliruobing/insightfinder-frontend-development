import $ from 'jquery';
import React from 'react';
import cx from 'classnames';
import {BaseComponent, PropTypes, Input, Link} from '../../artui/react';
import store from 'store';

const logo = require('../../images/logo.png');

class ForgotUsername extends BaseComponent {
  render() {
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
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ForgotUsername;
