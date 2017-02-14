import React, { PropTypes as T } from 'react';

const D3Popup = ({ align, show, style, children, ...others }) => (
  <div
    className={`d3-popup ${align}`}
    style={{
      ...show ? { visibility: 'visible' } : {},
      ...style,
    }}
    {...others}
  >
    {children}
  </div>
);

D3Popup.propTypes = {
  align: T.string,
  style: T.object,
  show: T.bool,
};

D3Popup.defaultProps = {
  align: 'right top',
  show: false,
  style: {},
};

export default D3Popup;
