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
import { Select } from '../../src/lib/fui/react';
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
      metaDataKpiUnits: {},
      metricShortNames: {},
      metricUnits: {},
      relationTimeThreshold: '2.0',
      relationProbability: 0.6,
      correlationProbability: 0.8,
      kpiPredictionProbability: '0.75',
      currentZoom: 0,
      showMetrics: false,
      mergeMetrics: true,
      selectedNode: '',
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
  renderGraph() {
    this.cleanChart();

    const { activeTab: relType, currentZoom, showMetrics } = this.state;
    const relations = this.getFilteredDataset()[relType];

    const g = new dagre.graphlib.Graph({
      directed: !(relType === 'correlation'),
      multigraph: true,
    });

    g.setGraph({
      rankdir: 'LR', align: 'DR', ranker: 'tight-tree',
      ranksep: 5 + (currentZoom * 20),
      nodesep: 5 + (currentZoom * 20),
      edgesep: 5 + (currentZoom * 10),
      marginx: 10, marginy: 10,
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

    // Add a ts in id to avoid id confilict with for multi modal.
    const ts = Date.now().valueOf();

    // Add edge for each relations, ignore self to self relations.
    const arrowhead = (relType === 'correlation') ? 'double' : 'vee';
    relations.forEach((rel) => {
      const { left, right, label, leftLabel, rightLabel, highlight } = rel;
      if (left === right) {
        console.warn(`Ignore self link :${left} => ${right}`);
      } else {
        const meta = {
          id: `${left}:${right}-${ts}`,
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
    if (showMetrics) {
      const edgeLeftLables = svg.select('.output').append('g')
        .attr('class', 'edgeLeftLabels');
      const edgeRightLables = svg.select('.output').append('g')
        .attr('class', 'edgeRightLabels');

      const edges = g.edges();

      relations.forEach((rel) => {
        const e = R.find((o) => {
          return (o.v === rel.left && o.w === rel.right) ||
            (o.v === rel.right && o.w === rel.left);
        }, edges);

        if (e) {
          const edge = g.edge(e);

          // If it's not closewise, needs to flip the text.
          const closewise = (edge.points[edge.points.length - 1].x - edge.points[0].x) >= 0;

          const addEdgeLabel = (edgeLabels, label, isLeft) => {
            const l = edgeLabels
              .append('text')
              .attr({ dy: -5 });
            const tp = l.append('textPath')
              .attr('xlink:href', `#${rel.left}:${rel.right}-${ts}`)
              .attr('startOffset', isLeft ? '6%' : '94%')
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
    }

    const gbox = inner.node().getBBox();
    const width = gbox.width;
    const height = gbox.height + 40;

    svg.attr({
      width,
      height,
      viewBox: `${gbox.x} ${gbox.y} ${width} ${height}`,
    });
  }

  @autobind
  retrieveData(props) {
    const { projectName, loadGroup, instanceGroup, endTime, numberOfDays } = props;

    retrieveEventData(projectName, loadGroup,
      instanceGroup, endTime, numberOfDays,
    ).then((data) => {
      const eventsCausalRelations = loadGroup ? (data.eventsCausalRelation || {}) :
        JSON.parse(data.causalRelation || '{}');
      const eventsCorrelations = loadGroup ? (data.eventsCorrelation || []) :
        JSON.parse(data.correlation || '[]');
      const kpiPredictions = JSON.parse(data.kpiPrediction || '{}');
      const metaDataKpiUnits = _.get(data, 'metaData.kpiObj', {});
      const metaDataKPIs = R.keys(metaDataKpiUnits);

      // Create metric name => short name map
      const metricShortNames = R.reduce(
        (a, o) => { a[o.metric] = o.shortMetric; return a; }, {},
        data.metricShortNameArray || [],
      );

      const getUnit = (unit) => {
        const match = unit.match(/\(.+\)/);
        return match ? match[0] : '';
      };
      const metricUnits = R.reduce(
        (a, o) => { a[o.metric] = getUnit(o.unit); return a; }, {},
        data.metricShortNameArray || [],
      );

      this.setState({
        loading: false,
        eventsCausalRelations,
        eventsCorrelations,
        kpiPredictions,
        metaDataKPIs,
        metaDataKpiUnits,
        metricShortNames,
        metricUnits,
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
        selectedNode: '',
        currentZoom: 0,
        activeTab: tab,
      }, () => {
        this.renderGraph();
      });
    };
  }

  @autobind
  getMetricShortNames(name) {
    const { mergeMetrics, metricShortNames } = this.state;
    if (mergeMetrics) {
      return metricShortNames[name] || name;
    }

    return name;
  }

  @autobind
  getFilteredRelations() {
    // Filter the dataset and transform into relations array.
    const { eventsCausalRelations, relationTimeThreshold,
      metaDataKPIs, relationProbability, selectedNode } = this.state;

    let relations = eventsCausalRelations[relationTimeThreshold] || [];
    relations = relations.filter(r => r.probability >= relationProbability);
    if (selectedNode) {
      relations = relations.filter(r => r.src === selectedNode || r.target === selectedNode);
    }
    const shortName = R.map(n => this.getMetricShortNames(n));

    relations = relations.map(
      (r) => {
        // Check whether metric the kpi and return a array of metric with kpi flag.
        const ll = R.uniq(shortName(r.fromMetrics.split(',')))
          .map(m => [m, !!R.find(k => k === m, metaDataKPIs)]);
        const rl = R.uniq(shortName(r.toMetrics.split(',')))
          .map(m => [m, !!R.find(k => k === m, metaDataKPIs)]);

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
    const { eventsCorrelations, correlationProbability, selectedNode, metaDataKPIs } = this.state;

    let relations = eventsCorrelations || [];
    relations = relations.filter(r => r.probability >= correlationProbability);
    if (selectedNode) {
      relations = relations.filter(r => r.elem1 === selectedNode || r.elem2 === selectedNode);
    }

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
          const shortName = R.map(n => this.getMetricShortNames(n));
          leftLabel = R.uniq(shortName(leftLabel))
            .map(m => [m, !!R.find(k => k === m, metaDataKPIs)]);
          rightLabel = R.uniq(shortName(rightLabel))
            .map(m => [m, !!R.find(k => k === m, metaDataKPIs)]);
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
    const { kpiPredictions, kpiPredictionProbability, metricUnits } = this.state;

    const relations = [];
    R.forEachObjIndexed((sval, servers) => {
      if (_.isObject(sval)) {
        const snames = servers.split(',');
        const lname = snames[0];
        const rname = snames[1];
        const llabels = {};
        const rlables = [];
        R.forEachObjIndexed((mval, metrics) => {
          if (mval && _.has(mval, kpiPredictionProbability)) {
            const mnames = metrics.split(',');
            const metric = mnames[0];
            const mergedMetric = this.getMetricShortNames(metric);
            const kpi = this.getMetricShortNames(mnames[1]);
            const value = `${mval[kpiPredictionProbability]} ${metricUnits[metric] || ''}`;
            if (llabels[mergedMetric]) {
              llabels[mergedMetric].push(value);
            } else {
              llabels[mergedMetric] = [value];
            }
            rlables.push(kpi);
          }
        }, sval);
        // For the kpi predictions, the right label is always kpi metric.
        if (R.keys(llabels).length > 0) {
          relations.push({
            left: lname,
            right: rname,
            label: '',
            leftLabel: R.keys(llabels).map(k => [`${k} > ${llabels[k].join(';')}`, false]),
            rightLabel: R.uniq(rlables).map(l => [l, true]),
          });
        }
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

  @autobind
  zoomIn() {
    let { currentZoom } = this.state;
    currentZoom += 1;
    this.setState({
      currentZoom,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  zoomOut() {
    let { currentZoom } = this.state;
    currentZoom = Math.max(currentZoom - 1, 0);
    this.setState({
      currentZoom,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  setShowMetrics(e) {
    this.setState({
      showMetrics: e.target.checked,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind
  setMergeMetrics(e) {
    this.setState({
      mergeMetrics: e.target.checked,
    }, () => {
      this.renderGraph();
    });
  }

  @autobind handleNodeSelected(newValue) {
    const selectedNode = newValue ? newValue.value : '';
    this.setState({
      selectedNode,
      currentZoom: selectedNode ? 3: 0,
    }, () => {
      this.renderGraph();
    });
  }

  render() {
    const rest = R.omit([
      'projectName', 'loadGroup', 'instanceGroup', 'endTime', 'numberOfDays',
    ], this.props);
    const { loading, activeTab, containerHeight, containerWidth,
      relationTimeThreshold, relationProbability,
      correlationProbability, kpiPredictionProbability, showMetrics, mergeMetrics,
      metaDataKpiUnits, metricUnits, selectedNode,
    } = this.state;

    const filteredDataset = this.getFilteredDataset();

    // Get the nodes to select.
    let nodeOptions = [];
    if (activeTab === 'relation') {
      const { eventsCausalRelations } = this.state;
      let relations = eventsCausalRelations[relationTimeThreshold] || [];
      relations = relations.filter(r => r.probability >= relationProbability);
      nodeOptions = [...R.map(r => r.src, relations), ...R.map(r => r.target, relations)];
      nodeOptions = R.filter(R.identity, R.uniq(nodeOptions));
      nodeOptions = R.map(n => ({ label: n, value: n }), nodeOptions);
    } else if (activeTab === 'correlation') {
      const { eventsCorrelations } = this.state;
      let relations = eventsCorrelations || [];
      relations = relations.filter(r => r.probability >= correlationProbability);
      nodeOptions = [...R.map(r => r.elem1, relations), ...R.map(r => r.elem2, relations)];
      nodeOptions = R.filter(R.identity, R.uniq(nodeOptions));
      nodeOptions = R.map(n => ({ label: n, value: n }), nodeOptions);
    }

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
          <div className="ui pointing secondary menu" style={{ marginBottom: 4, position: 'relative' }}>
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
                style={{ verticalAlign: 'middle', paddingRight: '6px', fontWeight: 'bold' }}
              >Time Thresholds:</span>
              <Dropdown
                mode="select" className="mini" value={relationTimeThreshold}
                text={`${Number(relationTimeThreshold)} hour`}
                onChange={this.handleThresholdChange} style={{ width: 50 }}
              >
                <i className="dropdown icon" />
                <div className="menu">
                  {
                    ['0.5', '1.0', '2.0', '3.0', '6.0'].map(v => (
                      <div key={v} className="item" data-value={v}>{`${Number(v)} hour`}</div>
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
                >0.0</span>
                <div style={{ display: 'inline-block', width: 150, verticalAlign: 'middle' }}>
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
                  <div style={{ display: 'inline-block', width: 150, verticalAlign: 'middle' }}>
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
          {activeTab === 'kpiPrediction' &&
            <div className="violation">
              <span>KPI Violation: </span>
              {R.keys(metaDataKpiUnits).map(key => (
                <span key={key}>
                  <span className="highlight">{key}</span>
                  <span className="value">{`>= ${metaDataKpiUnits[key] || ''}${metricUnits[key] || ''}`}</span>
                </span>
              ))}
            </div>
          }
          <div className="settings">
            <div style={{ display: (activeTab === 'kpiPrediction' ? 'none' : 'inline-block'), textAlign: 'left', fontSize: 12, marginRight: '1em' }}>
              <label style={{ margin: '0.5em 1em 0 0', float: 'left', display: 'inline-block' }}>Selected Node:</label>
              <div style={{ width: 180, display: 'inline-block' }}>
                <Select
                  options={nodeOptions} clearable value={selectedNode} placeholder=""
                  onChange={this.handleNodeSelected}
                />
              </div>
            </div>
            <div style={{ display: 'inline-block' }}>
              <div className="ui checkbox">
                <input
                  type="checkbox" tabIndex="0" checked={showMetrics}
                  onChange={this.setShowMetrics}
                />
                <label>Show Metrics</label>
              </div>
              <div className="ui checkbox">
                <input
                  type="checkbox" tabIndex="0" checked={mergeMetrics}
                  onChange={this.setMergeMetrics}
                />
                <label>Merge Similar Metrics</label>
              </div>
              <div>
                <i className="minus icon" onClick={this.zoomOut} />
                <i className="plus icon" onClick={this.zoomIn} />
              </div>
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
