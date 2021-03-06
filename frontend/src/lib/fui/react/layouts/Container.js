/* @flow */
import React, { Element } from 'react';
import cx from 'classnames';

type Props = {
  children: Element<any>,
  className: string,
  responsive: bool,
  noGutter: bool,
  withGutter: bool,
  toolbar: bool,
  breadcrumb: bool,
  fullHeight: bool,
  screenCenter: bool,
  exactCenter: bool,
};

const Container = ({
      className, screenCenter, withGutter, responsive,
  noGutter, toolbar, breadcrumb, fullHeight, children, ...rest
}: Props) => {
  if (screenCenter) {
    const classes = cx(
      'fui screen-center', {
        'full-height': fullHeight,
      },
      'container',
      className,
    );

    return (
      <div className={classes}>
        <div {...rest}>{children}</div>
      </div>
    );
  }

  const classes = cx(
    'fui', {
      responsive,
      toolbar,
      breadcrumb,
      'with-gutter': withGutter,
      'no-gutter': noGutter,
      'full-height': fullHeight,
    }, 'container',
    className,
  );
  return (
    <div className={classes} {...rest}>{children}</div>
  );
};

export default Container;
