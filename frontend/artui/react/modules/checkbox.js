/*
 * Checkbox
**/

import React from 'react';
import classNames from 'classnames';
import {BaseComponent, PropTypes} from '../base';

class Checkbox extends BaseComponent {
  
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    radio: PropTypes.bool.isRequired,
    defaultChecked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool.isRequired,
    indeterminate: PropTypes.bool.isRequired,
    onChange: PropTypes.func
  };

  static defaultProps = {
    radio: false,
    defaultChecked: false,
    disabled: false,
    indeterminate: false,
    readOnly: false,
    onChange: () => {}
  };
  
  constructor(props) {
    super(props);
    this._$el = null;
  }

  componentDidMount() {
    if (this._$el) {
      this._$el.checkbox({
        onChange: () => {
          let isChecked = this._$el.checkbox('is checked');
          this.props.onChange(isChecked, this.props.name, this.props.value);
        }
      });
      
      if (this.props.indeterminate) {
        this._$el.checkbox('set indeterminate');
      }
    }
  }
  
  componentDidUpdate() {
    if (this._$el) {
      this._$el.checkbox('refresh');
      if (this.props.indeterminate) {
        this._$el.checkbox('set indeterminate');
      }
    }
  }
  
  componentWillUnmount() {
    if (this._$el) {
      this._$el.checkbox('destroy');
    }
  }
    
  render() {
    let {className, name, value, label, radio, 
      defaultChecked, disabled, readOnly, indeterminate, ...others} = this.props;
    let type = radio ? 'radio' : 'checkbox';
    className = classNames('ui', {
      radio: radio,
      checked: defaultChecked,
      'read-only': readOnly,
      disabled: disabled,
      fitted: !label
    }, className, 'checkbox');
    
    return (
      <div className={className} {...others} ref={c => this._$el = $(c)}>
        <input type={type} name={name} value={value}
               defaultChecked={defaultChecked} disabled={disabled} />
        <label>{label}</label>
      </div>
    )
  }
}

class RadioGroup extends BaseComponent {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    onChange: PropTypes.func
  };

  static defaultProps = {
    tag: 'div',
    disabled: false,
    readOnly: false,
    onChange: () => {}
  };

  constructor(props) {
    super(props);
  }
  
  handleOnChange(checked, name, value) {
    if (checked) {
      this.props.onChange(name, value);
    }
  }
  
  render() {
    let {tag, className, checkboxClassName, name, values, defaultValue, labels,
      readOnly, disabled, ...others} = this.props;
    let checkboxes = [];
    let classes = classNames('ui', className, 'checkboxes');

    values.forEach((value, index) => {
      const checked = value == defaultValue;
      const label = !labels ? value: labels[index];
      checkboxes.push(<Checkbox key={index} radio={true} className={checkboxClassName} name={name} value={value}
                                defaultChecked={checked} disabled={disabled} readOnly={readOnly}
                                label={label} onChange={this.handleOnChange.bind(this)} />);
    });

    return React.createElement(tag, {
      className: classes,
      ...others
    }, checkboxes);
  }
}

class CheckboxGroup extends BaseComponent {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    names: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    onChange: PropTypes.func
  };

  static defaultProps = {
    tag: 'div',
    disabled: false,
    readOnly: false,
    onChange: () => {}
  };
  
  constructor(props) {
    super(props);
    this.checkedNames = [];
    this.checkedValues = [];
  }
  
  handleOnChange(checked, name, value) {
    let changed = false;
    const index = this.checkedValues.indexOf(value);
    if (checked && index < 0) {
      this.checkedValues.push(value);
      this.checkedNames.push(name);
      changed = true;
    }
    
    if (!checked && index >= 0) {
      this.checkedValues.splice(index, 1);
      this.checkedNames.splice(index, 1);
      changed = true;
    }
    
    if (changed) {
      this.props.onChange(this.checkedNames, this.checkedValues);
    }
  }

  render() {
    
    let {tag, className, checkboxClassName, names, values, defaultValue, labels, 
      readOnly, disabled, ...others} = this.props;
    let checkboxes = [];
    let classes = classNames('ui', className, 'checkboxes');
    
    values.forEach((value, index) => {
      const name = names[index];
      const checked = value == defaultValue;
      if (checked) {
        this.checkedNames.push(name);
        this.checkedValues.push(value);
      }
      const label = !labels ? name: labels[index];
      checkboxes.push(<Checkbox key={index} className={checkboxClassName} name={name} value={value}
                                defaultChecked={checked} disabled={disabled} readOnly={readOnly}
                                label={label} onChange={this.handleOnChange.bind(this)} />);
    });

    return React.createElement(tag, {
      className: classes,
      ...others
    }, checkboxes);
  }
}

export {Checkbox, CheckboxGroup, RadioGroup}