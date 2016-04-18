/*
 * Accordion提供了对SemanticUI accordion的简单封装.
 * http://semantic-ui.com/modules/accordion.html
***/

import $ from 'jquery';
import React from 'react';

const Accordion = class extends React.Component {
  
  constructor(props) {
    super(props);
    this._$el = null;
  }

  componentDidMount() {
    if (this._$el) {
      this._$el.accordion({
        on: this.props['on'],
        exclusive: this.props['exclusive'],
        duration: 200
      });
    }
  }
  
  componentDidUpdate() {
    if (this._$el) {
      this._$el.accordion('refresh');
    }
  }
  
  componentWillUnmount() {
    if (this._$el) {
      this._$el.accordion('destroy');
    }
  }
    
  render() {
    let {tag, on, exclusive,
      children, ...others} = this.props;
    return React.createElement(tag, {
      ref: c => this._$el = $(c),
      ...others
    }, children);
  }
};

Accordion.propTypes = {
  tag: React.PropTypes.string,
  on: React.PropTypes.oneOf(['click', 'hover']),
  exclusive: React.PropTypes.bool
};

Accordion.defaultProps = {
  tag: 'div',
  on: 'click',
  exclusive: false
};

export default Accordion;