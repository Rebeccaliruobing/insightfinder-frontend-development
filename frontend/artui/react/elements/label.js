/*
 * Message提供了对SemanticUI message的简单封装.
 * http://semantic-ui.com/collections/message.html
**/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import ReactTimeout from 'react-timeout';

class Label extends React.Component {
  
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
      onClose, autoDismiss, dismissTimeout,
      children, ...others} = this.props;
    return React.createElement(tag, {
      ref: c => this._$el = $(c),
      className: classNames('ui', className, 'label'),
      ...others
    }, children);
  }
};

Label.propTypes = {
  tag: React.PropTypes.string,
  onClose: React.PropTypes.func,
  autoDismiss: React.PropTypes.bool,
  dismissTimeout: React.PropTypes.number  // seconds
};

Label.defaultProps = {
  tag: 'div',
  onClose: () => {},
  autoDismiss: true,
  dismissTimeout: 5 
};

export default ReactTimeout(Label);