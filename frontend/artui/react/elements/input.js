/*
 * Input组件在SemanticUI组件功能上增加了:
 * - 集成错误提示
**/

import React from 'react';
import classNames from 'classnames';

const Input = class extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    let {type, name, value, className, onChange, placeholder,
      message, messageClass, ...others} = this.props;
    return (
      <div className={classNames('ui', className, 'input')} {...others}>
        <input name={name} type={type} value={value} 
               placeholder={placeholder}
               onChange={(e) => onChange(e)} />
        {
          message !== '' && (
            <div className={classNames('ui', messageClass, 'label')}>
              {message}
            </div>
          )
        }
      </div>
    )
  }
};

Input.propTypes = {
  type: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onChange: React.PropTypes.func,
  message: React.PropTypes.string,
  messageClass: React.PropTypes.string
};

Input.defaultProps = {
  onChange: () => {},
  name: '',
  message: '',
  messageClass: ''
};

export default Input;