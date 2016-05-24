import React from 'react';
import classNames from 'classnames';
import {BaseComponent, PropTypes, Table} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';

class ProjectsSummary extends BaseComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.projectData = _.range(0, 20).map((item, index)=>[index, Math.random() * 1000]);
    
    this.annotations = [{
      series: 'y',
      x: 6,
      shortText: 'L',
      text: 'test'
    }];
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }
  
  handleClick(project) {
    return () => {
      this.props.onProjectSelected(project);
    }
  }
  
  renderCards() {
    let {projects} = this.props;
    let elems = [];
    
    projects.map((project, index) => {
      elems.push((
        <div key={project} className="ui card" onClick={this.handleClick(project)}>
          <div className="content">
            <div className="header">{project}</div>
            <div className="meta">
              <span>Holistic</span>
              <span>0.97</span>
              <span>5 mins</span>
            </div>
            <Dygraph data={this.projectData} 
                     labels={['x', 'y']}
                     annotations={this.annotations} style={{height: 120}}/>
          </div>
        </div>
      ));
    });
    return elems;
  }

  render() {
    return (
      <div className="ui vertical segment">
        <div className="ui four cards">
          {this.renderCards()}
        </div>
      </div>
    )
  }
}

export default ProjectsSummary;