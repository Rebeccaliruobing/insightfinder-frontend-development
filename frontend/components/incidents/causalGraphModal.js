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
      eventsCausalRelations: {},
      eventsCorrelations: [],
      kpiPredictions: {},
      metaDataKPIs: [],
      metricShortNames: {},
      relationTimeThreshold: '2.0',
      relationProbability: 0.6,
      correlationProbability: 0.8,
      kpiPredictionProbability: '0.75',
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

    const { activeTab: relType } = this.state;
    const relations = this.getFilteredDataset()[relType];

    const g = new dagre.graphlib.Graph({
      directed: !(relType === 'correlation'),
      multigraph: true,
    });

    g.setGraph({
      rankdir: 'LR', align: 'DR', ranker: 'tight-tree',
      ranksep: 200, nodesep: 200, edgesep: 40,
      marginx: 20, marginy: 20,
    });

    // Get unique left & right side of the relations as the node name.
    const nodeNames = R.uniq(
      R.concat(
        R.map(r => r.left, relations),
        R.map(r => r.right, relations),
      ),
    );
    nodeNames.forEach((name) => {
      g.setNode(name, {
        title: name,
        shape: 'circle',
        label: chopString(name, 30),
        name,
        width: -8, height: -8,
      });
    });

    // Add edge for each relations, ignore self to self relations.
    const arrowhead = (relType === 'correlation') ? 'double' : 'vee';
    relations.forEach((rel) => {
      const { left, right, label, leftLabel, rightLabel, highlight } = rel;
      if (left === right) {
        console.warn(`Ignore self link :${left} => ${right}`);
      } else {
        const meta = {
          id: `${left}:${right}`,
          label,
          class: highlight ? 'highlight' : '',
          lineInterpolate: 'monotone',
          arrowhead,
          labelpos: 'l',
          leftLabel,
          rightLabel,
          labeloffset: 5,
        };
        g.setEdge(left, right, meta, relType);
      }
    });

    const svg = d3.select(this.container).append('svg');
    const inner = svg.append('g');
    const render = dagreD3.render();
    render(inner, g);

    // Add title for node
    svg.selectAll('.node')
      .append('svg:title').text(d => g.node(d).name);

    // Add edge left and right labels
    const edgeLeftLables = svg.select('.output').append('g')
      .attr('class', 'edgeLeftLabels');
    const edgeRightLables = svg.select('.output').append('g')
      .attr('class', 'edgeRightLabels');

    relations.forEach((rel) => {
      const e = R.find(o => o.v === rel.left && o.w === rel.right, g.edges());
      if (e) {
        const edge = g.edge(e);

        // If it's not closewise, needs to flip the text.
        const closewise = (edge.points[edge.points.length - 1].x - edge.points[0].x) >= 0;

        const addEdgeLabel = (edgeLabels, label, isLeft) => {
          const l = edgeLabels
            .append('text')
            .attr({ dy: -5 });
          const tp = l.append('textPath')
            .attr('xlink:href', `#${rel.left}:${rel.right}`)
            .attr('startOffset', isLeft ? '4%' : '96%')
            .attr('text-anchor', isLeft ? 'start' : 'end');

          if (_.isArray(label)) {
            label.forEach(([n, highlight], idx) => {
              tp.append('tspan')
                .attr('class', highlight ? 'highlight' : '')
                .text(n + (idx === label.length - 1 ? '' : ',   '));
            });
          } else {
            tp.append('tspan')
              .text(label);
          }

          if (!closewise) {
            const lbox = l.node().getBBox();
            const cx = lbox.x + (lbox.width / 2);
            const cy = lbox.y + (lbox.height / 2);
            l.attr('transform', `rotate(180 ${cx} ${cy})`);
          }
        };
        addEdgeLabel(edgeLeftLables, rel.leftLabel, true);
        addEdgeLabel(edgeRightLables, rel.rightLabel, false);
      }
    });

    const gbox = inner.node().getBBox();
    const width = gbox.width;
    const height = gbox.height;

    svg.attr({
      width,
      height,
      viewBox: `${gbox.x} ${gbox.y} ${width} ${height}`,
    });
  }

  @autobind
  renderGraph1() {
    this.cleanChart();

    const { metaDataKPIs, metricShortNames } = this.state;
    const { relations, correlations, metricNameMap, kpis } = this.state;
    const { activeTab, relationProbability, correlationProbability } = this.state;

    const showRelations = activeTab === 'relation';
    const filterCount = showRelations ? relationProbability : correlationProbability;

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
            title: name, label: chopString(name, 30), name, width: -8, height: -8,
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
    svg.attr({ width, height });
  }

  @autobind
  retrieveData(props) {
    const { projectName, loadGroup, instanceGroup, endTime, numberOfDays } = props;

    retrieveEventData(projectName, loadGroup, instanceGroup, endTime, numberOfDays).then((data) => {
      const eventsCausalRelations = loadGroup ? (data.eventsCausalRelation || {}) :
        JSON.parse(data.causalRelation || '{}');
      const eventsCorrelations = loadGroup ? (data.eventsCorrelation || []) :
        JSON.parse(data.correlation || '[]');
      const kpiPredictions = JSON.parse(data.kpiPrediction || '{}');
      const metaDataKPIs = _.get(data, 'metaData.KPI', '').split(',');

      // Create metric name => short name map
      const metricShortNames = R.reduce(
        (a, o) => { a[o.metric] = o.shortMetric; return a; }, {},
        data.metricShortNameArray || [],
      );

      this.setState({
        loading: false,
        eventsCausalRelations,
        eventsCorrelations,
        kpiPredictions,
        metaDataKPIs,
        metricShortNames,
      }, () => {
        this.renderGraph();
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
    this.setState({
      relationTimeThreshold: v,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  handleRelationSliderChange(count) {
    this.setState({
      relationProbability: count,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  handleCorrelationSliderChange(count) {
    this.setState({
      correlationProbability: count,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  handleKPIPredictionChange(v) {
    this.filteredKPIPredictions = null;
    this.setState({
      kpiPredictionProbability: v,
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

  @autobind
  getFilteredRelations() {
    // Filter the dataset and transform into relations array.
    const { eventsCausalRelations, relationTimeThreshold,
      metaDataKPIs, relationProbability } = this.state;

    let relations = eventsCausalRelations[relationTimeThreshold] || [];
    relations = relations.filter(r => r.probability >= relationProbability);

    relations = relations.map(
      (r) => {
        // Check whether metric the kpi and return a array of metric with kpi flag.
        const ll = r.fromMetrics.split(',').map(m => [m, !!R.find(k => k === m, metaDataKPIs)]);
        const rl = r.toMetrics.split(',').map(m => [m, !!R.find(k => k === m, metaDataKPIs)]);
        return {
          left: r.src,
          right: r.target,
          label: `Probability: ${(r.probability * 100).toFixed(1)}%`,
          highlight: Number(r.probability) >= 0.6,
          leftLabel: ll,
          rightLabel: rl,
        };
      },
    );

    return relations;
  }

  @autobind
  getFilteredCorrelations() {
    const { eventsCorrelations, correlationProbability, metaDataKPIs } = this.state;

    let relations = eventsCorrelations || [];
    relations = relations.filter(r => r.probability >= correlationProbability);

    relations = relations.map(
      (r) => {
        const { labelObj } = r;
        let leftLabel = [];
        let rightLabel = [];

        if (labelObj) {
          R.forEachObjIndexed((val, key) => {
            const names = key.split(',');
            if (names.length >= 3) {
              leftLabel.push(names[2]);
              rightLabel.push(names[3]);
            }
          }, labelObj);
          leftLabel = R.uniq(leftLabel).map(m => [m, !!R.find(k => k === m, metaDataKPIs)]);
          rightLabel = R.uniq(rightLabel).map(m => [m, !!R.find(k => k === m, metaDataKPIs)]);
        }

        return {
          left: r.elem1,
          right: r.elem2,
          label: `Probability: ${(r.probability * 100).toFixed(1)}%`,
          highlight: Number(r.probability) >= 0.8,
          leftLabel,
          rightLabel,
        };
      },
    );

    return relations;
  }

  @autobind
  getFilteredKPIPredictions() {
    const { kpiPredictions, kpiPredictionProbability } = this.state;

    const relations = [];
    R.forEachObjIndexed((sval, servers) => {
      if (_.isObject(sval)) {
        R.forEachObjIndexed((mval, metrics) => {
          if (mval && _.has(mval, kpiPredictionProbability)) {
            const snames = servers.split(',');
            const mnames = metrics.split(',');
            // For the kpi predictions, the right label is always kpi metric.
            relations.push({
              left: snames[0],
              right: snames[1],
              label: '',
              leftLabel: `${mnames[0]} (${mval[kpiPredictionProbability]})`,
              rightLabel: [[mnames[1], true]],
            });
          }
        }, sval);
      }
    }, kpiPredictions || {});

    return relations;
  }

  @autobind
  getFilteredDataset() {
    return {
      relation: this.getFilteredRelations(),
      correlation: this.getFilteredCorrelations(),
      kpiPrediction: this.getFilteredKPIPredictions(),
    };
  }

  render() {
    const rest = R.omit([
      'projectName', 'loadGroup', 'instanceGroup', 'endTime', 'numberOfDays',
    ], this.props);
    const { loading, activeTab, containerHeight, containerWidth,
      relationTimeThreshold, relationProbability,
      correlationProbability, kpiPredictionProbability,
    } = this.state;

    const filteredDataset = this.getFilteredDataset();

    return (
      <Modal
        {...rest} size="big" closable
        style={{ marginLeft: -containerWidth / 2, width: containerWidth }}
      >
        <WindowResizeListener onResize={this.handleWindowResize} />
        <div
          className={`causal-graph content flex-col-container ${loading ? 'ui container loading' : ''}`}
          style={{ height: containerHeight, width: containerWidth, paddingTop: 4 }}
        >
          <div className="ui pointing secondary menu" style={{ margin: '0px 0px 24px', position: 'relative' }}>
            <a
              className={`${activeTab === 'relation' ? 'active' : ''} item`}
              onClick={this.selectTab('relation')}
            >Causal Relations</a>
            <a
              className={`${activeTab === 'correlation' ? 'active' : ''} item`}
              onClick={this.selectTab('correlation')}
            >Component Correlations</a>
            <a
              className={`${activeTab === 'kpiPrediction' ? 'active' : ''} item`}
              onClick={this.selectTab('kpiPrediction')}
            >KPI Predictions</a>
            <div
              style={{
                position: 'absolute', right: 0, top: 6,
                display: `${activeTab === 'relation' ? 'inline-block' : 'none'}`,
              }}
            >
              <span
                style={{ verticalAlign: 'middle', paddingRight: '1em', fontWeight: 'bold' }}
              >Time Thresholds (hour):</span>
              <Dropdown
                mode="select" className="mini" value={relationTimeThreshold}
                onChange={this.handleThresholdChange}
              >
                <i className="dropdown icon" />
                <div className="menu">
                  {
                    ['0.5', '1.0', '2.0', '3.0', '6.0'].map(v => (
                      <div key={v} className="item" data-value={v}>{`${Number(v)}`}</div>
                    ))
                  }
                </div>
              </Dropdown>
              <div
                style={{ minWidth: 420, display: 'inline-block', textAlign: 'right', lineHeight: '24px' }}
              >
                <span style={{ fontWeight: 'bold', padding: '0 1em' }}>{
                  `Causality Probability >= ${(relationProbability * 100).toFixed(1)}%:`}
                </span>
                <span
                  style={{
                    fontSize: 12, fontWeight: 'bold',
                    padding: '0 1em 0 0', color: 'rgba(0, 0, 139, 0.6)',
                  }}
                >0.1</span>
                <div style={{ display: 'inline-block', width: 240, verticalAlign: 'middle' }}>
                  <Slider
                    included={false} dots
                    min={0.0} max={1.0} step={0.1}
                    value={relationProbability}
                    onChange={c => this.setState({ relationProbability: c })}
                    onAfterChange={this.handleRelationSliderChange}
                  />
                </div>
                <span
                  style={{
                    fontSize: 12, fontWeight: 'bold',
                    padding: '0 0 0 1em', color: 'rgba(242, 113,28, 0.8)',
                  }}
                >1.0</span>
              </div>
            </div>
            <div
              style={{
                position: 'absolute', right: 0, top: 6,
                display: `${activeTab === 'correlation' ? 'inline-block' : 'none'}`,
              }}
            >
              <div
                style={{ minWidth: 420, display: 'inline-block', textAlign: 'right', lineHeight: '24px' }}
              >
                <span style={{ fontWeight: 'bold', padding: '0 1em' }}>
                  {`Correlation Probability >= ${(correlationProbability * 100).toFixed(1)}%: `}
                </span>
                <div style={{ position: 'relative', display: 'inline-block', height: 40 }}>
                  <span
                    style={{ fontSize: 12, padding: '0 1em 0 0', color: 'rgba(0, 0, 139, 0.6)' }}
                  >0.0</span>
                  <div style={{ display: 'inline-block', width: 240, verticalAlign: 'middle' }}>
                    <Slider
                      included={false} dots
                      min={0.0} max={1.0} step={0.1}
                      value={correlationProbability}
                      onChange={c => this.setState({ correlationProbability: c })}
                      onAfterChange={this.handleCorrelationSliderChange}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 12, fontWeight: 'bold',
                      padding: '0 0 0 1em', color: 'rgba(242, 113,28, 0.8)',
                    }}
                  >1.0</span>
                </div>
              </div>
            </div>
            <div
              style={{
                position: 'absolute', right: 0, top: 6,
                display: `${activeTab === 'kpiPrediction' ? 'inline-block' : 'none'}`,
              }}
            >
              <span
                style={{ verticalAlign: 'middle', paddingRight: '1em', fontWeight: 'bold' }}
              >KPI Prediction Probability:</span>
              <Dropdown
                mode="select" className="mini"
                value={kpiPredictionProbability}
                text={`${Number(kpiPredictionProbability) * 100}%`}
                onChange={this.handleKPIPredictionChange}
              >
                <i className="dropdown icon" />
                <div className="menu">
                  {
                    ['0.5', '0.75', '0.8', '0.9', '1.0'].map(
                      v => <div key={v} className="item" data-value={v}>{`${Number(v) * 100}%`}</div>,
                    )
                  }
                </div>
              </Dropdown>
            </div>
          </div>
          {activeTab === 'relation' && filteredDataset.relation.length === 0 &&
            <h4 style={{ margin: '0.5em 0' }}>
              No causal relations found, try to change the Time Thresholds and Causality Probability.
            </h4>
          }
          {activeTab === 'correlation' && filteredDataset.correlation.length === 0 &&
            <h4 style={{ margin: '0.5em 0' }}>
              No component correlations found, try to change the Correlation Probability.
            </h4>
          }
          {activeTab === 'kpiPrediction' && filteredDataset.kpiPrediction.length === 0 &&
            <h4 style={{ margin: '0.5em 0' }}>
              No KPI prediction found, try to change the KPI Prediction Probability.
            </h4>
          }
          <div className="d3-container" ref={(c) => { this.container = c; }} />
        </div>
      </Modal>
    );
  }
}

export default CausalGraphModal;
