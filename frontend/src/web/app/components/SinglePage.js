import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import type { State } from '../../../common/types';
import { Container } from '../../../lib/fui/react';
import Topbar from './Topbar';

type Props = {
  className: string,
  userInfo: Object,
  children: Element<any>,
};

const SinglePage = ({ className, userInfo, children }: Props) => {
  const { userName } = userInfo;
  const isAdmin = ['admin', 'guest'].indexOf(userName) >= 0;

  return (
    <Container fullHeight className={`single-page ${className || ''}`}>
      <Topbar>
        <div className="ui menu">
          <NavLink to="/cloud" className="item">Dashboard</NavLink>
          <NavLink to="/log" className="item">Log Analysis</NavLink>
          <NavLink to="/settings" className="item">Settings</NavLink>
          <NavLink to="/usecase" className="item">Bug Repository</NavLink>
          {isAdmin && <NavLink to="/filetabs" className="item">File Analysis</NavLink>}
          <NavLink to="/help" className="item">Help</NavLink>
          <div className="right menu">
            <Link to="/account-info" className="user item">
              <i className="user icon circular teal inverted" />
              {userName}
            </Link>
          </div>
        </div>
      </Topbar>
      <div className="content">{children}</div>
    </Container>
  );
};

export default connect(
  (state: State) => ({
    userInfo: state.auth.userInfo,
  }),
  {},
)(SinglePage);
