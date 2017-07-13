import React from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { settingsMenusMessages } from '../../common/settings/messages';
import { BaseUrls } from '../../web/app/Constants';
import './settings.scss';

type Props = {
  intl: Object,
};

const SettingsLeftbarCore = ({ intl }: Props) => {
  return (
    <div className="leftbar">
      <div className="ui vertical icon menu">
        <NavLink to={BaseUrls.SettingsProjectList} className="item">
          <i className="icon list" />
          <span>
            {intl.formatMessage(settingsMenusMessages.projects)}
          </span>
        </NavLink>
        <NavLink to={BaseUrls.SettingsSystem} className="item">
          <i className="icon iconfont icon-icons01" />
          <span>
            {intl.formatMessage(settingsMenusMessages.system)}
          </span>
        </NavLink>
        <NavLink to={BaseUrls.SettingsExternalServiceList} className="item">
          <i className="icon iconfont icon-puzzlepiece1" />
          <span>
            {intl.formatMessage(settingsMenusMessages.externalService)}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

const SettingsLeftbar = injectIntl(SettingsLeftbarCore);
export default SettingsLeftbar;
