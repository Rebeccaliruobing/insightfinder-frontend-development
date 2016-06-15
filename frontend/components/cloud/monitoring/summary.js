import React from 'react';
import cx from 'classnames';
import ReactTimeout from 'react-timeout'
import store from 'store';
import {BaseComponent, PropTypes, Table, Link} from '../../../artui/react';
import {Dygraph} from '../../../artui/react/dataviz';
import apis from '../../../apis';
import DataParser from '../dataparser';
import {SummaryChart} from '../liveanalysis/charts';

class ProjectSummary extends BaseComponent {
  
  static propTypes = {};
  static defaultProps = {
    onClose: () => {},
    onSelected: () => {}
  };

  constructor(props) {
    super(props);

    this.sdata = null;
    this.data = null;
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

    // this.props.clearTimeout(this.timeout);

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
        // this.timeout = this.props.setTimeout(this.updateLiveAnalysis.bind(this), 5000 * 60);
      })
      .catch(msg=> {
        this.setState({loading:false});
        console.log(msg);
      });
  }
  
  render() {
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    let query = {projectName, modelType, anomalyThreshold, durationThreshold};
    let {loading, showCloser, data} = this.state;
    let loadStyle = loading ? 'ui form loading':'';

    if (data && this.data !== data) {
      this.sdata = new DataParser(data).getSummaryData();
      this.data = data;
    }
    let sdata = this.sdata;
    
    return (
      <div className='ui card'
           onMouseEnter={() => this.setState({showCloser:true})}
           onMouseLeave={() => this.setState({showCloser:false})}
           onClick={() => this.props.onSelected() }>
        <div className="content" style={{height:210}}>
          {showCloser &&
          <div style={{float:'right'}}>
            <i className="refresh link icon" onClick={this.updateLiveAnalysis.bind(this)}/>
            <Link to="/liveMonitoring"
                  query={query} target="_blank"
                  style={{marginRight:5}}>Details</Link>
            <i className="close link icon" onClick={this.handleClose.bind(this)}/>
          </div> }
          <div className="header">Summary: {projectName}</div>
          <div className="meta" style={{paddingBottom: 10}}>
            <span>{modelType} /</span>
            <span>{anomalyThreshold} /</span>
            <span>{durationThreshold} mins</span>
          </div>
          <div className={loadStyle} style={{height: '150px'}}>
            {sdata && <SummaryChart data={sdata} />}
            {!sdata && !loading && <span>No summary</span>}
          </div>
        </div>
      </div>
    )
  }
}

export default ReactTimeout(ProjectSummary);