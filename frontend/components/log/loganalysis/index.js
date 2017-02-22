import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import cx from 'classnames';
import R from 'ramda';
import shallowCompare from 'react-addons-shallow-compare';
import { autobind } from 'core-decorators';
import { Console, Button } from '../../../artui/react';
import DataParser from '../../cloud/dataparser';
import { DataChart } from '../../share/charts';
import EventCluster from './cluster';
import EventRare from './rare';
import PatternSequence from './pattern-sequence';
import './logevent.less';
import '../../settings/threshold/threshold.less';

class LogAnalysisCharts extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    data: React.PropTypes.object,
    loading: React.PropTypes.bool,
    enablePublish: React.PropTypes.bool,
    onRefresh: React.PropTypes.func,
  };

  static defaultProps = {
    loading: true,
    enablePublish: false,
    onRefresh: () => {},
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
      tabStates: {
        event: 'active',
        anomaly: '',
        freq: '',
        clusterfe: '',
      },
      logEventArr: [],
      allLogEventArr: [],
      rareLogEventArr: [],
      neuronValue: [],
    };
    this.calculateData(props);
  }

  componentWillReceiveProps(nextProps) {
    this.calculateData(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  calculateData(props) {
    // Cache the data, and recalculate it if changed.
    const { data, loading, onRefresh, query, ...rest } = props;

    // this.rareEventThreshold = parseInt(query.rareEventThreshold);
    // if (!this.rareEventThreshold) {
    //   this.rareEventThreshold = 3;
    // }

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
    const topKCount = 5;
    const anomalies = this.dp.anomalies['0'];
    const episodeMapArr = this.dp.episodeMapArr;
    let allLogEventArr = this.dp.logEventArr;
    // let rareEventThreshold = this.rareEventThreshold;
    allLogEventArr = allLogEventArr.filter((el, index, arr) => {
      return el.nid != -1;
    });
    const clusterTopEpisodeArr = this.dp.clusterTopEpisodeArr;
    const clusterTopWordArr = this.dp.clusterTopWordArr;
    let neuronListNumber = {};
    let neuronValue = [];
    let nidList = _.map(allLogEventArr, (o) => {
      return o.nid;
    });
    let neuronList = nidList.filter((el, index, arr) => {
      return index === arr.indexOf(el);
    });

    _.forEach(neuronList, (value, key) => {
      neuronListNumber[value] = (_.partition(allLogEventArr, (o) => {
        return o.nid == value;
      })[0]).length;
    });
    let neuronIdList = neuronList;
    neuronList = [];
    neuronIdList.map((value, index) => {
      let num = 0;
      for (let j = 0; j < index; j++) {
        num += neuronListNumber[neuronIdList[j]];
      }
      neuronList.push(num);
      neuronValue.push(neuronListNumber[neuronIdList[index]]);
    });

    // make a copy, and filter out anomaly and small cluster, and run again
    const logEventArr = allLogEventArr.filter((el, index, arr) => {
      return (!el.rareEventFlag);
    });
    const rareLogEventArr = allLogEventArr.filter((el, index, arr) => {
      return (el.rareEventFlag);
    });
    neuronListNumber = {};
    neuronValue = [];
    nidList = _.map(logEventArr, (o) => {
      return o.nid;
    });
    neuronList = nidList.filter((el, index, arr) => {
      return index === arr.indexOf(el);
    });

    _.forEach(neuronList, (value, key) => {
      neuronListNumber[value] = (_.partition(logEventArr, (o) => {
        return o.nid == value;
      })[0]).length;
    });
    neuronIdList = neuronList;
    neuronList = [];
    neuronIdList.map((value, index) => {
      let num = 0;
      for (let j = 0; j < index; j++) {
        num += neuronListNumber[neuronIdList[j]];
      }
      neuronList.push(num);
      neuronValue.push(neuronListNumber[neuronIdList[index]]);
    });

    let groupData = {};
    const eventTableData = [];
    logEventArr.map((event, iEvent) => {
      const showNumber = neuronList.indexOf(iEvent);
      const timestamp = moment(event.timestamp).format('YYYY-MM-DD HH:mm');

      // Find a new group.
      if (showNumber != -1) {
        groupData = {};
        const iGroup = neuronIdList.indexOf(event.nid) + 1;
        groupData.nid = event.nid;
        groupData.iGroup = iGroup;
        groupData.rowSpan = neuronValue[showNumber];
        groupData.nEvents = neuronValue[iGroup - 1];

        // let anomaly = _.find(realAnomalies, a => a.timestamp == event.timestamp);
        // let nAnomaly = realAnomalies.indexOf(anomaly) + 1;
        groupData.topKEpisodes = _.find(clusterTopEpisodeArr, p => p.nid == event.nid);
        groupData.topKEpisodes = groupData.topKEpisodes ? groupData.topKEpisodes.topK : [];
        groupData.topKWords = _.find(clusterTopWordArr, p => p.nid == event.nid);
        groupData.topKWords = groupData.topKWords ? groupData.topKWords.topK : [];

        let arr = groupData.topKEpisodes.split(',');
        arr = arr.slice(0, topKCount);
        groupData.topKEpisodes = arr.toString();
        arr = groupData.topKWords.split(',');
        arr = arr.slice(0, topKCount);
        groupData.topKWords = arr.toString();

        groupData.data = [[timestamp, event.rawData, event.timestamp]];
        eventTableData.push(groupData);
      } else {
        groupData.data.push([timestamp, event.rawData, event.timestamp]);
      }
    });

    this.allLogEventArr = allLogEventArr;
    this.logEventArr = logEventArr;
    this.eventTableData = eventTableData;
    this.neuronValue = neuronValue;
    this.rareLogEventArr = rareLogEventArr;

    if (eventTableData && eventTableData.length > 0) {
      this.setState({
        selectedEventTableData: eventTableData[0],
        logEventArr: this.logEventArr,
        allLogEventArr: this.allLogEventArr,
        rareLogEventArr: this.rareLogEventArr,
        neuronValue: this.neuronValue,
      });
    }
  }

  renderWordCountTable() {
    if (!this.dp) return;
    const wordCountArr = this.dp.wordCountArr;
    if (wordCountArr) {
      return (
        <div>
          <table className="vector-table">
            <tbody>
              <tr>
                <td>Word</td>
                <td>Count</td>
              </tr>
              {wordCountArr.sort((a, b) => {
                // reverse ordering
                const aid = parseInt(a.count);
                const bid = parseInt(b.count);
                if (aid < bid) {
                  return -1;
                } else if (aid > bid) {
                  return 1;
                } 
                  return 0;
                
              }).map((word, i) => {
                const cleanWord = word.pattern.replace(/"/g, '');
                return (
                  <tr key={i}>
                    <td>{cleanWord}</td>
                    <td>{word.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  renderEpisodeMapTable() {
    if (!this.dp) return;
    const episodeMapArr = this.dp.episodeMapArr;
    if (episodeMapArr) {
      return (
        <div>
          <table className="vector-table">
            <tbody>
              <tr>
                <td>Frequent Episode</td>
                <td>Count</td>
              </tr>
              {episodeMapArr.sort((a, b) => {
                // reverse ordering
                const aid = parseInt(a.count);
                const bid = parseInt(b.count);
                if (aid < bid) {
                  return 1;
                } else if (aid > bid) {
                  return -1;
                } 
                  return 0;
                
              }).map((episode, i) => {
                const cleanEpisode = episode.pattern.replace(/"/g, '');
                return (
                  <tr key={i}>
                    <td>{cleanEpisode}</td>
                    <td>{episode.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  renderAnomalyTable() {
    if (!this.dp) return null;

    const logEventArr = this.dp.logEventArr;
    const eventTopEpisodes = this.dp.clusterTopEpisodeArr || [];
    const eventTopkeywords = this.dp.clusterTopWordArr || [];
    const startTime = moment(this.dp.data.modelStartTime_millis);
    const endTime = moment(this.dp.data.modelEndTime_millis);
    const frequency = this.dp.data.logFreqWindow;

    const filter = R.filter(e => !!e.rareEventFlag);
    const sorter = R.sortWith([R.descend(R.prop('timestamp'))]);
    const ds = sorter(filter(logEventArr));
    const eventDataset = R.map((e) => {
      // Get the keyword and eposodes for the event.
      const finder = R.find(R.propEq('nid', e.nid));
      const keywordStr = (finder(eventTopkeywords) || {}).topK || '';
      const episodesStr = (finder(eventTopEpisodes) || {}).topK || '';
      const keywords = keywordStr.length > 0 ?
        keywordStr.replace(/\(\d+\)/g, '').replace(/'/g, '').split(',') : [];
      const episodes = episodesStr.length > 0 ?
        episodesStr.replace(/\(\d+\)/g, '').replace(/'/g, '').split(',') : [];

      return {
        keywords,
        episodes,
        nid: e.nid,
        timestamp: moment(e.timestamp).format('YYYY-MM-DD HH:mm'),
        rawData: e.rawData,
      };
    })(ds);

    if (logEventArr) {
      return (
        <EventRare
          eventDataset={eventDataset}
          startTime={startTime} endTime={endTime} frequency={frequency}
        />
      );
    }
    return null;
  }

  getFreqVectorAnnotations(top1FreqData, top1NidData, label) {
    return _.map(top1FreqData, (freq) => {
      const ts = +moment(freq[0]);
      const nid = top1NidData[ts];
      return {
        series: label,
        x: ts.valueOf(),
        shortText: (nid == null) ? '' : (nid),
        text: (nid == null) ? '' : (`Neuron Id ${  nid}`),
      };
    });
  }

  @autobind
  handlePatternPointClick(startTs, position) {
    const { selectedPatternChartData, selectedPattern, selectedAnnotation, selectedBarColors } = this.state;
    const eventTableData = this.eventTableData;
    const nid = parseInt(selectedPattern.replace('Pattern ', ''));
    const selectedEventTableData = _.find(eventTableData, event => event.nid == nid);
    if (selectedEventTableData) {
      const eventList = selectedEventTableData.data;
      if (selectedPatternChartData && eventList) {
        const sdata = selectedPatternChartData.sdata;
        const idx = _.findIndex(sdata, s => moment(s[0]).valueOf() === startTs);
        let endTs = sdata[sdata.length - 1][0];
        if (idx == sdata.length) {
          alert('end');
        } else {
          endTs = sdata[idx + 1][0] - 1;
        }
        const eventsInRangeFreqVector = eventList.filter((el, index, arr) => {
          return (el[2] >= startTs && el[2] <= endTs);
        });
        const selectedSelectedAnnotation = _.find(selectedAnnotation, a => a.x == startTs);
        const selectedDetailedText = selectedSelectedAnnotation && selectedSelectedAnnotation.detailedText || '';
        // Make sure the text position is not out of the screen
        const selectedDetailedTextLeftPosition = position.x;
        // Math.min(position.x, $(window).width() - selectedDetailedText.length * 8);
        this.setState({
          eventsInRangeFreqVector,
          selectedDetailedText,
          selectedDetailedTextLeftPosition,
        });
      }
    }
  }

  @autobind()
  handleEventTableSelected(nid) {
    const eventTableData = this.eventTableData;
    const selectedEventTableData = _.find(eventTableData, a => a.nid == nid);
    this.setState({ selectedEventTableData });
  }

  @autobind()
  handlePatternSelected(pattern) {
    const { nonZeroFreqChartDatas, patterns, derivedAnomalyByMetric } = this.state;
    const pos = patterns.indexOf(pattern);
    const selectedPatternChartData = _.find(nonZeroFreqChartDatas, a => a.pattern == pattern);
    const derivedAnomaly = derivedAnomalyByMetric[pattern.replace('Pattern', 'neuron')];

    // Create the bar colors for time series. time => colstring.
    const sdata = selectedPatternChartData ? selectedPatternChartData.sdata || [] : [];
    const barColors = {};
    _.forEach(sdata, (d, idx) => {
      const ts = +moment(d[0]).valueOf();
      barColors[ts] = 'teal';
    });

    const selectedAnnotation = (selectedPatternChartData && derivedAnomaly) ? _.map(selectedPatternChartData.sdata, (datapoint) => {
      const ts = +moment(datapoint[0]);
      const thisHint = _.find(derivedAnomaly, a => a.timestamp == ts);
      if (thisHint) {
        let pct = parseFloat(thisHint.pct);
        pct = Math.round(pct * 10) / 10;
        const detailedText = 'Frequency of this pattern is ' + Math.abs(pct) + '% ' + ((pct > 0) ? 'higher' : 'lower') + ' than normal.';
        const pctString = pct && (`${(pct > 0 ? "+" : "") + pct  }%`);
        const signString = pct && ((pct > 0) ? '+' : '-');
        barColors[ts] = ((pct > 0) ? 'red' : 'blue');
        return {
          series: selectedPatternChartData.sname[1],
          x: ts.valueOf(),
          shortText: signString,
          text: pctString,
          detailedText,
        };
      } 
        barColors[ts] = 'teal';
        return {
          series: '',
          x: ts.valueOf(),
          shortText: '',
          text: '',
          detailedText: '',
        };
      
    }) : [];

    this.setState({
      selectedPattern: pattern,
      selectedPatternChartData,
      selectedAnnotation,
      selectedBarColors: barColors,
      derivedAnomaly,
      eventsInRangeFreqVector: [],
      selectedDetailedText: '',
      selectedDetailedTextLeftPosition: 0,
    });
  }

  calculateFreqVectorData() {
    if (!this.dp) return;
    const eventTableData = this.eventTableData;
    const derivedAnomalyByMetric = this.dp.anomalyByMetricObjArr && this.dp.anomalyByMetricObjArr[0] ? this.dp.anomalyByMetricObjArr[0] : {};
    const { totalFreqData, timestamps, nonZeroFreqVectors } = this.dp.freqVectorData;
    const totalFreqChartData = {
      sdata: totalFreqData,
      sname: ['Time Window Start', 'Total Frequency'],
    };

    let patterns = [];
    const nonZeroFreqChartDatas = [];
    for (var pattern in nonZeroFreqVectors) {
      if (pattern == 'Pattern -1') {
        continue; // skip anomaly result: neuronId==-1
      }
      const patternNo = parseInt(pattern.replace('Pattern ', ''));
      const pGroup = _.find(eventTableData, group => group.nid == patternNo);
      if (pGroup == undefined) {
        continue; // needs to be in eventTableData
      }
      const nonZeroFreqChartData = {
        sdata: nonZeroFreqVectors[pattern],
        sname: ['Time Window Start', pattern],
        pattern,
      };
      nonZeroFreqChartDatas.push(nonZeroFreqChartData);
      patterns.push(pattern);
    }
    patterns = patterns.sort((a, b) => {
      const aPatternNo = parseInt(a.replace('Pattern ', ''));
      const bPatternNo = parseInt(b.replace('Pattern ', ''));
      const aGroup = _.find(eventTableData, group => group.nid == aPatternNo);
      const bGroup = _.find(eventTableData, group => group.nid == bPatternNo);
      const aid = aGroup.nEvents;
      const bid = bGroup.nEvents;
      if (aid > bid) {
        return -1;
      } else if (aid < bid) {
        return 1;
      } 
        let aaid = aGroup.nid;
        let bbid = bGroup.nid;
        if (aaid > bbid) {
          return 1;
        } else if (aaid < bbid) {
          return -1;
        } else {
          return 0;
        }
      
    });
    this.setState({
      nonZeroFreqChartDatas,
      patterns,
      derivedAnomalyByMetric,
    }, () => {
      pattern && this.handlePatternSelected(patterns[0]);
    });
  }


  @autobind
  renderFreqCharts() {
    if (!this.dp) return;
    const eventTableData = this.eventTableData;
    const { nonZeroFreqChartDatas, patterns, selectedPattern, selectedPatternChartData, eventsInRangeFreqVector,
      derivedAnomaly, selectedDetailedText, selectedDetailedTextLeftPosition,
      selectedAnnotation, selectedBarColors, derivedAnomalyByMetric } = this.state;
    const emptyAnnotations = [];

    const title = selectedPatternChartData && selectedPatternChartData.sname ? selectedPatternChartData.sname[1] : '';

    return (
      <div className="flex-row-container">
        <div
className="flex-col-container" style={{
          border: '1px solid rgba(34, 36, 38, 0.15)', marginBottom: 10,
        }}
        >
          <h4
style={{
            background: '#F9FAFB',
            width: '100%',
height: 40,
padding: 10,
margin: 0,
          }}
          >Pattern List</h4>
          <div className="flex-item" style={{ overflowY: 'auto' }}>
            <table className="ui selectable celled table" style={{ border: 0 }}>
              <tbody>
                {patterns && patterns.sort((a, b) => {

                  const aDerivedAnomaly = derivedAnomalyByMetric[a.replace('Pattern', 'neuron')];
                  const bDerivedAnomaly = derivedAnomalyByMetric[b.replace('Pattern', 'neuron')];
                  const aDerivedAnomalyCount = aDerivedAnomaly ? aDerivedAnomaly.length : 0;
                  const bDerivedAnomalyCount = bDerivedAnomaly ? bDerivedAnomaly.length : 0;
                  if (aDerivedAnomalyCount < bDerivedAnomalyCount) {
                    return 1;
                  } else if (aDerivedAnomalyCount > bDerivedAnomalyCount) {
                    return -1;
                  } else {
                    const aNid = parseInt(a.replace('Pattern ', ''));
                    const bNid = parseInt(b.replace('Pattern ', ''));
                    if (aNid > bNid) {
                      return 1;
                    } else if (aNid < bNid) {
                      return -1;
                    } else{
                      return 0;
                    }
                  }
                }).map((pattern, i) => {
                  const derivedAnomaly = derivedAnomalyByMetric[pattern.replace('Pattern', 'neuron')];
                  let anomalyCount = '';
                  if (derivedAnomaly && derivedAnomaly.length > 0) {
                    anomalyCount = ' (Anomaly count: ' + derivedAnomaly.length + ')';
                  }
                  const patternNo = parseInt(pattern.replace('Pattern ', ''));
                  const group = _.find(eventTableData, group => group.nid == patternNo);
                  let topKEpisodes = '';
                  let topKWords = '';
                  if (group) {
                    topKEpisodes = group.topKEpisodes.length > 0
                      ? 'Top frequent episodes: ' + group.topKEpisodes.replace(/\(\d+\)/g, '') : '';
                    topKWords = group.topKWords.length > 0
                      ? 'Top keywords: ' + group.topKWords.replace(/\(\d+\)/g, '') : '';
                  }
                  return (<tr
                    key={i}
                    onClick={() => this.handlePatternSelected(pattern)}
                    className={cx({ active: pattern === this.state.selectedPattern })}
                    style={{ cursor: 'pointer' }}
                  >
                    <td><b>{pattern}</b>{anomalyCount}<br />{topKWords}<br />{topKEpisodes}</td>
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-item flex-col-container" style={{ margin: '0 0 10px 10px' }}>
          <div>
            {selectedPattern && selectedPatternChartData &&
              <div style={{ width: '100%', backgroundColor: '#fff', padding: 0 }}>
                <h4 className="ui header">{title}</h4>
                <DataChart
                  chartType="bar"
                  data={selectedPatternChartData}
                  barColors={selectedBarColors}
                  annotations={emptyAnnotations}
                  onClick={this.handlePatternPointClick}
                />
              </div>
            }
            {(selectedDetailedText && selectedDetailedText.length) ?
              <div style={{ position: 'fixed', color: 'red', fontSize: '1.1rem', left: selectedDetailedTextLeftPosition }}>
                {selectedDetailedText}
              </div>
              :
              <div style={{ position: 'fixed', color: 'red', fontSize: '1.1rem', left: selectedDetailedTextLeftPosition }}>
                &nbsp;
              </div>
            }
            {eventsInRangeFreqVector && eventsInRangeFreqVector.length > 0 &&
              <h4 style={{ marginBottom: '1em' }}>Event List</h4>
            }
          </div>
          {eventsInRangeFreqVector && eventsInRangeFreqVector.length > 0 &&
            <div className="flex-item" style={{ overflowY: 'auto' }}>
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
          }
        </div>
      </div>
    );
  }

  renderEventTable() {
    const logEventArr = this.logEventArr;
    const neuronValue = this.neuronValue;
    const eventTableData = this.eventTableData;

    if (logEventArr) {
      return (
        <EventCluster
          eventDataset={eventTableData}
          eventCount={logEventArr.length} clusterCount={neuronValue.length}
        />
      );
    }
    return null;
  }

  renderPatternSequence() {
    if (!this.dp) return null;
    const logNidFE = this.dp.logNidFE;
    const eventDataset = this.eventTableData;

    const sorter = R.sortWith([
      R.descend(R.prop('count')),
      R.ascend(R.prop('pattern')),
    ]);
    const patterns = R.take(200, sorter(logNidFE));

    return (
      <PatternSequence dataset={patterns} eventDataset={eventDataset} />
    );
  }

  selectTab(e, tab) {
    let tabStates = this.state.tabStates;
    tabStates = _.mapValues(tabStates, (val) => {
      return '';
    });
    tabStates[tab] = 'active';
    this.setState({ tabStates });
  }

  render() {
    const { loading, onRefresh } = this.props;
    const { tabStates } = this.state;

    return (
      <Console.Wrapper>
        <Console.Content
          style={{ paddingLeft: 0 }} className={loading ? 'ui form loading' : ''}
        >
          <div className="ui main tiny container" style={{ height: '100%' }}>
            <div className="flex-col-container" style={{ height: '100%' }}>
              <Button
                className="small labeled icon"
                style={{ position: 'absolute', right: 0, top: '1em' }}
                onClick={() => onRefresh()}
              ><i className="icon refresh" />Refresh</Button>
              <div className="ui pointing secondary menu">
                <a
                  className={`${tabStates['event']} item`}
                  onClick={e => this.selectTab(e, 'event')}
                >Clustering Result</a>
                <a className={`${tabStates['anomaly']  } item`}
                  onClick={e => this.selectTab(e, 'anomaly')}
                >Rare Events</a>
                <a className={`${tabStates['freq']  } item`}
                  onClick={e => this.selectTab(e, 'freq')}
                >Frequency Based Anomaly Detection</a>
                <a className={`${tabStates['clusterfe']  } item`}
                  onClick={e => this.selectTab(e, 'clusterfe')}
                >Frequent Pattern Sequences</a>
              </div>
              {tabStates.event === 'active' && this.renderEventTable()}
              {tabStates.anomaly === 'active' && this.renderAnomalyTable()}
              {tabStates.freq === 'active' && this.renderFreqCharts()}
              {tabStates.clusterfe === 'active' && this.renderPatternSequence()}
            </div>
          </div>
        </Console.Content>
      </Console.Wrapper>
    );
  }
}

export default LogAnalysisCharts;
