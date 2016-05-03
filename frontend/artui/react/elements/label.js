/*
 * Message提供了对SemanticUI Label的简单封装.
 * http://semantic-ui.com/elements/label.html
**/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import ReactTimeout from 'react-timeout';
import {BaseComponent, PropTypes} from '../base';

class Label extends BaseComponent {
  
  static propTypes = {
    tag: PropTypes.string,
    closable: PropTypes.bool,
    onClose: PropTypes.func,
    autoDismiss: PropTypes.bool,
    dismissTimeout: PropTypes.number  // seconds
  };

  static defaultProps = {
    tag: 'div',
    closable: false,
    onClose: () => {},
    autoDismiss: true,
    dismissTimeout: 5
  };
  
  constructor(props) {
    super(props);
    this._$el = null;
  }

  _close() {
    this._$el.transition({
      animation: 'fade',
      onComplete: () => {
        this.props.onClose();
      }
    });
  }
  
  componentDidMount() {
    if (this._$el) {
      if (this.props.autoDismiss) {
        this.props.setTimeout(() => {
          this._close();
        }, this.props.dismissTimeout * 1000)
      }
    }
  }
  
  render() {
    let {tag, className, 
      autoDismiss, dismissTimeout, onClose, 
      children, ...others} = this.props;
    
    return React.createElement(tag, {
      ref: c => this._$el = $(c),
      className: classNames('ui', className, 'label'),
      ...others
    }, children);
  }
}

function LabelGroup(props) {
  let {tag, className, children, ...others} = props;

  return React.createElement(tag, {
    className: classNames('ui', className, 'labels'),
    ...others
  }, children)
}

Label = ReactTimeout(Label);

export { LabelGroup, Label}