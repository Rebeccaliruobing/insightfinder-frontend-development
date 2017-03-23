import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {
  Modal, Console, ButtonGroup, Button, Popup, Dropdown, Accordion, Message,
} from '../../../artui/react/index';
import apis from '../../../apis';
import FilterBar from './filter-bar';
import withRouter from '../../../containers/withRouter';

class ListAll extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    const weeks = 1;
    this.state = {
      view: 'chart',
      dateIndex: 0,
      timeIndex: 0,
      loading: false,
      showAddPanel: true,
      params: {
        projects: [],
        weeks,
        endTime: moment(new Date()).toDate(),
        startTime: moment(new Date()).add(-7 * weeks, 'days'),
      },
      systemNames: ['Cassandra', 'Hadoop', 'Apache', 'Tomcat', 'MySQL', 'HDFS', 'Spark', 'Lighttpd', 'Memcached'],
    };
  }

  componentDidMount() {
  }

  handleData(data) {
    this.setState({ data }, () => {
      this.setHeatMap(0, 0);
    });
  }

  handleToggleFilterPanel() {
    this.setState({ showAddPanel: !this.state.showAddPanel }, () => {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp();
    });
  }

  handleFilterChange(data) {
    let { cvalue, pvalue, minPts, epsilon, modelType } = data;
    const { modelKey, modelName, projectName, fromUser, dataChunkName, metaData, modelStartTime, modelEndTime, latestDataTimestamp } = data.activeItem;
    const bugId = metaData.name;
    const caller = '';
    if (modelType == 'DBScan') {
      cvalue = minPts;
      pvalue = epsilon;
    }

    window.open(`/useCaseDetails?${$.param(Object.assign({}, {
      pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, modelStartTime, modelEndTime, latestDataTimestamp, bugId,
    }))}`, '_blank');

    // this.setState({loading: true}, ()=>{
    //   apis.postUseCase(pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName).then((resp)=>{
    //     resp.loading = false;
    //     this.setState(resp);
    //   }).catch((err)=>{
    //     this.setState({loading: false});
    //   });
    // })
  }

  handleUpdateData(detailComp) {
    setTimeout(() => {
      this.handleUpdateData(detailComp);
    }, 5000 * 60);
  }

  render() {
    const { view, showAddPanel, params, systemNames } = this.state;
    const { userInstructions } = this.context;
    const panelIconStyle = showAddPanel ? 'angle double up icon' : 'angle double down icon';

    return (
      <Console.ContentNoPadding>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
            <ButtonGroup className="right floated basic icon">
              <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                <Popup position="bottom right">
                  <i className={panelIconStyle} />
                  <span className="ui mini popup">Expand & Close</span>
                </Popup>
              </Button>
              <Button>
                <i className="setting icon" />
              </Button>
            </ButtonGroup>
          </div>

          <div
            className="ui vertical segment filterPanel"
            ref={c => this.$filterPanel = $(ReactDOM.findDOMNode(c))}
          >
            <FilterBar loading={this.state.loading} {...this.props} onSubmit={this.handleFilterChange.bind(this)} />
          </div>
        </div>
      </Console.ContentNoPadding>
    );
  }
}

export default withRouter(ListAll);
