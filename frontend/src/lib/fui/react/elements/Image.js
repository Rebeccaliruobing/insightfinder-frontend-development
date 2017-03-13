/* @flow */
import React from 'react';
import cx from 'classnames';

type Props = {
  src: string,
  alt: string,
  size: string,
  className: string,
};

const Image = ({
  src, alt, size, className, ...rest
}: Props) => {
  const classes = cx(
    'fui', {
      size,
    },
    'image',
    className,
  );
  return (
    <div className={classes}>
      <img alt={alt} src={src} {...rest} />
    </div>
  );
};

export default Image;
