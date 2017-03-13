/* @flow */
import React, { Element } from 'react';
import cx from 'classnames';

type Props = {
  children: Element<any>,
  className: string,
  responsive: boolean,
  noGutter: boolean,
  fullHeight: boolean,
};

const Container = ({
  className, responsive, noGutter, fullHeight, children, ...rest
}: Props) => {
  const classes = cx(
    'fui', {
      responsive,
      'no-gutter': noGutter,
      'full-height': fullHeight,
    }, 'container',
    className,
  );
  return (
    <div className={classes} {...rest}>{children}</div>
  );
};

Container.defaultProps = {};

export default Container;
