import React, {Component, PropTypes as T} from 'react';
import {autobind} from 'core-decorators';
import _ from 'lodash';
import * as d3 from 'd3';
import $ from 'jquery';
import ReactFauxDOM from 'react-faux-dom';

class IncidentsTreeMap extends Component {

  static propTypes = {
    margin: T.number,
    navHeight: T.number,
  };

  static defaultProps = {
    margin: 4,
    navHeight: 28,
  };

  constructor(props) {
    super(props);

    this.$container = null;

    // Container size
    this.width = undefined;
    this.height = undefined;

    // D3 scale for x, y
    this.x = undefined;
    this.y = undefined;

    this.svg = null;
    this.navbar = null;
    this.g1 = null;
    this.transitioning = false;

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
    this.setTreeMap(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setTreeMap(nextProps);
  }

  accumulate(d) {
    const self = this;
    return (d._children = d.children)
      ? d.value = d.children.reduce(function (p, v) {
      return p + self.accumulate(v);
    }, 0)
      : d.value;
  }

  layout(d) {
    const self = this;
    if (d._children) {
      this.treemap.nodes({ _children: d._children });
      d._children.forEach(function (c) {
        c.x = d.x + c.x * d.dx;
        c.y = d.y + c.y * d.dy;
        c.dx *= d.dx;
        c.dy *= d.dy;
        c.parent = d;
        self.layout(c);
      });
    }
  }

  @autobind
  display(d) {

    this.navbar.datum(d.parent)
      .on('click', this.transition)
      .select('text').text(this.name(d));

    var g1 = this.svg.insert("g", ".navbar")
      .datum(d)
      .attr("class", "depth");
    this.g1 = g1;

    var g = g1.selectAll("g").data(d._children).enter().append("g");
    g.filter(d => d._children).classed('children', true).on('click', this.transition);

    g.selectAll(".child").data(d => d._children || [d])
      .enter().append('rect')
      .attr('class', 'child')
      .call(this.rect);

    g.append("rect").attr("class", "parent")
      .call(this.rect)
      .append("title").text(d => d.name);
    g.selectAll('.parent').filter(d => d.error).classed('error', true);
    g.append("text").attr("dy", ".75em").text(d => d.name).call(this.text);

    return g;
  }

  @autobind
  rect(rect) {
    rect
      .attr("x", d => this.x(d.x))
      .attr("y", d => this.y(d.y))
      .attr("width", d => this.x(d.x + d.dx) - this.x(d.x))
      .attr("height", d => this.y(d.y + d.dy) - this.y(d.y));
  }

  @autobind
  text(text) {
    text
      .attr("x", d => this.x(d.x) + 6)
      .attr("y", d => this.y(d.y) + 6);
  }

  @autobind
  name(d) {
    return d.parent
      ? this.name(d.parent) + "." + d.name
      : d.name;
  }

  @autobind
  transition(d) {
    if (this.transitioning || !d) return;
    this.transitioning = true;

    const g2 = this.display(d);
    const t1 = this.g1.transition().duration(750);
    const t2 = g2.transition().duration(750);

    // Update the domain only after entering new elements.
    this.x.domain([d.x, d.x + d.dx]);
    this.y.domain([d.y, d.y + d.dy]);

    // Enable anti-aliasing during the transition.
    this.svg.style("shape-rendering", null);

    // Draw child nodes on top of parent nodes.
    this.svg.selectAll(".depth").sort((a, b) => a.depth - b.depth);

    // Fade-in entering text.
    g2.selectAll("text").style("fill-opacity", 0);

    // Transition to the new view.
    t1.selectAll("text").call(this.text).style("fill-opacity", 0);
    t2.selectAll("text").call(this.text).style("fill-opacity", 1);
    t1.selectAll("rect").call(this.rect);
    t2.selectAll("rect").call(this.rect);

    // Remove the old node when the transition is finished.
    t1.remove().each("end", () => {
      this.svg.style("shape-rendering", "crispEdges");
      this.transitioning = false;
    });

    // this.setState({
    //   faux: this.svg.node().toReact(),
    // });
  }

  setTreeMap(props) {

    if (!_.isEmpty(props.data) && this.$container) {

      /// Clone the data since it will be changed by d3 treemap.
      const data = _.cloneDeep(props.data);
      console.log(data);

      const { navHeight } = props;
      const width = this.$container.width();
      const height = this.$container.height() - navHeight;

      this.width = width;
      this.height = height;

      this.x = d3.scale.linear().domain([0, width]).range([0, width]);
      this.y = d3.scale.linear().domain([0, height]).range([0, height]);

      const faux = ReactFauxDOM.createElement('svg');

      const svg = d3.select(faux)
        .attr({ width, height: height + navHeight })
        .append("g")
        .attr("transform", `translate(0, ${navHeight})`);
      this.svg = svg;

      // Create a navigator bar to display the path and navigate back.
      const navbar = svg.append("g").attr("class", "navbar");
      navbar.append("rect").attr({ y: -navHeight, width: width, height: navHeight, });
      navbar.append("text").attr("x", 6).attr("y", 6 - navHeight).attr("dy", "1em");
      this.navbar = navbar;

      // Setup treemap options for root of data
      data.x = data.y = 0;
      data.dx = width;
      data.dy = height;
      data.depth = 0;

      this.accumulate(data);
      this.layout(data);
      this.display(data);

      this.setState({
        faux: faux.toReact()
      })
    }
  }

  render() {
    const { margin } = this.props;

    return (
      <div className="incidents treemap">
        <div ref={c => this.$container = $(c)}
             style={{ padding: margin, height: '100%', width: '100%' }}>
          {this.state.faux}
        </div>
      </div>
    )
  }
}

export default IncidentsTreeMap;
