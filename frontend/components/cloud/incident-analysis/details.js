import React from 'react';
import ReactTimeout from 'react-timeout'
import cx from 'classnames';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import apis from '../../../apis';
import DataParser from '../dataparser';
import LiveAnalysisCharts from '../liveanalysis/index'

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
    let {projectName, pvalue, cvalue, modelType, modelKey, startTime, endTime, groupId} = query;
    this.setState({loading: true}, ()=> {
      apis.postPostMortem(projectName, pvalue, cvalue, modelType, modelKey, startTime, endTime)
        .then(resp => {
          let update = {};
          if (resp.success) {
            update.groupId = groupId;
            update.data = resp.data;
          } else {
            alert(resp.message);
          }
          update.loading = false;
          this.setState(update);
          this.props.setTimeout(this.updateData.bind(this), 5000 * 60);
        })
        .catch(msg=> {
          debugger;
          alert(msg);
        });
    });

  }

  render() {
    let {query} = this.props.location;
    const {projectName} = query;
    let {data, groupId, loading} = this.state;

    return (
      <LiveAnalysisCharts groupId={groupId}projectName={projectName} data={data} loading={loading} />
    );
  }
};

export default ReactTimeout(ProjectDetails);
