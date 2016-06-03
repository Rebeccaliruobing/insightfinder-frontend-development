import React from 'react';
import cx from 'classnames';
import ReactTimeout from 'react-timeout'
import {BaseComponent, PropTypes, Table, Link} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import apis from '../../../apis';

class ProjectSummary extends BaseComponent {
  
  static propTypes = {};
  static defaultProps = {
    onClose: () => {},
    onSelected: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      showCloser: false,
      data: [],
      loading: true
    };
  }

  handleClose(e) {
    e.stopPropagation();
    this.props.onClose();
  }

  componentDidMount() {
    this.updateLiveAnalysis();
  }
  
  updateLiveAnalysis() {
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    this.setState({loading: true});
    apis.postLiveAnalysis(projectName, modelType, anomalyThreshold, durationThreshold)
      .then(data => {
        // TODO: [API] live analysis summary data parser 
        let update = {};
        update.data = data;
        update.loading = false;
        this.setState(update);
        this.props.setTimeout(this.updateLiveAnalysis.bind(this), 5000 * 60);
      })
      .catch(msg=> {
        alert(msg);
      });
  }
  
  render() {
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    let query = {projectName, modelType, anomalyThreshold, durationThreshold};
    let {loading, showCloser, data} = this.state;
    let cardStyle = cx(
      'ui card', 
      loading ? 'form loading':'');
    
    return (
      <div className={cardStyle} style={{height: 240}}
           onMouseEnter={() => this.setState({showCloser:true})}
           onMouseLeave={() => this.setState({showCloser:false})}
           onClick={() => this.props.onSelected() }>
        <div className="content">
          {!loading && showCloser && 
            <div style={{float:'right'}}>
              <Link to="/liveMonitoring" 
                    query={query} target="_blank" 
                    style={{marginRight:5}}>Details</Link>
              <i className="close link icon" onClick={this.handleClose.bind(this)}/>
            </div>
          }
          <div className="header">{projectName}</div>
          <div className="meta">
            <span>{modelType} /</span>
            <span>{anomalyThreshold} /</span>
            <span>{durationThreshold} mins</span>
          </div>
          {data && data.length > 0 &&
          <Dygraph data={data}
                   labels={['x', 'y']}
                   style={{width: '100%', height: '100%'}}
                   animatedZooms={true} highlightCircleSize={2} strokeWidth={3}
                   labelsDivStyles={{padding: '4px', margin:'15px'}}
                   highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}} />
          }
        </div>
      </div>
    )
  }
}

export default ReactTimeout(ProjectSummary);