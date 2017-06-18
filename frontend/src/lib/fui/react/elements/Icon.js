import React from 'react';
import cx from 'classnames';

type Props = {
  name: string,
  color: string,
  size: string,
  className: string,
  inverted: bool,
  fitted: bool,
};

const Icon = ({
  name, color, size, className,
  inverted, fitted,
  ...rest
}: Props) => {
  const classes = cx(
    'ui fui',
    name, color, size, {
      inverted, fitted,
    },
    'icon', className,
  );
  return (<i aria-hidden className={classes} {...rest} />);
};

export default Icon;
