/* @flow */
import React from 'react';
import cx from 'classnames';

type Props = {
  fullScreen: bool,
  visible: bool,
  size: number,
  className: string,
  imageSrc: string,
  children: any,
};

const Loader = ({
  imageSrc, fullScreen, visible, size,
  className, children, ...rest
}: Props) => {
  const classes = cx(
    'fui', {
      'full-screen': fullScreen,
      hidden: !visible,
    },
    'loader',
    className,
  );

  if (imageSrc) {
    return (
      <div className={classes} {...rest}>
        <div className="fui image content" style={{ width: size, height: size }}>
          <img alt="" src={imageSrc} size={size} />
        </div>
      </div>
    );
  }

  return (
    <div className={classes} {...rest}>
      <div className="content" style={{ width: size, height: size }}>
        {children}
      </div>
    </div>
  );
};

Loader.defaultProps = {
  fullScreen: false,
  visible: false,
};

export default Loader;
