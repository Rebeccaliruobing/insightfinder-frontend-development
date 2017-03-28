import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { injectIntl } from 'react-intl';
import type { State } from '../../../common/types';
import { Container } from '../../../lib/fui/react';
import Topbar from './Topbar';
import menusMesssages from '../../../common/app/menusMesssages';

type Props = {
  className: string,
  intl: Object,
  userInfo: Object,
  children: Element<any>,
};

const SinglePage = ({ className, userInfo, intl, children }: Props) => {
  const { userName } = userInfo;
  const isAdmin = ['admin', 'guest'].indexOf(userName) >= 0;

  return (
    <Container fullHeight className={`single-page ${className || ''}`}>
      <Topbar>
        <div className="ui menu">
          <NavLink to="/cloud" className="item">
            {intl.formatMessage(menusMesssages.dashboard)}
          </NavLink>
          <NavLink to="/log" className="item">
            {intl.formatMessage(menusMesssages.logAnalysis)}
          </NavLink>
          <NavLink to="/settings" className="item">
            {intl.formatMessage(menusMesssages.settings)}
          </NavLink>
          <NavLink to="/usecase" className="item">
            {intl.formatMessage(menusMesssages.bugRepository)}
          </NavLink>
          {isAdmin && <NavLink to="/filetabs" className="item">
            {intl.formatMessage(menusMesssages.fileAnalysis)}
          </NavLink>}
          <NavLink to="/help" className="item">
            {intl.formatMessage(menusMesssages.help)}
          </NavLink>
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

export default compose(
  connect(
    (state: State) => ({
      userInfo: state.auth.userInfo,
    }),
    {},
  ),
  injectIntl,
)(SinglePage);