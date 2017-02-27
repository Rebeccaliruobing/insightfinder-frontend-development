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
    autoloadData: T.bool,
    eventsRelation: T.any,
  }
  
  static defaultProps = {
    autoloadData: true,
  }

  constructor(props) {
    super(props);

    this.container = null;
    this.containerOffsetHeight = 120;
    this.nodeSize = 7;

    this.state = {
      containerHeight: $(window).height() - this.containerOffsetHeight,
      threshold: '3.0',
      loading: props.autoloadData,
      allRelations: props.eventsRelation,
    };
  }

  componentDidMount() {
    const { autoloadData } = this.props;
    const { allRelations, threshold } = this.state;
    if (autoloadData) {
      this.retrieveData(this.props);
    } else {
      const relations = allRelations[threshold.toString()] || [];
      this.renderGraph(relations);
    }
  }

  componentWillMount() {
    if (this.container) {
      d3.select(this.container).select('svg').remove();
    }
  }

  @autobind
  renderGraph(relations) {
    // Remove the old svg
    d3.select(this.container).select('svg').remove();

    // Add nodes and edges to dagre graph
    const g = new dagre.graphlib.Graph();

    // Change graph layout
    g.setGraph({
      rankdir: 'LR', align: 'DR', ranksep: 50, nodesep: 30, edgesep: 10, marginx: 20, marginy: 20,
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

    // Get the topest line based on the weight
    const total = relations.length;
    const weights = R.sort(
      (a, b) => b - a,
      R.uniq(R.map(R.prop('weight'), relations)),
    );
    const vstrong = [];
    const strong = [];
    let count = 0;
    for (let i = 0; i < weights.length; i += 1) {
      count += R.filter(R.propEq('weight', weights[i]), relations).length;
      if (count / total < 0.2) {
        vstrong.push(weights[i]);
      }
      if (count / total < 0.55) {
        strong.push(weights[i]);
      }
    }
    if (weights.length > 1 && vstrong.length === 0) {
      vstrong.push(weights[0]);
    }

    const classByWeight = (weight) => {
      if (R.indexOf(weight, vstrong) >= 0) {
        return 'very-strong';
      } else if (R.indexOf(weight, strong) >= 0) {
        return 'strong';
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
          label: `${weight}`,
          class: classByWeight(weight),
          weight,
          labelpos: 'r',
          labeloffset: 8,
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

    // Hidden the rect.
    svg.selectAll('.node rect').attr({
      visibility: 'hidden',
      // width: this.nodeSize,
      // height: this.nodeSize,
      // y: -1 * (this.nodeSize / 2),
    });

    let { width, height } = g.graph();
    width = width <= 0 ? 10 : width;
    height = height <= 0 ? 10 : height;
    svg.attr({ width, height, viewBox: `0 0 ${width} ${height}` });
  }

  @autobind
  retrieveData(props) {
    const { projectName } = props;
    retrieveEventData(projectName).then((data) => {
      const { threshold } = this.state;
      const allRelations = JSON.parse(data.causalRelation || '{}');
      console.log(allRelations);
      this.setState({
        loading: false,
        allRelations,
      }, () => {
        const relations = allRelations[threshold.toString()] || [];
        this.renderGraph(relations);
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
      const { allRelations } = this.state;
      const relations = allRelations[v.toString()] || [];
      this.renderGraph(relations);
    });
  }

  render() {
    const rest = R.omit(['projectName', 'autoloadData', 'eventsRelation'], this.props);
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
                <div className="item" data-value="0.5">0.5</div>
                <div className="item" data-value="1.0">1</div>
                <div className="item" data-value="2.0">2</div>
                <div className="item" data-value="3.0">3</div>
                <div className="item" data-value="6.0">6</div>
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
