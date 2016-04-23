/*
 * Dropdown提供了对Semantic UI dropdown组件的封装.
**/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import {BaseComponent, PropTypes} from '../base';

class Dropdown extends BaseComponent {

  static propTypes = {
    tag: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['select', 'dropdown']).isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
      PropTypes.arrayOf(PropTypes.string), 
      PropTypes.arrayOf(PropTypes.number)
    ]),
    text: PropTypes.string,
    defaultText: PropTypes.string,
    icon: PropTypes.element,
    
    on: PropTypes.oneOf(['click', 'hover']),
    direction: PropTypes.oneOf(['auto', 'upward', 'downward']),
    transition: PropTypes.string,
    iconPosition: PropTypes.oneOf(['no', 'left', 'right']),
    
    searchable: PropTypes.bool,
    multiple: PropTypes.bool,
    
    inline: PropTypes.bool,
    useLabels: PropTypes.bool
  };

  static defaultProps = {
    tag: 'div',
    mode: 'dropdown',
    onChange: () => {},
    icon: (<i key="i" className="dropdown icon"/>),
    
    on: 'click',
    direction: 'auto',
    transition: 'auto',
    iconPosition: 'right',
    
    searchable: false,
    multiple: false,
    inline: false
  };
  
  constructor(props) {
    super(props);
    this._$el = null;
  }

  componentDidMount() {
    if (this._$el) {
      this._$el.dropdown({
        on: this.props['on'],
        direction: this.props['direction'],
        transition: this.props['transition'],
        onChange: (value, text, $selectItem) => {
          this.props.onChange(this, value, text);
        }
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
    let {tag, className, mode, value, text, defaultText, icon,
      on, transition, direction, multiple, iconPosition,
      searchable, 
      children, ...others} = this.props;

    let classes = classNames('ui', {
      'search': searchable,
      'multiple': multiple,
      'selection': mode == 'select'
    }, className, 'dropdown');
    
    let elems = [];
    
    if (value) {
      if(Array.isArray(value)) {
        value = value.join(',');
      }
      elems.push((<input key="v" type="hidden" value={value}/>));
    }

    let textElem = (
      <span key="t" 
            className={!!text ? 'text' : (!!defaultText ? 'default text': 'text')}> 
        {text || defaultText}
      </span>
    );

    if (iconPosition == 'left') {
      elems.push(icon);
      elems.push(textElem);
    } else if (iconPosition == 'right') {
      elems.push(textElem);
      elems.push(icon)
    } else {
      elems.push(textElem);
    }

    return React.createElement(tag, {
      ref: c => this._$el = $(c),
      className: classes,
      ...others
    }, elems, children);
  }
}

export default Dropdown;