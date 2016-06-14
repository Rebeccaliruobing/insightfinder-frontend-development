import React from 'react';
import ReactTimeout from 'react-timeout'
import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../artui/react';
import {Dygraph} from '../../artui/react/dataviz';
import apis from '../../apis';
import LiveAnalysisCharts from '../cloud/liveanalysis'

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
    let {pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData} = query;

    this.setState({loading: true}, ()=> {
      apis.postUseCase(pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData).then((resp)=> {
        resp.loading = false;
        this.setState(resp);
      }).catch((err)=> {
        this.setState({loading: false});
      });
    });

  }

  render() {
    let {query} = this.props.location;
    const {projectName, anomalyThreshold, durationThreshold, modelType} = query;
    let {data, loading} = this.state;

    return (
      <LiveAnalysisCharts projectName={projectName} data={data} loading={loading}/>
    );
  }
};

export default ReactTimeout(ProjectDetails);