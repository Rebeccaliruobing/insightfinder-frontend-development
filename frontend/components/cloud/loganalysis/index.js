import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import shallowCompare from 'react-addons-shallow-compare';
import { autobind } from 'core-decorators';
import { Console, Button } from '../../../artui/react';
import DataParser from '../dataparser';
import { DataChart } from '../../share/charts';
import './logevent.less';

class EventTableGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedWords: '',
      eventsInRangeFreqVector:[],
      selectedPattern:'', 
      selectedPatternChartData:{},
      derivedAnomalyByMetric:{},
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  parseTopWords(wordsStr) {
    let ret = [];
    let words = wordsStr ? wordsStr.split(',') : [];
    _.forEach(words, (w_str) => {
      let match = w_str.match(/'(.*)'.*\((\d*)\)*/);
      // The second and third match contains the words and count.
      if (match && match.length >= 3) {
        ret.push([match[1], match[2]]);
      }
    });

    return ret;
  }

  @autobind
  handleHighlight(word) {
    return () => {
      const current = this.state.selectedWords;
      this.setState({
        selectedWords: word === current ? '' : word,
      });
    }
  }

  @autobind
  highlightKWord(rawData) {
    const word = this.state.selectedWords;
    if (!!word) {
      var regex = new RegExp( '\\b(' + word + ')\\b', 'mgi' );
      return rawData.replace(regex, '<span class="highlight">$1</span>');
    }

    return rawData;
  }

  render() {
    let group = this.props.groupData;
    let data = group.data;
    let rows = [];
    let topKEpisodes = group.topKEpisodes.length > 0
      ? "Top frequent episodes: " + group.topKEpisodes : "";

    let topKWords = this.parseTopWords(group.topKWords);

    for (let i = 1; i < data.length; ++i) {
      let timestamp = data[i][0];
      let rawData = data[i][1];
      rows.push((<tr key={i}>
        <td>{timestamp}</td>
        <td dangerouslySetInnerHTML={{__html: this.highlightKWord(rawData)}} />
      </tr>));
    }

    return (
      <tbody>
      <tr key="0">
        <td rowSpan={group.rowSpan}>
          Pattern {group.nid} <br />
          Number of events: {group.nEvents} <br />
          {topKWords.length > 0 ? "Top words: " : ""}
          {
            _.map(topKWords, (kword, index) => {
              const word = kword[0];
              const count = kword[1];
              return <span style={{cursor: 'pointer', color: 'blue'}}
                key={index}
                onClick={this.handleHighlight(word)}>'{word}'({count}),</span>
            })
          }
          <br />
          {topKEpisodes}
        </td>
        <td>{data[0][0]}</td>
        <td dangerouslySetInnerHTML={{__html: this.highlightKWord(data[0][1])}} />
      </tr>
      {rows}
      </tbody>
    );
  }
}

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
    onRefresh: () => {
    }
  };

  constructor(props) {

    super(props);
    this.dp = null;

    this.state = {
      instanceName: false,
      selectedGroupId: undefined,
      summarySelected: false,
      selectedAnnotation: null,
      selectedBarColors: [],
      showSettingModal: false,
      tabStates: {
        event: '',
        anomaly: '',
        freq: 'active',
      }
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
      this.dp.getMetricsData();
      this.dp.parseLogAnalysisData();
      this.dp.getFreqVectorData();
      this.calculateEventTableData();
      this.calculateFreqVectorData();

      // Sort the grouped data
      this.summary = this.dp.summaryData;
      this._data = data;
    }
  }

  calculateEventTableData() {

    let anomalies = this.dp.anomalies["0"];
    let episodeMapArr = this.dp.episodeMapArr;
    let logEventArr = this.dp.logEventArr;
    logEventArr = logEventArr.filter(function (el, index, arr) {
      return el.nid != -1
    });
    let clusterTopEpisodeArr = this.dp.clusterTopEpisodeArr;
    let clusterTopWordArr = this.dp.clusterTopWordArr;
    let neuronListNumber = {};
    let neuronValue = [];
    let nidList = _.map(logEventArr, function (o) {
      return o['nid']
    });
    let neuronList = nidList.filter(function (el, index, arr) {
      return index === arr.indexOf(el)
    });

    _.forEach(neuronList, function (value, key) {
      neuronListNumber[value] = (_.partition(logEventArr, function (o) {
        return o['nid'] == value
      })[0]).length;
    });
    let neuronIdList = neuronList;
    neuronList = [];
    neuronIdList.map(function (value, index) {
      let num = 0;
      for (let j = 0; j < index; j++) {
        num += neuronListNumber[neuronIdList[j]];
      }
      neuronList.push(num);
      neuronValue.push(neuronListNumber[neuronIdList[index]]);
    });

    let allEventTableData = [];
    let groupData = {};
    logEventArr.map((event, iEvent) => {
      let showNumber = neuronList.indexOf(iEvent);
      let timestamp = moment(event.timestamp).format("YYYY-MM-DD HH:mm");

      // Find a new group.
      if (showNumber != -1) {
        groupData = {};
        let iGroup = neuronIdList.indexOf(event.nid) + 1;
        groupData.nid = event.nid;
        groupData.iGroup = iGroup;
        groupData.rowSpan = neuronValue[showNumber];
        groupData.nEvents = neuronValue[iGroup - 1];

        // let anomaly = _.find(realAnomalies, a => a.timestamp == event.timestamp);
        // let nAnomaly = realAnomalies.indexOf(anomaly) + 1;
        groupData.topKEpisodes = _.find(clusterTopEpisodeArr, p => p.nid == event.nid);
        groupData.topKEpisodes = groupData.topKEpisodes?groupData.topKEpisodes.topK: [];
        groupData.topKWords = _.find(clusterTopWordArr, p => p.nid == event.nid);
        groupData.topKWords = groupData.topKWords?groupData.topKWords.topK: [];
        groupData.data = [[timestamp, event.rawData, event.timestamp]];
        allEventTableData.push(groupData);
      } else {
        groupData.data.push([timestamp, event.rawData, event.timestamp]);
      }
    });

    // make a copy, and filter out anomaly and small cluster, and run again
    let allLogEventArr = logEventArr.slice();
    logEventArr = logEventArr.filter(function (el, index, arr) {
      return (neuronValue[neuronIdList.indexOf(el.nid)] > 3)
    });
    neuronListNumber = {};
    neuronValue = [];
    nidList = _.map(logEventArr, function (o) {
      return o['nid']
    });
    neuronList = nidList.filter(function (el, index, arr) {
      return index === arr.indexOf(el)
    });

    _.forEach(neuronList, function (value, key) {
      neuronListNumber[value] = (_.partition(logEventArr, function (o) {
        return o['nid'] == value
      })[0]).length;
    });
    neuronIdList = neuronList;
    neuronList = [];
    neuronIdList.map(function (value, index) {
      let num = 0;
      for (let j = 0; j < index; j++) {
        num += neuronListNumber[neuronIdList[j]];
      }
      neuronList.push(num);
      neuronValue.push(neuronListNumber[neuronIdList[index]]);
    });

    let eventTableData = [];
    logEventArr.map((event, iEvent) => {
      let showNumber = neuronList.indexOf(iEvent);
      let timestamp = moment(event.timestamp).format("YYYY-MM-DD HH:mm");

      // Find a new group.
      if (showNumber != -1) {
        groupData = {};
        let iGroup = neuronIdList.indexOf(event.nid) + 1;
        groupData.nid = event.nid;
        groupData.iGroup = iGroup;
        groupData.rowSpan = neuronValue[showNumber];
        groupData.nEvents = neuronValue[iGroup - 1];

        // let anomaly = _.find(realAnomalies, a => a.timestamp == event.timestamp);
        // let nAnomaly = realAnomalies.indexOf(anomaly) + 1;
        groupData.topKEpisodes = _.find(clusterTopEpisodeArr, p => p.nid == event.nid);
        groupData.topKEpisodes = groupData.topKEpisodes?groupData.topKEpisodes.topK: [];
        groupData.topKWords = _.find(clusterTopWordArr, p => p.nid == event.nid);
        groupData.topKWords = groupData.topKWords?groupData.topKWords.topK: [];
        groupData.data = [[timestamp, event.rawData, event.timestamp]];
        eventTableData.push(groupData);
      } else {
        groupData.data.push([timestamp, event.rawData, event.timestamp]);
      }
    });

    this.allLogEventArr = allLogEventArr;
    this.allEventTableData = allEventTableData;

    this.logEventArr = logEventArr;
    this.neuronValue = neuronValue;
    this.eventTableData = eventTableData;
  }

  renderWordCountTable() {
    if (!this.dp) return;
    let wordCountArr = this.dp.wordCountArr;
    if (wordCountArr) {
      return (
        <div>
          <table className="vector-table">
            <tbody>
            <tr>
              <td>Word</td>
              <td>Count</td>
            </tr>
            {wordCountArr.sort(function (a, b) {
              // reverse ordering
              let aid = parseInt(a.count);
              let bid = parseInt(b.count);
              if (aid < bid) {
                return 1;
              } else if (aid > bid) {
                return -1;
              } else {
                return 0;
              }
            }).map((word, i) => {
              let cleanWord = word.pattern.replace(/"/g, "");
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

  renderEpisodeMapTable() {
    if (!this.dp) return;
    let episodeMapArr = this.dp.episodeMapArr;
    if (episodeMapArr) {
      return (
        <div>
          <table className="vector-table">
            <tbody>
            <tr>
              <td>Frequent Episode</td>
              <td>Count</td>
            </tr>
            {episodeMapArr.sort(function (a, b) {
              // reverse ordering
              let aid = parseInt(a.count);
              let bid = parseInt(b.count);
              if (aid < bid) {
                return 1;
              } else if (aid > bid) {
                return -1;
              } else {
                return 0;
              }
            }).map((episode, i) => {
              let cleanEpisode = episode.pattern.replace(/"/g, "");
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

  renderAnomalyTable() {
    if (!this.dp) return;
    let anomalies = this.dp.anomalies["0"];
    let logEventArr = this.dp.logEventArr;
    let clusterTopEpisodeArr = this.dp.clusterTopEpisodeArr;
    let clusterTopWordArr = this.dp.clusterTopWordArr;
    let neuronListNumber = {};
    let neuronValue = [];
    let nidList = _.map(logEventArr, function (o) {
      return o['nid']
    });
    let neuronList = nidList.filter(function (el, index, arr) {
      return index === arr.indexOf(el)
    });
    _.forEach(neuronList, function (value, key) {
      neuronListNumber[value] = (_.partition(logEventArr, function (o) {
        return o['nid'] == value
      })[0]).length;
    });
    let neuronIdList = neuronList;
    neuronList = [];
    neuronIdList.map(function (value, index) {
      let num = 0;
      for (let j = 0; j < index; j++) {
        num += neuronListNumber[neuronIdList[j]];
      }
      neuronList.push(num);
      neuronValue.push(neuronListNumber[neuronIdList[index]]);
    });
    logEventArr = logEventArr.filter(function (el, index, arr) {
      // return (neuronValue[neuronIdList.indexOf(el.nid)] <= 3) || (el.nid == -1)
      return (neuronValue[neuronIdList.indexOf(el.nid)] <= 3)
    });

    if (logEventArr) {
      return (
        <div>
          <div className="ui header">Number of anomalies: {logEventArr.length}</div>
          <table className="rare-event-table">
            <thead>
            <tr>
                <td>Time</td>
                <td>Event</td>
             </tr>
            </thead>
            <tbody>
              {logEventArr.map((event, iEvent) => {
                let timestamp = moment(event.timestamp).format("YYYY-MM-DD HH:mm");
                let anomalyString = event.anomaly;
                let topKEpisodes = "";
                let topKWords = "";
                let pos = 0;
                let clusterFeature = "";
                if(anomalyString == undefined){
                  anomalyString = "";
                  topKEpisodes = _.find(clusterTopEpisodeArr, p => p.nid == event.nid);
                  topKEpisodes = topKEpisodes?topKEpisodes.topK:[];
                  if(topKEpisodes.length>0){
                    var entries = topKEpisodes.split(',');
                    _.each(entries, function (entry, ie) {
                      pos = entry.indexOf('(');
                      if(pos!=-1){
                        anomalyString += entry.substring(0,pos) + ' ';
                      }
                    });
                  }
                  topKWords = _.find(clusterTopWordArr, p => p.nid == event.nid);
                  topKWords = topKWords?topKWords.topK: [];
                  if(topKWords.length>0){
                    var entries = topKWords.split(',');
                    _.each(entries, function (entry, ie) {
                      pos = entry.indexOf('(');
                      if(pos!=-1){
                        anomalyString += entry.substring(0,pos) + ' ';
                      }
                    });
                  }
                }
                return (
                  <tr key={iEvent}>
                    <td>{timestamp}</td>
                    <td>{event.rawData}</td>
                  </tr>
                )
              })}              
            </tbody>
          </table>
        </div>
      )
    }
  }
  
  getFreqVectorAnnotations(top1FreqData, top1NidData, label){
    return _.map(top1FreqData, freq => {
      let ts = +moment(freq[0]);
      let nid = top1NidData[ts];
      return {
        series: label,
        x: ts.valueOf(),
        shortText: (nid==null)?'':(nid),
        text: (nid==null)?'':('Neuron Id '+nid),
      };
    });
  }

  @autobind
  handlePatternPointClick(startTs) {
    const { selectedPatternChartData, selectedPattern, selectedAnnotation, selectedBarColors } = this.state;
    const eventTableData = this.allEventTableData;
    let nid = parseInt(selectedPattern.replace("Pattern ",""));
    let selectedEventTableData = _.find(eventTableData, event => event.nid == nid)
    if(selectedEventTableData){
      let eventList = selectedEventTableData.data;
      if (selectedPatternChartData && eventList) {      
        const sdata = selectedPatternChartData.sdata;
        const idx = _.findIndex(sdata, s => moment(s[0]).valueOf() === startTs);
        let endTs = sdata[sdata.length-1][0];
        if(idx==sdata.length){
          alert("end");
        } else {
          endTs = sdata[idx+1][0]-1;
        }
        let eventsInRangeFreqVector = eventList.filter(function (el, index, arr) {
          return (el[2]>=startTs && el[2]<=endTs);
        });
        let selectedSelectedAnnotation = _.find(selectedAnnotation, a => a.x == startTs);
        let selectedDetailedText = selectedSelectedAnnotation && selectedSelectedAnnotation.detailedText;
        this.setState({
          eventsInRangeFreqVector,
          selectedDetailedText,
        });
      }
    }
  }

  @autobind()
  handlePatternSelected(pattern) {
    const { nonZeroFreqChartDatas, patterns, derivedAnomalyByMetric } = this.state;
    let pos = patterns.indexOf(pattern);
    let selectedPatternChartData = nonZeroFreqChartDatas[pos];
    let derivedAnomaly = derivedAnomalyByMetric[pattern.replace('Pattern','neuron')];

    // Create the bar colors for time series. time => colstring.
    const sdata = selectedPatternChartData ? selectedPatternChartData.sdata || [] : [];
    const barColors = {};
    _.forEach(sdata, (d, idx) => {
      const ts = +moment(d[0]).valueOf();
      barColors[ts] = 'teal';
    });

    let selectedAnnotation = (selectedPatternChartData && derivedAnomaly) ? _.map(selectedPatternChartData.sdata, datapoint => {
      let ts = +moment(datapoint[0]);
      let thisHint = _.find(derivedAnomaly, a => a.timestamp == ts);
      if(thisHint){
        let pct = parseFloat(thisHint.pct);
        pct = Math.round(pct*10)/10;
        let detailedText = "Frequency of this pattern is " + Math.abs(pct) + "% " + ((pct>0)?"higher":"lower") + " than normal.";
        let pctString = pct && ((pct>0?"+":"")+pct+"%");
        let signString = pct && ((pct>0)?"+":"-");
        barColors[ts] = ((pct>0)?"red":"blue");
        return {
          series: selectedPatternChartData.sname[1],
          x: ts.valueOf(),
          shortText: signString,
          text: pctString,
          detailedText,
        };
      } else {
        barColors[ts] = 'teal';
        return {
          series: '',
          x: ts.valueOf(),
          shortText: '',
          text: '',
          detailedText: '',
        };
      }
    }) : [];

    this.setState({
      selectedPattern: pattern,
      selectedPatternChartData,
      selectedAnnotation,
      selectedBarColors: barColors, 
      derivedAnomaly,
      eventsInRangeFreqVector:[],
      selectedDetailedText:'',
    });
  }
  
  calculateFreqVectorData(){
    if (!this.dp) return;
    let derivedAnomalyByMetric = this.dp.anomalyByMetricObjArr && this.dp.anomalyByMetricObjArr[0] ? this.dp.anomalyByMetricObjArr[0] : {};
    let { totalFreqData, timestamps, nonZeroFreqVectors } = this.dp.freqVectorData;
    let totalFreqChartData = {
      sdata: totalFreqData,
      sname: ['Time Window Start','Total Frequency'],
    };

    let patterns = [];
    let nonZeroFreqChartDatas = [];
    for (var pattern in nonZeroFreqVectors) {
      let nonZeroFreqChartData = {
        sdata: nonZeroFreqVectors[pattern],
        sname: ['Time Window Start', pattern],
      };
      nonZeroFreqChartDatas.push(nonZeroFreqChartData);
      patterns.push(pattern);
    }
    this.setState({
      nonZeroFreqChartDatas,
      patterns,
      derivedAnomalyByMetric,
    },()=>{
      pattern && this.handlePatternSelected(patterns[0]);
    });
  }

  

  @autobind
  renderFreqCharts(){
    if (!this.dp) return;
    let { nonZeroFreqChartDatas, patterns, selectedPattern, selectedPatternChartData, eventsInRangeFreqVector, 
      derivedAnomaly, selectedDetailedText, selectedAnnotation, selectedBarColors} = this.state;
    let emptyAnnotations = [];

    let title = selectedPatternChartData && selectedPatternChartData.sname ? selectedPatternChartData.sname[1] : '';

    // <br />(sorted by CPU usage)
    return (
      <div className="ui grid">
        <div className="three wide column">
          <table className="ui selectable celled table">
            <thead>
              <tr>
                <th><span
                  style={{ fontWeight: 'bold' }}
                >Pattern List</span>
            </th>
              </tr>
            </thead>
            <tbody>
              {patterns && patterns.map((pattern, i) => (
                <tr
                  key={i}
                  onClick={() => this.handlePatternSelected(pattern)}
                  className={cx(
                { active: patterns === this.state.selectedPattern })
              } style={{ cursor: 'pointer' }}
                >
                  <td>{pattern}</td>
                </tr>
          ))}
            </tbody>
          </table>
        </div>
        <div className="thirteen wide column">
          { selectedPattern && selectedPatternChartData &&
            <div style={{ width: '100%', backgroundColor: '#fff', padding: 10 }}>
              <h4 className="ui header">{title}</h4>
              <DataChart
                chartType='bar'
                data={selectedPatternChartData}
                barColors={selectedBarColors}
                annotations={emptyAnnotations}
                onClick={this.handlePatternPointClick}
              />
            </div>
          }
          { (selectedDetailedText && selectedDetailedText.length) ? 
            <div>
              {selectedDetailedText}
            </div>
            : 
            <div>
              &nbsp;
            </div>
          }
          { (eventsInRangeFreqVector && eventsInRangeFreqVector.length) ? 
            <div>
            <h4>Event List</h4>
            <table className="freq-event-table">
              <thead>
              <tr>
                <td>Time</td>
                <td>Event</td>
              </tr>
              </thead>
              <tbody>
                {eventsInRangeFreqVector.map((event, iEvent) => (
                  <tr key={iEvent}>
                    <td>{event[0]}</td>
                    <td>{event[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            : null
          }
        </div>
      </div>
    )
  }

  renderEventTable() {

    const logEventArr = this.logEventArr;
    const neuronValue = this.neuronValue;
    const eventTableData = this.eventTableData;

    if (logEventArr) {
      return (
        <div>
          <div className="ui header">
            Number of events: {logEventArr.length}, Number of clusters: {neuronValue.length}
          </div>
          <table className="event-table">
            <thead>
            <tr>
              <td>Event Type</td>
              <td>Time</td>
              <td>Event</td>
            </tr>
            </thead>
            {eventTableData.map((group, iGroup) => {
              return (
                <EventTableGroup key={iGroup} groupData={group} />
              );
            })}
          </table>
        </div>
      )
    }
  }

  selectTab(e, tab) {
    var tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, function (val) {
      return '';
    });
    tabStates[tab] = 'active';
    this.setState({ tabStates: tabStates });
  }

  renderList() {
    let self = this;
    let { tabStates } = this.state;
    const summary = this.summary;

    return (
      <div className="ui grid">
        <div className="sixteen wide column">
          <div className="ui pointing secondary menu">
            <a className={tabStates['event'] + ' item'}
               onClick={(e) => this.selectTab(e, 'event')}>Clustering Result</a>
            <a className={tabStates['anomaly'] + ' item'}
               onClick={(e) => this.selectTab(e, 'anomaly')}>Rare Events</a>
            <a className={tabStates['freq'] + ' item'}
               onClick={(e) => this.selectTab(e, 'freq')}>Frequency</a>
          </div>
          <div className={tabStates['event'] + ' ui tab '}>
            {tabStates['event'] === 'active' ? (
              self.renderEventTable()
            ) : null}
          </div>
          <div className={tabStates['anomaly'] + ' ui tab '}>
            {tabStates['anomaly'] === 'active' ? (
              self.renderAnomalyTable()
            ) : null}
          </div>
          <div className={tabStates['freq'] + ' ui tab '}>
            {tabStates['freq'] === 'active' ? (
              self.renderFreqCharts()
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  render() {

    let { loading, onRefresh } = this.props;

    let contentStyle = { paddingLeft: 0 };
    let contentClass = loading ? 'ui form loading' : '';

    this.calculateData();

    return (
      <Console.Wrapper>
        <Console.Content style={contentStyle} className={contentClass}>
          <div className="ui main tiny container" style={{ minHeight: '100%' }}>
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
        </Console.Content>
      </Console.Wrapper>
    )
  }
}

export default LogAnalysisCharts;
