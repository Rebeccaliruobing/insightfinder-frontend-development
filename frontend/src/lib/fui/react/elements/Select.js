import React from 'react';
import cx from 'classnames';
import SelectCore from 'react-select';

// TODO: What the value of multiple selection.
const setValue = o => o.value;

type Props = {
  valueLink: Object,
  className: string,
}

const Select = ({ valueLink, className, ...rest }: Props) => {
  if (valueLink) {
    const invalid = !!valueLink.error;
    const classes = cx('fui select', { invalid }, className);
    return (
      <SelectCore
        value={valueLink.value}
        onChange={valueLink.action(setValue)}
        className={classes}
        {...rest}
      />);
  }

  return (
    <SelectCore className={className} {...rest} />
  );
};

export default Select;
