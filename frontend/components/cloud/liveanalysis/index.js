import React from 'react';
import store from 'store';
import shallowCompare from 'react-addons-shallow-compare';
import {autobind} from 'core-decorators';

import {Console, ButtonGroup, Button } from '../../../artui/react';
import DataParser from '../dataparser';
import SettingModal from './settingModal';
import TenderModal from './tenderModal';
import ShareModal from './shareModal';
import CommentsModal from './commentsModal';

import {GridColumns, DefaultView} from '../../storeKeys';
import {DataSummaryChart, DataGroupCharts} from '../../share/charts';


class LiveAnalysisCharts extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    data: React.PropTypes.object,
    loading: React.PropTypes.bool,
    enablePublish: React.PropTypes.bool,
    onRefresh: React.PropTypes.func
  };

  static defaultProps = {
    loading: true,
    enablePublish: false,
    onRefresh: () => {
    }
  };

  constructor(props) {

    super(props);

    this.dp = null;

    this.state = {
      instanceName: false,
      view: (store.get(DefaultView, 'grid')).toLowerCase(),
      columns: (store.get(GridColumns, 'two')).toLowerCase(),
      selectedGroupId: undefined,
      selectedAnnotation: null,
      showSettingModal: false,
      showTenderModal: false,
      showShareModal: false,
      showComments: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  calculateData() {

    // Cache the data, and recalculate it if changed.
    let { data, loading, onRefresh, ...rest } = this.props;

    if (this._data !== data && !!data) {
      this.dp = new DataParser(data, rest);
      this.dp.getSummaryData();

      // FIXME: getGroupsData vs getGroupsDataTest?
      this.dp.getGroupsDataTest();

      // Sort the grouped data
      this.summary = this.dp.summaryData;
      this.causalDataArray = this.dp.causalDataArray;
      this.causalTypes = this.dp.causalTypes;
      this.groups = this.dp.groupsData || [];
      this.groupMetrics = this.dp.groupmetrics || null;
      this._data = data;
    }
  }

  @autobind
  handleDateWindowSync(dateWindow) {
    this.setState({ chartDateWindow: dateWindow });
  }

  render() {

    const { loading, onRefresh, enablePublish, enableComments } = this.props;
    const { view, columns} = this.state;

    this.calculateData();

    const summary = this.summary;
    const dataArray = this.causalDataArray;
    const types = this.causalTypes;
    const groups = this.groups;

    return (
      <Console.Wrapper>
        <Console.Content style={{ paddingLeft: 0 }} className={ loading ? 'ui form loading' : ''}>
          <div className="ui main tiny container"
               style={{ minHeight: '100%', display: loading && 'none' }}
          >
            <div className="ui vertical segment">
              <Button className="orange labeled icon"
                      onClick={() => this.setState({ showTenderModal: true })}>
                <i className="icon random"/>Causal Graph
              </Button>
              <Button className="labeled icon" style={{ display: !enablePublish && 'none' }}
                      onClick={()=> this.setState({ showShareModal: true })}>
                <i className="icon share alternate"/>Publish
              </Button>
              <Button className="labeled icon" style={{ display: !enableComments && 'none' }}
                      onClick={() => this.setState({ showComments: true })}>
                <i className="icon comments"/>Comments
              </Button>
              <Button className="labeled icon" onClick={() => onRefresh()}>
                <i className="icon refresh"/>Refresh
              </Button>
              <ButtonGroup className="right floated basic icon">
                <Button onClick={()=> this.setState({ showSettingModal: true })}>
                  <i className="icon setting"/>
                </Button>
                <Button active={view === 'list'}
                        onClick={()=>this.setState({ view: 'list' })}>
                  <i className="align justify icon"/>
                </Button>
                <Button active={view === 'grid'}
                        onClick={()=>this.setState({ view: 'grid' })}>
                  <i className="grid layout icon"/>
                </Button>
              </ButtonGroup>
            </div>
            <div className="ui vertical segment">
              <div className="ui grid">

                {!!summary &&
                <DataSummaryChart
                  key="summary_chart"
                  summary={summary}
                  onDateWindowChange={this.handleDateWindowSync}
                  dateWindow={this.state['chartDateWindow']}
                />
                }

                {!!groups &&
                <DataGroupCharts
                  key={view + '_group_charts'}
                  groups={groups} view={view} columns={columns}
                  onDateWindowChange={this.handleDateWindowSync}
                  dateWindow={this.state['chartDateWindow']}
                />
                }

              </div>
            </div>
          </div>

          { this.state.showSettingModal &&
          <SettingModal onClose={() => this.setState({ showSettingModal: false })}/>
          }
          { this.state.showTenderModal &&
          <TenderModal dataArray={dataArray} types={types}
                       onClose={() => this.setState({ showTenderModal: false })}/>
          }
          { this.state.showShareModal &&
          <ShareModal dataArray={dataArray} types={types} dp={this.dp}
                      onClose={() => this.setState({ showShareModal: false })}/>
          }
          { this.state.showComments &&
          <CommentsModal dataArray={dataArray} types={types} dp={this.dp}
                         onClose={() => this.setState({ showComments: false })}/>
          }
        </Console.Content>
      </Console.Wrapper>
    )
  }
}

export default LiveAnalysisCharts;