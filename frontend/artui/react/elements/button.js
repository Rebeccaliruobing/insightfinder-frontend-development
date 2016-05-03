/*
 * Button 组件提供对SemanticUI button组件的封装, 用于确保
 * 使用div形式的button, 而不使用Html button.
 * Html button元素会导致对齐问题.
**/

import React from 'react';
import classNames from 'classnames';
import {BaseComponent, PropTypes} from '../base';

export const Button = class extends BaseComponent {
  static propTypes = {
    tag: PropTypes.string,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    tag: 'div',
    disabled: false
  };
  
  render() {
    let {tag, className, disabled, children, ...others} = this.props;
    let classes = classNames('ui', {
      disabled: disabled
    }, className, 'button');
    
    return React.createElement(tag, {
      className: classes,
      tabIndex: '0',
      ...others
    }, children);
  }
};

export const Buttons = function({tag, className, children, ...others}) {
  return React.createElement(tag || 'div', {
    className: classNames('ui', className, 'buttons'),
    ...others
  }, children)
};