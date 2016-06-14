import $ from 'jquery';
import React from 'react';
import store from 'store';
import {Modal, Dropdown} from '../../artui/react';
import {ChartsRefreshInterval, GridColumns, DefaultView} from '../storeKeys';

class LiveAnalysisChartsSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshInterval: store.get(ChartsRefreshInterval),
      columns: store.get(GridColumns),
      defaultView: store.get(DefaultView)
    }
  }

  componentDidMount() {
  }

  handleSubmit() {
    let {refreshInterval, columns, defaultView} = this.state;

    if (defaultView)  {
      store.set(DefaultView, defaultView);
    }
    if (refreshInterval)  {
      store.set(ChartsRefreshInterval, parseInt(refreshInterval));
    }
    if (columns) {
      store.set(GridColumns, parseInt(columns));
    }
  }

  render() {
    let {refreshInterval, columns, defaultView} = this.state;
    let refreshIntervalText = refreshInterval === 0 ? 'Manually': refreshInterval;
    
    return (
      <Modal {...this.props} size="mini" closable={false}>
        <div className="content">
          <form className="ui form">
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
                  <div className="item">Grid</div>
                  <div className="item">List</div>
                </div>
              </Dropdown>
            </div>
            <div className="field">
              <label>Grid Columns</label>
              <Dropdown mode="select" value={columns}
                        onChange={(v, t) => this.setState({columns: v})} >
                <i className="dropdown icon"/>
                <div className="menu">
                  <div className="item">2</div>
                  <div className="item">3</div>
                  <div className="item">4</div>
                  <div className="item">5</div>
                  <div className="item">6</div>
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

export default LiveAnalysisChartsSetting;