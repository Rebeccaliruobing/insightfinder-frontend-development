/* eslint-disable no-console */
import React, { PropTypes as T } from 'react';
import $ from 'jquery';
import R from 'ramda';
import { autobind } from 'core-decorators';
import * as d3 from 'd3';
import dagre from 'dagre';
import Slider from 'rc-slider';
import { Modal, Dropdown } from '../../artui/react';
import retrieveEventData from '../../apis/retrieve-event-data';
import dagreD3 from '../ui/dagre-d3';
import WindowResizeListener from '../ui/window-resize-listener';

const Range = Slider.Range;
const chopString = (str, n) => (str.length <= (n + 2) ? str : `${str.slice(0, n)}..`);

class CausalGraphModal extends React.Component {
  static propTypes = {
    projectName: T.string.isRequired,
    autoloadData: T.bool,
    eventsCausalRelation: T.any,
  }
  
  static defaultProps = {
    autoloadData: true,
  }

  constructor(props) {
    super(props);

    this.container = null;
    this.containerOffsetHeight = 120;
    this.nodeSize = 7;

    const allRelations = props.eventsCausalRelation || {};
    const threshold = '3.0';
    const relations = allRelations[threshold] || [];
    const { maxCount, minCount } = this.getWeightRange(relations);

    this.state = {
      containerHeight: $(window).height() - this.containerOffsetHeight,
      threshold,
      loading: props.autoloadData,
      allRelations,
      relations,
      maxCount,
      minCount,
      filterRange: [minCount, maxCount],
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

  getWeightRange(relations) {
    // Get the min/max for filter bar.
    let minCount = 0;
    let maxCount = 0;

    const weights = R.sort((a, b) => b - a,
      R.uniq(R.map(R.prop('weight'), relations)),
    );
    if (weights.length > 0) {
      maxCount = weights[0];
      minCount = weights[weights.length - 1];
    }

    return { minCount, maxCount };
  }

  @autobind
  renderGraph(relations) {
    const { filterRange } = this.state;
    relations = R.filter(
      r => (r.weight >= filterRange[0] && r.weight <= filterRange[1]),
      relations,
    );

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

    svg.selectAll('.edgePath')
      .append('svg:title').text((d) => {
        const { v, w } = d;
        const matches = R.filter(
          rel => rel.src === v && rel.target === w,
          relations,
        );

        if (matches.length > 0) {
          const metrics = R.map(
            m => `From metrics:\n${m.fromMetrics || ''}\nTo metrics:\n${m.toMetrics || ''}`,
            matches,
          );
          return metrics.join('\n');
        }
        return '';
      });

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
      const relations = allRelations[threshold.toString()] || [];
      const { minCount, maxCount } = this.getWeightRange(relations);
      if (relations.length > 0) {
        this.setState({
          loading: false,
          allRelations,
          relations,
          minCount,
          maxCount,
          filterRange: [minCount, maxCount],
        }, () => {
          this.renderGraph(relations);
        });
      } else {
        this.setState({
          loading: false,
          allRelations,
          relations,
        });
      }
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
    const { allRelations } = this.state;
    // Remove the old svg
    d3.select(this.container).select('svg').remove();

    const relations = allRelations[v.toString()] || [];
    if (relations.length > 0) {
      this.setState({
        threshold: v,
        relations,
      }, () => {
        this.renderGraph(relations);
      });
    } else {
      this.setState({
        threshold: v,
        relations,
      });
    }
  }

  @autobind
  handleSliderChange(range) {
    this.setState({
      filterRange: range,
    }, () => {
      const { relations } = this.state;
      this.renderGraph(relations);
    });
  }

  render() {
    const rest = R.omit(['projectName', 'autoloadData', 'eventsCausalRelation'], this.props);
    const { loading, containerHeight, threshold, relations,
      minCount, maxCount } = this.state;

    let step = 1;
    if (relations.length > 0) {
      step = Math.floor(maxCount / 10) || 1;
    }

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
            {relations.length > 0 &&
              <span style={{ fontSize: 12, fontWeight: 'bold', padding: '0 1em' }}>Filter by count:</span>
            }
            {relations.length > 0 &&
              <span style={{
                fontSize: 12,
                fontWeight: 'bold',
                padding: '0 1em 0 0',
                color: 'rgba(0, 0, 139, 1)',
              }}>{minCount}</span>
            }
            {relations.length > 0 &&
              <div style={{ display: 'inline-block', width: 300, verticalAlign: 'middle' }}>
                <Range
                  min={minCount} max={maxCount} step={step}
                  defaultValue={[minCount, maxCount]} onAfterChange={this.handleSliderChange}
                />
              </div>
            }
            {relations.length > 0 &&
              <span style={{
                fontSize: 12,
                fontWeight: 'bold',
                padding: '0 0 0 1em',
                color: '#DB2828',
              }}>{ maxCount }</span>
            }
          </div>
          {relations.length === 0 &&
            <h4 style={{ margin: '0.5em 0' }}>No causal relations found!</h4>
          }
          <div className="d3-container" ref={(c) => { this.container = c; }} />
        </div>
      </Modal>
    );
  }
}

export default CausalGraphModal;
