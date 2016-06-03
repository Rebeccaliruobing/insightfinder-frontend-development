import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTimeout from 'react-timeout';
import cx from 'classnames';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown} from '../../artui/react';
import {Dygraph} from '../../artui/react/dataviz';
import apis from '../../apis';
import DataParser from './dataparser';


class LiveAnalysisCharts extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    groupid: React.PropTypes.number,
    view: React.PropTypes.oneOf(['list'])
  };

  static defaultProps = {
    view: 'list'
  };

  constructor(props) {
    super(props);
    this.state = {
        columns: 'four'
    };
  }

  componentDidMount() {

  }

  handleSelectGroup(group) {
    return (e) => {
      this.setState({groupId: group.id})
    }
  }

  render() {
    let {data, view} = this.props;
    let dp = new DataParser(data);
    let groups = dp.getGroupData();
    let groupId = this.state.groupId || this.props.groudId;
    let group = groups.find((g)=>g.id == groupId);

    return (
      <div className="ui vertical segment">

        <div className="ui grid">
            <div className="eight wide column">
                <button className="ui basic button" onClick={this.props.onBack || (()=>this.setState({groupId: void 0}))}>Back</button>
            </div>
            <div className="eight wide column">
                <button className="ui basic button" style={{float: 'right'}} onClick={()=>this.setState({columns: this.state.columns == 'four' ? 'two' : 'four'})}>Change Layout</button>
            </div>
        </div>

        {group ? (
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
        ) : (
          <div className={`ui ${this.state.columns} cards`}>
            {
              groups.map((group) => {
                return ((
                  <div key={Date.now() + view + group.id} className="ui card" onClick={this.handleSelectGroup(group)}>
                    <div className="content">
                      <Dygraph data={group.sdata}
                               title={"Metric Group" + group.id}
                               labels={group.sname}
                               style={{height: 150, width: '100%'}}
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
        )}

      </div>
    )
  }

  handleHighlight(data) {
      let max = Math.max.apply(Math,data.map(([d, ...arr])=>Math.max.apply(Math, arr)));
      return (v) =>{
          return Math.max.apply(Math, v) > (max / 2) ? "rgba(255, 255, 102, 1.0)" : "rgba(102, 255, 102, 1.0)"
      }

  }

}

export default LiveAnalysisCharts;
