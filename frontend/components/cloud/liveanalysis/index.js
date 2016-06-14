import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import store from 'store';
import moment from 'moment';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown, Tab} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import DataParser from '../dataparser';
import LinkTender from '../display-model/LinkTender'
import SettingModal from './setting';
import {GridColumns, DefaultView} from '../../storeKeys';
import Navbar from './navbar';

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
      view: store.get(DefaultView, 'list'),
      columns: store.get(GridColumns, 'four'),
      selectedGroupId: undefined,
      summarySelected: false,
      selectedAnnotation: null,
      showSettingModal: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    let instanceName = this.props.location.query.instanceName;
    if (this.props.data !== nextProps.data && nextProps.data) {
      if (this.state.selectedGroupId != nextProps.groupId && nextProps.groupId) {
        this.setState({'selectedGroupId': nextProps.groupId, view: 'grid', instanceName});
      }
      this.dp = new DataParser(nextProps.data, instanceName);
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
                 showRangeSelector={true}
                 highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                 annotations={summary.annotations}
                 onAnnotationClick={(a) => this.setState({selectedAnnotation: a})}
                 highlights={summary.highlights}/>
      </div>
    )
  }

  renderGroupDetail(group) {
    return (
      <Dygraph key={group.id} className="live monitoring summary" data={group.sdata}
               title={"Metric Group" + group.id}
               labels={group.sname}
               style={{width: '100%', height: 300}}
               showRangeSelector={true}
               labelsDivStyles={{padding: '4px', margin:'15px'}}
               highlightCircleSize={2}
               highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
               highlights={group.highlights}
      />
    )
  }

  renderThumbnail() {

    if (!this.dp) return;

    let summary = this.dp.summaryData;
    let groups = this.dp.groupsData;

    let {columns, view, selectedGroupId, summarySelected, instanceName} = this.state;
    let isListView = view === 'list';
    let elems = [];
    let selectIndex = 0;

    if (!instanceName && summary) {
      selectIndex = 1;
      elems.push((
        <div key={columns+summary} className="ui card"
             onClick={() => this.setState({summarySelected:true, selectedGroupId: null})}>
          <div className="content">
            <div className="header">Summary</div>
            <Dygraph className="live monitoring summary" data={summary.series}
                     ylabel="Anomaly Degree"
                     labels={['X', 'Y1']}
                     axisLabelWidth={35}
                     style={{width: '100%', height: '200px'}}
                     highlightCircleSize={2} strokeWidth={3}
                     labelsDivStyles={{padding: '4px', margin:'15px'}}
                     highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                     annotations={summary.annotations}
                     highlights={summary.highlights}/>
          </div>
        </div>
      ));
    }

    if (groups) {
      let rowCount = ['one', 'two', 'three', 'four', 'five', 'six'].indexOf(columns) + 1;
      let groupsData, selectedGroup;
      if (this.dp) {
        groupsData = this.dp.getGroupsData();
        selectedGroup = _.find(groupsData, g => g.id == selectedGroupId);
      }


      groups.map((group, index) => {

        if (selectedGroupId == group.id) {
          selectIndex = selectIndex + index;
        }
        elems.push((
          <div key={columns + group.id} className="ui card"
               onClick={() => this.setState({selectedGroupId: group.id, summarySelected:false})}>
            <div className="content">
              <div className="header"></div>
              <Dygraph key={group.id} className="live monitoring summary" data={group.sdata}
                       title={"Metric Group" + group.id}
                       labels={group.sname}
                       style={{width: '100%', height: 200}}
                       highlightCircleSize={2}
                       highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                       highlights={group.highlights}
              />
            </div>
          </div>
        ));
      });

      let rowIndex = selectIndex % rowCount;
      selectIndex = selectIndex + rowCount - rowIndex;
      if (!isListView && summarySelected) {
        if (this.dp) {
          let summary = this.dp.summaryData;
          elems = elems.slice(0, rowCount).concat([(
            <div className="live monitoring summary" ref={(c)=>{
              $c.slideDown('fast', ()=>{
                ReactDOM.render((
                  <div style={{width: '100%', backgroundColor: '#fff', padding: 20}}>
                    {this.renderSummaryDetail(summary)}
                  </div>
                ), c)
              })
            }} style={{width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: 50, display: 'none'}}>

            </div>
          )]).concat(elems.slice(rowCount))
        }
      } else if (selectedGroup) {
        elems = elems.slice(0, selectIndex).concat([(
          <div key={'expand-' + selectedGroupId} className="live monitoring summary" ref={(c)=>{

            let $c = $(ReactDOM.findDOMNode(c));
            $(c).slideDown('fast', ()=>{

              console.log($c.offset().top);
              $(window.document).scrollTop($c.offset().top);

              ReactDOM.render((
                <div style={{width: '100%', backgroundColor: '#fff', padding: 20}}>
                  <Dygraph key={selectedGroup.id} data={selectedGroup.sdata}
                           title={"Metric Group" + selectedGroup.id}
                           labels={selectedGroup.sname}
                           style={{width: '100%', height: 300}}
                           showRangeSelector={true}
                           labelsDivStyles={{padding: '4px', margin:'15px'}}
                           highlightCircleSize={2}
                           highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                           highlights={selectedGroup.highlights}
                  />
                </div>
              ), c)
            })
          }} style={{width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: 50, display: 'none'}}>

          </div>
        )]).concat(elems.slice(selectIndex));
      }

    }

    return elems;
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

  renderList() {

    if (!this.dp) return;

    let elems = [];

    let summary = this.dp.summaryData;
    let groups = this.dp.groupsData;
    let dataArray = this.dp.causalDataArray;
    let types = this.dp.causalTypes;

    if (summary) {
      elems.push(this.renderSummaryDetail(summary))
    }

    if (groups) {
      groups.map((group) => {
        elems.push(this.renderGroupDetail(group));
      });
    }

    if (dataArray && types) {
      elems.push((
        <LinkTender dataArray={dataArray} types={types}/>
      ));
    }

    return (
      <div className="ui grid">
        <div className="twelve wide column">
          {elems}
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
      this.dp.getSummaryData();
      this.dp.getGroupsData();
    }

    let groupMetrics = this.dp ? this.dp.groupmetrics : null;

    console.log('rendering');
    return (
      <Console.Wrapper>
        <Console.Navbar style={navbarStyle}>
          <Navbar groupMetrics={groupMetrics}/>
        </Console.Navbar>
        <Console.Content style={contentStyle} className={contentClass}>
          <div className="ui main tiny container" style={{minHeight:'100%'}}>
            {!loading &&
            <div className="ui vertical segment">
              <Button className="orange labeled icon">
                <i className="icon random"/>Causal Graph
              </Button>
              <Button className="labeled icon" onClick={() => onRefresh()}>
                <i className="icon refresh"/>Refresh
              </Button>
              <Button className="labeled icon" onClick={()=> this.setState({showSettingModal: true})}>
                <i className="icon setting"/>Setting
              </Button>
              <ButtonGroup className="right floated basic icon">
                <Button active={view === 'list'}
                        onClick={()=>this.setState({view:'list', summarySelected:false,selectedGroupId: null})}>
                  <i className="list layout icon"/>
                </Button>
                <Button active={view === 'grid'}
                        onClick={()=>this.setState({view:'grid', summarySelected:false,selectedGroupId: null})}>
                  <i className="grid layout icon"/>
                </Button>
              </ButtonGroup>
            </div>
            }
            <div className="ui vertical segment">

              {!isListView &&
              <div className={cx('ui', columns, 'cards')}>
                {this.renderThumbnail()}
              </div>
              }
              {isListView && this.renderList()}
            </div>
          </div>
          {
            this.state.showSettingModal &&
            <SettingModal onClose={() => this.setState({showSettingModal: false})}/>
          }
        </Console.Content>
      </Console.Wrapper>
    )
  }
}

export default LiveAnalysisCharts;
