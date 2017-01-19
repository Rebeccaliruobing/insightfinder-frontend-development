import React from 'react';
import { Console } from '../../../artui/react';
import apis from '../../../apis';
import LogAnalysisCharts from '../loganalysis';

const ProjectLogDetails = class extends React.Component {

  static propTypes = {
    updateData: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      selectedGroup: '',
    };
  }

  componentDidMount() {
    (this.props.updateData || this.updateData.bind(this))(this);
  }

  updateData() {
    const { query } = this.props.location;
    const { projectName, derivedPvalue,
      pvalue, cvalue,
      modelType,
      startTime, endTime,
      modelStartTime, modelEndTime,
      isExistentIncident,
    } = query;
    this.setState({ loading: true }, () => {
      apis.postLogAnalysis(
        projectName, derivedPvalue,
        pvalue, cvalue,
        modelType,
        startTime, endTime,
        modelStartTime, modelEndTime, isExistentIncident, '')
        .then((resp) => {
          const update = {};
          if (resp.success) {
            update.data = resp.data;
          } else {
            alert(resp.message);
          }
          update.loading = false;
          this.setState(update);
        })
        .catch((msg) => {
          console.error(msg);
        });
    });
  }

  render() {
    let { query } = this.props.location;
    let { projectName, modelName, derivedPvalue, rareEventThreshold, pvalue, cvalue, modelType } = query;
    let { data, groupId, loading } = this.state;
    if (projectName === '') {
      projectName = modelName;
    }

    return (
      <Console>
        <Console.Topbar logo={require('../../../images/logo_white.png')}>
          <div className="topbar-text">
            <div className="title">
              Please view anomaly detection result for <b>{projectName}</b><br />
              with model type <b>{modelType}</b>, rare event detection sensitivity <b>{rareEventThreshold}</b>,
              frequency anomaly detection sensitivity <b>{derivedPvalue}</b>.
          </div>
            <div className="legend">
              <div>Anomaly color map:</div>
              <div className="colormap2">
                <div style={{ float: 'left' }}>Normal</div>
                <div style={{ float: 'right' }}>Abnormal</div>
              </div>
            </div>
          </div>
        </Console.Topbar>
        <LogAnalysisCharts
          query={query} enablePublish data={data} loading={loading}
          onRefresh={() => this.updateData()}
        />
      </Console>
    );
  }
};

export default ProjectLogDetails;
