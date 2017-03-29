import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../../images/logo_white.png';

type Props = {
  children: Element<any>,
};

const Topbar = ({ children }: Props) => (
  <div className="topbar">
    <Link to="/" className="logo">
      <img src={logo} alt="logo" />
    </Link>
    <div className="content">{children}</div>
  </div>
);

export default Topbar;
