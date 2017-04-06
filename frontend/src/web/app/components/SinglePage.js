import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toPairs, map } from 'ramda';
import { injectIntl } from 'react-intl';
import type { State } from '../../../common/types';
import { Container } from '../../../lib/fui/react';
import Topbar from './Topbar';
import { appMenusMessages } from '../../../common/app/messages';
import { setCurrentLocale } from '../../../common/app/actions';
import { logoff } from '../../../common/auth/actions';

type Props = {
  className: string,
  intl: Object,
  userInfo: Object,
  localeOptions: Array,
  children: Element<any>,
  setCurrentLocale: Function,
  logoff: Function,
};

const SinglePageCore = ({
  className, userInfo, intl,
  localeOptions, children,
  setCurrentLocale, logoff,
}: Props) => {
  const { userName } = userInfo;
  const isAdmin = ['admin', 'guest'].indexOf(userName) >= 0;

  return (
    <Container fullHeight className={`single-page ${className || ''}`}>
      <Topbar>
        <div className="ui menu">
          <NavLink to="/cloud" className="item">
            {intl.formatMessage(appMenusMessages.dashboard)}
          </NavLink>
          <NavLink to="/log/incident-log-analysis" className="item">
            {intl.formatMessage(appMenusMessages.staticLogAnalysis)}
          </NavLink>
          <NavLink to="/settings" className="item">
            {intl.formatMessage(appMenusMessages.settings)}
          </NavLink>
          <NavLink to="/usecase" className="item">
            {intl.formatMessage(appMenusMessages.bugRepository)}
          </NavLink>
          {isAdmin && <NavLink to="/log/live-analysis" className="item">
            {intl.formatMessage(appMenusMessages.logAnalysis)}
          </NavLink>}
          {isAdmin && <NavLink to="/filetabs" className="item">
            {intl.formatMessage(appMenusMessages.fileAnalysis)}
          </NavLink>}
          <NavLink to="/help" className="item">
            {intl.formatMessage(appMenusMessages.help)}
          </NavLink>
          <div className="right menu">
            <div className="ui dropdown language item">
              <i className="translate icon" />
              <div className="right-align menu">
                {
                  localeOptions.map(l => (
                    <a
                      key={l.value} className="item"
                      onClick={() => setCurrentLocale(l.value)}
                    >{l.label}</a>
                  ))
                }
              </div>
            </div>
            <div className="ui dropdown user item">
              <i className="circular inverted icon">{userName[0]}</i>
              <span>{userName}</span>
              <div className="right-align menu">
                <Link to="/account-info" className="item">
                  <i className="settings icon" />{intl.formatMessage(appMenusMessages.accountProfile)}
                </Link>
                <a className="item" onClick={() => logoff()}>
                  <i className="sign out icon" />{intl.formatMessage(appMenusMessages.signout)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Topbar>
      <div className="content">{children}</div>
    </Container>
  );
};

const SinglePage = injectIntl(SinglePageCore);
export default connect(
  (state: State) => ({
    userInfo: state.auth.userInfo,
    localeOptions: map(l => ({ value: l[0], label: l[1] }), toPairs(state.app.locales)),
  }),
  { setCurrentLocale, logoff },
)(SinglePage);
