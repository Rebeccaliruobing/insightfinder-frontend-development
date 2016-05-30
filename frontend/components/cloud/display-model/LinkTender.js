import React from 'react'
import DataLinks from '../../../mock/cloud/DataLinks';


class Point {
  inLines = [];
  outLines = [];
  id;
  x;
  y;
  title;

  constructor(x:number, y:number) {
    this.id = `point-${x}-${y}`;
    this.x = x;
    this.y = y;
  }

  hasLine(l:Line) {
    return this.inLines.indexOf(l) >= 0 || this.outLines.indexOf(l) >= 0;
  }
}

class Line {
  fromPoint;
  toPoint;
  id;

  constructor(p1:Point, p2:Point) {
    this.link(p1, p2);
  }

  link(p1:Point, p2:Point) {
    this.fromPoint && this.fromPoint.outLines.splice(this.fromPoint.outLines.indexOf(this), 1);
    this.toPoint && this.toPoint.inLines.splice(this.toPoint.inLines.indexOf(this), 1);
    this.fromPoint = p1;
    this.toPoint = p2;
    p1.outLines.push(this);
    p2.inLines.push(this);
    this.id = `line-${p1.id}-${p2.id}`;
  }

  getArrow(style) {
    let {x, y} = this.toPoint;
    let height = 10;
    let x2 = x - Math.sin(45) * height, y2 = y - Math.cos(5), y3 = y + Math.cos(5);
    return <polygon points={`${x},${y} ${x2},${y2} ${x2},${y3}`} style={style}/>
  }
}


export default class LinkTender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      types: [],
      svg: {
        width: 900,
        height: 300,
        style: {
          border: '1px solid #e0e0e0'
        }
      },
      points: [],
      lines: [],
      selectRange: {},
      zoomRange: {
        x1: 0, y1: 0,
        x2: 900, y2: 300,
        zoomX: 1, zoomY: 1
      }
    }
  }

  componentDidMount() {
    let dataArray = [];
    let types = [];
    DataLinks.split("\n").forEach((line)=> {
      let [d1, d2, d3, d4] = line.split(".");
      if ((parseInt(d1) + '') == d1) {
        dataArray[dataArray.length - 1].push(line);
        var type = (/([a-z_]+)/g).exec(line)[0];
        if (types.indexOf(type) < 0) types.push(type);
      } else if (line.trim()) {
        dataArray.push([line]);
      }
    });
    this.setState({dataArray, types}, ()=> {

      let state = this.state;
      let {dataArray, types, svg} = state;
      state.points = [];
      state.lines = [];

      let stageWidth = (svg.width - 100) / Math.max(dataArray.length, 1);
      let stageHeight = svg.height / Math.max(types.length, 1);
      let lastPoints = [];

      dataArray.forEach(([x, ...records], i) => {
        lastPoints[i] = [];
        records.map((text)=> {
          var type = (/([a-z_]+)/g).exec(text)[0];
          var x = stageWidth * i + stageWidth / 2;
          var y = stageHeight * types.indexOf(type) + stageHeight * 0.5;

          var point = new Point(x, y);
          point.title = text;

          lastPoints[i].push(point);
          state.points.push(point);
          lastPoints[i - 1] && lastPoints[i - 1].forEach((p1)=> {
            state.lines.push(new Line(p1, point))
          });
          return point;
        });
      });
      this.setState(state);
    });
  }

  renderPoint(point) {
    let isHover = this.state.hoverNode == point.id;

    let {x, y} = point;
    let zoomRange = this.state.zoomRange;

    x = (x - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
    y = (y - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;

    return [
      <circle key={point.id} class="node" r={(isHover ? 8 : 5) * (zoomRange.zoomX + zoomRange.zoomY) / 2}
              cx={x} cy={y} fill="rgb(255, 127, 14)"
              style={{strokeWidth: 1, stroke: isHover ? 'rgb(255, 127, 14)' : '#fff', cursor: 'pointer'}}
              onMouseEnter={()=>this.setState({hoverNode: point.id, point})}
              onMouseLeave={()=> isHover && this.setState({hoverNode: undefined, point: undefined})}>
        <title>{point.title}</title>
      </circle>
    ]
  }

  renderLine(line) {
    let isHover = this.state.hoverNode == line.id;
    isHover = (this.state.point && this.state.point.hasLine(line)) || isHover;


    let zoomRange = this.state.zoomRange;

    let {x: x1, y: y1} = line.fromPoint;
    let {x: x2, y: y2} = line.toPoint;

    x1 = (x1 - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
    x2 = (x2 - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
    y1 = (y1 - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;
    y2 = (y2 - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;

    let style = {
      strokeWidth: (isHover ? 3 : 1) * (zoomRange.zoomX + zoomRange.zoomY) / 2,
      stroke: isHover ? "#3366FF" : '#999',
      cursor: 'pointer'
    };

    return [
      <line key={line.id} x1={x1} y1={y1} x2={x2} y2={y2} style={style}
            onMouseEnter={()=>this.setState({hoverNode: line.id})}
            onMouseLeave={()=> isHover && this.setState({hoverNode: undefined})}/>
    ]
  }

  getWrapText(text, maxLength:number) {
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

      return [currentList.join(" ")].concat(this.getWrapText(list.join(" "), maxLength));

    } else {
      return [text]
    }
  }

  handleMouseDown(e) {
    let {layerX, layerY} = e.nativeEvent;
    this.setState({selectRange: Object.assign({}, this.state.selectRange, {x1: layerX, y1: layerY})})
  }

  handleMouseMove(e) {
    let {layerX, layerY} = e.nativeEvent;
    let selectRange = this.state.selectRange;
    // if (selectRange.x1 == layerX || selectRange.y1 == layerY) return;
    this.setState({selectRange: Object.assign({}, selectRange, {x2: layerX, y2: layerY})})
  }

  handleMouseUp(e) {
    let svg = this.state.svg;
    let selectRange = this.state.selectRange;
    let x1 = selectRange.x1 / this.state.zoomRange.zoomX + Math.min(this.state.zoomRange.x1, this.state.zoomRange.x2);
    let x2 = selectRange.x2 / this.state.zoomRange.zoomX + Math.min(this.state.zoomRange.x1, this.state.zoomRange.x2);
    let y1 = selectRange.y1 / this.state.zoomRange.zoomY + Math.min(this.state.zoomRange.y1, this.state.zoomRange.y2);
    let y2 = selectRange.y2 / this.state.zoomRange.zoomY + Math.min(this.state.zoomRange.y1, this.state.zoomRange.y2);
    let zoomX = svg.width / Math.abs(x1 - x2);
    let zoomY = svg.height / Math.abs(y1 - y2);
    if ((x1 == x2) || (y1 == y2)) return this.setState({selectRange: {}});
    this.setState({zoomRange: {x1, x2, y1, y2, zoomX, zoomY}, selectRange: {}})
  }

  render() {
    let {types, svg, points, lines, point, dataArray, selectRange, zoomRange} = this.state;
    let stageHeight = svg.height / Math.max(types.length, 1);
    let stageWidth = (svg.width - 100) / Math.max(dataArray.length, 1);
    let reset = ()=> {
      this.setState({
        zoomRange: {
          x1: 0, y1: 0,
          x2: 900, y2: 300,
          zoomX: 1, zoomY: 1
        }
      })
    };
    return (
      <div>
        <span className="ui button green" onClick={reset}>reset</span><br/>
        <div className="relative">
          <svg {...svg} style={{cursor: 'crosshair'}}
                        onMouseDown={this.handleMouseDown.bind(this)}
                        onMouseMove={this.handleMouseMove.bind(this)}
                        onMouseUp={this.handleMouseUp.bind(this)}>
            {types.map((type, index)=> {
              var y = stageHeight * index + stageHeight * 0.5;
              y = (y - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;
              return <line key={type} x1={0} y1={y} x2={svg.width - 100} y2={y}
                           style={{strokeWidth: 1, stroke: '#f1f1f1'}}/>
            })}
            {dataArray.map(([record, ...records], i) => {
              var x = stageWidth * i + stageWidth / 2;
              x = (x - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;
              return <line key={'x-line' + i} x1={x} y1={0} x2={x} y2={svg.height - stageHeight / 2}
                           style={{strokeWidth: 1, stroke: '#f1f1f1'}}/>

            })}
            {lines.map(this.renderLine.bind(this))}
            {points.map(this.renderPoint.bind(this))}

            {
              point &&
              this.getWrapText(point.title, 16).map((text, index)=>
                <text className="no-select" key={'hover-text-' + index}
                      x={(point.x + 10 - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX}
                      y={(point.y - 5 + index * 15 - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY}>
                  {text}
                </text>
              )
            }
            <rect x={Math.min(selectRange.x1, selectRange.x2) || 0}
                  y={Math.min(selectRange.y1, selectRange.y2) || 0}
                  width={Math.abs(selectRange.x1 - selectRange.x2) || 0}
                  height={Math.abs(selectRange.y1 - selectRange.y2) || 0}
                  style={{fill:'blue',stroke:'blue',strokeWidth:2,fillOpacity:0.1,strokeOpacity:0.5}}/>

            <rect x={800} y={0} width={100} height={300}
                  style={{fill:'white',stroke:'white',strokeWidth:2}}/>
            <rect x={0} y={svg.height - stageHeight / 4} width={900} height={stageHeight / 4}
                  style={{fill:'white',stroke:'white',strokeWidth:2}}/>

            {types.map((type, index)=> {
              var y = stageHeight * index + stageHeight * 0.5;
              y = (y - Math.min(zoomRange.y1, zoomRange.y2)) * zoomRange.zoomY;
              return this.getWrapText(type.split("_").join(" "), 16).map((text, i)=>
                <text className="no-select" key={`${type}-text=${i}`}
                      x={svg.width - 100} y={y + i * 15 - 5}>{text}</text>
              )
            })}

            {dataArray.map(([record, ...records], i) => {
              var x = stageWidth * i + stageWidth / 2;
              x = (x - Math.min(zoomRange.x1, zoomRange.x2)) * zoomRange.zoomX;

              return (i % 2) ? undefined : <text className="no-select" key={'x-text' + i} x={x - 16}
                                                 y={svg.height - stageHeight / 4}>{record.substr(11, 5)}</text>

            })}

          </svg>
        </div>
      </div>
    )
  }
}