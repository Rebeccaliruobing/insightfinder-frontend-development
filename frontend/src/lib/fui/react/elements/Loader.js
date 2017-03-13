/* @flow */
import React from 'react';
import cx from 'classnames';
import Image from './Image';

type Props = {
  className: ?string,
  fullScreen: bool,
  visible: bool,
  size: ?string,
  imageSrc: string,
};

const Loader = ({
  imageSrc, fullScreen, visible, size,
  className, ...rest
}: Props) => {
  const classes = cx(
    'fui', {
      'full-screen': fullScreen,
      hidden: !visible,
      size,
    },
    'loader',
    className,
  );
  let children = null;
  if (imageSrc) {
    children = (<Image src={imageSrc} size={size} />);
  }

  return (
    <div className={classes} {...rest}>{children}</div>
  );
};

Loader.defaultProps = {
  fullScreen: false,
  visible: false,
};

export default Loader;
