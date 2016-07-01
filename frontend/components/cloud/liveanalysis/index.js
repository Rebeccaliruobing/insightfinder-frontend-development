import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import store from 'store';
import moment from 'moment';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown, Tab} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import DataParser from '../dataparser';
import SettingModal from './settingModal';
import TenderModal from './tenderModal';

import {GridColumns, DefaultView} from '../../storeKeys';
import Navbar from './navbar';
import {SummaryChart, DetailsChart} from './charts';

class LiveAnalysisCharts extends React.Component {

  static contextPropTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    data: React.PropTypes.object,
    loading: React.PropTypes.bool,
    onRefresh: React.PropTypes.func
  };

  static defaultProps = {
    loading: true,
    onRefresh: () => {
    }
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
      showTenderModal: false
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
      this.dp.getGroupsData();
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

  renderGrid() {

    if (!this.dp) return;

    let summary = this.dp.summaryData;
    let groups = this.dp.groupsData;

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

      groups.forEach((group, index) => {

        let isSelectGroup = selectedGroupId == group.id;
        if (isSelectGroup) selectIndex = selectIndex + index;

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
              <div className="header" style={{paddingBottom:8}}>{group.title}</div>
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
              ReactDOM.render((
                  <div key={selectedGroup.id} style={{width: '100%', backgroundColor: '#fff'}}>
                    <h4 className="ui header">{summary.title}</h4>
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
        <div className="twelve wide column">
          <div className={cx('ui', columns, 'cards')}>
            {!instanceName && this.renderSummary()}
            {elems}
          </div>
        </div>
        <div className="four wide column">
          {this.renderAnnotation()}
        </div>
      </div>
    );
  }

  renderAnnotation() {
    let {selectedAnnotation} = this.state;
    if (selectedAnnotation) {
      let {shortText, x, text} = selectedAnnotation;
      return (
        <Accordion className="ui styled fluid accordion" exclusive={true}>
          <div className="title">
            <i className="dropdown icon"/>
            {shortText}: {moment(parseInt(x)).format("YYYY-MM-DD HH:mm")}
          </div>
          <div className="active content">
            {text}
            <form className="ui reply form">
              <div className="field">
                <textarea rows="3"/>
              </div>
              <div className="ui blue labeled submit icon button">
                <i className="icon edit"/> Add Comments
              </div>
            </form>
          </div>
        </Accordion>
      )
    }
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
          onAnnotationClick={(a) => this.setState({selectedAnnotation: a})}
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
    let {listGraphZoomOpt} = this.state;
    return (
      <div className="ui grid">
        <div className="twelve wide column">
          {this.renderSummary()}
            { groups.sort(function(a, b) {
              let aid = parseInt(a.id);
              let bid = parseInt(b.id);
              return +(aid > bid) || +(aid === bid) - 1;
            }).map((group) => {
            return (
              <div key={group.id} className="detail-charts" style={{position:'relative'}}>
                <span id={group.div_id} style={{position:'absolute', top: -100, visibility:'hidden'}}/>
                <h4 className="ui header">{group.title}</h4>
                <DetailsChart
                  data={group}
                  drawCallback={(g) => this.setState({listGraphZoomOpt: {dateWindow: g.xAxisRange()}})}
                  // onHighlight={(e, x, points, row, sname) => this.setState({listGraphSelection: { x: x, seriesName: sname }})}
                  // onUnhighlight={() => this.setState({listGraphSelection: undefined })}
                  // selection={listGraphSelection}
                  {...listGraphZoomOpt}
                />
              </div>
            )
          })}
        </div>
        <div className="four wide column">
          {this.renderAnnotation()}
        </div>
      </div>
    )
  }

  render() {

    let {data, loading, onRefresh} = this.props;
    let {columns, view} = this.state;

    let isListView = view === 'list';
    let navbarStyle = isListView ? {} : {display: 'none'};
    let contentStyle = isListView ? {} : {paddingLeft: 0};
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

    return (
      <Console.Wrapper>
        <Console.Navbar style={navbarStyle}>
          <Navbar groupMetrics={groupMetrics}/>
        </Console.Navbar>
        <Console.Content style={contentStyle} className={contentClass}>
          <div className="ui main tiny container" style={{minHeight:'100%'}}>
            {!loading &&
            <div className="ui vertical segment">
              <Button className="orange labeled icon"
                      onClick={() => this.setState({showTenderModal: true})}>
                <i className="icon random"/>Causal Graph
              </Button>
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
          { this.state.showTenderModal &&
          <TenderModal dataArray={dataArray} types={types}
                       onClose={() => this.setState({showTenderModal: false})}/>
          }
        </Console.Content>
      </Console.Wrapper>
    )
  }
}

export default LiveAnalysisCharts;
