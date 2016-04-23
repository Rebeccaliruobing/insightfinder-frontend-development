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
    tag: PropTypes.string
  };

  static defaultProps = {
    tag: 'div'
  };
  
  render() {
    let {tag, className, children, ...others} = this.props;
    
    return React.createElement(tag, {
      className: classNames('ui', className, 'button'),
      tabindex: '0',
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