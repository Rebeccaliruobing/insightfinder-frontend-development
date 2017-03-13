/* @flow */
import React, { Element } from 'react';
import cx from 'classnames';

type Props = {
  isAncestor: bool,
  isParent: bool,
  isVertical: bool,
  isFluid: bool,
  size: ?number,
  children: Element<any>,
  className: string,
};

const Tile = ({
  className,
  size,
  isFluid = false, isAncestor = false, isParent = false, isVertical = false,
  children, ...rest
}: Props) => {
  const classes = cx(
    'fui', {
      'is-fluid': isFluid,
      'is-ancestor': isAncestor,
      'is-parent': isParent,
      'is-vertical': isVertical,
    },
    size ? `is-${size}` : '',
    'tile',
    className,
  );

  return (
    <div className={classes} {...rest}>{children}</div>
  );
};

export default Tile;
