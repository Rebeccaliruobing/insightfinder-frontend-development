import React from 'react';
import ReactTimeout from 'react-timeout'
import cx from 'classnames';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import apis from '../../../apis';
import DataParser from '../dataparser';

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
    (this.props.updateData || this.updateLiveAnalysis)(this);
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
    const {projectName} = query;
    let {view, loading, selectedGroup, data} = this.state;

    let isListView = view === 'list';
    let contentStyle = isListView ? {} : {paddingLeft:0};

    return (
      <Console.Wrapper>
        {isListView && this.renderNavs()}
        <Console.Content style={contentStyle}>
          <div className="ui main tiny container" style={{minHeight:'100%'}}>
            <div className="ui clearing vertical segment">
              {projectName}
              <ButtonGroup className="right floated basic icon">
                <Dropdown className="compact"
                          value={this.state['view']} text={this.state['viewText']}
                          mode="select"
                          onChange={(value, text) => {this.setState({view: value, viewText: text})}}>
                  <div className="menu">
                    <div className="item" data-value="two">2</div>
                    <div className="item" data-value="three">3</div>
                    <div className="item" data-value="four">4</div>
                    <div className="item" data-value="five">5</div>
                    <div className="item" data-value="six">6</div>
                  </div>
                </Dropdown>
                <Button active={view == 'list'} onClick={()=>this.setState({view:'list', selectedGroup: ''})}>
                  <i className="list layout icon"/>
                </Button>
              </ButtonGroup>
            </div>
            <div className="ui vertical segment">
              {!isListView && !!data &&
              <div className={cx('ui', view, 'cards')}>
                {this.renderGroups(view)}
              </div>
              }
              {isListView && this.renderList()}
            </div>
            {!!selectedGroup &&
            <div className="ui vertical segment">
              <h4 className="ui header">{selectedGroup}</h4>
              {this.renderSelectedGroup()}
            </div>
            }
          </div>
        </Console.Content>
      </Console.Wrapper>
    )
  }
};

export default ReactTimeout(ProjectDetails);