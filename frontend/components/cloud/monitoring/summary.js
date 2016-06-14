import React from 'react';
import cx from 'classnames';
import ReactTimeout from 'react-timeout'
import {BaseComponent, PropTypes, Table, Link} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import apis from '../../../apis';
import DataParser from '../dataparser';

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
      data: undefined,
      loading: false
    };
  }

  handleClose(e) {
    e.stopPropagation();
    this.props.onClose();
  }

  componentDidMount() {
    this.updateLiveAnalysis();
  }
  
  componentWillUnmount() {
    this.props.clearTimeout(this.timeout);
  }

  updateLiveAnalysis() {
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;

    this.props.clearTimeout(this.timeout);
    
    if (modelType == 'Holistic') {
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
          this.timeout = this.props.setTimeout(this.updateLiveAnalysis.bind(this), 5000 * 60);
        })
        .catch(msg=> {
          this.setState({loading:false});
          console.log('load data error');
          console.log(msg);
        });
    }
  }
  
  render() {
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    let query = {projectName, modelType, anomalyThreshold, durationThreshold};
    let {loading, showCloser, data} = this.state;
    let loadStyle = loading ? 'ui form loading':'';

    let sdata = !data ? undefined: new DataParser(data).getSummaryData();
    
    return (
      <div className='ui card'
           onMouseEnter={() => this.setState({showCloser:true})}
           onMouseLeave={() => this.setState({showCloser:false})}
           onClick={() => this.props.onSelected() }>
        <div className="content summary-charts" style={{height:260}}>
          {showCloser &&
          <div style={{float:'right'}}>
            <Link to="/liveMonitoring"
                  query={query} target="_blank"
                  style={{marginRight:5}}>Details</Link>
            <i className="close link icon" onClick={this.handleClose.bind(this)}/>
          </div>
          }
          <div className="header">Summary: {projectName}</div>
          <div className="meta">
            <span>{modelType} /</span>
            <span>{anomalyThreshold} /</span>
            <span>{durationThreshold} mins</span>
          </div>
          <div className={loadStyle} style={{height: '200px'}}>
          {sdata &&
          <Dygraph data={sdata.series}
                   ylabel="Anomaly Degree"
                   labels={['X', 'Y1']}
                   axisLabelWidth={35}
                   style={{width: '100%', height: '200px'}}
                   animatedZooms={true} highlightCircleSize={2} strokeWidth={3}
                   labelsDivStyles={{padding: '4px', margin:'15px'}}
                   highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                   annotations={sdata.annotations}
                   highlights={sdata.highlights} />
          }
          {(!sdata && modelType != 'Holistic') && <span>No summary</span> }
          </div>
        </div>
      </div>
    )
  }
}

export default ReactTimeout(ProjectSummary);