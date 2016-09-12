import React, {Component, PropTypes as T} from 'react';
import {autobind} from 'core-decorators';
import _ from 'lodash';
import * as d3 from 'd3';
import $ from 'jquery';
import ReactFauxDOM from 'react-faux-dom';

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
      faux: null,
    }
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.data) && this.$container) {
      const root = _.cloneDeep(this.props.data);
      this.transformData(root);
      this.displayData(root);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.data) && this.$container) {
      const root = _.cloneDeep(nextProps.data);
      this.transformData(root);
      this.displayData(root);
    }
  }

  /**
   * Transform the data into the format used by d3 treemap.
   * @param root: The root of the data tree.
   */
  transformData(root) {
    // Accumulate the node value to the count of children.
    const accumulate = d => {
      return (d._children = d.children)
        ? d.value = d.children.reduce(function (p, v) {
        return p + accumulate(v);
      }, 0)
        : d.value;
    };
    accumulate(root);
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
    navbar.append("rect").attr({ y: -navHeight, width: width, height: navHeight, });
    navbar.append("text")
      .attr({x: 6, y: 6 - navHeight, dy: '1em'})
      .text(name(data));
    navbar.datum(data.parent).on('click', this.displayData);

    const g1 = svg.insert("g", '.navbar').datum(data).attr("class", "depth");
    const g = g1.selectAll("g").data(data._children).enter().append("g");

    g.filter(d => !_.isEmpty(d._children)).classed('children', true).on('click', this.displayData);
    g.selectAll(".child").data(d => d._children || [d])
      .enter().append('rect')
      .attr('class', 'child')
      .call(rect);

    g.append("rect").attr("class", "parent")
      .call(rect)
      .append("title").text(d => d.name);
    g.selectAll('.parent').filter(d => d.error).classed('error', true);
    g.append("text").attr("dy", ".75em").text(d => d.name).call( t => {
      t.attr("x", d => x(d.x) + 6).attr("y", d => y(d.y) + 6);
    });
    g.append("text").attr("dy", ".75em").text(d => d.text).call( t => {
      t.attr({x: d => x(d.x) + 6, y: d => y(d.y + d.dy / 2)});
    });

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
