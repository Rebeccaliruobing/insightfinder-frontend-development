import React, { Component, PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import d3 from 'd3';
import $ from 'jquery';
import ReactFauxDOM from 'react-faux-dom';
import WindowResizeListener from '../ui/window-resize-listener';
import MetricModal from './metric_modal';

class IncidentsTreeMap extends Component {

  static propTypes = {
    treeMapScheme: T.oneOf(['anomaly', 'cpu', 'availability']),
    treeMapCPUThreshold: T.string,
    treeMapAvailabilityThreshold: T.string,
  };

  static defaultProps = {
    treeMapScheme: 'anomaly',
    treeMapCPUThreshold: '0',
    treeMapAvailabilityThreshold: '90',
  };

  constructor(props) {
    super(props);

    this.$container = null;
    this.navHeight = 40;

    this.state = {
      faux: null,
      showMetricModal: false,
      metricModalProps: {},
    };

    this.colors = {
      lightBlue: '#88bbee',
      blue: '#0066cc',
      yellow: '#ffcc00',
      green: '#00cd00',
      grey: '#808080',
    };

    // Set D3 treemap layout settings.
    this.treemap = d3.layout.treemap()
      .children((d, depth) => depth ? null : d._children)
      .sort((a, b) => this.sortTile(a, b))
      .ratio(0.3 * (1 + Math.sqrt(5)))
      .round(false);
  }

  sortTile(a, b) {
    const { instanceMetaData: meta } = this.props;
    const an = a.name;
    const bn = b.name;

    const aName = meta[an] && meta[an].tagName ? meta[an].tagName : an;
    const bName = meta[bn] && meta[bn].tagName ? meta[bn].tagName : bn;

    return bName.localeCompare(aName);
  }

  componentDidMount() {
    this.displayData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.displayData(nextProps);
  }

  @autobind
  displayData(props) {
    const data = props.data;
    if (data && !_.isEmpty(data) && this.$container) {
      const d = _.cloneDeep(data);
      this.transformData(d, props);
      this.setTreemap(d, props);
    }
  }

  @autobind
  showMetricChart(d) {
    const { endTime, numberOfDays, instanceGroup, groupIdMap } = this.props;
    const { startTimestamp, endTimestamp } = this.props.data || {};
    let avgLabel;
    const metricAvg = (this.props.instanceStatsJson && this.props.instanceStatsJson[d.instanceName] && this.props.instanceStatsJson[d.instanceName].statsByMetricJson && this.props.instanceStatsJson[d.instanceName].statsByMetricJson[d.name] && this.props.instanceStatsJson[d.instanceName].statsByMetricJson[d.name].avg);
    if (metricAvg != undefined) {
      avgLabel = ` (${numberOfDays}d avg: ${metricAvg.toPrecision(3)})`;
    }
    const params = {
      projectName: d.projectName,
      metricName: d.name,
      groupId: groupIdMap[d.name],
      instanceName: d.instanceName,
      eventStartTime: d.eventStartTime,
      eventEndTime: d.eventEndTime,
      avgLabel,
      grouping: instanceGroup,
      predictedFlag: this.props.predictedFlag,
    };
    if (startTimestamp && endTimestamp) {
      params.startTimestamp = startTimestamp;
      params.endTimestamp = endTimestamp;
    }

    this.setState({
      showMetricModal: true,
      metricModalProps: params,
    });
  }

  @autobind
  hideMetricModal() {
    this.setState({
      showMetricModal: false,
      metricModalProps: {},
    });
  }

  /**
   * Transform the data into the format used by d3 treemap.
   * The value of the node affect the size the rect.
   * @param data: The root of the data tree.
   */
  @autobind
  transformData(data, props) {
    const schema = props.treeMapScheme || this.props.treeMapScheme;
    const stats = props.instanceStatsJson || this.props.instanceStatsJson;

    const sumScore = (d) => {
      let s = 0;
      if (d.children) {
        s = d3.sum(d.children, c => sumScore(c));
      } else {
        s = d.score;
      }
      d.score = s;
      if (d.type === 'instance') {
        d.avg_cpu = 0;
        d.avg_avail = 0;
        if (stats[d.instanceName] && stats[d.instanceName].AvgCPUUtilization) {
          d.avg_cpu = Math.log10(stats[d.instanceName].AvgCPUUtilization * 100);
        }
        if (stats[d.instanceName] && stats[d.instanceName].AvgInstanceUptime) {
          d.avg_avail = Math.log10(stats[d.instanceName].AvgInstanceUptime * 1000);
        }
      }
      return s;
    };
    sumScore(data);

    const scale = 1.25;
    const num = 3;
    // Accumulate the node value to the count of children.
    const accumulate = (d) => {
      d._children = d.children;
      let val = 0;

      if (d._children) {
        val = (Math.log10(d.score) > num ? scale : 1) * d.children.reduce(
            (p, v) => p + accumulate(v), 0);
      }

      if (d.type === 'instance' && schema === 'cpu') {
        d.value = d.avg_cpu;
      } else if (d.type === 'instance' && schema === 'availability') {
        d.value = d.avg_avail;
      } else if (d._children) {
        d.value = val;
      } else {
        d.value = (Math.log10(d.score) > num ? scale : 1) * d.value;
      }
      return d.value;
    };
    accumulate(data);
  }

  chopString(str, n) {
    if (str.length <= n + 2) {
      return str;
    } else {
      return `${str.slice(0, n)}..`;
    }
  }

  /**
   * Get the fill color of the node, based on severity and type of event.
   * @param d. The node data.
   * @param props. The props of the component, might be the nextProps.
   * @returns {string} Color hex string.
   */
  @autobind
  getNodeFillColor(d, props) {
    const schema = props.treeMapScheme || this.props.treeMapScheme;
    const stats = props.instanceStatsJson || this.props.instanceStatsJson;
    const treeMapCPUThreshold = props.treeMapCPUThreshold
      || this.props.treeMapCPUThreshold;
    const treeMapAvailabilityThreshold = props.treeMapAvailabilityThreshold
      || this.props.treeMapAvailabilityThreshold;

    const cpuThreshold = parseInt(treeMapCPUThreshold);
    const availabilityThreshold = parseFloat(treeMapAvailabilityThreshold) / 100.0;

    let val = Math.abs(d.score);

    const gcolorMax = 205;
    let rcolor,
      gcolor,
      bcolor = 0;

    if (schema == 'anomaly') {
      // New instances
      if (d.eventType.toLowerCase().indexOf('- new') >= 0) {
        return this.colors.lightBlue;
      }

      if (val <= 1) {
        if (val < 0) {
          val = 0;
        }
        if (val > 0) {
          val = 1;
        }
        rcolor = Math.floor(255 * val);
        gcolor = gcolorMax;
      } else {
        if (val > 10) {
          val = 10;
        }
        rcolor = 255;
        gcolor = Math.floor(gcolorMax - (val - 1) / 9 * gcolorMax);
      }
    } else if (schema == 'cpu') {
      let overAvg = false;
      if (stats[d.instanceName] && stats[d.instanceName].AvgCPUUtilization) {
        overAvg = cpuThreshold >= stats[d.instanceName].AvgCPUUtilization;
      }
      if (d.type === 'metric') {
        // For metric, display grey for non-cpu related metrics.
        if (d.name.toLowerCase().indexOf('cpu') >= 0) {
          return overAvg ? this.colors.blue : this.colors.green;
        } else {
          return this.colors.green;
        }
      } else {
        return overAvg ? this.colors.blue : this.colors.green;
      }
    } else if (schema == 'availability') {
      let overAvg = false;
      if (stats[d.instanceName] && stats[d.instanceName].AvgInstanceUptime) {
        overAvg = availabilityThreshold >= stats[d.instanceName].AvgInstanceUptime;
      }
      return overAvg ? this.colors.yellow : this.colors.green;
    }
    return `#${((1 << 24) + (rcolor << 16) + (gcolor << 8) + bcolor).toString(16).slice(1)}`;
  }

  @autobind
  handleTileClick(data) {
    if (data) {
      this.setTreemap(data, this.props);
    }
  }

  @autobind
  showInstanceChart(d) {
    const { endTime, numberOfDays, instanceGroup } = this.props;
    const projectName = d.projectName;
    const projectParams = (this.context.dashboardUservalues || {}).projectModelAllInfo || [];
    const projectParam = projectParams.find(p => p.projectName == projectName);
    const modelType = 'Holistic';
    const cvalueParam = projectParam ? projectParam.cvalue : '1';
    const pvalueParam = projectParam ? projectParam.pvalue : '0.99';
    const params = {
      projectName,
      instanceGroup,
      version: 3,
      pvalue: pvalueParam,
      cvalue: cvalueParam,
      modelType,
      predictedFlag: this.props.predictedFlag,
    };
    if (d.instanceName) {
      params.instanceName = d.instanceName;
      params.avgEndTimestamp = +endTime;
      params.avgNumberOfDays = numberOfDays;
    }
    if (d.startTimestamp && d.endTimestamp) {
      params.startTimestamp = d.startTimestamp;
      params.endTimestamp = d.endTimestamp;
    } else if (d.parent && d.parent.startTimestamp && d.parent.endTimestamp) {
      params.startTimestamp = d.parent.startTimestamp;
      params.endTimestamp = d.parent.endTimestamp;
    } else if (d.parent && d.parent.parent
        && d.parent.parent.startTimestamp && d.parent.parent.endTimestamp) {
      params.startTimestamp = d.parent.parent.startTimestamp;
      params.endTimestamp = d.parent.parent.endTimestamp;
    }

    const url = `/liveMonitoring?${$.param(params)}`;
    window.open(url, '_blank');
  }

  /**
   * Set the treemap state based on the data. The data maybe a child node in the tree.
   * @param data
   */
  setTreemap(data, props) {
    const schema = props.treeMapScheme || this.props.treeMapScheme;
    const meta = props.instanceMetaData || this.props.instanceMetaData;
    const stats = props.instanceStatsJson || this.props.instanceStatsJson;

    const navHeight = this.navHeight;
    const width = this.$container.width();
    const height = this.$container.height() - navHeight;

    const x = d3.scale.linear().domain([0, width]).range([0, width]);
    const y = d3.scale.linear().domain([0, height]).range([0, height]);

    data.x = data.y = 0;
    data.dx = width;
    data.dy = height;
    data.depth = 0;

    const layout = (d) => {
      if (d._children) {
        this.treemap.nodes({ _children: d._children });
        d._children.forEach((c) => {
          c.x = d.x + c.x * d.dx;
          c.y = d.y + c.y * d.dy;
          c.dx *= d.dx;
          c.dy *= d.dy;
          c.parent = d;
          layout(c);
        });
      }
    };
    const rect = (r) => {
      r.attr('x', d => x(d.x))
        .attr('y', d => y(d.y))
        .attr('width', d => x(d.x + d.dx) - x(d.x))
        .attr('height', d => y(d.y + d.dy) - y(d.y));
    };
    const name = d => (d.parent ? `${name(d.parent)
    } / ${
    (meta[d.name] && meta[d.name].tagName) ? (meta[d.name].tagName) : d.name}` : ((meta[d.name] && meta[d.name].tagName) ? (meta[d.name].tagName) : d.name));

    // Set up the new layout for the data
    layout(data);

    const faux = ReactFauxDOM.createElement('svg');
    const svg = d3.select(faux)
      .attr({ width, height: height + navHeight - 5 })
      .append('g')
      .attr('transform', `translate(0, ${navHeight})`);

    // Display navbar to back to parent node on click
    const navbar = svg.append('g').attr('class', 'navbar');
    // const twidth = 180;
    const twidth = 180;

    // Add a link to open instance chart view
    if (true || (data.type === 'instance' && data.containers === 0) || data.type === 'container') {
      navbar.append('rect')
        .attr({ y: -navHeight, width: Math.max(width - twidth, 0), height: navHeight })
        .datum(data.parent).on('click', this.handleTileClick);
      navbar.append('rect')
        .attr({ x: width - twidth, y: -navHeight, width: twidth, height: navHeight, class: 'navbar-button', })
        .datum(data).on('click', this.showInstanceChart);
      navbar.append('text')
        .attr({ x: width - twidth + 20, y: 12 - navHeight, dy: '1em' })
        .text('Line Charts');
    } else {
      navbar.append('rect')
        .attr({ y: -navHeight, width, height: navHeight })
        .datum(data.parent).on('click', this.handleTileClick);
    }

    navbar.append('text')
      .attr({ x: 12, y: 12 - navHeight, dy: '1em' })
      .text(name(data));

    const g1 = svg.insert('g', '.navbar').datum(data).attr('class', 'depth');
    const g = g1.selectAll('g').data(data._children).enter().append('g');

    g.filter(d => !_.isEmpty(d._children)).classed('children', true).on('click', this.handleTileClick);
    g.selectAll('.child').data(d => d._children || [d])
      .enter().append('rect')
      .attr('class', 'child')
      .call(rect);

    // this is mouse over popup text, no chopping
    if (schema === 'anomaly') {
      g.append('rect').attr('class', d => `parent ${d.type}`)
        .call(rect)
        .append('title')
        .text(d => `${(meta[d.name] && meta[d.name].tagName) ? (meta[d.name].tagName) : d.name}${(d.type === 'instance' && d.instanceType) ? (":"+d.instanceType) : ""} \n ${d.eventType}`);
    } else if (schema === 'cpu') {
      g.append('rect').attr('class', d => `parent ${d.type}`)
        .call(rect)
        .append('title')
        .text(d => (d.dx > 0 && d.dy > 0) ? (`${(meta[d.name] && meta[d.name].tagName) ? (meta[d.name].tagName) : d.name}${(d.type === 'instance' && d.instanceType) ? (":"+d.instanceType) : ""} \n ${stats[d.name] ? `Average CPU Utilization: ${(Math.round(stats[d.name].AvgCPUUtilization * 10) / 10).toString()}%` : ''}`) : '');
    } else if (schema === 'availability') {
      g.append('rect').attr('class', d => `parent ${d.type}`)
        .call(rect)
        .append('title')
        .text(d => (d.dx > 0 && d.dy > 0) ? (`${(meta[d.name] && meta[d.name].tagName) ? (meta[d.name].tagName) : d.name}${(d.type === 'instance' && d.instanceType) ? (":"+d.instanceType) : ""} \n ${stats[d.name] ? `Average Instance Availability: ${(Math.round(stats[d.name].AvgInstanceUptime * 1000) / 10).toString()}%` : ''}`) : '');
    }

    g.selectAll('.parent').attr('fill', d => this.getNodeFillColor(d, props));
    g.append('text').attr('dy', '.75em').text(
      d => ((d.dx > 0 && d.dy > 0) ? ((meta[d.name] && meta[d.name].tagName) ?
        (this.chopString(meta[d.name].tagName, 8)) : d.name) : ''),
    ).call((t) => {
      t.attr('x', d => x(d.x) + 6).attr('y', d => y(d.y) + 6);
    });
    if (schema === 'anomaly') {
      g.append('text').attr('dy', '.75em').text(d => this.chopString(d.eventType, 10)).call((t) => {
        t.attr({ x: d => x(d.x) + 6, y: d => y(d.y + d.dy / 2) });
      });
    } else if (schema === 'cpu') {
      g.append('text').attr('dy', '.75em').text(d => ((stats[d.name] && stats[d.name].AvgCPUUtilization) ? `${(Math.round(stats[d.name].AvgCPUUtilization * 10) / 10).toString()}%` : '')).call((t) => {
        t.attr({ x: d => x(d.x) + 6, y: d => y(d.y + d.dy / 2) });
      });
    } else if (schema === 'availability') {
      g.append('text').attr('dy', '.75em').text(d => ((stats[d.name] && stats[d.name].AvgInstanceUptime) ? `${(Math.round(stats[d.name].AvgInstanceUptime * 1000) / 10).toString()}%` : '')).call((t) => {
        t.attr({ x: d => x(d.x) + 6, y: d => y(d.y + d.dy / 2) });
      });
    }

    // Bind event for metric
    g.selectAll('.metric').on('click', this.showMetricChart);

    this.setState({ faux: faux.toReact() });
  }

  @autobind
  handleWindowResize() {
    this.displayData(this.props);
  }

  render() {
    const { faux, showMetricModal, metricModalProps } = this.state;
    return (
      <div className="incidents treemap">
        <WindowResizeListener onResize={this.handleWindowResize} />
        <div
          ref={(c) => { this.$container = $(c); }}
          style={{ height: '100%', width: '100%' }}
        >{faux}</div>
        { showMetricModal &&
        <MetricModal {...metricModalProps} onClose={this.hideMetricModal} />
        }
      </div>
    );
  }
}

export default IncidentsTreeMap;
