import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toPairs, map } from 'ramda';
import { injectIntl } from 'react-intl';
import type { State } from '../../../common/types';
import { Container } from '../../../lib/fui/react';
import Topbar from './Topbar';
import SinglePageLoader from './SinglePageLoader';
import { appMenusMessages } from '../../../common/app/messages';
import { setCurrentLocale } from '../../../common/app/actions';
import { logoff } from '../../../common/auth/actions';
import { BaseUrls } from '../Constants';

type Props = {
  className: string,
  intl: Object,
  userInfo: Object,
  pageLoaderVisible: bool,
  leftbar: any, // React component
  localeOptions: Array,
  children: Element<any>,
  setCurrentLocale: Function,
  logoff: Function,
};

const SinglePageCore = ({
  className, userInfo, intl, pageLoaderVisible,
  localeOptions, children,
  setCurrentLocale, logoff,
  leftbar,
}: Props) => {
  const { userName } = userInfo;
  const isAdmin = ['admin', 'guest'].indexOf(userName) >= 0;

  // For some menu item, like /metric, it will also match menu item
  // /metric/historical-metric-analysis so we need isActive check to filter this url.
  const isActiveIgnoreUrls = url => (match, location) => {
    if (!match) {
      return false;
    }
    return !location.pathname.startsWith(url);
  };

  return (
    <Container fullHeight className={`single-page ${className || ''}`}>
      <Topbar>
        <div className="ui menu">
          <NavLink
            to={BaseUrls.Metric} className="item"
            isActive={isActiveIgnoreUrls(BaseUrls.MetricHistoricalMetricAnalysis)}
          >
            {intl.formatMessage(appMenusMessages.metricAnalysis)}
          </NavLink>
          <NavLink
            to={BaseUrls.Log} className="item"
            isActive={isActiveIgnoreUrls(BaseUrls.LogHistoricalLogAnalysisBase)}
          >
            {intl.formatMessage(appMenusMessages.logAnalysis)}
          </NavLink>
          <NavLink to={BaseUrls.Settings} className="item">
            {intl.formatMessage(appMenusMessages.settings)}
          </NavLink>
          <NavLink to={BaseUrls.UsecaseBase} className="item">
            {intl.formatMessage(appMenusMessages.issues)}
          </NavLink>
          {false && <NavLink to={BaseUrls.MetricHistoricalMetricAnalysis} className="item">
            {intl.formatMessage(appMenusMessages.historicalMetricAnalysis)}
          </NavLink>}
          {isAdmin && <NavLink to={BaseUrls.LogHistoricalLogAnalysisBase} className="item">
            {intl.formatMessage(appMenusMessages.historicalLogAnalysis)}
          </NavLink>}
          {isAdmin && <NavLink to="/filetabs" className="item">
            {intl.formatMessage(appMenusMessages.fileAnalysis)}
          </NavLink>}
          <NavLink to={BaseUrls.Help} className="item">
            {intl.formatMessage(appMenusMessages.help)}
          </NavLink>
          <div className="right menu">
            <div className="ui dropdown language item" style={{ display: 'none' }}>
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
                <Link to={BaseUrls.AccountInfo} className="item">
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
      {!leftbar &&
        <div className="content">
          <SinglePageLoader key="loader" visible={pageLoaderVisible} />
          {children}
        </div>
      }
      {!!leftbar && leftbar}
      {!!leftbar &&
        <div className="content with-leftbar">
          <div className="full-height">
            <SinglePageLoader key="loader" visible={pageLoaderVisible} />
            {children}
          </div>
        </div>
      }
    </Container>
  );
};

const SinglePage = injectIntl(SinglePageCore);
export default connect(
  (state: State) => ({
    userInfo: state.auth.userInfo,
    pageLoaderVisible: state.app.pageLoaderVisible,
    localeOptions: map(l => ({ value: l[0], label: l[1] }), toPairs(state.app.locales)),
  }),
  { setCurrentLocale, logoff },
)(SinglePage);
