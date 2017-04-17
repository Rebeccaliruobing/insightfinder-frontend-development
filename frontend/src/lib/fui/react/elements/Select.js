import React from 'react';
import cx from 'classnames';
import SelectCore from 'react-select';
import Icon from './Icon';

type Props = {
  className: string,
  autosize: bool,
  clearable: bool,
  inline: bool,
  multi: bool,
  size: string,
}

const Select = ({
  className, inline,
  autosize, clearable, multi, size,
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
      arrowRenderer={arrowRenderer}
      className={classes} {...rest}
    />
  );
};

export default Select;
