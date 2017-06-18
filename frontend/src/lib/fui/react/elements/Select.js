import React from 'react';
import cx from 'classnames';
import R from 'ramda';
import { Link } from 'react-router-dom';
import { autobind } from 'core-decorators';
import SelectCore from 'react-select';
import Icon from './Icon';

type Props = {
  className: string,
  autosize: bool,
  clearable: bool,
  valueLink: Object,
  disableErrorHint: bool,
  inline: bool,
  multi: bool,
  disabled: bool,
  size: string,
  valueRenderer: Function,
};

type States = {
  blurred: bool,
}

class Select extends React.PureComponent {
  props: Props;
  state: States = {
    blurred: false,
  }

  @autobind
  handleChangeWithValueLink(obj) {
    const { valueLink } = this.props;
    if (Array.isArray(obj)) {
      valueLink.set(R.map(o => o.value, obj));
    } else {
      valueLink.set(obj.value);
    }
  }

  @autobind
  handleBlur() {
    this.setState({ blurred: true });
  }

  @autobind
  handleFocus() {
    this.setState({ blurred: false });
  }

  render() {
    const {
      className, inline, valueLink, disableErrorHint,
      autosize, clearable, multi, size, disabled,
      valueRenderer,
      ...rest } = this.props;

    const arrowRenderer = ({ onMouseDown, isOpen }: any) => {
      return isOpen ?
        (<Icon name="angle up" fitted onMouseDown={onMouseDown} />) :
        (<Icon name="angle down" fitted onMouseDown={onMouseDown} />);
    };

    // If we use valuelink, the valuelink contains the value of the options.
    if (valueLink) {
      const { blurred } = this.state;
      const hasError = Boolean(valueLink.error);
      const showErrorHints = blurred && hasError && !disableErrorHint;
      const classes = cx(
        'fui', size, {
          invalid: showErrorHints,
          inline,
        }, 'select', className);
      return (
        <div className="fui select-wrapper">
          <SelectCore
            multi={multi} autosize={!!autosize} clearable={!!clearable}
            disabled={disabled}
            arrowRenderer={arrowRenderer}
            valueRenderer={valueRenderer}
            value={valueLink.value || (multi ? [] : undefined)}
            onChange={this.handleChangeWithValueLink}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            className={classes} {...rest}
          />
          {showErrorHints &&
            <div className="error-text">{valueLink.error}</div>
          }
        </div>
      );
    }

    const classes = cx(
      'fui', size, {
        inline,
      }, 'select', className);

    return (
      <SelectCore
        multi={multi} autosize={!!autosize} clearable={!!clearable}
        disabled={disabled}
        arrowRenderer={arrowRenderer}
        valueRenderer={valueRenderer}
        className={classes} {...rest}
      />
    );
  }
}

type SelectLinkProps = {
  children: any,
};

const SelectLink = ({ children, ...props }: SelectLinkProps) => {
  // Stop propagate mouse down event to prevent open menu.
  return (
    <Link {...props} onMouseDown={(e) => { e.stopPropagation(); }}>
      {children}
    </Link>
  );
};

Select.Link = SelectLink;

export default Select;
