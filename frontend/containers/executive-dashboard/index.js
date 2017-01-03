import React from 'react';
import { autobind } from 'core-decorators';
import moment from 'moment';
import { Console } from '../../artui/react';
import { ThreeValueBox, HourlyHeatmap, Top5Grid, AutoFixHistory }
  from '../../components/statistics';
import retrieveExecDBStatisticsData from '../../apis/retrieve-execdb-stats';
import './executive-dashboard.less';

class ExecutiveDashboard extends React.Component {
  static contextTypes = {
    dashboardUservalues: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: {
        statistics: {},
        summary: {},
      },
    };
  }

  componentDidMount() {
    const projectName = 'All Instances';
    const endTimestamp = moment().endOf('day').format('YYYY-MM-DD HH:mm');
    const modelType = 'Holistic';
    retrieveExecDBStatisticsData(projectName, endTimestamp, modelType, '7')
      .then((data) => {
        console.log(data);
      }).catch((msg) => {
        console.log(msg);
      });
  }

  render() {
    const { data, numberOfDays } = this.state;

    return (
      <Console.Content className="executive-dashboard">
        <div className="ui main tiny container">
          <div className="ui vertical segment">
            <h3>Detected/Predicted Anomaly Overview</h3>
            <div className="ui compact equal width grid">
              <div className="ui statistic column">
                <ThreeValueBox
                  title="Anomaly Score"
                  previousValue={10}
                  currentValue={13}
                  predictedValue={10}
                />
              </div>
              <div className="ui statistic column">
                <ThreeValueBox
                  title="Total Anomaly Events"
                  duration={numberOfDays}
                  previousValue={data.prevTotalAnomalyEventCount}
                  currentValue={data.totalAnomalyEventCount}
                  predictedValue={data.predAnomalyEventCount}
                />
              </div>
              <div className="ui statistic column">
                <ThreeValueBox
                  title="Total Anomalies"
                  duration={numberOfDays}
                  previousValue={data.prevTotalAnomalyCount}
                  currentValue={data.totalAnomalyCount}
                  predictedValue={data.predTotalAnomalyCount}
                />
              </div>
            </div>
          </div>
          <div className="ui vertical segment">
            <h3>Top 5 Projects / Groups</h3>
            <Top5Grid />
          </div>
          <div className="ui vertical segment">
            <h3>Hourly Heatmap of Anomalies Detected & Predicted</h3>
            <HourlyHeatmap />
          </div>
          <div className="ui vertical segment">
            <h3>AutoFix Action History</h3>
            <AutoFixHistory />
          </div>
        </div>
      </Console.Content>
    );
  }
}

export default ExecutiveDashboard;
