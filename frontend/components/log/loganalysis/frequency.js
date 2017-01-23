import React from 'react';
import moment from 'moment';
import shallowCompare from 'react-addons-shallow-compare';
import { autobind } from 'core-decorators';
import { Console, Button, Link } from '../../../artui/react';
import DataParser from '../dataparser';
import { DataChart } from '../../share/charts';
import './logevent.less';

class LogAnalysisFrequency extends React.Component {

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
        
  renderFreqCharts(){
    if (!this.dp) return;
    let { totalFreqData, timestamps, nonZeroFreqVectors } = this.dp.freqVectorData;
    let emptyAnnotations = [];
    let totalFreqChartData = {
      sdata: totalFreqData,
      sname: ['Time Window Start','Total Frequency'],
    };

    let nonZeroFreqChartDatas = [];
    for (var colName in nonZeroFreqVectors) {
      let nonZeroFreqChartData = {
        sdata: nonZeroFreqVectors[colName],
        sname: ['Time Window Start', colName],
      };
      nonZeroFreqChartDatas.push(nonZeroFreqChartData);
    }
    
    return (
      <div>
        {nonZeroFreqChartDatas && 
          nonZeroFreqChartDatas.map((nonZeroFreqChartData, idx) => {
            let title = nonZeroFreqChartData.sname[1];
            return (
              <div style={{ width: '100%', backgroundColor: '#fff', padding: 10 }}>
                <h4 className="ui header">{title}</h4>
                <DataChart
                  chartType='bar'
                  data={nonZeroFreqChartData}
                  annotations={emptyAnnotations}
                />
              </div>
            )
          })
        }
      </div>
    )
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
            {self.renderFreqCharts()}
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

export default LogAnalysisFrequency;
