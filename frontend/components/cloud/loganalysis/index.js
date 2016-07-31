import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import store from 'store';
import moment from 'moment';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown, Tab} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import DataParser from '../dataparser';
import SettingModal from './settingModal';
import "./logevent.less";

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
      selectedGroupId: undefined,
      summarySelected: false,
      selectedAnnotation: null,
      showSettingModal: false,
      tabStates: {
          event: 'active',
          vector: ''
      }
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
      this.dp.parseLogAnalysisData();
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

  renderWordCountTable(){
    if (!this.dp) return;
    let wordCountArr = this.dp.wordCountArr;
    if(wordCountArr){
      return (
        <div>
          <table className="vector-table">
            <tbody>
              <tr>
                <td>Word</td>
                <td>Count</td>
              </tr>
              {wordCountArr.sort(function(a, b) {
                // reverse ordering
                let aid = parseInt(a.count);
                let bid = parseInt(b.count);
                if(aid<bid){
                  return 1;
                } else if(aid>bid){
                  return -1;
                }else{
                  return 0;
                }
              }).map((word, i) => {
                let cleanWord = word.pattern.replace(/"/g,"");
                return (
                  <tr key={i}>
                    <td>{cleanWord}</td>
                    <td>{word.count}</td>
                  </tr>
                )
              })}              
            </tbody>
          </table>
        </div>
      )
    }
  }

  renderEpisodeMapTable(){
    if (!this.dp) return;
    let episodeMapArr = this.dp.episodeMapArr;
    if(episodeMapArr){
      return (
        <div>
          <table className="vector-table">
            <tbody>
              <tr>
                <td>Frequent Episode</td>
                <td>Count</td>
              </tr>
              {episodeMapArr.sort(function(a, b) {
                // reverse ordering
                let aid = parseInt(a.count);
                let bid = parseInt(b.count);
                if(aid<bid){
                  return 1;
                } else if(aid>bid){
                  return -1;
                }else{
                  return 0;
                }
              }).map((episode, i) => {
                let cleanEpisode = episode.pattern.replace(/"/g,"");
                return (
                  <tr key={i}>
                    <td>{cleanEpisode}</td>
                    <td>{episode.count}</td>
                  </tr>
                )
              })}              
            </tbody>
          </table>
        </div>
      )
    }
  }

  renderEventTable(){
    if (!this.dp) return;
    let anomalies = this.dp.anomalies["0"];
    // FIXME: add wordmap here
    let episodeMap = {};
    let episodeMapArr = this.dp.episodeMapArr;
    _.forEach(episodeMapArr, function (episode, iEpisode)  {
      episodeMap[parseInt(episode.index)] = episode.pattern;
    });
    let logEventArr = this.dp.logEventArr;
    let clusterTopPatternArr = this.dp.clusterTopPatternArr;
    let neuronListNumber = {};
    let neuronValue = [];
    let nidList = _.map(logEventArr, function(o){return o['nid']});
    let neuronList = nidList.filter(function (el, index, arr) { return index === arr.indexOf(el)});
    
    _.forEach(neuronList, function (value,key) {
        neuronListNumber[value] = (_.partition(logEventArr, function(o){return o['nid'] == value})[0]).length;
    });
    let neuronIdList = neuronList;
    neuronList = [];
    neuronIdList.map(function (value,index) {
        let num = 0;
        for(let j=0;j<index;j++){
            num+=neuronListNumber[neuronIdList[j]];
        }
        neuronList.push(num);
        neuronValue.push(neuronListNumber[neuronIdList[index]]);
    });

    if(logEventArr){
      return (
        <div>
          <div class="ui header">Number of events: {logEventArr.length}, Number of clusters: {neuronValue.length}</div>
          <table className="event-table">
            <tbody>
              <tr>
                <td>Cluster ID</td>
                <td>Time</td>
                <td>Event</td>
                <td>Anomaly</td>
              </tr>
              {logEventArr.map((event, iEvent) => {
                let showNumber = neuronList.indexOf(iEvent);
                let iGroup = neuronIdList.indexOf(event.nid)+1;
                let realAnomalies = _.filter(anomalies, a => a.val>0);
                let anomaly = _.find(realAnomalies, a => a.timestamp == event.timestamp);
                let nAnomaly = realAnomalies.indexOf(anomaly)+1;
                let nAnomalyStr = "";
                let topKPatterns = "";
                if(nAnomaly){
                  nAnomalyStr = "Anomaly ID: ["+ nAnomaly + "]";
                }
                let timestamp = moment(event.timestamp).format("YYYY-MM-DD HH:mm");
                let isAnomaly = "";
                if(event.nid==-1){
                  isAnomaly = "Anomaly Cluster";
                }else{
                  topKPatterns = _.find(clusterTopPatternArr, p => p.nid == event.nid).topK;
                }
                return (
                  <tr key={iEvent}>
                    {showNumber!=-1?
                    <td rowSpan={neuronValue[showNumber]}>
                        Cluster {iGroup} <br />
                        Number of events: {neuronValue[iGroup-1]} <br />
                        {isAnomaly} <br />
                        {topKPatterns}
                    </td>:
                      ""
                    }
                    <td>{timestamp}</td>
                    <td>{event.rawData}</td>
                    <td>{event.anomaly}<br />{nAnomalyStr}</td>
                  </tr>
                )
              })}              
            </tbody>
          </table>
        </div>
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
          drawCallback={(g) => this.setState({listGraphZoomOpt: { dateWindow: g.xAxisRange() }})}
          // onHighlight={(e, x, points, row, sname) => this.setState({listGraphSelection: { x: x, seriesName: sname }})}
          // onUnhighlight={() => this.setState({listGraphSelection: undefined})}
          // selection={listGraphSelection}
          {...this.state.listGraphZoomOpt}
        />
      </div>
    )
  }

  selectTab(e, tab) {
      var tabStates = this.state['tabStates'];
      tabStates = _.mapValues(tabStates, function (val) {
          return '';
      });
      tabStates[tab] = 'active';
      this.setState({tabStates: tabStates});
  }

  renderList() {
    let self = this;
    let groups = this.dp ? this.dp.groupsData : [];
    let groupMetrics = this.dp ? this.dp.groupmetrics : null;
    let {listGraphZoomOpt, tabStates} = this.state;
    return (
      <div className="ui grid">
        <div className="sixteen wide column">
          {this.renderSummary()}
           <div className="ui pointing secondary menu">
               <a className={tabStates['event'] + ' item'}
                  onClick={(e) => this.selectTab(e, 'event')}>Clustering Result</a>
               <a className={tabStates['episode'] + ' item'}
                  onClick={(e) => this.selectTab(e, 'episode')}>Frequent Episodes</a>
               <a className={tabStates['word'] + ' item'}
                  onClick={(e) => this.selectTab(e, 'word')}>Word Count</a>
           </div>
           <div className={tabStates['event'] + ' ui tab '}>
              {tabStates['event'] === 'active' ? (
                self.renderEventTable()
              ) : null}
           </div>
           <div className={tabStates['episode'] + ' ui tab '}>
              {tabStates['episode'] === 'active' ? (
                self.renderEpisodeMapTable()
              ) : null}
           </div>
           <div className={tabStates['word'] + ' ui tab '}>
              {tabStates['word'] === 'active' ? (
                self.renderWordCountTable()
              ) : null}
           </div>
        </div>
      </div>
    )
  }

  render() {

    let {data, loading, onRefresh, enablePublish} = this.props;

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
            </div>
            }
            <div className="ui vertical segment">
              {!loading && this.renderList()}
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
