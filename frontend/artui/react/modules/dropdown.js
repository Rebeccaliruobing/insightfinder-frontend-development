/*
 * Dropdown提供了对SemanticUI dropdown的简单封装.
 **/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this._$el = null;
  }

  componentDidMount() {
    if (this._$el) {
      this._$el.dropdown({
        on: this.props['on'],
        direction: this.props['direction'],
        action: this.props['action'],
        useLabels: this.props['useLabels'],
        transition: this.props['transition']
      });
    }
  }

  componentDidUpdate() {
    if (this._$el) {
      this._$el.dropdown('refresh');
    }
  }

  componentWillUnmount() {
    if (this._$el) {
      this._$el.dropdown('destroy');
    }
  }

  render() {
    let {tag, className, 
      on, action, transition, direction, useLabels, 
      children, ...others} = this.props;
    return React.createElement(tag, {
      ref: c => this._$el = $(c),
      className: classNames('ui', className, 'dropdown'),
      ...others
    }, children);
  }
};

Dropdown.propTypes = {
  tag: React.PropTypes.string,
  on: React.PropTypes.oneOf(['click', 'hover']),
  direction: React.PropTypes.oneOf(['auto', 'upward', 'downward']),
  
  action: React.PropTypes.oneOf(['activate', 'select', 'combo', 'hide', 'nothing']),
  useLabels: React.PropTypes.bool,
  transition: React.PropTypes.string
};

Dropdown.defaultProps = {
  tag: 'div',
  on: 'click',
  direction: 'auto',
  useLabels: true,
  transition: 'auto',
  action: 'activate'
};

export default Dropdown;