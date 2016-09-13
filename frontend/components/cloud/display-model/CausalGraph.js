import React from 'react'
import ReactDOM from 'react-dom'
import {autobind} from 'core-decorators';

class Point {
    inLines = [];
    outLines = [];
    id;
    x;
    y;
    title;

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
        dataArray.forEach((data, i) => {
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
        this.state = {
            dataArray: newDataArray.reverse(),
            types: Array.from(newTypesSet),
            startTimestamp:startTimestamp,
            endTimestamp:endTimestamp,
            svgWidthUpdate: 900,
            svg: {
                width: 900,
                height: 500,
                style: {
                    border: '1px solid #e0e0e0'
                }
            },
            points: [],
            lines: [],
            selectRange: {},
            zoomRange: {
                x1: 0, y1: 0,
                x2: 900, y2: 500,
                zoomX: 1, zoomY: 1
            }
        }
    }

    componentDidMount() {
        let { dataArray, startTimestamp, endTimestamp, types } = this.state;
        let state = this.state;
        let { svg } = state;
        state.points = [];
        state.lines = [];

        let stageWidth = (svg.width - 140) / Math.max(dataArray.length, 1);
        let stageHeight = svg.height / Math.max(types.length, 1);
        let lastPoints = [];
        let modelWidth = 0;
        dataArray.forEach(([x, ...records], i) => {
            lastPoints[i] = [];
            let recordTime = (new Date(x.split(',')[0])).getTime();
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
                    let pos1 = text.indexOf(".");
                    let pos2 = text.indexOf("[");
                    let pos3 = text.indexOf("(");
                    let pos4 = text.indexOf("(",pos3+1);
                    let metric = text.substring(pos1+1,pos2-1).trim();
                    let value = text.substring(pos3+1,pos4-2).trim();
                    point.title = "Metric:"+metric+", value:"+value;

                    lastPoints[i].push(point);
                    state.points.push(point);
                    lastPoints[i - 1] && lastPoints[i - 1].forEach((p1)=> {
                        state.lines.push(new Line(p1, point))
                    });
                    return point;
                });
        });
        this.setState(state);
    }

    highLightPoint(point) {
        let $component = $(point.component);
        $component.attr({ r: 8 }).css({
            strokeWidth: 1,
            stroke: 'rgb(255, 127, 14)',
            cursor: 'pointer'
        });

        $(this.$showText).text(point.title).attr({
            x: point.component.getAttribute('cx') + 10,
            y: point.component.getAttribute('cy')
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

    highLightLine(line, color) {
        let hex = ({ green: '#33ff66', blue: '#3366ff' })[color];
        $(line.component).attr({ 'marker-end': `url(#arrow-${color})` }).css({
            strokeWidth: 2,
            stroke: hex,
            cursor: 'pointer'
        });
    }

    unHighLightLine(line) {
        $(line.component).attr({ 'marker-end': `url(#arrow)` }).css({
            strokeWidth: 1,
            stroke: "#999",
            cursor: 'pointer'
        });
    }

    renderPoint(point, index) {
        let isHover = false;

        let { x, y } = point;
        let zoomRange = this.state.zoomRange;

        x = (x - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
        y = (y - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;

        return (
            <circle ref={(c)=>point.component = c} key={point.id + index} className="node" r={(isHover ? 8 : 5)}
                    cx={x} cy={y} fill="rgb(255, 127, 14)"
                    style={{ strokeWidth: 1, stroke: isHover ? 'rgb(255, 127, 14)' : '#fff', cursor: 'pointer' }}
                    onMouseEnter={()=>this.highLightPoint(point)}
                    onMouseLeave={()=>this.unHighLightPoint(point)}>
                <title>{point.title}</title>
            </circle>
        );
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
            <g key={line.id + index}>
                <line ref={(c)=>line.component = c}
                      x1={x1} y1={y1} x2={x2} y2={y2} style={style}
                      onMouseEnter={()=>this.highLightLine(line, 'blue')}
                      onMouseLeave={()=>this.unHighLightLine(line)}
                      markerEnd={`url(#arrow)`}/>
            </g>
        )
    }

    getWrapText(text, maxLength) {
        return text.split(' ');
        /*
        if (text.length > maxLength && text.split(" ").length > 0) {
            var s = '';
            var list = text.split(" ");

            if (list[0].length > maxLength) {
                return [list.splice(0, 1), this.getWrapText(list)]
            }


            s = `${s} ${list.shift()}`;
            while (s.length <= maxLength) {
                s = `${s} ${list.shift()}`;
            }

            var currentList = s.split(" ");
            list.unshift(currentList.pop());

            // FIXME: What'is logical of this code!!!!
            return [currentList.join(" ")];
            // return [currentList.join(" ")].concat(this.getWrapText(list.join(" "), maxLength));

        } else {
            return [text]
        }
        */
    }

    handleMouseDown(e) {
        let { layerX, layerY } = e.nativeEvent;
        layerX = layerX - 140;
        this.setState({ selectRange: Object.assign({}, this.state.selectRange, { x1: layerX, y1: layerY }) })
    }

    handleMouseMove(e) {
        let { layerX, layerY } = e.nativeEvent;
        layerX = layerX - 140;
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
        layerX = layerX - 140;
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
                x2: 900, y2: 500,
                zoomX: 1, zoomY: 1
            }
        })
    }

    render() {
        let { dataArray, types, startTimestamp, endTimestamp } = this.state;
        let { svg, points, lines, selectRange, zoomRange } = this.state;
        let stageHeight = svg.height / Math.max(types.length, 1);
        let stageWidth = (svg.width - 140) / Math.max(dataArray.length, 1);
        return (
            <div>
                <span className="ui button mini green" onClick={this.reset}>Reset</span><br/>
                <div className="relative" style={{ display: 'flex' }}>
                    <svg {...{ width: 140, height: 500, }}>
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
                            return <line key={type} x1={0} y1={y} x2={svg.width - 140} y2={y}
                                         style={{ strokeWidth: 1, stroke: '#f1f1f1' }}/>
                        })}
                        {dataArray.map(([record, ...records], i) => {
                            var x = stageWidth * i + stageWidth / 2;
                            x = (x - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
                            let recordTime = (new Date(record.split(',')[0])).getTime();
                                return <line key={'x-line' + i} x1={x} y1={0} x2={x} y2={svg.height - stageHeight / 2}
                                         style={{ strokeWidth: 1, stroke: '#f1f1f1' }}/>

                        })}
                        {lines.map(this.renderLine.bind(this))}
                        {points.map(this.renderPoint.bind(this))}

                        <text ref={(c)=>this.$showText = c}></text>
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

                        <rect x={800} y={0} width={140} height={500}
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

                    </svg>
                </div>
            </div>
        )
    }
}