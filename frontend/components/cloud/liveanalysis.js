import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import store from 'store';
import moment from 'moment';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown, Tab} from '../../artui/react';
import {Dygraph} from '../../artui/react/dataviz';
import DataParser from './dataparser';
import LinkTender from './display-model/LinkTender'

class LiveAnalysisCharts extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
    loading: React.PropTypes.bool,
    view: React.PropTypes.oneOf(['list', 'thumbnail']),
  };

  static defaultProps = {
    view: 'list',
    loading: true
  };

  constructor(props) {
    super(props);
    this.dp = null;

    this.state = {
      view: this.props['view'],
      columns: 'four',
      columnsText: 4,
      selectedGroupId: undefined,
      summarySelected: false,
      selectedAnnotation: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data) {
      this.dp = new DataParser(nextProps.data);

      // Parse all data
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

    let {columns, view, selectedGroupId, summarySelected} = this.state;
    let isListView = view === 'list';
    let elems = [];
    let selectIndex = 0;

    if (summary) {
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
              $(c).slideDown('fast', ()=>{
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
          <div className="live monitoring summary" ref={(c)=>{
            $(c).slideDown('fast', ()=>{
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

  renderNavs() {

    let elem = null;
    if (this.dp) {
      let items = [];

      _.forEach(this.dp.groupmetrics, (v, k) => {
        items.push((
          <div key={k} className="item">
            <a key='link' href={window.location}>Metric Group {k}</a>
            <div key="metrics" className="menu">
              {v.map(g=> {
                return (<div key={g} className="item">- {g}</div>)
              })}
            </div>
          </div>
        ));
      });

      elem = (
        <div className="active content menu">
          <a key="summary" href={window.location} className="item">Summary</a>
          {items}
          <a key="causal" href={window.location} className="item">Causal Graph</a>
        </div>
      );
    }

    return (
      <Console.Navbar>
        <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
          <div className="item">
            <a key="root" className="active title"><i className="dropdown icon"/>List of Charts</a>
            {elem}
          </div>
        </Accordion>
      </Console.Navbar>
    )
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
      debugger;
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

    let {data, loading, projectName} = this.props;
    let {columns, view, summarySelected} = this.state;

    let isListView = view === 'list';
    let contentStyle = isListView ? {} : {paddingLeft: 0};
    let contentClass = loading ? 'ui form loading' : '';
    let summary;

    if (data && !this.dp) {
      // Only parse the data at first time
      this.dp = new DataParser(data);
    }
    return (
      <Console.Wrapper>
        {!loading && isListView && this.renderNavs()}
        <Console.Content style={contentStyle} className={contentClass}>
          <div className="ui main tiny container" style={{minHeight:'100%'}}>
            {!loading &&
            <div className="ui vertical segment">
              {projectName}
              <ButtonGroup className="right floated basic icon">
                <Dropdown className="compact"
                          value={this.state['columns']} text={this.state['columnsText']}
                          mode="select"
                          class={{zIndex:1000}}
                          onChange={(value, text) => {this.setState(
                        {view: 'thumbnail', columns: value, columnsText: text})}}>
                  <div className="menu">
                    <div className="item" data-value="two">2</div>
                    <div className="item" data-value="three">3</div>
                    <div className="item" data-value="four">4</div>
                    <div className="item" data-value="five">5</div>
                    <div className="item" data-value="six">6</div>
                  </div>
                </Dropdown>
                <Button active={view == 'list'}
                        onClick={()=>this.setState({view:'list', summarySelected:false,selectedGroupId: null})}>
                  <i className="list layout icon"/>
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
        </Console.Content>
      </Console.Wrapper>
    )
  }
}

export default LiveAnalysisCharts;
