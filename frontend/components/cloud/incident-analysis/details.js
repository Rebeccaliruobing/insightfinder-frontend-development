import React from 'react';
import store from 'store';
import ReactTimeout from 'react-timeout'
import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import apis from '../../../apis';
import LiveAnalysisCharts from '../liveanalysis/index'
import {ChartsRefreshInterval} from '../../storeKeys';


const ProjectDetails = class extends React.Component {

  static propTypes = {
    updateData: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      view: 'four',
      viewText: 4,
      loading: false,
      selectedGroup: ''
    }
  }

  componentDidMount() {
    (this.props.updateData || this.updateData.bind(this))(this);
  }

  updateData() {

    let {query} = this.props.location;
    let {projectName, pvalue, cvalue, modelType, modelKey, startTime, endTime, modelStart, modelEnd, groupId} = query;
    let refreshInterval = parseInt(store.get(ChartsRefreshInterval, 5));
    this.setState({loading: true}, ()=> {
      apis.postPostMortem(projectName, pvalue, cvalue, modelType, modelKey, startTime, endTime, modelStart, modelEnd)
        .then(resp => {
          let update = {};
          if (resp.success) {
            update.data = resp.data;
          } else {
            console.error(resp.message);
          }
          update.loading = false;
          this.setState(update);
          if (refreshInterval > 0) {
            this.timeout = this.props.setTimeout(this.updateData.bind(this), refreshInterval * 1000 * 60);
          }
        })
        .catch(msg=> {
          console.error(msg);
        });
    });

  }

  render() {
    let {query} = this.props.location;
    const {projectName} = query;
    let {data, groupId, loading} = this.state;
    return (
      //<LiveAnalysisCharts {...query} data={data} loading={loading} onRefresh={() => this.updateData()}/>
      <LiveAnalysisCharts groupId={groupId} projectName={projectName} data={data} loading={loading}/>
    );
  }
};

export default ReactTimeout(ProjectDetails);
