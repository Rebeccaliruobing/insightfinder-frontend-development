/* eslint-disable no-console */
/* eslint-disable object-property-newline */
import React, { PropTypes as T } from 'react';
import $ from 'jquery';
import R from 'ramda';
import _ from 'lodash';
import { autobind } from 'core-decorators';
import * as d3 from 'd3';
import dagre from 'dagre';
import Slider from 'rc-slider';
import { Modal, Dropdown } from '../../artui/react';
import retrieveEventData from '../../apis/retrieve-event-data';
import dagreD3 from '../ui/dagre-d3';
import WindowResizeListener from '../ui/window-resize-listener';

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
    this.containerOffsetWidth = 100;
    this.nodeSize = 7;

    this.weightMapper = R.compose(
      R.sort((a, b) => b - a),
      R.uniq,
      R.map(R.prop('weight')),
    );

    this.state = {
      loading: true,
      activeTab: 'relation',
      containerHeight: $(window).height() - this.containerOffsetHeight,
      containerWidth: $(window).width() - this.containerOffsetWidth,
      allRelations: {},
      kpis: [],
      relations: [],
      metricNameMap: {},
      threshold: '2.0',
      minRelationWeight: 0.0,
      maxRelationWeight: 1.0,
      relationFilterWeight: 0.0,
      correlations: [],
      minCorrelationWeight: 0.0,
      maxCorrelationWeight: 1.0,
      correlationFilterWeight: 0.0,
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
  getWeightRange(relations) {
    let minWeight = 0.0;
    let maxWeight = 1.0;

    return [minWeight, maxWeight];
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

    const { relations, correlations, metricNameMap, kpis } = this.state;
    const { activeTab, relationFilterWeight, correlationFilterWeight } = this.state;

    const showRelations = activeTab === 'relation';
    const filterCount = showRelations ? relationFilterWeight : correlationFilterWeight;

    const srcProp = showRelations ? o => o.src : o => o.elem1;
    const targetProp = showRelations ? o => o.target : o => o.elem2;

    // Filter the relations based on the selected range
    let rels = showRelations ? relations : correlations;
    const weightFilter = R.filter(r => (r.weight >= filterCount));
    rels = weightFilter(rels) || [];

    const g = new dagre.graphlib.Graph({ multigraph: true });

    // Change graph layout
    g.setGraph({
      rankdir: 'LR', align: 'DR', ranker: 'tight-tree',
      ranksep: 100, nodesep: 50, edgesep: 10, marginx: 20, marginy: 20,
    });

    const addNodes = (g, rels, fsrc, ftarget, existNames) => {
      const names = R.uniq(R.concat(
        R.map(fsrc, rels), R.map(ftarget, rels),
      ));
      R.forEach((name) => {
        if (!R.find(n => n === name)(existNames)) {
          g.setNode(name, {
            title: name, label: chopString(name, 30), name, width: -6, height: -6,
            shape: 'circle',
          });
        }
      }, names);

      return names;
    };

    addNodes(g, rels, srcProp, targetProp, []);

    const getWeightClass = (weight, strong, vstrong) => {
      if (R.indexOf(weight, vstrong) >= 0) {
        return 'very-strong';
      } else if (R.indexOf(weight, strong) >= 0) {
        return 'strong';
      }
      return '';
    };

    const getLabel = (data, detail = false) => {
      const { labelObj } = data;
      if (labelObj) {
        let texts = [];
        if (data.probability) {
          texts.push(`<div>Probability: ${(data.probability * 100).toFixed(1)}%</div>`);
        }
        if (detail) {
          R.forEachObjIndexed((val, key) => {
            const name = key.split(',').slice(-2).join(', ');
            texts.push(`(${name}), ${val}`);
          }, labelObj);
        } else {
          const ms = [];
          R.forEachObjIndexed((val, key) => {
            let [src, target] = key.split(',').slice(-2);
            src = metricNameMap[src] || src;
            target = metricNameMap[target] || target;
            const srcIsKpi = !!(R.find(s => s === src, kpis));
            const targetIsKpi = !!(R.find(s => s === target, kpis));

            let metric = R.find(m => m.src === src && m.target === target, ms);
            if (!metric) {
              metric = { src, target, count: parseInt(val, 10), srcIsKpi, targetIsKpi };
              ms.push(metric);
            } else {
              metric.count += parseInt(val, 10);
            }
          }, labelObj);
          const labelText = R.map(
            m => `<div>(<span class="${m.srcIsKpi ? 'kpi' : ''}">${m.src}</span>, <span class="${m.targetIsKpi ? 'kpi' : ''}">${m.target}</span>)`,
            ms,
          );
          texts = texts.concat(labelText);
        }
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
          const meta = {
            label: getLabel(rel),
            labelType: 'html',
            class: `${type} ${getWeightClass(weight, strong, vstrong)}`,
            arrowhead: type === 'relation' ? 'vee' : 'double',
            weight,
            labelpos: 'l',
            data: rel,
            labeloffset: 0,
          };
          g.setEdge(src, target, meta, type);
        }
      }, rels);
    };
    addEdges(g, rels, srcProp, targetProp, activeTab);

    const svg = d3.select(this.container).append('svg');
    const inner = svg.append('g');
    const render = dagreD3.render();
    render(inner, g);

    // Add title for node
    svg.selectAll('.node')
      .append('svg:title').text(d => g.node(d).name);

    // Change node fill.
    svg.selectAll('.node circle').attr({
      fill: '#1976d2',
    });

    let { width, height } = g.graph();
    width = width <= 0 ? 10 : width;
    height = height <= 0 ? 10 : height;
    svg.attr({
      width: width + 200, height: height + 30,
      viewBox: `0 0 ${width} ${height}`,
    });
  }

  @autobind
  retrieveData(props) {
    const { projectName, loadGroup, instanceGroup, endTime, numberOfDays } = props;

    retrieveEventData(projectName, loadGroup, instanceGroup, endTime, numberOfDays).then((data) => {
      const { threshold } = this.state;
      const allRelations = loadGroup ?
        data.eventsCausalRelation || {} :
        JSON.parse(data.causalRelation || '{}');
      const kpis = _.get(data, 'metaData.KPI', '').split(',');
      const relations = allRelations[threshold.toString()] || [];
      const metricNameMap = {};
      const namesArray = data.metricShortNameArray || [];
      R.forEach((o) => { metricNameMap[o.metric] = o.shortMetric; }, namesArray);

      const correlations = loadGroup ?
        data.eventsCorrelation || [] :
        JSON.parse(data.correlation || '[]');

      const [minRelationWeight, maxRelationWeight] = this.getWeightRange(relations);
      const [minCorrelationWeight, maxCorrelationWeight] = this.getWeightRange(relations);

      this.setState({
        loading: false,
        kpis,
        allRelations,
        relations,
        correlations,
        metricNameMap,
        minRelationWeight,
        maxRelationWeight,
        relationFilterWeight: 0.6,
        minCorrelationWeight,
        maxCorrelationWeight,
        correlationFilterWeight: 0.8,
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
  handleWindowResize({ windowHeight, windowWidth }) {
    this.setState({
      containerHeight: windowHeight - this.containerOffsetHeight,
      containerWidth: windowWidth - this.containerOffsetWidth,
    }, () => {
      // Trigger window resize event to change the size of modal window.
      $(window).trigger('resize');
    });
  }

  @autobind
  handleThresholdChange(v) {
    const { allRelations, relationFilterWeight } = this.state;
    const relations = allRelations[v.toString()] || [];
    const [minRelationWeight, maxRelationWeight] = this.getWeightRange(relations);

    // Only reset for relations as it's related with threshold.
    this.setState({
      threshold: v,
      relations,
      minRelationWeight,
      maxRelationWeight,
      relationFilterWeight: R.min(relationFilterWeight, maxRelationWeight),
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  handleRelationSliderChange(count) {
    this.setState({
      relationFilterWeight: count,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  handleCorrelationSliderChange(count) {
    this.setState({
      correlationFilterWeight: count,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  selectTab(tab) {
    return () => {
      this.setState({
        activeTab: tab,
      }, () => {
        this.renderGraph();
      });
    };
  }

  render() {
    const rest = R.omit([
      'projectName', 'loadGroup', 'instanceGroup', 'endTime', 'numberOfDays',
    ], this.props);
    const { loading, activeTab, containerHeight, containerWidth,
      relations, threshold, minRelationWeight, maxRelationWeight, relationFilterWeight,
      correlations, minCorrelationWeight, maxCorrelationWeight, correlationFilterWeight,
    } = this.state;

    const relationStep = 0.1;
    const correlationStep = 0.1;

    return (
      <Modal {...rest} style={{ marginLeft: -containerWidth / 2, width: containerWidth }} size="big" closable>
        <WindowResizeListener onResize={this.handleWindowResize} />
        <div
          className={`causal-graph content flex-col-container ${loading ? 'ui container loading' : ''}`}
          style={{ height: containerHeight, width: containerWidth, paddingTop: 4 }}
        >
          <div className="ui pointing secondary menu" style={{ margin: '0px 0px 8px', position: 'relative' }}>
            <a
              className={`${activeTab === 'relation' ? 'active' : ''} item`}
              onClick={this.selectTab('relation')}
            >Causal Relations</a>
            <a
              className={`${activeTab === 'correlation' ? 'active' : ''} item`}
              onClick={this.selectTab('correlation')}
            >Component Correlations</a>
            <div
              style={{
                position: 'absolute', right: 0, top: 6,
                display: `${activeTab === 'relation' ? 'inline-block' : 'none'}`,
              }}
            >
              <span
                style={{ verticalAlign: 'middle', paddingRight: '1em', fontWeight: 'bold' }}
              >Time Thresholds (hour):</span>
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
              <div
                style={{
                  visibility: `${relations.length === 0 ? 'hidden' : 'visible'}`,
                  minWidth: 420, display: 'inline-block', textAlign: 'right', lineHeight: '24px',
                }}
              >
                <span style={{ fontWeight: 'bold', padding: '0 1em' }}>{`Causality Probability >= ${(relationFilterWeight*100).toFixed(1)+'%'}:`}</span>
                <span
                  style={{ fontSize: 12, fontWeight: 'bold', padding: '0 1em 0 0', color: 'rgba(0, 0, 139, 0.6)' }}
                >{minRelationWeight}</span>
                <div style={{ display: 'inline-block', width: 240, verticalAlign: 'middle' }}>
                  <Slider
                    included={false} dots
                    min={0.0} max={1.0} step={0.1}
                    value={relationFilterWeight}
                    defaultValue={minRelationWeight}
                    onChange={c => this.setState({ relationFilterWeight: c })}
                    onAfterChange={this.handleRelationSliderChange}
                  />
                </div>
                <span
                  style={{ fontSize: 12, fontWeight: 'bold', padding: '0 0 0 1em', color: 'rgba(242, 113,28, 0.8)' }}
                >{maxRelationWeight}</span>
              </div>
            </div>
            <div
              style={{
                position: 'absolute', right: 0, top: 6,
                display: `${activeTab === 'correlation' ? 'inline-block' : 'none'}`,
              }}
            >
              <div
                style={{
                  visibility: `${correlations.length === 0 ? 'hidden' : 'visible'}`,
                  minWidth: 420, display: 'inline-block', textAlign: 'right', lineHeight: '24px',
                }}
              >
                <span style={{ fontWeight: 'bold', padding: '0 1em' }}>
                  {`Correlation Probability >= ${(correlationFilterWeight * 100).toFixed(1) + '%'}: `}
                </span>
                <div style={{ position: 'relative', display: 'inline-block', height: 40 }}>
                  <span style={{ fontSize: 12, padding: '0 1em 0 0', color: 'rgba(0, 0, 139, 0.6)' }}>
                    {minCorrelationWeight}
                  </span>
                  <div style={{ display: 'inline-block', width: 240, verticalAlign: 'middle' }}>
                    <Slider
                      included={false} dots
                      min={0.0} max={1.0} step={0.1}
                      value={correlationFilterWeight}
                      defaultValue={minCorrelationWeight}
                      onChange={c => this.setState({ correlationFilterWeight: c })}
                      onAfterChange={this.handleCorrelationSliderChange}
                    />
                  </div>
                  <span
                    style={{ fontSize: 12, fontWeight: 'bold', padding: '0 0 0 1em', color: 'rgba(242, 113,28, 0.8)' }}
                  >{maxCorrelationWeight}</span>
                </div>
              </div>
            </div>
          </div>
          {activeTab === 'relation' && relations.length === 0 &&
            <h4 style={{ margin: '0.5em 0' }}>No component causal relation found.</h4>
          }
          {activeTab === 'correlation' && correlations.length === 0 &&
            <h4 style={{ margin: '0.5em 0' }}>No component correlation found.</h4>
          }
          <div className="d3-container" ref={(c) => { this.container = c; }} />
        </div>
      </Modal>
    );
  }
}

export default CausalGraphModal;
