import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import SelectCore from 'react-select';
import Icon from './Icon';

type Props = {
  className: string,
  autosize: bool,
  clearable: bool,
  inline: bool,
  multi: bool,
  disabled: bool,
  size: string,
  valueRenderer: Function,
}

const Select = ({
  className, inline,
  autosize, clearable, multi, size, disabled,
  valueRenderer,
  ...rest
}: Props) => {
  const classes = cx(
    'fui', size, {
      inline,
    }, 'select', className);
  const arrowRenderer = ({ onMouseDown, isOpen }: any) => {
    return isOpen ?
      (<Icon name="angle up" fitted onMouseDown={onMouseDown} />) :
      (<Icon name="angle down" fitted onMouseDown={onMouseDown} />);
  };

  return (
    <SelectCore
      multi={multi} autosize={!!autosize} clearable={!!clearable}
      disabled={disabled}
      arrowRenderer={arrowRenderer}
      valueRenderer={valueRenderer}
      className={classes} {...rest}
    />
  );
};

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
