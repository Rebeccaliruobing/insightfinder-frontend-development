import React from 'react';
import ReactTimeout from 'react-timeout'
import cx from 'classnames';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import apis from '../../../apis';
import DataParser from '../dataparser';
import LiveAnalysisCharts from '../liveanalysis'

const ProjectDetails = class extends React.Component {

  static propTypes = {
    updateData: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      data: undefined,
      loading: false
    }
  }

  componentDidMount() {
    (this.props.updateData || this.updateLiveAnalysis.bind(this))(this);
  }

  updateLiveAnalysis() {
    let {query} = this.props.location;
    let {projectName, modelType, anomalyThreshold, durationThreshold} = query;

    this.setState({loading: true});
    apis.postLiveAnalysis(projectName, modelType, anomalyThreshold, durationThreshold)
      .then(resp => {
        let update = {};
        if (resp.success) {
          update.data = resp.data;
        } else {
          alert(resp.message);
        }
        update.loading = false;
        this.setState(update);
        this.props.setTimeout(this.updateLiveAnalysis.bind(this), 5000 * 60);
      })
      .catch(msg=> {
        alert(msg);
      });
  }

  renderNavs() {}

  renderGroups(view) {

    let {data} = this.state;
    let dp = new DataParser(data);
    let groups = dp.getGroupData();

    let elems = [];

    groups.map((group) => {
      elems.push((
        <div key={view + group.id} className="ui card">
          <div className="content">
            <Dygraph data={group.sdata}
                     title={"Metric Group" + group.id}
                     labels={group.sname}
                     style={{height: 150}}
                     highlightCircleSize={2}
                     highlightSeriesOpts={{
                          strokeWidth: 3,
                          strokeBorderWidth: 1,
                          highlightCircleSize: 5
                        }}
                     />
          </div>
        </div>
      ));
    });
    return elems;
  }

  renderList() {}

  renderSelectedGroup() {}

  render() {
    let {query} = this.props.location;
    let {data, loading} = this.state;

    return (
      <LiveAnalysisCharts data={data} loading={loading} />
    )
  }
};

export default ReactTimeout(ProjectDetails);
