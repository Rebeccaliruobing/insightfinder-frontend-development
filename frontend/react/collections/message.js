/*
 * Message提供了对SemanticUI message的简单封装.
 * http://semantic-ui.com/collections/message.html
**/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import ReactTimeout from 'react-timeout';

class Message extends React.Component {
  
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
      if (this.props.closable) {
        this._$el.find('.close')
          .on('click', () => {
            this._close();
          });
      }
      
      if (this.props.autoDismiss) {
        this.props.setTimeout(() => {
          this._close();
        }, this.props.dismissTimeout * 1000)
      }
    }
  }
  
  componentWillUnmount() {
    if (this._$el && this.props.closable) {
      this._$el.find('.close').off('click');
    }
  }
    
  render() {
    let {tag, className, 
      closable, onClose, 
      autoDismiss, dismissTimeout,
      children, ...others} = this.props;
    return React.createElement(tag, {
      ref: c => this._$el = $(c),
      className: classNames('ui', className, 'message'),
      ...others
    }, children);
  }
};

Message.propTypes = {
  tag: React.PropTypes.string,
  closable: React.PropTypes.bool,
  onClose: React.PropTypes.func,
  autoDismiss: React.PropTypes.bool,
  dismissTimeout: React.PropTypes.number  // seconds
};

Message.defaultProps = {
  tag: 'div',
  closable: false,
  onClose: () => {},
  autoDismiss: false,
  dismissTimeout: 10
};

export default ReactTimeout(Message);