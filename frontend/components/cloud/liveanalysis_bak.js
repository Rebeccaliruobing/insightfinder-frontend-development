import React from 'react';
import cx from 'classnames';
import store from 'store';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown, Tab} from '../../artui/react';
import {Dygraph} from '../../artui/react/dataviz';
import DataParser from './dataparser';



class LiveAnalysisCharts extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool,
    view: React.PropTypes.oneOf(['list', 'thumbnail']),
  };

  static defaultProps = {
    view: 'list',
    loading: true
  };

  constructor(props) {
    super(props);
    this.state = {
      columns: 'four',
      selectedGroupId: undefined
    };
  }

  componentDidMount() {
  }

  handleSelectGroup(group) {
    return (e) => {
      this.setState({selectedGroupId: group.id})
    }
  }

  render() {
    
    let {data, view} = this.props;
    let {columns, loading, selectedGroupId} = this.state;

    let isListView = view === 'list';
    let contentStyle = isListView ? {} : {paddingLeft:0};
    
    let dp = new DataParser(data);
    let groups = dp.getGroupsData();
    let selectedGroup = _.find(groups, g => g.id == selectedGroupId);
    
    return (
    <Console.Wrapper>
      <Console.Content style={contentStyle}>
        <div className="ui main tiny container" style={{minHeight:'100%'}}>
        </div>
      </Console.Content>
    </Console.Wrapper>
      <div className="ui vertical segment">
        <Tab>
          <div className="ui top attached tabular menu">
            <a className="item active" data-tab="first">Charts</a>
            <a className="item" data-tab="second">Table</a>
          </div>
          <div className="ui bottom attached tab segment active" data-tab="first">

            <div className="ui grid">
              <div className="eight wide column">
                <button className="ui basic button"
                        onClick={this.props.onBack || (()=>this.setState({groupId: void 0}))}>
                  Back
                </button>
              </div>
              <div className="eight wide column">
                <button className="ui basic button" style={{float: 'right'}}
                        onClick={()=>this.setState({columns: this.state.columns == 'four' ? 'two' : 'four'})}>
                  Change Layout
                </button>
              </div>
            </div>

            <div className={`ui ${this.state.columns} cards`}>
              {
                groups.map((group) => {
                  return ((
                    <div key={`${columns}-${group.id}`} className="ui card"
                         onClick={this.handleSelectGroup(group)}>
                      <div className="content">
                        <Dygraph data={group.sdata}
                                 title={"Metric Group" + group.id}
                                 labels={group.sname}
                                 style={{height: 150, width: '100%'}}
                                 highlights={group.highlights}
                                 highlightCircleSize={2}
                                 animatedZooms={true}
                                 highlightCallback={this.handleHighlight(group.sdata)}
                                 highlightSeriesOpts={{
                      strokeWidth: 3,
                      strokeBorderWidth: 1,
                      highlightCircleSize: 5
                    }}
                        />
                      </div>
                    </div>
                  ));
                })
              }
            </div>

            {group &&
            <div className={`ui one cards`}>
              <div key={view + group.id} className="ui card" onClick={this.handleSelectGroup(group)}>
                <div className="content">
                  <Dygraph data={group.sdata}
                           title={"Metric Group" + group.id}
                           labels={group.sname}
                           style={{height: 250, width: '100%'}}
                           highlightCircleSize={2}
                           highlightCallback={this.handleHighlight}
                           highlightSeriesOpts={{
                      strokeWidth: 3,
                      strokeBorderWidth: 1,
                      highlightCircleSize: 5
                    }}
                  />
                </div>
              </div>
            </div>
            }

          </div>
          <div className="ui bottom attached tab segment" data-tab="second">
            Table
          </div>
        </Tab>

      </div>
    )
  }

  handleHighlight(data) {
    let max = Math.max.apply(Math, data.map(([d, ...arr])=>Math.max.apply(Math, arr)));
    return (v) => {
      return Math.max.apply(Math, v) > (max / 2) ? "rgba(255, 255, 102, 1.0)" : "rgba(102, 255, 102, 1.0)"
    }
  }
}

export default LiveAnalysisCharts;
