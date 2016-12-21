import React from 'react';
import moment from 'moment';
import shallowCompare from 'react-addons-shallow-compare';
import { autobind } from 'core-decorators';
import { Console, Button, Link } from '../../../artui/react';
import DataParser from '../dataparser';
import './logevent.less';

class EventTableGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedWords: '',
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

class LogAnalysisClusteringResult extends React.Component {

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
    onRefresh: () => { }
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
      // this.dp.getSummaryData();
      this.dp.getMetricsData();
      this.dp.parseLogAnalysisData();
      // this.dp.getFreqVectorData();
      this.calculateEventTableData();

      // Sort the grouped data
      // this.summary = this.dp.summaryData;
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

    // filter out anomaly and small cluster and run again
    let newLogEventArr = logEventArr.filter(function (el, index, arr) {
      return (neuronValue[neuronIdList.indexOf(el.nid)] > 3)
    });
    logEventArr = newLogEventArr;
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
    // let realAnomalies = _.filter(anomalies, a => a.val > 0);
    let groupData;

    logEventArr.map((event, iEvent) => {
      let showNumber = neuronList.indexOf(iEvent);
      let timestamp = moment(event.timestamp).format("YYYY-MM-DD HH:mm");

      // Find a new group.
      if (showNumber != -1) {
        groupData = {};
        let iGroup = neuronIdList.indexOf(event.nid) + 1;
        groupData.iGroup = iGroup;
        groupData.rowSpan = neuronValue[showNumber];
        groupData.nEvents = neuronValue[iGroup - 1];

        // let anomaly = _.find(realAnomalies, a => a.timestamp == event.timestamp);
        // let nAnomaly = realAnomalies.indexOf(anomaly) + 1;
        groupData.topKEpisodes = _.find(clusterTopEpisodeArr, p => p.nid == event.nid);
        groupData.topKEpisodes = groupData.topKEpisodes?groupData.topKEpisodes.topK: [];
        groupData.topKWords = _.find(clusterTopWordArr, p => p.nid == event.nid);
        groupData.topKWords = groupData.topKWords?groupData.topKWords.topK: [];
        groupData.data = [[timestamp, event.rawData]];
        eventTableData.push(groupData);
      } else {
        groupData.data.push([timestamp, event.rawData]);
      }
    });


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

  renderList() {
    const self = this;
    const { query } = this.props;

    return (
      <div className="ui grid">
        <div className="sixteen wide column">
          <div className="ui pointing secondary menu">
            <Link
              className="item"
              to={{
                pathname: '/incidentLogAnalysis/clustering',
                query,
              }}
            >Clustering Result</Link>
            <Link
              className="item"
              to={{
                pathname: '/incidentLogAnalysis/events',
                query,
              }}
            >Rare Events</Link>
            <Link
              className="item"
              to={{
                pathname: '/incidentLogAnalysis/frequency',
                query,
              }}
            >Frequency</Link>
          </div>
          <div className="active ui tab">
            {self.renderEventTable()}
          </div>
        </div>
      </div>
    );
  }

  render() {

    const { loading, onRefresh } = this.props;

    const contentStyle = { paddingLeft: 0 };
    const contentClass = loading ? 'ui form loading' : '';

    this.calculateData();

    return (
      <Console.Wrapper>
        <Console.Content style={contentStyle} className={contentClass}>
          <div className="ui main tiny container" style={{ minHeight: '100%' }}>
            {!loading &&
              <div className="ui vertical segment">
                <Button className="labeled icon" onClick={() => onRefresh()}>
                  <i className="icon refresh" />Refresh
              </Button>
              </div>
            }
            <div className="ui vertical segment">
              {!loading && this.renderList()}
            </div>
          </div>
        </Console.Content>
      </Console.Wrapper>
    );
  }
}

export default LogAnalysisClusteringResult;
