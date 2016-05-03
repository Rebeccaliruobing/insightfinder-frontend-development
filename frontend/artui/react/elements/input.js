/*
 * Input组件在SemanticUI组件功能上增加了:
 * - 集成错误提示
**/

import React from 'react';
import classNames from 'classnames';
import {Label} from './label';
import {BaseComponent, PropTypes} from '../base';

class Input extends BaseComponent {
  
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    message: PropTypes.string,
    messageClass: PropTypes.string,
    onMessageClose: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {},
    onMessageClose: () => {},
    name: '',
    disabled: false,
    message: '',
    messageClass: ''
  };
  
  constructor(props) {
    super(props);
  }

  render() {
    let {type, style, name, value, 
      className, disabled, onChange, placeholder, 
      message, messageClass, messageAutoDismiss, ...others} = this.props;
    
    let classes = classNames('ui', {
      disabled: disabled
    }, className, 'input');
    
    return (
      <div className={classes} {...others}>
        <input name={name} type={type} value={value} style={style}
               placeholder={placeholder}
               onChange={(e) => onChange(e.target.value)} />
        {
          message !== '' && (
            <Label className={messageClass} autoDismiss={messageAutoDismiss} 
                   onClose={this.props.onMessageClose}>
              {message}
            </Label>
          )
        }
      </div>
    )
  }
}

export default Input;