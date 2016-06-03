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
      data: [],
      loading: true
    };
    this.alies = null;
    this.annotations = [];
  }

  handleClose(e) {
    e.stopPropagation();
    this.props.onClose();
  }

  componentDidMount() {
    this.updateLiveAnalysis();
  }

  updateLiveAnalysis() {
    let self = this;
    let {projectName, modelType, anomalyThreshold, durationThreshold} = this.props;
    this.setState({loading: true});
    apis.postLiveAnalysis(projectName, modelType, anomalyThreshold, durationThreshold)
      .then(resp => {
        let update = {};
        if (resp.success) {
          
          let dp = new DataParser(resp.data);
          dp.parseAnomalyText();
          dp.parseAnomalyData();
          
          self.alies = dp.anomalies[0];
          let annotations = [];
          // TODO: annotation cannot display, x value not match?
          $.map(dp.anomalyTexts, (o) => {
            _.forIn(o, (v, k) => {
              annotations.push({
                series: 'y',
                x: new Date(parseInt(k)),
                shortText: 'L',
                text: v
              })
            });
          });
          self.annotations = annotations;
          
          update.data = $.map(self.alies,function(a){ return [[a.time,a.val]]; });
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
  
  underlayCallback(canvas, area, g) {
    let self = this;
    function highlight_period(x_start, x_end, val) {
      // val between 0-green to 1-yellow to 10-red (logarithmic)
      var canvas_left_x = g.toDomXCoord(x_start);
      var canvas_right_x = g.toDomXCoord(x_end);
      var canvas_width = 5;
      var rcolor, gcolor;
      if(val <= 1){
        if(val < 0) val = 0;
        rcolor = Math.floor(255 * val);
        gcolor = 255;
      } else {
        if(val > 10) val = 10;
        rcolor = 255;
        //gcolor = Math.floor(255 - 16 ^ Math.log10(10*val));
        gcolor = Math.floor(255 - (val-1)/9*255);
      }
      canvas.fillStyle = "rgba("+rcolor.toString()+","+gcolor.toString()+",0,1.0)";
      canvas.fillRect(canvas_left_x, area.y, canvas_width, 12);
    }
    $.each(self.alies,function(itemNo,item){
      if(item.val === 0){
        highlight_period(item.timestamp,item.timestamp,Math.min(10,item.val));
      }
    });
    $.each(self.alies,function(itemNo,item){
      if(item.val>0){
        highlight_period(item.timestamp,item.timestamp,Math.min(10,item.val));
      }
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
          <div className="header">Summary: {projectName}</div>
          <div className="meta">
            <span>{modelType} /</span>
            <span>{anomalyThreshold} /</span>
            <span>{durationThreshold} mins</span>
          </div>
          {data && data.length > 0 &&
          <Dygraph className="live monitoring summary" data={data}
                   ylabel="Anomaly Degree"
                   axisLabelWidth={35}
                   style={{width: '100%', height: '200px'}}
                   animatedZooms={true} highlightCircleSize={2} strokeWidth={3}
                   labelsDivStyles={{padding: '4px', margin:'15px'}}
                   highlightSeriesOpts={{strokeWidth: 3, strokeBorderWidth: 1, highlightCircleSize: 5}}
                   annotations={this.annotations}
                   underlayCallback={this.underlayCallback.bind(this)} />
          }
        </div>
      </div>
    )
  }
}

export default ReactTimeout(ProjectSummary);