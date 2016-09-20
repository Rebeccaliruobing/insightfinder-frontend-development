import React, {Component, PropTypes as T} from 'react';
import {autobind} from 'core-decorators';
import _ from 'lodash';
import * as d3 from 'd3';
import $ from 'jquery';
import ReactFauxDOM from 'react-faux-dom';

// Remove lighten color from RdYlGn11
const RdYlGn11 = ["#a50026","#d73027","#f46d43","#fdae61","#fee08b",
  "#d9ef8b","#a6d96a","#66bd63","#1a9850","#006837"].reverse();

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
    this.color = null;

    this.state = {
      faux: null,
      startTimestamp:undefined,
      endTimestamp:undefined,
    }
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.data) && this.$container) {
      const root = _.cloneDeep(this.props.data);
      this.transformData(root);
      this.displayData(root);
    }
  }

  @autobind
  showMetricChart(d) {
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
    window.open(`/projectDataOnly?${$.param(params)}`, '_blank');
  }

  @autobind
  showInstanceChart(d) {
    let { startTimestamp,endTimestamp } = this.state;
    let params = {
      projectName: d['projectName'],
      instanceName: d['instanceName']
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
      this.displayData(root);
      this.setState({
        startTimestamp:root.startTimestamp,
        endTimestamp:root.endTimestamp,
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

    // We get the max score on the root, so we can setup the color.
    this.color = this.severityToRGBHex;
    //this.color = d3.scale.quantize().domain([0, Math.log(root.score || 1) || 1]).range(RdYlGn11);
  }

  transformDataOld(root) {

    const maxScore = d => {
      let s = 0;
      if (d.children) {
        s = d3.max(d.children, c => maxScore(c))
      } else {
        s = d.score;
      }
      d.score = s;
      return s;
    };
    maxScore(root);

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

    // We get the max score on the root, so we can setup the color.
    this.color = d3.scale.quantize().domain([0, Math.log(root.score || 1) || 1]).range(RdYlGn11);
  }

  rootToRGBHex(root) {
    let val = root.score / root.value;
    return severityToRGBHex(val);
  }

  severityToRGBHex(val) {
    var rcolor, gcolor, bcolor = 0;
    if (val <= 1) {
        if (val < 0) val = 0;
        rcolor = Math.floor(255 * val);
        gcolor = 255;
    } else {
        if (val > 10) val = 10;
        rcolor = 255;
        gcolor = Math.floor(255 - (val - 1) / 9 * 255);
    }
    return "#" + ((1 << 24) + (rcolor << 16) + (gcolor << 8) + bcolor).toString(16).slice(1);
  }

  /**
   * Display the data. Data maybe a child node in the tree.
   * @param data
   */
  @autobind
  displayData(data) {
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
    const name = d => d.parent ? name(d.parent) + " / " + d.name : d.name;

    // Set up the new layout for the data
    layout(data);

    const faux = ReactFauxDOM.createElement('svg');
    const svg = d3.select(faux)
      .attr({ width, height: height + navHeight })
      .append("g")
      .attr("transform", `translate(0, ${navHeight})`);

    // Display navbar to back to parent node on click
    const navbar = svg.append("g").attr("class", "navbar");
    const twidth = 180;

    // Add a link to open instance chart view
    if ((data.type === 'instance' && data.containers == 0) || data.type === 'container') {
      navbar.append("rect")
        .attr({ y: -navHeight, width: width - twidth, height: navHeight, })
        .datum(data.parent).on('click', this.displayData);
      navbar.append("rect")
        .attr({ x: width - twidth, y: -navHeight, width: twidth, height: navHeight })
        .datum(data).on('click', this.showInstanceChart);
      navbar.append("text")
        .attr({x: width - twidth + 20, y: 6 - navHeight, dy: '1em' })
        .text('Instance Line Chart');
    } else {
      navbar.append("rect")
        .attr({ y: -navHeight, width: width, height: navHeight, })
        .datum(data.parent).on('click', this.displayData);
    }

    navbar.append("text")
      .attr({x: 6, y: 6 - navHeight, dy: '1em'})
      .text(name(data));

    const g1 = svg.insert("g", '.navbar').datum(data).attr("class", "depth");
    const g = g1.selectAll("g").data(data._children).enter().append("g");

    g.filter(d => !_.isEmpty(d._children)).classed('children', true).on('click', this.displayData);
    g.selectAll(".child").data(d => d._children || [d])
      .enter().append('rect')
      .attr('class', 'child')
      .call(rect);

    g.append("rect").attr("class", d => "parent " + d.type)
      .call(rect)
      .append("title").text(d => d.name);
    g.selectAll('.parent').attr('fill', d => this.color(d.score));
//    g.selectAll('.parent').attr('fill', d => this.color(Math.log(d.score || 1)));
    g.append("text").attr("dy", ".75em").text(d => d.name).call( t => {
      t.attr("x", d => x(d.x) + 6).attr("y", d => y(d.y) + 6);
    });
    g.append("text").attr("dy", ".75em").text(d => d.score > 0 ? d.score.toFixed(2) : '').call( t => {
      t.attr({x: d => x(d.x) + 6, y: d => y(d.y + d.dy / 2)});
    });

    // Bind event for metric
    g.selectAll('.metric').on('click', this.showMetricChart);

    this.setState({faux: faux.toReact()});
  }

  render() {
    return (
      <div className="incidents treemap">
        <div ref={c => this.$container = $(c)}
             style={{ padding: 4, height: '100%', width: '100%' }}>
          {this.state.faux}
        </div>
      </div>
    )
  }
}

export default IncidentsTreeMap;
