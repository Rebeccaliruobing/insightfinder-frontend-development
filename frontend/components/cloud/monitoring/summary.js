import React from 'react';
import cx from 'classnames';
import {BaseComponent, PropTypes, Table} from '../../../artui/react';
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
    this.anomalyTexts = [];
    this.anomalies = [];
  }

  handleClose(e) {
    e.stopPropagation();
    this.props.onClose();
  }
  
  extractMetrics(atext,spart) {
    if(!atext){
      return "";
    }
    var ret = [];
    var items = atext.split(';');
    $.each(items, function(itemNo,item) {
      var parts = item.trim().split(/\[|\]|\./);
      ret.push(parts[spart]);
    });
    ret = ret.filter(function(el, index, arr) {
      return index === arr.indexOf(el);
    });
    return ret;
  }

  parseAnomalyData(data) {
    
    let self = this;
    
    $.each(data, function(i,a){
      var atext = (data.length == 1)?self.anomalyTexts[0]:self.anomalyTexts[i];
      var alies = [];
      var lines = a.detectionResults.split('\n');
      
      $.each(lines, function(lineNo, line) {
        var items = line.split(',');
        if (lineNo == 0) {
          $.each(items, function(seriesNo, item) {
            if (seriesNo > 0) {
              // if multiple output types are present, parse them here
            }
          });
        } else {
          if ($.isNumeric(items[1])) {
            var ts = parseInt(items[0]);
            var val = parseFloat(items[1]);
            alies.push({
              time : new Date(ts),
              timestamp : ts,
              val : val,
              text : (parseFloat(items[1])>0)?atext[ts]:"",
              metrs : (parseFloat(items[1])>0)?(self.extractMetrics(atext[ts], 1)):[]
            });
          }
        }
      });
      self.anomalies.push(alies);
    });
  }

  parseAnomalyText(data) {
    var self = this;
    $.each(data, function(i,a){
      var atext = [];
      var lines = a.anomalies.split('\n');
      $.each(lines, function(lineNo, line) {
        var items = line.split(',');
        if(items[2]){
          var hints = items[2].split(':');
          atext[parseInt(items[0])] = hints[1];
        }
      });
      self.anomalyTexts.push(atext);
    });
  }
  
  componentDidMount() {
    this.updateLiveAnalysis();
  }
  
  updateLiveAnalysis() {
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    apis.postLiveAnalysis(projectName, modelType, anomalyThreshold, durationThreshold)
      .then(resp => {
        let update = {};
        if (resp.success) {
          alert(resp.data);
          this.parseAnomalyText(resp.data.anomalyString);
          this.parseAnomalyData(resp.data.detectionResults);
          
          let alies = this.anomalies[0];
          update.data = $.map(alies,function(a){ return [[a.time,a.val]]; });
        } else {
          alert(resp.message);
        }
        update.loading = false;
        this.setState(update);
      });
  }
  
  render() {
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
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
          {showCloser &&
          <i className="close link icon" style={{position:'absolute', top: 10, right:5, zIndex:1}}
             onClick={this.handleClose.bind(this)}/>
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
                   highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
          />
          }
        </div>
      </div>
    )
  }
}

export default ProjectSummary;