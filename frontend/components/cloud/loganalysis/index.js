import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import store from 'store';
import moment from 'moment';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown, Tab} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import DataParser from '../dataparser';
import SettingModal from './settingModal';

import {GridColumns, DefaultView} from '../../storeKeys';
import Navbar from './navbar';
import {SummaryChart, DetailsChart} from '../liveanalysis/charts';
import apis from '../../../apis';

class LogAnalysisCharts extends React.Component {

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
    onRefresh: () => {}
  };

  constructor(props) {

    super(props);
    this.dp = null;

    this.state = {
      instanceName: false,
      view: (store.get(DefaultView, 'list')).toLowerCase(),
      columns: (store.get(GridColumns, 'four')).toLowerCase(),
      selectedGroupId: undefined,
      summarySelected: false,
      selectedAnnotation: null,
      showSettingModal: false,
    };
  }

  componentWillUpdate(nextProps, nextState) {
    // let instanceName = this.props.location.query.instanceName;
    if (this.props.data !== nextProps.data && nextProps.data) {
      // if (this.state.selectedGroupId != nextProps.groupId && nextProps.groupId) {
      //   this.setState({'selectedGroupId': nextProps.groupId, view: 'grid', instanceName});
      // }
      let {data, loading, onRefresh, ...rest} = nextProps;
      this.dp = new DataParser(data, rest);
      this.dp.getSummaryData();
      this.dp.getGroupsDataTest();
    }
  }

  renderSummaryDetail(summary) {
    return (
      <div id="summary">
        <h4 className="ui header">Analysis Summary</h4>
        <Dygraph key="summary" className="live monitoring summary" data={summary.series}
                 ylabel="Anomaly Degree"
                 labels={['X', 'Y1']}
                 axisLabelWidth={35}
                 style={{width: '100%', height: '200px'}}
                 highlightCircleSize={2} strokeWidth={3}
                 labelsDivStyles={{padding: '4px', margin:'15px'}}
                 highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                 annotations={summary.annotations}
                 onAnnotationClick={(a) => this.setState({selectedAnnotation: a})}
                 highlights={summary.highlights}/>
      </div>
    )
  }

                // let nidvalue = nid.value;
                // return (
                //   {nidvalue.map((ts,its) =>{
                //     return (
                //       <tr key={inid+1}>
                //         <td>Group {inid+1}</td>
                //         <td>{ts}</td>
                //         <td></td>
                //       </tr>
                //     )
                //   })}
                // )
  renderNidMapTable(){
    if (!this.dp) return;
    let nidMap = this.dp ? this.dp.nidMap : undefined;
    let nidArray = [];
    for (var key in nidMap) {
      nidArray.push({key:key, value:nidMap[key]});
    }
    if(nidMap){
      return (
        <div>
          <table className="metric-table">
            <tbody>
              <tr>
                <td>Group ID</td>
                <td>Events</td>
                <td>Anomaly</td>
              </tr>
              {nidArray.map((nid, inid) => {
                // let nidvalue = nid.value.join(',');
                let nidvalue = nid.value;
                return (
                      <tr key={inid+1}>
                        <td>Group {inid+1}</td>
                        <td>{nidvalue}</td>
                        <td></td>
                      </tr>
                )
              })}              
            </tbody>
          </table>
        </div>
      )
    }
  }

  renderGrid() {

    if (!this.dp) return;

    let summary = this.dp.summaryData;
    let groups = this.dp.groupsData;
    let groupMetrics = this.dp ? this.dp.groupmetrics : null;

    let {columns, selectedGroupId, instanceName} = this.state;
    let elems = [];
    let selectIndex = 0;
    let selectArrow = <div style={{
      position: 'absolute',
      width: 20,
      height: 20,
      background: '#333',
      transform: 'rotate(45deg)',
      left: '50%',
      bottom: '-25px',
      marginLeft: -3
    }}></div>;

    if (groups) {
      let rowCount = ['one', 'two', 'three', 'four', 'five', 'six'].indexOf(columns) + 1;
      let groupsData, selectedGroup;
      if (this.dp) {
        groupsData = this.dp.getGroupsData();
        selectedGroup = _.find(groupsData, g => g.id == selectedGroupId);
      }

      groups.sort(function(a, b) {
              let aid = parseInt(a.groupId);
              let bid = parseInt(b.groupId);
              return +(aid > bid) || +(aid === bid) - 1;
            }).forEach((group, index) => {

        let isSelectGroup = selectedGroupId == group.id;
        if (isSelectGroup) selectIndex = selectIndex + index;
        let metrics = groupMetrics[parseInt(group.id)];

        elems.push((
          <div key={columns + group.id} className="ui card"
               onClick={() => {
                if (this.state.selectedGroupId == group.id) {
                  this.setState({selectedGroupId: void 0});
                } else {
                  this.setState({selectedGroupId: group.id, summarySelected:false})
                }
               }}>
            <div className="content">
              <div className="header" style={{paddingBottom:8}}>Metric {metrics} (Group {group.groupId})</div>
              <SummaryChart data={group}/>
            </div>
            {isSelectGroup && selectArrow}
          </div>
        ));
      });

      let rowIndex = selectIndex % rowCount;
      selectIndex = selectIndex + rowCount - rowIndex;
      if (selectedGroup) {
        elems = elems.slice(0, selectIndex).concat([(
          <div key={'expand'} ref={(c)=>{
            let $c = $(ReactDOM.findDOMNode(c));
            $c.slideDown('fast', ()=>{
              $(window.document).scrollTop($c.offset().top);

              let metrics = groupMetrics[parseInt(selectedGroupId)];
              ReactDOM.render((
                  <div key={selectedGroup.id} style={{width: '100%', backgroundColor: '#fff'}}>
                    <h4 className="ui header">{metrics} (Group {selectedGroupId}})</h4>
                    <DetailsChart data={selectedGroup} />
                    <i onClick={()=>this.setState({selectedGroupId: void 0})} className="close icon"
                       style={{position: 'absolute', right: 10, top: 10, color: '#fff', cursor: 'pointer'}}></i>
                  </div>
              ), c)
            })
          }} style={{width: '100%', backgroundColor: '#333', padding: 50, display: 'none', position: 'relative'}}>

          </div>
        )]).concat(elems.slice(selectIndex));
      }

    }
    return (

      <div className="ui grid">
        <div className="sixteen wide column">
          <div className={cx('ui', columns, 'cards')}>
            {!instanceName && this.renderSummary()}
            {elems}
          </div>
        </div>
      </div>
    );
  }

  renderSummary() {
    let summary = this.dp ? this.dp.summaryData : undefined;
    if (!summary) return;
    return (
      <div key={summary.id} className="detail-charts" style={{width: '100%'}}>
        <span id={summary.div_id} style={{position:'absolute', top: -100, visibility:'hidden'}}/>
        <h4 className="ui header">{summary.title}</h4>
        <DetailsChart
          data={summary}
          drawCallback={(g) => this.setState({listGraphZoomOpt: { dateWindow: g.xAxisRange() }})}
          // onHighlight={(e, x, points, row, sname) => this.setState({listGraphSelection: { x: x, seriesName: sname }})}
          // onUnhighlight={() => this.setState({listGraphSelection: undefined})}
          // selection={listGraphSelection}
          {...this.state.listGraphZoomOpt}
        />
      </div>
    )
  }

  renderList() {

    let groups = this.dp ? this.dp.groupsData : [];
    let groupMetrics = this.dp ? this.dp.groupmetrics : null;
    let {listGraphZoomOpt} = this.state;
    return (
      <div className="ui grid">
        <div className="sixteen wide column">
          {this.renderSummary()}
          {this.renderNidMapTable()}
        </div>
      </div>
    )
  }

  render() {

    let {data, loading, onRefresh, enablePublish} = this.props;
    let {columns, view} = this.state;

    let isListView = view === 'list';
    let contentStyle = {paddingLeft: 0};
    let contentClass = loading ? 'ui form loading' : '';

    if (data && !this.dp) {
      // Since componentWillUpdate is not called at initial time, so 
      // we need to parse the data
      this.dp = new DataParser(data);
      if (this.dp.mode != 'split') {
        this.dp.getSummaryData();
      }
      this.dp.getGroupsData();
    }

    let groupMetrics = this.dp ? this.dp.groupmetrics : null;
    let dataArray = this.dp ? this.dp.causalDataArray : undefined;
    let types = this.dp ? this.dp.causalTypes : undefined;
        // <Console.Navbar style={navbarStyle}>
        //   <Navbar groupMetrics={groupMetrics}/>
        // </Console.Navbar>

    return (
      <Console.Wrapper>
        <Console.Content style={contentStyle} className={contentClass}>
          <div className="ui main tiny container" style={{minHeight:'100%'}}>
            {!loading &&
            <div className="ui vertical segment">
              <Button className="labeled icon" onClick={() => onRefresh()}>
                <i className="icon refresh"/>Refresh
              </Button>
              <ButtonGroup className="right floated basic icon">
                <Button onClick={()=> this.setState({showSettingModal: true})}>
                  <i className="icon setting"/>
                </Button>
                <Button active={view === 'list'}
                        onClick={()=>this.setState({view:'list', summarySelected:false,selectedGroupId: null})}>
                  <i className="align justify icon"/>
                </Button>
                <Button active={view === 'grid'}
                        onClick={()=>this.setState({view:'grid', summarySelected:false,selectedGroupId: null})}>
                  <i className="grid layout icon"/>
                </Button>
              </ButtonGroup>
            </div>
            }
            <div className="ui vertical segment">
              {!isListView && this.renderGrid()}
              {!loading && isListView && this.renderList()}
            </div>
          </div>
          { this.state.showSettingModal &&
          <SettingModal onClose={() => this.setState({showSettingModal: false})}/>
          }
        </Console.Content>
      </Console.Wrapper>
    )
  }
}

export default LogAnalysisCharts;