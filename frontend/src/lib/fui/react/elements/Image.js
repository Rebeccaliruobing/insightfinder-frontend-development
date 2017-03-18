/* @flow */
import React from 'react';
import cx from 'classnames';

type Props = {
  src: string,
  alt: string,
  size: string | number,
  className: string,
  style: Object,
};

const Image = ({
  src, alt = '',
  size, className, style, ...rest
}: Props) => {
  const classes = cx(
    'fui', {
      size: typeof size === 'string',
    },
    'image',
    className,
  );
  const width = typeof size === 'number' ? { width: size } : {};
  return (
    <div className={classes}>
      <img alt={alt} src={src} {...rest} {...width} />
    </div>
  );
};

export default Image;
