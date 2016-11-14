import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import {autobind} from 'core-decorators';
import {Dropdown} from '../../../artui/react/index';

class Point {
    inLines = [];
    outLines = [];
    id;
    x;
    y;
    title;
    color;

    constructor(x, y) {
        this.id = `point-${parseInt(x)}-${parseInt(y)}`;
        this.x = x;
        this.y = y;
    }
}

class Line {
    fromPoint;
    toPoint;
    id;

    constructor(p1, p2) {
        this.link(p1, p2);
    }

    link(p1, p2) {
        this.fromPoint && this.fromPoint.outLines.splice(this.fromPoint.outLines.indexOf(this), 1);
        this.toPoint && this.toPoint.inLines.splice(this.toPoint.inLines.indexOf(this), 1);
        this.fromPoint = p1;
        this.toPoint = p2;
        p1.outLines.push(this);
        p2.inLines.push(this);
        this.id = `line-${p1.id}-${p2.id}`;
    }
}

export default class CausalGraph extends React.Component {
    defaultProps = {
        data: ''
    };

    constructor(props) {
        super(props);
        let { dataArray, startTimestamp, endTimestamp, types } = this.props;
        let newDataArray = [];
        let newTypesSet = new Set();
        dataArray.sort(function(a, b) {
            let aTime = (new Date(a[0].split(',')[0])).getTime();
            let bTime = (new Date(b[0].split(',')[0])).getTime();
            if(aTime>bTime){
              return 1;
            } else if(aTime<bTime){
              return -1;
            } else {
              return 0;
            }
          }).forEach((data, i) => {
            let recordTime = (new Date(data[0].split(',')[0])).getTime();
            if(!startTimestamp || !endTimestamp || ((startTimestamp && endTimestamp) && (recordTime>=startTimestamp && recordTime<=endTimestamp))){
                newDataArray.push(data);
                types.forEach((t, it) => {
                    if(data.join().indexOf(t)!=-1){
                        newTypesSet.add(t);
                    }
                });
            }
        });
        this.points = [];
        this.lines = [];
        this.state = {
            dataArray: newDataArray,
            types: Array.from(newTypesSet),
            startTimestamp:startTimestamp,
            endTimestamp:endTimestamp,
            svgWidthUpdate: 900,
            threshold: '3',
            svg: {
                width: 900,
                height: 600,
                style: {
                    border: '1px solid #e0e0e0'
                }
            },
            selectRange: {},
            zoomRange: {
                x1: 0, y1: 0,
                x2: 900, y2: 600,
                zoomX: 1, zoomY: 1
            }
        }
    }

    componentDidMount() {}

    @autobind
    calculateGraph() {
        const { svg, dataArray, types } = this.state;
        const threshold = parseInt(this.state.threshold);
        const points = [];
        const lines = [];

        let stageWidth = (svg.width - 250) / Math.max(dataArray.length, 1);
        let stageHeight = svg.height / Math.max(types.length, 1);
        let lastPoints = [];
        let modelWidth = 0;
        dataArray.forEach(([x, ...records], i) => {
            lastPoints[i] = [];
            const recordTime = moment((new Date(x.split(',')[0])).getTime());
            const timeTag = recordTime.format('MM-DD hh:mm');
            modelWidth += stageWidth;
            records.map((text)=> {
                //var pos = text.indexOf('.');
                //var type = text.slice(pos + 1).split('(')[0];
                var pos = text.indexOf('[');
                var type = text.slice(pos + 1).split(']')[0];
                var x = stageWidth * i + stageWidth / 2;
                var y = stageHeight * types.indexOf(type) + stageHeight * 0.5;

                var point = new Point(x, y);
                // 1.NetworkPacketsIn [i-17951452](3810.0)(27869.994140625)
                let pos1 = text.indexOf(']');
                point.title = timeTag + ": " + text.substring(0,pos1)+']';
                point.color = text.substring(pos1+1,text.length);
                point.recordTime = recordTime;
                // let pos1 = text.indexOf(".");
                // let pos2 = text.indexOf("[");
                // let pos3 = text.indexOf("(");
                // let pos4 = text.indexOf("(",pos3+1);
                // let metric = text.substring(pos1+1,pos2-1).trim();
                // let value = text.substring(pos3+1,pos4-2).trim();
                // point.title = "Metric:"+metric+", value:"+value;

                lastPoints[i].push(point);
                points.push(point);
                lastPoints[i - 1] && lastPoints[i - 1].forEach((p1)=> {
                    if (point.recordTime.diff(p1.recordTime, 'hours') < threshold) {
                        lines.push(new Line(p1, point));
                    }
                });
                return point;
            });
        });
        this.points = points;
        this.lines = lines;
    }

    highLightPoint(point) {
        let $component = $(point.component);
        $component.css({
            strokeWidth: 1,
            stroke: '#000000',
            cursor: 'pointer'
        });

        $(this.$showText).text(point.title).attr({
            x: point.x + 15,
            y: point.y + 10
        });

        point.outLines.forEach((line)=>this.highLightLine(line, 'blue'));
        point.inLines.forEach((line)=>this.highLightLine(line, 'green'));

    }

    unHighLightPoint(point) {
        let $component = $(point.component);
        $component.attr({ r: 5 }).css({
            strokeWidth: 1,
            stroke: '#fff',
            cursor: 'pointer'
        });
        $(this.$showText).text('').attr({ x: point.x, y: point.y });
        point.outLines.forEach((line)=>this.unHighLightLine(line));
        point.inLines.forEach((line)=>this.unHighLightLine(line));
    }

    getZoomedX(x) {
        const zoomRange = this.state.zoomRange;
        return (x - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
    }
    getZoomedY(y) {
        const zoomRange = this.state.zoomRange;
        return (y - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;
    }

    @autobind
    highLightLine(line, color) {
        let hex = ({ green: '#33ff66', blue: '#3366ff' })[color];
        $(line.component).attr({ 'marker-end': `url(#arrow-${color})` }).css({
            strokeWidth: 1.4,
            stroke: hex,
            cursor: 'pointer'
        });
        const from = line.fromPoint;
        const to = line.toPoint;
        const cx = (this.getZoomedX(to.x) - this.getZoomedX(from.x))/2 + this.getZoomedX(from.x);
        const cy = (this.getZoomedY(to.y) - this.getZoomedY(from.y))/2 + this.getZoomedY(from.y);
        $(this.$crossLine).attr({ d: `M ${cx-5} ${cy-5} L ${cx+5} ${cy+5} M ${cx+5} ${cy-5} L ${cx-5} ${cy+5} Z` });
    }

    @autobind
    unHighLightLine(line) {
        $(line.component).attr({ 'marker-end': `url(#arrow)` }).css({
            strokeWidth: 1,
            stroke: "#999",
            cursor: 'pointer'
        });
        $(this.$crossLine).attr({ d: ''});
    }

    @autobind
    handleLineClick(line) {
        alert('Remove line');
    }

    getEventShapeType(text) {
        text = text.toLowerCase();
        if (text.indexOf('- network') >= 0)
            return 'rect-x';
        else if(text.indexOf('- disk') >=0 ){
            return 'rect-y';
        }
        else if(text.indexOf('- workload increase') >= 0)
            return 'up';
        else if(text.indexOf('- instance down') >= 0)
            return 'down';
        else if(text.indexOf('- high cpu') >=0)
            return 'diamond'
        return 'circle';
    }
    renderPoint(point, index) {
        let { x, y } = point;
        let zoomRange = this.state.zoomRange;
        const shape = this.getEventShapeType(point.title.toLowerCase());

        x = (x - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
        y = (y - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;

        if (shape === 'circle') {
            return (
              <circle ref={(c)=>point.component = c} key={point.id + index} className="node" r={5}
                      cx={x} cy={y} fill={point.color}
                      style={{ strokeWidth: 1, stroke: '#fff', cursor: 'pointer' }}
                      onMouseEnter={()=>this.highLightPoint(point)}
                      onMouseLeave={()=>this.unHighLightPoint(point)}>
                  <title>{point.title}</title>
              </circle>
            )
        } else if (shape === 'rect-x') {
            return (
              <rect ref={(c)=>point.component = c} key={point.id + index} className="node"
                    x={x-5} y={y-3} width={10} height={6} fill={point.color}
                    style={{ strokeWidth: 1, stroke: '#fff', cursor: 'pointer' }}
                    onMouseEnter={()=>this.highLightPoint(point)}
                    onMouseLeave={()=>this.unHighLightPoint(point)}>
                  <title>{point.title}</title>
              </rect>
            )
        } else if (shape === 'rect-y') {
            return (
              <rect ref={(c)=>point.component = c} key={point.id + index} className="node"
                    x={x-3} y={y-5} width={6} height={10} fill={point.color}
                    style={{ strokeWidth: 1, stroke: '#fff', cursor: 'pointer' }}
                    onMouseEnter={()=>this.highLightPoint(point)}
                    onMouseLeave={()=>this.unHighLightPoint(point)}>
                  <title>{point.title}</title>
              </rect>
            )
        } else if (shape === 'up'){
            return (
              <polygon ref={(c)=>point.component = c} key={point.id + index} className="node"
                    points={`${x},${y-7} ${x-5},${y+4} ${x+5},${y+4}`} fill={point.color}
                    style={{ strokeWidth: 1, stroke: '#fff', cursor: 'pointer' }}
                    onMouseEnter={()=>this.highLightPoint(point)}
                    onMouseLeave={()=>this.unHighLightPoint(point)}>
                  <title>{point.title}</title>
              </polygon>
            )
        } else if (shape === 'down'){
            return (
              <polygon ref={(c)=>point.component = c} key={point.id + index} className="node"
                       points={`${x-5},${y-4} ${x+5},${y-4} ${x},${y+7}`} fill={point.color}
                       style={{ strokeWidth: 1, stroke: '#fff', cursor: 'pointer' }}
                       onMouseEnter={()=>this.highLightPoint(point)}
                       onMouseLeave={()=>this.unHighLightPoint(point)}>
                  <title>{point.title}</title>
              </polygon>
            )
        } else if (shape === 'diamond'){
            return (
              <polygon ref={(c)=>point.component = c} key={point.id + index} className="node"
                       points={`${x},${y-6} ${x+6},${y} ${x},${y+6} ${x-6},${y}`} fill={point.color}
                       style={{ strokeWidth: 1, stroke: '#fff', cursor: 'pointer' }}
                       onMouseEnter={()=>this.highLightPoint(point)}
                       onMouseLeave={()=>this.unHighLightPoint(point)}>
                  <title>{point.title}</title>
              </polygon>
            )
        }
    }

    renderLine(line, index) {
        let zoomRange = this.state.zoomRange;
        let { x: x1, y: y1 } = line.fromPoint;
        let { x: x2, y: y2 } = line.toPoint;

        x1 = (x1 - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
        x2 = (x2 - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
        y1 = (y1 - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;
        y2 = (y2 - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;

        let style = {
            strokeWidth: 1,
            stroke: '#999',
            cursor: 'pointer'
        };
        return (
            <g key={line.id + index}
               onMouseEnter={()=>this.highLightLine(line, 'blue')}
               onMouseLeave={()=>this.unHighLightLine(line)}
            >
                <line ref={(c)=>line.component = c}
                      x1={x1} y1={y1} x2={x2} y2={y2} style={style}
                      onMouseEnter={()=>this.highLightLine(line, 'blue')}
                      onMouseLeave={()=>this.unHighLightLine(line)}
                      onClick={() => this.handleLineClick(line)}
                      markerEnd={`url(#arrow)`}/>
            </g>
        )
    }

    getWrapText(text, maxLength) {
        let ret = [];
        ret.push(text);
        return ret;
    }

    handleMouseDown(e) {
        let { layerX, layerY } = e.nativeEvent;
        layerX = layerX - 250;
        this.setState({ selectRange: Object.assign({}, this.state.selectRange, { x1: layerX, y1: layerY }) })
    }

    handleMouseMove(e) {
        let { layerX, layerY } = e.nativeEvent;
        layerX = layerX - 250;
        let selectRange = this.state.selectRange;
        selectRange.x2 = layerX;
        selectRange.y2 = layerY;
        $(this.$selectReact).attr({
            x: Math.min(selectRange.x1, selectRange.x2) || 0,
            y: Math.min(selectRange.y1, selectRange.y2) || 0,
            width: Math.abs(selectRange.x1 - selectRange.x2) || 0,
            height: Math.abs(selectRange.y1 - selectRange.y2) || 0
        });
    }

    handleMouseUp(e) {
        let { layerX, layerY } = e.nativeEvent;
        layerX = layerX - 250;
        let svg = this.state.svg;
        let selectRange = this.state.selectRange;
        selectRange.x2 = layerX;
        selectRange.y2 = layerY;
        let x1 = selectRange.x1 / this.state.zoomRange.zoomX + Math.min(this.state.zoomRange.x1, this.state.zoomRange.x2);
        let x2 = selectRange.x2 / this.state.zoomRange.zoomX + Math.min(this.state.zoomRange.x1, this.state.zoomRange.x2);
        let y1 = selectRange.y1 / this.state.zoomRange.zoomY + Math.min(this.state.zoomRange.y1, this.state.zoomRange.y2);
        let y2 = selectRange.y2 / this.state.zoomRange.zoomY + Math.min(this.state.zoomRange.y1, this.state.zoomRange.y2);
        let zoomX = svg.width / Math.abs(x1 - x2);
        let zoomY = svg.height / Math.abs(y1 - y2);
        if ((x1 == x2) || (y1 == y2)) return this.setState({ selectRange: {} });
        this.setState({ zoomRange: { x1, x2, y1, y2, zoomX, zoomY }, selectRange: {} })
    }

    @autobind
    reset() {
        this.setState({
            zoomRange: {
                x1: 0, y1: 0,
                x2: 900, y2: 600,
                zoomX: 1, zoomY: 1
            }
        })
    }

    render() {
        let { dataArray, types, threshold, startTimestamp, endTimestamp } = this.state;
        let { svg, selectRange, zoomRange } = this.state;
        let stageHeight = svg.height / Math.max(types.length, 1);
        let stageWidth = (svg.width - 250) / Math.max(dataArray.length, 1);

        this.calculateGraph();
        return (
            <div>
                <div style={{paddingBottom:8, marginBottom:8, borderBottom: '1px solid #ddd'}}>
                    <span
                      style={{display: 'inline-block', paddingRight: '1em', fontSize:12, fontWeight: 'bold'}}
                    >Time Thresholds for Causal Relationships (hour):</span>
                    <Dropdown mode="select" className="mini" value={threshold}
                              onChange={(v, t) => this.setState({threshold: t})}>
                        <i className="dropdown icon"/>
                        <div className="menu">
                            <div className="item">0.5</div>
                            <div className="item">1</div>
                            <div className="item">1.5</div>
                            <div className="item">3</div>
                            <div className="item">6</div>
                        </div>
                    </Dropdown>
                    <span style={{float:'right'}}
                          className="ui button mini green" onClick={this.reset}>Reset</span>
                </div>
                <div className="relative" style={{ display: 'flex' }}>
                    <svg {...{ width: 250, height: 600, }}>
                        {types.map((type, index)=> {
                            var y = stageHeight * index + stageHeight * 0.5;
                            y = (y - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;
                            return this.getWrapText(type.split("_").join(" "), 16).map((text, i)=>
                                <text fontSize="12" className="no-select" key={`${type}-text=${i}`}
                                      x={0} y={y + i * 15 - 5}>{text}</text>
                            )
                        })}
                    </svg>
                    <svg {...svg} style={{ cursor: 'crosshair' }}
                         onMouseDown={this.handleMouseDown.bind(this)}
                         onMouseMove={this.handleMouseMove.bind(this)}
                         onMouseUp={this.handleMouseUp.bind(this)}>

                        <defs>
                            <marker id={`arrow`} markerWidth="13" markerHeight="13" refX="10" refY="6" orient="auto">
                                <path d="M2,2 L2,11 L10,6 L2,2" style={{ fill: '#999' }}/>
                            </marker>

                            <marker id={`arrow-blue`} markerWidth="12" markerHeight="12" refX="10" refY="6"
                                    orient="auto">
                                <path d="M2,2 L2,11 L10,6 L2,2" style={{ strokeWidth: 0, fill: '#3366FF' }}/>
                            </marker>

                            <marker id={`arrow-green`} markerWidth="12" markerHeight="12" refX="10" refY="6"
                                    orient="auto">
                                <path d="M2,2 L2,11 L10,6 L2,2" style={{ strokeWidth: 0, fill: '#33FF66' }}/>
                            </marker>
                        </defs>
                        {types.map((type, index)=> {
                            var y = stageHeight * index + stageHeight * 0.5;
                            y = (y - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;
                            return <line key={type} x1={0} y1={y} x2={svg.width - 250} y2={y}
                                         style={{ strokeWidth: 1, stroke: '#f1f1f1' }}/>
                        })}
                        {dataArray.map(([record, ...records], i) => {
                            var x = stageWidth * i + stageWidth / 2;
                            x = (x - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
                            let recordTime = (new Date(record.split(',')[0])).getTime();
                                return <line key={'x-line' + i} x1={x} y1={0} x2={x} y2={svg.height - stageHeight / 2}
                                         style={{ strokeWidth: 1, stroke: '#f1f1f1' }}/>

                        })}
                        {this.lines.map(this.renderLine.bind(this))}
                        {this.points.map(this.renderPoint.bind(this))}

                        <text ref={(c)=>this.$showText = c} />
                        <rect ref={(c)=>this.$selectReact = ReactDOM.findDOMNode(c)}
                              x={Math.min(selectRange.x1, selectRange.x2) || 0}
                              y={Math.min(selectRange.y1, selectRange.y2) || 0}
                              width={Math.abs(selectRange.x1 - selectRange.x2) || 0}
                              height={Math.abs(selectRange.y1 - selectRange.y2) || 0}
                              style={{
                                  fill: 'blue',
                                  stroke: 'blue',
                                  strokeWidth: 2,
                                  fillOpacity: 0.1,
                                  strokeOpacity: 0.5
                              }}/>

                        <rect x={800} y={0} width={250} height={600}
                              style={{ fill: 'white', stroke: 'white', strokeWidth: 2 }}/>
                        <rect x={0} y={svg.height - stageHeight / 4} width={900} height={stageHeight / 4}
                              style={{ fill: 'white', stroke: 'white', strokeWidth: 2 }}/>

                        {dataArray.map(([record, ...records], i) => {
                            if (i % parseInt(dataArray.length / 6)) return undefined;

                            var x = stageWidth * i + stageWidth / 2;
                            x = (x - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;

                            let recordTime = (new Date(record.split(',')[0])).getTime();
                            return <text className="no-select" key={'x-text' + i} x={x - 16}
                                         y={svg.height - stageHeight / 4}>{record.substr(11, 5)}</text>

                        })}
                        <path ref={(c) => this.$crossLine = c} stroke="red" strokeWidth={2} />
                    </svg>
                </div>
            </div>
        )
    }
}