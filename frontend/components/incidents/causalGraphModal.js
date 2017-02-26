/* eslint-disable no-console */
import React, { PropTypes as T } from 'react';
import $ from 'jquery';
import R from 'ramda';
import { autobind } from 'core-decorators';
import * as d3 from 'd3';
import dagre from 'dagre';
import { Modal, Dropdown } from '../../artui/react';
import retrieveEventData from '../../apis/retrieve-event-data';
import dagreD3 from '../ui/dagre-d3';
import WindowResizeListener from '../ui/window-resize-listener';

const chopString = (str, n) => (str.length <= (n + 2) ? str : `${str.slice(0, n)}..`);

class CausalGraphModal extends React.Component {
  static propTypes = {
    projectName: T.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.container = null;
    this.containerOffsetHeight = 120;
    this.nodeSize = 7;

    this.state = {
      containerHeight: $(window).height() - this.containerOffsetHeight,
      threshold: '3',
      loading: true,
      allRelations: {},
    };
  }

  componentDidMount() {
    this.retrieveData(this.props);
  }

  componentWillMount() {
    if (this.container) {
      d3.select(this.container).select('svg').remove();
    }
  }

  @autobind
  renderGraph(threshold) {
    const { allRelations } = this.state;
    const relations = allRelations[threshold.toString()] || [];

    // Remove the old svg
    d3.select(this.container).select('svg').remove();

    // Add nodes and edges to dagre graph
    const g = new dagre.graphlib.Graph();

    // Change graph layout
    g.setGraph({
      rankdir: 'LR', align: 'DL', ranksep: 30, nodesep: 30, edgesep: 0, marginx: 20, marginy: 20,
    });

    // Create node for src and target
    const names = R.uniq(R.concat(
      R.map(o => o.src, relations),
      R.map(o => o.target, relations),
    ));
    R.forEach((name) => {
      g.setNode(name, {
        title: name,
        label: chopString(name, 16),
        name,
        width: 120,
        height: 0,
      });
    }, names);

    const classByWeight = (weight) => {
      if (weight >= 2 && weight < 5) {
        return 'strong';
      } else if (weight >= 5) {
        return 'very-strong';
      }
      return '';
    };

    // Create edges for each link and remove self link
    R.forEach((rel) => {
      const { src, target, weight } = rel;

      if (src === target) {
        console.warn(`Removed self link:${src}`);
      } else {
        g.setEdge(src, target, {
          label: `weight=${weight}`,
          class: classByWeight(weight),
          weight,
          labelpos: 'l',
          labeloffset: 4,
        });
      }
    }, relations);

    const svg = d3.select(this.container).append('svg');
    const inner = svg.append('g');
    const render = dagreD3.render();
    render(inner, g);

    // Add title for node
    svg.selectAll('.node')
      .append('svg:title').text(d => d);

    // Change the cell size
    svg.selectAll('.node rect').attr({
      width: this.nodeSize,
      height: this.nodeSize,
      y: -1 * (this.nodeSize / 2),
    });

    const width = g.graph().width;
    const height = g.graph().height;
    svg.attr({ width, height, viewBox: `0 0 ${width} ${height}` });
  }

  @autobind
  retrieveData(props) {
    const { projectName } = props;
    retrieveEventData(projectName).then((data) => {
      const { threshold } = this.state;
      const allRelations = JSON.parse(data.causalRelation || '{}');
      this.setState({
        loading: false,
        allRelations,
      }, () => {
        this.renderGraph(threshold);
      });
    }).catch((msg) => {
      this.setState({ loading: false });
      console.log(msg);
    });
  }

  @autobind
  handleWindowResize({ windowHeight }) {
    const { containerHeight } = this.state;
    const height = windowHeight - this.containerOffsetHeight;
    if (Math.abs(containerHeight - height) > this.containerOffsetHeight / 2) {
      this.setState({
        containerHeight: windowHeight - this.containerOffsetHeight,
      }, () => {
        $(window).trigger('resize');
      });
    }
  }

  @autobind
  handleThresholdChange(v) {
    this.setState({
      threshold: v,
    }, () => {
      this.renderGraph(v);
    });
  }

  render() {
    const rest = R.omit(['projectName'], this.props);
    const { loading, containerHeight, threshold } = this.state;

    return (
      <Modal {...rest} size="big" closable>
        <WindowResizeListener onResize={this.handleWindowResize} />
        <div
          className={`causal-graph content flex-col-container ${loading ? 'ui container loading' : ''}`}
          style={{ height: containerHeight }}
        >
          <div style={{ paddingBottom: 8, marginBottom: 8, borderBottom: '1px solid #ddd' }}>
            <span
              style={{ display: 'inline-block', paddingRight: '1em', fontSize: 12, fontWeight: 'bold' }}
            >Time Thresholds for Causal Relationships (hour):</span>
            <Dropdown mode="select" className="mini" value={threshold} onChange={this.handleThresholdChange}>
              <i className="dropdown icon" />
              <div className="menu">
                <div className="item">1</div>
                <div className="item">2</div>
                <div className="item">3</div>
                <div className="item">4</div>
                <div className="item">5</div>
                <div className="item">6</div>
              </div>
            </Dropdown>
          </div>
          <div className="d3-container" ref={(c) => { this.container = c; }} />
        </div>
      </Modal>
    );
  }
}

export default CausalGraphModal;
