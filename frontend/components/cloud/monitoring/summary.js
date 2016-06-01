import React from 'react';
import classNames from 'classnames';
import {BaseComponent, PropTypes, Table} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';

class ProjectSummary extends BaseComponent {
  static propTypes = {};
  static defaultProps = {
    onClose: () => {},
    onSelected: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      showCloser: false
    };
    
    this.projectData = _.range(0, 20).map((item, index)=>[index, Math.random() * 1000]);
    
    this.annotations = [{
      series: 'y',
      x: 6,
      shortText: 'L',
      text: 'test'
    }];
  }

  handleClose(e) {
    e.stopPropagation();
    this.props.onClose();
  }
  
  componentDidMount() {
  }
  
  render() {
    let {project} = this.props;
    let {showCloser} = this.state;
    let {projectName, modelType, anomalyThreshold, durationHours} = project;
    
    return (
      <div className="ui card" 
           onMouseEnter={() => this.setState({showCloser:true})}
           onMouseLeave={() => this.setState({showCloser:false})}
           onClick={() => this.props.onSelected() }>
        {showCloser &&
        <i className="close link icon" style={{position:'absolute', top: 10, right:0, zIndex:1}}
           onClick={this.handleClose.bind(this)}/>
        }
        <div className="content">
          <div className="header">{projectName}</div>
          <div className="meta">
            <span>{modelType}/</span>
            <span>{anomalyThreshold}/</span>
            <span>{durationHours}mins/</span>
          </div>
          <Dygraph data={this.projectData}
                   labels={['x', 'y']}
                   annotations={this.annotations} style={{height: 120}}/>
        </div>
      </div>
    )
  }
}

export default ProjectSummary;