import React from 'react';
import moment from 'moment';
import { autobind } from 'core-decorators';
import { Console } from '../../artui/react';
import apis from '../../apis';
import LiveAnalysisCharts from '../cloud/liveanalysis/LiveAnalysisCharts';

const ProjectDetails = class extends React.Component {
  static propTypes = {
    updateData: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      view: 'four',
      viewText: 4,
      loading: false,
      selectedGroup: '',
    };
  }

  componentDidMount() {
    (this.props.updateData || this.updateData)(this);
  }

  @autobind updateData() {
    const { query } = this.props.location;
    const {
      pvalue,
      cvalue,
      modelKey,
      modelName,
      projectName,
      groupId,
      modelType,
      fromUser,
      dataChunkName,
      metaData,
      modelStartTime,
      modelEndTime,
      latestDataTimestamp,
      caller,
    } = query;
    let startTimestamp;
    let endTimestamp;
    if (dataChunkName && dataChunkName.split('_').length > 4) {
      const parts = dataChunkName.split('_');
      startTimestamp = +moment(Number(parts[3]) || parts[3]);
      endTimestamp = +moment(Number(parts[4]) || parts[4]);
    }

    this.setState({ loading: true }, () => {
      apis
        .postUseCase(
          pvalue,
          cvalue,
          modelKey,
          modelName,
          projectName,
          groupId,
          modelType,
          fromUser,
          dataChunkName,
          metaData,
          modelStartTime,
          modelEndTime,
          latestDataTimestamp,
          caller,
        )
        .then((resp) => {
          resp.loading = false;
          this.setState(resp, () => {
            // fetch syscall results
            if (projectName && startTimestamp && endTimestamp) {
              const projectName0 = `${projectName}@${fromUser}`;
              apis.postSysCallResult(projectName0, startTimestamp, endTimestamp).then((resp2) => {
                if (resp2.success) {
                  this.setState({
                    debugData: resp2.data.syscallResults,
                    freqRanking: resp2.data.freqFunctionList,
                    timeRanking: resp2.data.timeFunctionList,
                    showSysCall: true,
                  });
                } else {
                  console.log(`${resp2.message}, start:${startTimestamp},end:${endTimestamp}`);
                }
              });
            }
          });
        })
        .catch((err) => {
          this.setState({ loading: false });
        });
    });
  }

  render() {
    const { data, loading, debugData, timeRanking, freqRanking } = this.state;
    const { query } = this.props.location;
    let {
      projectName,
      modelName,
      pvalue,
      cvalue,
      modelType,
      bugId,
      latestDataTimestamp,
      caller,
    } = query;
    if (projectName === '') {
      projectName = modelName;
    }

    return (
      <Console>
        <Console.Topbar logo={require('../../images/logo_white.png')}>
          <div className="topbar-text">
            {bugId &&
              <div className="title">
                Please view incident name / bug ID: <b>{bugId}</b><br />
              </div>}
            {!bugId &&
              <div className="title">
                Please view snapshot of email alert.<br />
              </div>}
          </div>
        </Console.Topbar>
        <LiveAnalysisCharts
          projectName={projectName}
          data={data}
          debugData={debugData}
          latestDataTimestamp={latestDataTimestamp}
          isEmailAert={caller.toLowerCase() === 'emailalert'}
          timeRanking={timeRanking}
          freqRanking={freqRanking}
          bugId={bugId}
          loading={loading}
        />
      </Console>
    );
  }
};

export default ProjectDetails;
