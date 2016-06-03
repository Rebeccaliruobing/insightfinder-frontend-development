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
    this.hintMapping = [];
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
  
  extractMetric(atext) {
    if(!atext){
      return "";
    }
    var ret = [];
    var items = atext.split(';');
    $.each(items, function(itemNo,item) {
      var pos = item.trim().indexOf(".");
      var pos2 = item.trim().substr(pos+1).indexOf("[");
      var metr = item.trim().substr(pos+1).substr(0,pos2);
      ret.push(metr);
    });
    ret = ret.filter(function(el, index, arr) {
      return index === arr.indexOf(el);
    });
    return ret;
  };

  parseAnomalyData(data) {
    
    let self = this;
    let arr = data;
    $.each(arr, function(i,a){
      var atext = (arr.length === 1)?self.anomalyTexts[0]:self.anomalyTexts[i];
      var alies = [];
      var lines = a.detectionResults.split('\\n');
      $.each(lines, function(lineNo, line) {
        var items = line.split(',');
        if (lineNo === 0) {
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
              groupId : a.groupId,
              time : new Date(ts),
              timestamp : ts,
              val : val,
              text : (parseFloat(items[1])>0)?atext[ts]:"",
              metrs : (parseFloat(items[1])>0)?(self.extractMetric(atext[ts])):[]
            });
          }
        }
      });
      self.anomalies[a.groupId] = alies
    });
  }

  parseAnomalyText(data) {
    let arr = data;
    var self = this;

    $.each(arr, function(i,a){
      var atext = {};
      if(a.anomalies!=""){
        var lines = a.anomalies.split('\\n');
        $.each(lines, function(lineNo, line) {
          var items = line.split(',');
          if(items[2]){
            var hints = items[2].trim().split(':');
            // further parse hints[1], eg. 1.Change_inflicted(min)[node0](1.0); 2.Sub_cause_type[node0](4.0); 3.Sub_cause_subset[node0](4.0)
            var hintss = hints[1].trim().split(';');
            var newhints = "";
            try{
              $.each(hintss, function(ihint,hint){
                // 1.Change_inflicted(min)[node0](1.0);
                // 0=#.metric, 1=node, 2=(val)
                var hintparts = hint.split(/\[|\]/);
                var metric = hintparts[0].split('.')[1];
                var valparts = hintparts[2].split(/\(|\)/)[1].split('.');
                var newval = hintparts[2].split(/\(|\)/)[1];
                console.log(hintparts, valparts);
                if(self.hintMapping[metric.trim()]!=undefined){
                  var thisMap = self.hintMapping[metric.trim()];
                  if(thisMap[parseInt(valparts[0])]!=undefined){
                    newval = thisMap[parseInt(valparts[0])];
                  }
                }
                //console.log(hintparts);
                newhints = newhints+hintparts[0]+"["+hintparts[1]+"]("+newval+")";
                if(ihint<hintss.length-1){
                  newhints = newhints+"; ";
                }
              });
              //console.log(newhints);
            } catch (err){
              newhints = hints[1];
            }

            atext[parseInt(items[0])] = newhints;
            console.log(hints[1]);
          }
        });
      }
      self.anomalyTexts.push(atext);
    });
  }

  componentDidMount() {
    this.updateLiveAnalysis();
  }

  updateLiveAnalysis() {
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    this.setState({loading: true});
    apis.postLiveAnalysis(projectName, modelType, anomalyThreshold, durationThreshold)
      .then(resp => {
        let update = {};
        if (resp.success) {
          this.parseAnomalyText(resp.data.anomalyString);
          this.parseAnomalyData(resp.data.detectionResults);

          let alies = this.anomalies[0];
          update.data = $.map(alies,function(a){ return [[a.time,a.val]]; });
        } else {
          alert(resp.message);
        }
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
      <div className={cardStyle}
           onMouseEnter={() => this.setState({showCloser:true})}
           onMouseLeave={() => this.setState({showCloser:false})}
           onClick={() => this.props.onSelected() }>
        <div className="content" style={{height:260}}>
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
          <Dygraph className="live monitoring summary" data={data}
                   ylabel="Anomaly Degree"
                   axisLabelWidth={30}
                   style={{width: '100%', height: '200px'}}
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