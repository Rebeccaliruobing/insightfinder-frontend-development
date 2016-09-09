import React from 'react';
import ReactTimeout from 'react-timeout'
import store from 'store';
import {BaseComponent, PropTypes, Table, Link} from '../../../artui/react';
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

  updateLiveAnalysis() {

    let {projectName, modelType, pvalue, cvalue} = this.props;
    let key = `${projectName}_${modelType}_${pvalue}_${cvalue}`;
    
    // this.props.clearTimeout(this.timeout);
    this.setState({loading: true});
    apis.postLiveAnalysis(projectName, modelType, pvalue, cvalue)
      .then(resp => {
        let update = {};
        if (resp.success) {
          update.data = resp.data;
          let storeRespData = {
            'anomalyConsolidatedString': resp.data.anomalyConsolidatedString,
            'anomalyString': resp.data.anomalyString,
            'detectionResults': resp.data.detectionResults,
            'detectSuccess': resp.data.detectSuccess
          };
          store.set(key, storeRespData);
        } else {
          alert(resp.message);
        }
        update.loading = false;
        this.setState(update);
        // this.timeout = this.props.setTimeout(this.updateLiveAnalysis.bind(this), 5000);
      })
      .catch(msg=> {
        this.setState({loading: false});
        // this.timeout = this.props.setTimeout(this.updateLiveAnalysis.bind(this), 5000);
        console.error(msg);
      });
  }
  render() {
    let {projectName, modelType, pvalue, cvalue} = this.props;
    let query = {projectName, modelType, pvalue, cvalue};
    let {loading, showCloser, data} = this.state;
    let loadStyle = loading ? 'ui form loading':'';
    
    let key = `${projectName}_${modelType}_${pvalue}_${cvalue}`;
    data = data || store.get(key, null);
    if (data && this.data !== data) {
      this.sdata = new DataParser(data).getSummaryData();
      data = this.data;
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
            {!loading && <i className="refresh link icon" onClick={() => this.updateLiveAnalysis(false)}/>}
            <Link to="/liveMonitoring"
                  query={query} target="_blank"
                  style={{marginRight:5}}>Details</Link>
            <i className="close link icon" onClick={this.handleClose.bind(this)}/>
          </div> }
          <div className="header">Summary: {projectName}</div>
          <div className="meta" style={{paddingBottom: 10}}>
            <span>{modelType} /</span>
            <span>{(modelType === 'DBScan' ? 'minPts ' : '') + pvalue + ' /'}</span>
            <span>{(modelType === 'DBScan' ? 'epsilon ' : '') + cvalue + ' samples'}</span>
          </div>
          <div className={loadStyle} style={{height: '150px'}}>
            {sdata? <SummaryChart data={sdata} />: <span>Model in training...</span>}
          </div>
        </div>
      </div>
    )
  }
}

export default ReactTimeout(ProjectSummary);