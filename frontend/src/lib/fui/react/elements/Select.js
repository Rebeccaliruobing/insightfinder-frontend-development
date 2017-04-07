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
    console.log(valueLink);
    const invalid = !!valueLink.error;
    const classes = cx({ invalid }, className);
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
