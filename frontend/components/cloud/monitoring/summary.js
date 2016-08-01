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
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    let key = `${projectName}_${modelType}_${anomalyThreshold}_${durationThreshold}`;
    let data = store.get(key, null);
    this.updateLiveAnalysis();
    //if (!data) {
    //  this.updateLiveAnalysis();
    //}
  }
  
  componentWillUnmount() {
    // this.props.clearTimeout(this.timeout);
  }

  updateLiveAnalysis() {

    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    let key = `${projectName}_${modelType}_${anomalyThreshold}_${durationThreshold}`;
    
    // this.props.clearTimeout(this.timeout);
    this.setState({loading: true});
    apis.postLiveAnalysis(projectName, modelType, anomalyThreshold, durationThreshold)
      .then(resp => {
        let update = {};
        if (resp.success) {
          resp.data.periodString = resp.data.periodString.split(",").map(function (value,index) {
            if(index%2 == 1){
              if(Number.parseInt(value)!=-1){
                return value;
              }
            }
          });
          update.data = resp.data;
          let storeRespData = {
            'anomalyConsolidatedString': resp.data.anomalyConsolidatedString,
            'anomalyString': resp.data.anomalyString,
            'detectionResults': resp.data.detectionResults,
            'detectSuccess': resp.data.detectSuccess,
            'periodString': resp.data.periodString
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
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    let query = {projectName, modelType, anomalyThreshold, durationThreshold};
    let {loading, showCloser, data} = this.state;
    let loadStyle = loading ? 'ui form loading':'';
    let self = this;
    
    let key = `${projectName}_${modelType}_${anomalyThreshold}_${durationThreshold}`;
    data = data || store.get(key, null);

    if (data && this.data !== data) {
      this.sdata = new DataParser(data).getSummaryData();
      this.data = data;
    }
    let periodLength = (_.compact(data.periodString)).length;
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
            <span>{anomalyThreshold} /</span>
            <span>{durationThreshold} samples</span>
            {periodLength!=0?<span> / Periodicity detected</span>:null}
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