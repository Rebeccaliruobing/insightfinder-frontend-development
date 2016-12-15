/*
 * Dropdown提供了对Semantic UI dropdown组件的封装.
**/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { BaseComponent, PropTypes } from '../base';

class Dropdown extends BaseComponent {

  static propTypes = {
    tag: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['select', 'dropdown']).isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultText: PropTypes.string,
    icon: PropTypes.element,

    on: PropTypes.oneOf(['click', 'hover']),
    direction: PropTypes.oneOf(['auto', 'upward', 'downward']),
    transition: PropTypes.string,
    iconPosition: PropTypes.oneOf(['no', 'left', 'right']),

    searchable: PropTypes.bool,
    multiple: PropTypes.bool,

    useLabels: PropTypes.bool,
  };

  static defaultProps = {
    tag: 'div',
    mode: 'dropdown',
    onChange: () => {},
    icon: (<i key="i" className="dropdown icon" />),

    on: 'click',
    direction: 'auto',
    transition: 'auto',
    iconPosition: 'right',

    searchable: false,
    multiple: false,
  };

  constructor(props) {
    super(props);
    this._$el = null;
  }

  componentDidMount() {
    if (this._$el) {
      this._$el.dropdown({
        on: this.props.on,
        direction: this.props.direction,
        transition: this.props.transition,
        onChange: (value, text) => {
          this.props.onChange(value, text);
        },
      });
    }
  }

  componentDidUpdate() {
    if (this._$el) {
      const {value} = this.props;
      // Fix bug of dropdown, which will not clear the data.
      if (!value) {
        this._$el.data('value', null);
      }
      this._$el.dropdown('refresh');
    }
  }

  componentWillUnmount() {
    if (this._$el) {
      this._$el.dropdown('destroy');
    }
  }

  render() {
    const {
      tag, className, mode, text, defaultText, icon,
      multiple, iconPosition, searchable,
      children, ...rest
    } = this.props;

    let { value, ...others } = rest;
    others = _.omit(others, ['on', 'transition', 'direction']);

    const classes = classNames('ui', {
      search: searchable,
      multiple: multiple,
      selection: mode === 'select',
    }, className, 'dropdown');

    const elems = [];

    if (value) {
      if (Array.isArray(value)) {
        value = value.join(',');
      }
      elems.push((<input key="v" type="hidden" value={value} />));
    }

    const textElem = (
      <span
        key="t"
        className={text ? 'text' : (defaultText ? 'default text' : 'text')}
      >
        {text || value || defaultText}
      </span>
    );

    if (iconPosition === 'left') {
      elems.push(icon);
      elems.push(textElem);
    } else if (iconPosition === 'right') {
      elems.push(textElem);
      elems.push(icon);
    } else {
      elems.push(textElem);
    }

    return React.createElement(tag, {
      ref: (c) => {
        this._$el = $(c);
      },
      className: classes,
      ...others,
    }, elems, children);
  }
}

export default Dropdown;
