import React from 'react';
import cx from 'classnames';
import store from 'store';

import {Console, ButtonGroup, Button, Link, Accordion, Dropdown, Tab} from '../../artui/react';
import {Dygraph} from '../../artui/react/dataviz';
import DataParser from './dataparser';



class LiveAnalysisCharts extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
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
  
  renderList(summary, groups) {
    let elems = [];
    
    if (summary) {
      elems.push((<Dygraph key="summary" className="live monitoring summary" data={summary.series}
                           ylabel="Anomaly Degree"
                           labels={['X', 'Y1']}
                           axisLabelWidth={35}
                           style={{width: '100%', height: '200px'}}
                           animatedZooms={true} highlightCircleSize={2} strokeWidth={3}
                           labelsDivStyles={{padding: '4px', margin:'15px'}}
                           highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                           annotations={summary.annotations}
                           highlights={summary.highlights} />
      ));
    }
    
    if (groups) {
      groups.map((group) => {
        elems.push((
          <Dygraph key={group.id} className="lve monitoring summary" data={group.sdata}
                   title={"Metric Group" + group.id}
                   labels={group.sname}
                   style={{width: '100%', height: 200}}
                   highlightCircleSize={2}
                   highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                   highlights={group.highlights}
          />
        ));
      });
    }
    
    return elems;
  }

  render() {
    
    let {data, view, loading} = this.props;
    let {columns, selectedGroupId} = this.state;

    let isListView = view === 'list';
    let contentStyle = isListView ? {} : {paddingLeft:0};
    let contentClass = loading ? 'ui form loading' : '';
    
    let summary, groups, selectedGroup = undefined;
    
    if (data) {
      let dp = new DataParser(data);
      if (dp.mode == 'holistic') {
        summary = dp.getSummaryData();
      }
      groups = dp.getGroupsData();
      selectedGroup = _.find(groups, g => g.id == selectedGroupId);
    }
    
    return (
    <Console.Wrapper>
      <Console.Content style={contentStyle} className={contentClass}>
        <div className="ui main tiny container" style={{minHeight:'100%'}}>
          <div className="ui vertical segment">
            {view == 'list' && this.renderList(summary, groups)}
          </div>
        </div>
      </Console.Content>
    </Console.Wrapper>
    )
  }
}

export default LiveAnalysisCharts;
