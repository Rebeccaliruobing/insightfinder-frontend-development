import $ from 'jquery';
import React from 'react';
import store from 'store';

import {Modal, Dropdown} from '../../../artui/react';
import {ChartsRefreshInterval, GridColumns, DefaultView, ShowSummaryFlag} from '../../storeKeys';

class SettingModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshInterval: store.get(ChartsRefreshInterval),
      columns: store.get(GridColumns),
      defaultView: store.get(DefaultView),
      showSummaryFlag: store.get(ShowSummaryFlag),
    };

    this.columnMap = {
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6
    }
  }

  handleSubmit() {
    let {refreshInterval, columns, defaultView, showSummaryFlag} = this.state;
    let changed = false;

    if (defaultView)  {
      store.set(DefaultView, defaultView);
      changed = true;
    }
    if (refreshInterval)  {
      store.set(ChartsRefreshInterval, parseInt(refreshInterval));
      changed = true;
    }
    if (columns) {
      store.set(GridColumns, columns);
      changed = true;
    }
    if (showSummaryFlag) {
      store.set(ShowSummaryFlag,showSummaryFlag);
      changed = true;
    }

    if (changed) {
      window.location.reload();
    }
  }

  render() {
    let {refreshInterval, columns, defaultView, showSummaryFlag, } = this.state;
    let refreshIntervalText =
      refreshInterval && parseInt(refreshInterval) === 0 ? 'Manually': refreshInterval;
    let columnText = columns ? this.columnMap[columns] : columns;

    return (
      <Modal {...this.props} size="mini" closable={false} >
        <div className="content">
          <form className="ui form">
            <div className="field">
              <label>Show Summary Chart</label>
              <Dropdown mode="select" value={showSummaryFlag} text={showSummaryFlag}
                        onChange={(v, t) => this.setState({showSummaryFlag:v})}>
                <i className="dropdown icon"/>
                <div className="menu">
                  <div className="item">yes</div>
                  <div className="item">no</div>
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <label>Refresh Interval (minutes)</label>
              <Dropdown mode="select" value={refreshInterval} text={refreshIntervalText}
                        onChange={(v, t) => this.setState({refreshInterval:v})}>
                <i className="dropdown icon"/>
                <div className="menu">
                  <div className="item" data-value="0">Manually</div>
                  <div className="item" data-value="1">1</div>
                  <div className="item" data-value="2">2</div>
                  <div className="item" data-value="5">5</div>
                  <div className="item" data-value="10">10</div>
                  <div className="item" data-value="30">30</div>
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <label>Default View</label>
              <Dropdown mode="select" value={defaultView}
                        onChange={(v, t) => this.setState({defaultView: v})}>
                <i className="dropdown icon"/>
                <div className="menu">
                  <div className="item" data-value="Grid">Grid</div>
                  <div className="item" data-value="List">List</div>
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <label>Grid Columns</label>
              <Dropdown mode="select" value={columns} text={columnText}
                        onChange={(v, t) => this.setState({columns: v})} >
                <i className="dropdown icon"/>
                <div className="menu">
                  <div className="item" data-value="two">2</div>
                  <div className="item" data-value="three">3</div>
                  <div className="item" data-value="four">4</div>
                  <div className="item" data-value="five">5</div>
                  <div className="item" data-value="six">6</div>
                </div>
              </Dropdown>
            </div>
          </form>
        </div>
        <div className="actions">
          <div className="ui button deny">Cancel</div>
          <div className="ui button approve labeled">
            <div className="ui button orange" onClick={this.handleSubmit.bind(this)}>
              <i className="save icon"/>Save
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export default SettingModal;