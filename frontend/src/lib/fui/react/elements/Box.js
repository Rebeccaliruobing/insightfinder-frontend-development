/* @flow */
import React, { Element } from 'react';
import cx from 'classnames';

type Props = {
  children: Element<any>,
  className: string,
  isLink: bool,
};

const Box = ({
  className, isLink = false, children, ...rest
}: Props) => {
  const classes = cx(
    'fui', {
      'is-link': isLink,
    },
    'box',
    className,
  );
  return (
    <div className={classes} {...rest}>{children}</div>
  );
};

export default Box;
