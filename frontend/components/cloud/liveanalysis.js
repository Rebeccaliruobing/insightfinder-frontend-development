import React from 'react';
import cx from 'classnames';
import store from 'store';
import moment from 'moment';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown, Tab} from '../../artui/react';
import {Dygraph} from '../../artui/react/dataviz';
import DataParser from './dataparser';

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

  componentDidMount() {
  }
  
  renderSummaryDetail(summary) {
    return (
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
               highlights={summary.highlights} />
    )
  }
  
  renderGroupDetail(group) {
    return (
      <Dygraph key={group.id} className="live monitoring summary" data={group.sdata}
               title={"Metric Group" + group.id}
               labels={group.sname}
               style={{width: '100%', height: 200}}
               showRangeSelector={true}
               labelsDivStyles={{padding: '4px', margin:'15px'}}
               highlightCircleSize={2}
               highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
               highlights={group.highlights}
      />
    )
  }
  
  renderThumbnail(summary, groups) {
    let {columns} = this.state;
    let elems = [];
    
    if(summary) {
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
                     highlights={summary.highlights} />
          </div>
        </div>
      ));
    }
    
    if (groups) {
      groups.map((group) => {
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
    }

    return elems;
  }

  renderNavs() {
    
    let elem = null;
    if (this.dp) {
      let items = [];
      
      _.forEach(this.dp.groupmetrics, (v,k) => {
        items.push((
          <div className="item">
            <Link key={k} to="">Metric Group {k}</Link>
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
          <Link to="" className="item">Summary</Link>
          {items}
        </div>
      );
    }
    
    return (
      <Console.Navbar>
        <Accordion className="ui vertical fluid secondary inverted pointing accordion menu">
          <div className="item">
            <a className="active title"><i className="dropdown icon"/>List of Charts</a>
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
  
  renderList(summary, groups) {
    let elems = [];

    if (summary) {
      elems.push(this.renderSummaryDetail(summary))
    }
    
    if (groups) {
      groups.map((group) => {
        elems.push(this.renderGroupDetail(group));
      });
    }

    return(
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
    let {columns, view, summarySelected, selectedGroupId} = this.state;

    let isListView = view === 'list';
    let contentStyle = isListView ? {} : {paddingLeft:0};
    let contentClass = loading ? 'ui form loading' : '';
    
    let summary, groups, selectedGroup = undefined;
    
    if (data) {
      this.dp = new DataParser(data);
      if (this.dp.mode == 'holistic') {
        summary = this.dp.getSummaryData();
      }
      groups = this.dp.getGroupsData();
      selectedGroup = _.find(groups, g => g.id == selectedGroupId);
    } else {
      this.dp = null;
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
              {this.renderThumbnail(summary, groups)}
            </div>
            }
            {isListView && this.renderList(summary, groups)}
            {!isListView && summary && summarySelected && this.renderSummaryDetail(summary)}
            {!isListView && !!selectedGroup && this.renderGroupDetail(selectedGroup)}
          </div>
        </div>
      </Console.Content>
    </Console.Wrapper>
    )
  }
}

export default LiveAnalysisCharts;
