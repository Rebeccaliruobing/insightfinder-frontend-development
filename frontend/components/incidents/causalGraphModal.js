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
    loadGroup: T.bool,
  }

  static defaultProps = {
    loadGroup: false,
  }

  constructor(props) {
    super(props);

    this.container = null;
    this.containerOffsetHeight = 120;
    this.nodeSize = 7;

    this.weightMapper = R.compose(
      R.sort((a, b) => b - a),
      R.uniq,
      R.map(R.prop('weight')),
    );

    const minCount = 1;
    const maxCount = 1;
    this.state = {
      loading: true,
      containerHeight: $(window).height() - this.containerOffsetHeight,
      threshold: '3.0',
      relations: {},
      correlations: [],
      maxCount,
      minCount,
      filterRange: [minCount, maxCount],
      showCorrelations: true,
    };
  }

  componentDidMount() {
    this.retrieveData(this.props);
  }

  componentWillMount() {
    this.cleanChart();
  }

  @autobind
  cleanChart() {
    if (this.container) {
      d3.select(this.container).select('svg').remove();
    }
  }

  @autobind
  getWeightRange(relations, correlations, showCorrelations) {
    let minCount = 1;
    let maxCount = 1;

    let weights = this.weightMapper(relations);
    if (weights.length > 0) {
      maxCount = parseInt(weights[0], 10);
      minCount = parseInt(weights[weights.length - 1], 10);
    }

    if (showCorrelations) {
      weights = this.weightMapper(correlations);
      if (weights.length > 0) {
        const max = parseInt(weights[0], 10);
        const min = parseInt(weights[weights.length - 1], 10);
        maxCount = R.max(maxCount, max);
        minCount = R.min(minCount, min);
      }
    }

    return { minCount, maxCount };
  }

  @autobind
  getTopestWeights(relations) {
    // Get the topest weight based on percent.
    const total = relations.length;
    const weights = this.weightMapper(relations);

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

    return [strong, vstrong];
  }

  @autobind
  renderGraph() {
    this.cleanChart();

    let { relations, correlations } = this.state;
    const { filterRange, showCorrelations } = this.state;

    const weightFilter = R.filter(
      r => (r.weight >= filterRange[0] && r.weight <= filterRange[1]),
    );
    relations = weightFilter(relations);
    correlations = showCorrelations ? weightFilter(correlations) : [];

    const g = new dagre.graphlib.Graph({ multigraph: true });

    // Change graph layout
    g.setGraph({
      rankdir: 'LR', align: 'DR', ranksep: 50, nodesep: 30, edgesep: 10, marginx: 20, marginy: 20,
    });

    const addNodes = (g, rels, fsrc, ftarget, existNames) => {
      const names = R.uniq(R.concat(
        R.map(fsrc, rels), R.map(ftarget, rels),
      ));
      R.forEach((name) => {
        if (!R.find(n => n === name)(existNames)) {
          g.setNode(name, {
            title: name, label: chopString(name, 16), name, width: 120, height: 0,
          });
        }
      }, names);

      return names;
    };

    // Add relation and correlation nodes
    const names = addNodes(g, relations, o => o.src, o => o.target, []);
    if (showCorrelations) {
      addNodes(g, correlations, o => o.elem1, o => o.elem2, names);
    }

    const getWeightClass = (weight, strong, vstrong) => {
      if (R.indexOf(weight, vstrong) >= 0) {
        return 'very-strong';
      } else if (R.indexOf(weight, strong) >= 0) {
        return 'strong';
      }
      return '';
    };

    const getLabel = (data, detail = true) => {
      const { labelObj } = data;
      if (labelObj) {
        const texts = [];
        R.forEachObjIndexed((val, key) => {
          const name = key.split(',').slice(-2).map(str => (detail ? str : str[0])).join(',');
          texts.push(`(${name}),${val}`);
        }, labelObj);
        return texts.join('\n');
      }
      return 'N/A';
    };

    // Create edges for relations
    const addEdges = (g, rels, fsrc, ftarget, type) => {
      const [strong, vstrong] = this.getTopestWeights(rels);
      R.forEach((rel) => {
        const { weight } = rel;
        const src = fsrc(rel);
        const target = ftarget(rel);
        if (src === target) {
          console.warn(`Self link:${src} => ${target}`);
        } else {
          g.setEdge(src, target, {
            label: getLabel(rel),
            // label: `\uF05A ${getLabel(rel)}`,
            class: `${type} ${getWeightClass(weight, strong, vstrong)}`,
            arrowhead: type === 'relation' ? 'vee' : 'double',
            weight,
            labelpos: 'l',
            data: rel,
            labeloffset: 4,
          }, type);
        }
      }, rels);
    };
    addEdges(g, relations, o => o.src, o => o.target, 'relation');
    if (showCorrelations) {
      addEdges(g, correlations, o => o.elem1, o => o.elem2, 'correlation');
    }

    const svg = d3.select(this.container).append('svg');
    const inner = svg.append('g');
    const render = dagreD3.render();
    render(inner, g);

    // Add title for node
    svg.selectAll('.node')
      .append('svg:title').text(d => g.node(d).name);

    // Add title for edge
    svg.selectAll('.edgeLabel')
      .append('svg:title').text((d) => {
        const edge = g.edge(d);
        return getLabel(edge.data);
      });

    // Hidden the rect.
    svg.selectAll('.node rect').attr({
      visibility: 'hidden',
    });

    let { width, height } = g.graph();
    width = width <= 0 ? 10 : width;
    height = height <= 0 ? 10 : height;
    svg.attr({ width, height, viewBox: `0 0 ${width} ${height}` });
  }

  @autobind
  retrieveData(props) {
    const { projectName, loadGroup, instanceGroup, endTime, numberOfDays } = props;

    retrieveEventData(projectName, loadGroup, instanceGroup, endTime, numberOfDays).then((data) => {
      const { threshold, showCorrelations } = this.state;

      const allRelations = loadGroup ?
        data.eventsCausalRelation || {} :
        JSON.parse(data.causalRelation || '{}');
      const relations = allRelations[threshold.toString()] || [];

      const correlations = loadGroup ?
        data.eventsCorrelation || [] :
        JSON.parse(data.correlation || '[]');

      const { minCount, maxCount } = this.getWeightRange(
        relations, correlations, showCorrelations);

      this.setState({
        loading: false,
        allRelations,
        relations,
        correlations,
        minCount,
        maxCount,
        filterRange: [minCount, maxCount],
      }, () => {
        if (relations.length > 0 || correlations.length > 0) {
          this.renderGraph(relations, correlations);
        }
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
        // Trigger window resize event to change the size of modal window.
        $(window).trigger('resize');
      });
    }
  }

  @autobind
  handleThresholdChange(v) {
    const { allRelations, showCorrelations } = this.state;
    const relations = allRelations[v.toString()] || [];
    const { correlations } = this.state;
    const { minCount, maxCount } = this.getWeightRange(
      relations, correlations, showCorrelations);

    // Only reset for relations as it's related with threshold.
    this.setState({
      threshold: v,
      relations,
      minCount,
      maxCount,
      filterRange: [minCount, maxCount],
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  handleSliderChange(range) {
    this.setState({
      filterRange: range,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  handleShowCorrelationsChange(e) {
    const checked = e.target.checked;
    const { relations, correlations } = this.state;
    const { minCount, maxCount } = this.getWeightRange(
      relations, correlations, checked);
    this.setState({
      showCorrelations: checked,
      minCount,
      maxCount,
      filterRange: [minCount, maxCount],
    }, () => {
      this.renderGraph();
    });
  }

  render() {
    const rest = R.omit([
      'projectName', 'loadGroup', 'instanceGroup', 'endTime', 'numberOfDays',
    ], this.props);
    const { loading, containerHeight, threshold, relations,
      minCount, maxCount, showCorrelations, correlations, filterRange } = this.state;

    const step = Math.floor(maxCount / 10) || 1;

    return (
      <Modal {...rest} size="big" closable>
        <WindowResizeListener onResize={this.handleWindowResize} />
        <div
          className={`causal-graph content flex-col-container ${loading ? 'ui container loading' : ''}`}
          style={{ height: containerHeight }}
        >
          <div style={{ fontSize: 12, paddingBottom: 8, marginBottom: 8, borderBottom: '1px solid #ddd' }}>
            <span
              style={{ verticalAlign: 'middle', paddingRight: '1em', fontWeight: 'bold' }}
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
            <div style={{ paddingLeft: '2em', display: 'inline-block' }}>
              <input
                type="checkbox" checked={showCorrelations}
                onChange={this.handleShowCorrelationsChange}
              />
              <span style={{ fontWeight: 'bold', paddingLeft: '0.5em' }}>Show Correlation</span>
            </div>
            {(relations.length > 0 || correlations.length > 0) &&
              <div style={{ float: 'right', paddingTop: 4 }}>
                <span style={{ verticalAlign: 'middle', fontWeight: 'bold', padding: '0 1em' }}>Filter by count:</span>
                <span
                  style={{ fontSize: 12, fontWeight: 'bold', padding: '0 1em 0 0', color: 'rgba(0, 0, 139, 1)' }}
                >{minCount}</span>
                <div style={{ display: 'inline-block', width: 240, verticalAlign: 'middle' }}>
                  <Range
                    min={minCount} max={maxCount} step={step}
                    value={filterRange}
                    defaultValue={[minCount, maxCount]} onChange={this.handleSliderChange}
                  />
                </div>
                <span
                  style={{ fontSize: 12, fontWeight: 'bold', padding: '0 0 0 1em', color: '#DB2828' }}
                >{maxCount}</span>
              </div>
            }
          </div>
          {((relations.length === 0 && showCorrelations && correlations.length === 0) ||
            (!showCorrelations && relations.length === 0)) &&
            <h4 style={{ margin: '0.5em 0' }}>No event causal relation or correlation found!</h4>
          }
          <div className="d3-container" ref={(c) => { this.container = c; }} />
        </div>
      </Modal>
    );
  }
}

export default CausalGraphModal;
