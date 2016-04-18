/*
 * Message提供了对SemanticUI message的简单封装.
 * http://semantic-ui.com/collections/message.html
**/

import $ from 'jquery';
import React from 'react';

const Message = class extends React.Component {
  
  constructor(props) {
    super(props);
    this._$el = null;
  }

  componentDidMount() {
    let self = this;
    if (this._$el && this.props.closable) {
      this._$el.find('.close')
        .on('click', () => {
          self._$el.transition({
            animation: 'fade',
            onComplete: () => {
              self.props.onClose();
            }
          })
        });
    }
  }
  
  componentWillUnmount() {
    if (this._$el && this.props.closable) {
      this._$el.find('.close').off('click');
    }
  }
    
  render() {
    let {tag, closable, onClose,
      children, ...others} = this.props;
    return React.createElement(tag, {
      ref: c => this._$el = $(c),
      ...others
    }, children);
  }
};

Message.propTypes = {
  tag: React.PropTypes.string,
  closable: React.PropTypes.bool,
  onClose: React.PropTypes.func
};

Message.defaultProps = {
  tag: 'div',
  closable: false
};

export default Message;