import React, {Component, PropTypes as T} from 'react';
import {autobind} from 'core-decorators';
import _ from 'lodash';
import d3 from 'd3';
import $ from 'jquery';
import ReactFauxDOM from 'react-faux-dom';

import MetricModal from './metric_modal';

class IncidentsTreeMap extends Component {

  constructor(props) {
    super(props);

    this.$container = null;
    this.navHeight = 28;

    // D3 treemap layout settings.
    this.treemap = d3.layout.treemap()
      .children((d, depth) => depth ? null : d._children)
      .sort((a, b) => a.name - b.name)
      .ratio(0.3 * (1 + Math.sqrt(5)))
      .round(false);

    this.state = {
      treeMapScheme: 'anomaly',
      faux: null,
      startTimestamp:undefined,
      endTimestamp:undefined,
      treeMapCPUThreshold:"0",
      treeMapAvailabilityThreshold:'100',
      instanceStatsJson:props.instanceStatsJson,
      instanceMetaData:props.instanceMetaData,
      anomaliesList:undefined,
      showMetricModal: false,
      metricModalProps: {},
      currentData: undefined,
    }
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.data) && this.$container) {
      const root = _.cloneDeep(this.props.data);
      this.transformData(root);
      this.setState({
        startTimestamp:root.startTimestamp,
        endTimestamp:root.endTimestamp
      });
      if(this.props.currentData){
        this.displayData(this.props.currentData);        
      } else {
        this.displayData(root);
      }
    }
  }

  @autobind
  showMetricChart(d) {
    let { onMetricSelected } = this.props;
    let { startTimestamp,endTimestamp } = this.state;
    let params = {
      projectName: d['projectName'],
      metricName: d['name'],
      instanceName: d['instanceName']
    };
    if(startTimestamp && endTimestamp){
      params['startTimestamp'] = startTimestamp;
      params['endTimestamp'] = endTimestamp;
    }

    // window.open(`/projectDataOnly?${$.param(params)}`, '_blank');
    this.setState({
      showMetricModal: true,
      metricModalProps: params,
    });
  }

  @autobind
  showInstanceChart(d) {
    let { startTimestamp,endTimestamp,anomaliesList } = this.state;
    let instance = d['instanceName'];
    let anomalyMetrics = [];
    if(instance && anomaliesList[instance]){
      let anomalies = anomaliesList[instance];
      anomalyMetrics = Object.keys(anomalies);
    }
    let params = {
      projectName: d['projectName'],
      instanceName: d['instanceName'],
      anomalyMetrics:anomalyMetrics.toString(),
    };
    if(startTimestamp && endTimestamp){
      params['startTimestamp'] = startTimestamp;
      params['endTimestamp'] = endTimestamp;
    }
    window.open(`/projectDataOnly?${$.param(params)}`, '_blank');
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.data) && this.$container) {

      const root = _.cloneDeep(nextProps.data);
      this.transformData(root);

      const state = {
        startTimestamp:root.startTimestamp,
        endTimestamp:root.endTimestamp,
        instanceMetaData:nextProps.instanceMetaData,
        anomaliesList:nextProps.data.anomaliesList,
        currentData:nextProps.currentData,
      };

      if(typeof nextProps.treeMapScheme == 'string'){
        state['treeMapScheme'] = nextProps.treeMapScheme;
      }
      if(typeof nextProps.treeMapCPUThreshold == 'string'){
        state['treeMapCPUThreshold'] = nextProps.treeMapCPUThreshold;
      }
      if(typeof nextProps.treeMapAvailabilityThreshold == 'string'){
        state['treeMapAvailabilityThreshold'] = nextProps.treeMapAvailabilityThreshold;
      }
      if(typeof nextProps.instanceStatsJson == 'object'){
        state['instanceStatsJson'] = nextProps.instanceStatsJson;
      }

      this.setState(state, () => {
        if(nextProps.currentData){
          this.displayData(nextProps.currentData);
        } else {
          this.displayData(root);
        }
      });
    }
  }

  /**
   * Transform the data into the format used by d3 treemap.
   * @param root: The root of the data tree.
   */
  transformData(root) {

    const sumScore = d => {
      let s = 0;
      if (d.children) {
        s = d3.sum(d.children, c => sumScore(c))
      } else {
        s = d.score;
      }
      d.score = s;
      return s;
    };
    sumScore(root);

    const scale = 1.25;
    const num = 3;
    // Accumulate the node value to the count of children.
    const accumulate = d => {
      return (d._children = d.children)
        ? d.value = (Math.log10(d.score) > num ? scale : 1) * d.children.reduce(function (p, v) {
        return p + accumulate(v);
      }, 0)
        : (Math.log10(d.score) > num ? scale : 1) * d.value;
    };
    accumulate(root);
  }

  chopString(str,n){
    if(str.length<=n+2){
      return str;
    }else{
      return str.slice(0,n)+'..';
    }
  }

  /**
   * Get the fill color of the node, based on severity and type of event.
   * @param d. The node data.
   * @returns {string} Color hex string.
   */
  @autobind
  getNodeFillColor(d) {

    if ( d.eventType === '- new instance' || d.eventType === '- new container') {
      return '#88bbee';
    }

    let {instanceStatsJson,treeMapCPUThreshold,treeMapAvailabilityThreshold} = this.state;
    let val = d.score;
    if(val<0){
      val = -val;
    }
    let gcolorMax = 205;
    var rcolor, gcolor, bcolor = 0;
    let cpuThreshold = parseInt(treeMapCPUThreshold);
    let availabilityThreshold = parseFloat(treeMapAvailabilityThreshold)/100.0;
    if (this.state.treeMapScheme == 'anomaly') {
      if (val <= 1) {
        if (val < 0)
          val = 0;
        if (val > 0)
          val = 1;
        rcolor = Math.floor(255 * val);
        gcolor = gcolorMax;
      } else {
        if (val > 10)
          val = 10;
        rcolor = 255;
        gcolor = Math.floor(gcolorMax - (val - 1) / 9 * gcolorMax);
      }
    } else if(this.state.treeMapScheme == 'cpu') {
      if(d.type == 'metric' && d.name.toLowerCase().indexOf('cpu') != -1
        && instanceStatsJson[d.instanceName]
        && cpuThreshold >= instanceStatsJson[d.instanceName]['AvgCPUUtilization']) {
          rcolor = 173;
          gcolor = 216;
          bcolor = 230;
      } else if(d.type == 'instance'
        && instanceStatsJson[d.name]
        && cpuThreshold >= instanceStatsJson[d.name]['AvgCPUUtilization']) {
          rcolor = 173;
          gcolor = 216;
          bcolor = 230;
      } else if(d.type == 'container'
        && instanceStatsJson[d.instanceName] 
        && cpuThreshold >= instanceStatsJson[d.instanceName]['AvgCPUUtilization']) {
          rcolor = 173;
          gcolor = 216;
          bcolor = 230;
      } else {
          rcolor = 0;
          gcolor = gcolorMax;
          bcolor = 0;
      }
    } else if(this.state.treeMapScheme == 'availability') {
      if(d.type == 'metric'
        && instanceStatsJson[d.instanceName]
        && availabilityThreshold > instanceStatsJson[d.instanceName]['AvgInstanceUptime']) {
          rcolor = 255;
          gcolor = 0;
          bcolor = 0;
      } else if(d.type == 'instance'
        && instanceStatsJson[d.name]
        && availabilityThreshold > instanceStatsJson[d.name]['AvgInstanceUptime']) {
          rcolor = 255;
          gcolor = 0;
          bcolor = 0;
      } else if(d.type == 'container'
        && instanceStatsJson[d.instanceName] 
        && availabilityThreshold > instanceStatsJson[d.instanceName]['AvgInstanceUptime']) {
          rcolor = 255;
          gcolor = 0;
          bcolor = 0;
      } else {
          rcolor = 0;
          gcolor = gcolorMax;
          bcolor = 0;
      }
    }
    return "#" + ((1 << 24) + (rcolor << 16) + (gcolor << 8) + bcolor).toString(16).slice(1);
  }

  @autobind
  handleTileClick(data) {
    this.displayData(data);
    this.props.feedbackData(data);
  }
  /**
   * Display the data. Data maybe a child node in the tree.
   * @param data
   */
  displayData(data) {
    let {instanceMetaData,instanceStatsJson} = this.state;
    let self = this;
    this.setState({},()=>{
      if (!data) return;

      const navHeight = this.navHeight;
      const width = this.$container.width();
      const height = this.$container.height() - navHeight;

      const x = d3.scale.linear().domain([0, width]).range([0, width]);
      const y = d3.scale.linear().domain([0, height]).range([0, height]);

      data.x = data.y = 0;
      data.dx = width;
      data.dy = height;
      data.depth = 0;

      const layout = d => {
        if (d._children) {
          this.treemap.nodes({ _children: d._children });
          d._children.forEach(function (c) {
            c.x = d.x + c.x * d.dx;
            c.y = d.y + c.y * d.dy;
            c.dx *= d.dx;
            c.dy *= d.dy;
            c.parent = d;
            layout(c);
          });
        }
      };
      const rect = r => {
        r.attr("x", d => x(d.x))
          .attr("y", d => y(d.y))
          .attr("width", d => x(d.x + d.dx) - x(d.x))
          .attr("height", d => y(d.y + d.dy) - y(d.y));
      };
      const text = t => {
      };
      const name = d => (d.parent ? name(d.parent) + " / " + ((instanceMetaData[d.name] && instanceMetaData[d.name]['tagName'])?(instanceMetaData[d.name]['tagName']):d.name) : ((instanceMetaData[d.name] && instanceMetaData[d.name]['tagName'])?(instanceMetaData[d.name]['tagName']):d.name));

      // Set up the new layout for the data
      layout(data);

      const faux = ReactFauxDOM.createElement('svg');
      const svg = d3.select(faux)
        .attr({ width, height: height + navHeight })
        .append("g")
        .attr("transform", `translate(0, ${navHeight})`);

      // Display navbar to back to parent node on click
      const navbar = svg.append("g").attr("class", "navbar");
      // const twidth = 180;
      const twidth = 0;

      // Add a link to open instance chart view
      if ((data.type === 'instance' && data.containers == 0) || data.type === 'container') {
        navbar.append("rect")
          .attr({ y: -navHeight, width: Math.max(width - twidth, 0), height: navHeight, })
          .datum(data.parent).on('click', this.handleTileClick);
        // navbar.append("rect")
        //   .attr({ x: width - twidth, y: -navHeight, width: twidth, height: navHeight })
        //   .datum(data).on('click', this.showInstanceChart);
        // navbar.append("text")
        //   .attr({x: width - twidth + 20, y: 6 - navHeight, dy: '1em' })
        //   .text('All Metric Charts');
      } else {
        navbar.append("rect")
          .attr({ y: -navHeight, width: width, height: navHeight, })
          .datum(data.parent).on('click', this.handleTileClick);
      }

      navbar.append("text")
        .attr({x: 6, y: 6 - navHeight, dy: '1em'})
        .text(name(data));

      const g1 = svg.insert("g", '.navbar').datum(data).attr("class", "depth");
      const g = g1.selectAll("g").data(data._children).enter().append("g");

      g.filter(d => !_.isEmpty(d._children)).classed('children', true).on('click', this.handleTileClick);
      g.selectAll(".child").data(d => d._children || [d])
        .enter().append('rect')
        .attr('class', 'child')
        .call(rect);

      // this is mouse over popup text, no chopping
      if (this.state.treeMapScheme == 'anomaly') {
        g.append("rect").attr("class", d => "parent " + d.type)
          .call(rect)
          .append("title").text(d => ((instanceMetaData[d.name] && instanceMetaData[d.name]['tagName'])?(instanceMetaData[d.name]['tagName']):  d.name)+"\n"+d.eventType);
      } else if (this.state.treeMapScheme == 'cpu') {
        g.append("rect").attr("class", d => "parent " + d.type)
          .call(rect)
          .append("title").text(d => ((instanceMetaData[d.name] && instanceMetaData[d.name]['tagName'])?(instanceMetaData[d.name]['tagName']):  d.name)+"\n"+(instanceStatsJson[d.name]?'Average CPU Utilization: '+(Math.round(instanceStatsJson[d.name]['AvgCPUUtilization']*10)/10).toString()+'%':''));
      } else if (this.state.treeMapScheme == 'availability') {
        g.append("rect").attr("class", d => "parent " + d.type)
          .call(rect)
          .append("title").text(d => ((instanceMetaData[d.name] && instanceMetaData[d.name]['tagName'])?(instanceMetaData[d.name]['tagName']):  d.name)+"\n"+(instanceStatsJson[d.name]?'Average Instance Availability: '+(Math.round(instanceStatsJson[d.name]['AvgInstanceUptime']*1000)/10).toString()+'%':''));
      } 

      g.selectAll('.parent').attr('fill', d => this.getNodeFillColor(d));
      g.append("text").attr("dy", ".75em").text(
        d => ((instanceMetaData[d.name] && instanceMetaData[d.name]['tagName'])?
          (this.chopString(instanceMetaData[d.name]['tagName'],8)):d.name)
      ).call( t => {
        t.attr("x", d => x(d.x) + 6).attr("y", d => y(d.y) + 6);
      });

      if (this.state.treeMapScheme == 'anomaly') {
        g.append("text").attr("dy", ".75em").text(d => this.chopString(d.eventType,10)).call( t => {
          t.attr({x: d => x(d.x) + 6, y: d => y(d.y + d.dy / 2)});
        });
      } else if (this.state.treeMapScheme == 'cpu') {
        g.append("text").attr("dy", ".75em").text(d => (instanceStatsJson[d.name]?(Math.round(instanceStatsJson[d.name]['AvgCPUUtilization']*10)/10).toString()+'%':'')).call( t => {
          t.attr({x: d => x(d.x) + 6, y: d => y(d.y + d.dy / 2)});
        });
      } else if (this.state.treeMapScheme == 'availability') {
        g.append("text").attr("dy", ".75em").text(d => (instanceStatsJson[d.name]?(Math.round(instanceStatsJson[d.name]['AvgInstanceUptime']*1000)/10).toString()+'%':'')).call( t => {
          t.attr({x: d => x(d.x) + 6, y: d => y(d.y + d.dy / 2)});
        });
      } 

      // Bind event for metric
      g.selectAll('.metric').on('click', this.showMetricChart);

      this.setState({faux: faux.toReact()});
    });
  }

  @autobind
  hideMetricModal() {
    this.setState({
      showMetricModal: false,
      metricModalProps: {}
    })
  };

  render() {
    return (
      <div className="incidents treemap"  style={{ marginTop: 10 }}>
        <div ref={c => this.$container = $(c)}
             style={{ padding: 4, height: '100%', width: '100%' }}>
          {this.state.faux}
        </div>
        { this.state.showMetricModal &&
          <MetricModal {...this.state.metricModalProps} onClose={this.hideMetricModal} />
        }
      </div>
    )
  }
}

export default IncidentsTreeMap;
