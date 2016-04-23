/*
 * Input组件在SemanticUI组件功能上增加了:
 * - 集成错误提示
**/

import React from 'react';
import classNames from 'classnames';
import Label from './label';
import {BaseComponent, PropTypes} from '../base';

class Input extends BaseComponent {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    message: PropTypes.string,
    messageClass: PropTypes.string
  };

  static defaultProps = {
    onChange: () => {},
    name: '',
    message: '',
    messageClass: ''
  };
  
  constructor(props) {
    super(props);
  }

  render() {
    let {type, name, value, className, onChange, placeholder,
      message, messageClass, messageAutoDismiss, ...others} = this.props;
    return (
      <div className={classNames('ui', className, 'input')} {...others}>
        <input name={name} type={type} value={value} 
               placeholder={placeholder}
               onChange={(e) => onChange(e)} />
        {
          message !== '' && (
            <Label className={messageClass}>
              {message}
            </Label>
          )
        }
      </div>
    )
  }
}

export default Input;