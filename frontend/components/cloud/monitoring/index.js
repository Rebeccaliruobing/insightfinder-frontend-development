import React from 'react';
import ReactDOM from 'react-dom';
import {Link, IndexLink} from 'react-router';
import {
  BaseComponent, Console, ButtonGroup, Button,
  Dropdown, Accordion, Message
} from '../../../artui/react';
import {ProjectSelection, ModelType, AnomalyThreshold, DurationThreshold} from '../../selections';
import ProjectsSummary from './summary';
import ProjectMetric from './metric';
import {Dygraph} from '../../../artui/react/dataviz';

import apis from '../../../apis';

import FilterBar from './filter-bar';

class LiveMonitoring extends BaseComponent {

  static contextType = {
    router: React.PropTypes.object,
    userInstructions: React.PropTypes.object

  };

  constructor(props) {
    super(props);

    this._el = null;
    this.state = {
      view: 'summary',
      showAddPanel: false,
      addedName: '',

      addedProjects: ['app2AWS', 'appWestAWS']
    };

    this.handleAddMonitoring.bind(this);
  }

  componentDidMount() {
  }

  handleAddMonitoring() {
    let {addedProjects, addedName} = this.state;
    addedProjects.push(addedName);
    this.setState({
      'addedProjects': addedProjects
    });
  }

  handleProjectSelected(project) {
    window.open('/liveMonitoring?project=' + project);
  }


  handleToggleFilterPanel() {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleHighlight(v) {
    if (v > 0.7) return "rgba(255, 255, 102, 1.0)";
    if (v > 0.5) return "rgba(200, 200, 150, 1.0)";

    return "rgba(102, 255, 102, 1.0)";
  }

  handleFilterChange(data) {
    this.setState({'filterLoading': true}, ()=> {
      apis.postLiveAnalysis(data.projectName, data.modelType, data.anomalyThreshold, data.durationHours).then((resp) => {

        resp.data.dataMap = {};
        resp.data.table = resp.data.data.split("\\n").map((line)=>line.split(","));
        resp.data.table[0].forEach((head, index)=> {
          let info = /(\w+)\[(i-\w+)\]:(\d)/g.exec(head);
          if (info) {
            let [h, metric, instance, groupId]  = info;
            var key = `${groupId},${resp.data.metricUnitMapping.find((m)=>m.metric == metric).unit}`;
            if (!resp.data.dataMap[key]) resp.data.dataMap[key] = [];

            resp.data.dataMap[key].push({
              head, metric, instance, groupId, index
            })
          }
        });
        resp.data.dataGroups = _.sortBy(_.toPairs(resp.data.dataMap), ([k])=>k).map(([key, metrics])=> {
          let data = resp.data.table.slice(1).map((line, i)=> {
            return [
              moment(parseInt(line[0])).toDate(),
              ...line.filter((d, i)=>metrics.find(({index})=>index == i)).map(parseFloat)]
          });
          return {
            key, metrics,
            element: <Dygraph key={key}
                              ylabel={key.split(",")[1]}
                              xlabel={`Metric Group ${key.split(",")[0]}`}
                              data={data}
                              labels={['timestamp', ...metrics.map((m)=>m.metric)]}
                              style={{width: '100%'}}
                              highlightCallback={this.handleHighlight.bind(this)}
                              highlightCircleSize={2}
                              highlightSeriesOpts={{
                            strokeWidth: 1,
                            strokeBorderWidth: 1,
                            highlightCircleSize: 3
                          }}/>
          }
        });

        this.$filterPanel.slideUp();
        resp.filterLoading = false;
        this.setState(resp);
      });
    });
  }

  render() {

    const {view, addedProjects, data, success} = this.state;
    const userInstructions = this.context.userInstructions;

    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
            <div className="ui breadcrumb">
              <IndexLink to="/" className="section">Home</IndexLink>
              <i className="right angle icon divider"/>
              <Link to="/cloud/monitoring" className="section">Cloud Monitoring</Link>
              <i className="right angle icon divider"/>
              <div className="active section">Live Monitoring</div>
            </div>
            <ButtonGroup className="right floated basic icon">
              <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                <i className="ellipsis horizontal icon"/>
              </Button>
              <Button><i className="setting icon"/></Button>
            </ButtonGroup>
            <ButtonGroup className="right floated basic icon">
              <Button active={view == 'summary'} onClick={()=>this.setState({view:'summary'})}>
                <i className="line chart icon"/>
              </Button>
              <Button active={view == 'metric'} onClick={()=>this.setState({view:'metric'})}>
                <i className="table icon"/>
              </Button>
            </ButtonGroup>
          </div>

          <div className="ui vertical segment filterPanel" style={{display: 'none'}}
               ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>

            <i className="close link icon" style={{float:'right', marginTop: '-10px'}}
               onClick={this.handleToggleFilterPanel.bind(this)}/>

            <FilterBar loading={this.state.filterLoading} {...this.props}
                       onSubmit={this.handleFilterChange.bind(this)}/>
            {userInstructions && userInstructions.cloudmonitor &&
            <Message dangerouslySetInnerHTML={{__html: userInstructions && userInstructions.cloudmonitor}}/>}

          </div>

          { (view == 'summary') &&
          <ProjectsSummary projects={addedProjects}
                           onProjectSelected={(project) => this.handleProjectSelected(project)}/>
          }
          { (view == 'metric') &&
          <ProjectMetric projects={addedProjects}
                         onProjectSelected={(project) => this.handleProjectSelected(project)}/>
          }
          {
            success && data.dataGroups.map(({key, metrics, element})=> {
              return (
                <div key={key} className="ui card" style={{width: "100%"}}>
                  <div className="content">
                    {element}
                  </div>
                </div>
              )
            })
          }

        </div>
      </Console.Content>
    )
  }
}

export default LiveMonitoring;