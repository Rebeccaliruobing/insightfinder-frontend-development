/*
 * Dygraphs参数与React属性的映射。
 * - default用于设置需调整的缺省值。
 * - hideOnInit 初始化时不使用该参数，
 * 
 * https://github.com/motiz88/react-dygraphs
**/

import {PropTypes} from '../../base';

const options = {

  // Annotations
  annotationClickHandler: {type: PropTypes.func, rename: 'onAnnotationClick'},
  annotationDblClickHandler: {type: PropTypes.func, rename: 'onAnnotationDblClick'},
  annotationMouseOutHandler: {type: PropTypes.func, rename: 'onAnnotationMouseOut'},
  annotationMouseOverHandler: {type: PropTypes.func, rename: 'onAnnotationMouseOver'},
  displayAnnotations: {type: PropTypes.bool},

  // Axis display
  axis: {type: PropTypes.string},
  axisLabelColor: {type: PropTypes.string},
  axisLabelFontSize: {type: PropTypes.number, default: 12},
  axisLabelFormatter: true,
  axisLabelWidth: {type: PropTypes.number},
  axisLineColor: {type: PropTypes.string},
  axisLineWidth: {type: PropTypes.number},
  axisTickSize: {type: PropTypes.number},
  dateWindow: {type: PropTypes.array(PropTypes.number)},
  drawAxesAtZero: {type: PropTypes.bool},
  drawAxis: {type: PropTypes.bool},
  includeZero: {type: PropTypes.bool},
  independentTicks: {type: PropTypes.bool},
  labelsUTC: {type: PropTypes.bool},
  logscale: {type: PropTypes.bool},
  panEdgeFraction: {type: PropTypes.number},
  pixelsPerLabel: {type: PropTypes.number},
  ticker: {type: PropTypes.func},
  valueRange: {type: PropTypes.array(PropTypes.number)},
  xAxisHeight: {type: PropTypes.number},
  xRangePad: {type: PropTypes.number},
  yRangePad: {type: PropTypes.number},

  // CSV parsing
  customBars: {type: PropTypes.bool},
  delimiter: {type: PropTypes.string},
  errorBars: {type: PropTypes.bool},
  fractions: {type: PropTypes.bool},
  xValueParser: {type: PropTypes.func},
  
  // Callbacks
  clickCallback: {type: PropTypes.func, rename: 'onClick'},
  drawCallback: {type: PropTypes.func},
  highlightCallback: {type: PropTypes.func, rename: 'onHighlight'},
  pointClickCallback: {type: PropTypes.func, rename: 'onPointClick'},
  underlayCallback: {type: PropTypes.func},
  unhighlightCallback: {type: PropTypes.func, rename: 'onUnhighlight'},
  zoomCallback: {type: PropTypes.func, rename: 'onZoom'},
  
  // Chart labels
  title: {type: PropTypes.string},
  titleHeight: {type: PropTypes.number},
  xLabelHeight: {type: PropTypes.number},
  xlabel: {type: PropTypes.oneOfType([PropTypes.string, PropTypes.element])},
  y2label: {type: PropTypes.oneOfType([PropTypes.string, PropTypes.element])},
  yLabelWidth: {type: PropTypes.number},
  ylabel: {type: PropTypes.oneOfType([PropTypes.string, PropTypes.element])},
  
  // Configuration
  axes: true,
  plugins: true,
  
  // data
  dataHandler: true,
  file: {
    type: PropTypes.oneOfType([
      PropTypes.string /* CSV or URL */ ,
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.number
      ]))),
      PropTypes.func
    ]).isRequired,
    rename: 'data',
    hideOnInit: true
  },
  
  // Data Line display
  connectSeparatedPoints: {type: PropTypes.bool},
  drawGapEdgePoints: {type: PropTypes.bool},
  drawHighlightPointCallback: {type: PropTypes.func},
  drawPointCallback: {type: PropTypes.func},
  drawPoints: {type: PropTypes.bool},
  fillGraph: {type: PropTypes.bool},
  plotter: {type: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)])},
  pointSize: {type: PropTypes.number},
  stackedGraph: {type: PropTypes.bool},
  stackedGraphNaNFill: {type: PropTypes.string},
  stepPlot: {type: PropTypes.bool},
  strokeBorderColor: {type: PropTypes.string},
  strokeBorderWidth: {type: PropTypes.number},
  strokePattern: {type: PropTypes.arrayOf(PropTypes.number)},
  strokeWidth: {type: PropTypes.number},
  visibility: {type: PropTypes.arrayOf(PropTypes.bool)},
  
  // Data Series Colors
  color: true,
  colorSaturation: {type: PropTypes.number},
  colorValue: {type: PropTypes.number},
  colors: {type: PropTypes.arrayOf(PropTypes.string)},
  fillAlpha: {type: PropTypes.number},
  
  // Debugging
  timingName: true,
  
  // Error Bars
  rollPeriod: {type: PropTypes.number},
  sigma: {type: PropTypes.number},
  wilsonInterval: true,
  
  // Grid
  drawGrid: {type: PropTypes.bool},
  gridLineColor: true,
  gridLinePattern: {type: PropTypes.arrayOf(PropTypes.number)},
  gridLineWidth: {type: PropTypes.number},
  
  // Interactive Elements
  animatedZooms: {type: PropTypes.bool},
  hideOverlayOnMouseOut: {type: PropTypes.bool},
  highlightCircleSize: {type: PropTypes.number},
  highlightSeriesBackgroundAlpha: {type: PropTypes.number},
  highlightSeriesOpts: true,
  interactionModel: true,
  rangeSelectorHeight: {type: PropTypes.number},
  rangeSelectorPlotFillColor: {type: PropTypes.string},
  rangeSelectorPlotStrokeColor: {type: PropTypes.string},
  showInRangeSelector: {type: PropTypes.bool},
  showLabelsOnHighlight: {type: PropTypes.bool},
  showRangeSelector: {type: PropTypes.bool},
  showRoller: {type: PropTypes.bool},
  
  // Legend
  labels: {type: PropTypes.arrayOf(PropTypes.string)},
  labelsDiv: {type: PropTypes.oneOfType([PropTypes.string, PropTypes.element])},
  labelsDivStyles: {type: PropTypes.object},
  labelsDivWidth: {type: PropTypes.number},
  labelsSeparateLines: {type: PropTypes.bool},
  labelsShowZeroValues: {type: PropTypes.bool},
  legend: {type: PropTypes.oneOf(['onmouseover', 'always', 'follow'])},
  valueFormatter: {type: PropTypes.func},
  
  // Overall display
  height: {type: PropTypes.number},
  rightGap: {type: PropTypes.number},
  width: {type: PropTypes.number},
  
  // Series
  series: {type: PropTypes.object},
  
  // Value display/formatting
  digitsAfterDecimal: {type: PropTypes.number},
  labelsKMB: {type: PropTypes.bool},
  labelsKMG2: {type: PropTypes.bool},
  maxNumberWidth: {type: PropTypes.number},
  sigFigs: {type: PropTypes.number},
  
  // Zooming
  isZoomedIgnoreProgrammaticZoom: true
  
  // dataWindow: true ?
};

function getPropName(option, name) {
  if(!option || option === true)
    return name;
  if(typeof option.rename === 'string')
    return option.rename;

  return name;
}

function getPropType(option) {
  if(!option)
    return undefined;
  if (option === true)
    return PropTypes.any;
  if (!option.type)
    return PropTypes.any;
  return option.type;
}

function optionHideOnInit(option)
{
    if (option === false)
        return false;
    if (!option)
        return false;
    if (option === true)
        return false;
    return option.hideOnInit;
}

function getReactPropTypes(options) {
  const props = {};
  for (const name in options) {
    const opt = options[name];
    if (opt){
      const propName = getPropName(opt, name);
      props[propName] = getPropType(opt);
    }
  }
  return props;
}

function getReactDefaultProps(options) {
  const defaults = {};
  for (const name in options) {
    const opt = options[name];
    if(opt && opt.default){
      const propName = getPropName(opt, name);
      defaults[propName] = opt.default;
    }
  }
  return defaults;
}

function getPropMap(options) {
  const propMap = {};
  for(const name in options) {
    const opt = options[name];
    if (opt) {
      const propName = getPropName(opt, name);
      propMap[propName] = name;
    }
  }
  return propMap;
}

const propMap = getPropMap(options);
const DygraphPropTypes = getReactPropTypes(options);
const DygraphDefaultProps = getReactDefaultProps(options);

function spreadDygraphProps(props, isInit) {
  const known = {}, rest = {};
  for (const name in props) {
    const isDygraphsProp = !!propMap[name];
    if (isDygraphsProp) {
      if (isInit && optionHideOnInit(options[propMap[name]]))
        continue;
    }
    
    let target = isDygraphsProp ? known : rest;
    const nameOut = isDygraphsProp ? propMap[name] : name;
    target[nameOut] = props[name];
  }
  return {known, rest};
}

export {
  DygraphPropTypes, DygraphDefaultProps, spreadDygraphProps
};
 