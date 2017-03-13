/* @flow */
import React from 'react';
import cx from 'classnames';

type Props = {
  fullScreen: bool,
  visible: bool,
  size: number,
  className: string,
  imageSrc: string,
};

const ImageLoader = ({
  imageSrc, fullScreen, visible, size,
  className, ...rest
}: Props) => {
  const classes = cx(
    'fui', {
      'full-screen': fullScreen,
      hidden: !visible,
    },
    'has-image loader',
    className,
  );

  return (
    <div className={classes} {...rest}>
      <div className="fui image" style={{ width: size, height: size }}>
        <img alt="" src={imageSrc} size={size} />
      </div>
    </div>
  );
};

ImageLoader.defaultProps = {
  fullScreen: false,
  visible: false,
};

export default ImageLoader;
