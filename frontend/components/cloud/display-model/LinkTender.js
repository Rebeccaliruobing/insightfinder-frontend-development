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
      lines: []
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
    return [
      <circle key={point.id} class="node" r={isHover ? 8 : 5} cx={point.x} cy={point.y} fill="rgb(255, 127, 14)"
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
    return (
      <line key={line.id} x1={line.fromPoint.x} y1={line.fromPoint.y} x2={line.toPoint.x} y2={line.toPoint.y}
            style={{strokeWidth: isHover ? 3 : 1, stroke: isHover ? "#3366FF" : '#999', cursor: 'pointer'}}
            onMouseEnter={()=>this.setState({hoverNode: line.id})}
            onMouseLeave={()=> isHover && this.setState({hoverNode: undefined})}/>
    )
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

  render() {
    let {types, svg, points, lines, point, dataArray} = this.state;
    let stageHeight = svg.height / Math.max(types.length, 1);
    let stageWidth = (svg.width - 100) / Math.max(dataArray.length, 1);
    return (
      <svg {...svg}>
        {types.map((type, index)=> {
          var height = stageHeight * index + stageHeight * 0.5;
          return [
            <line key={type} x1={0} y1={height} x2={svg.width - 100} y2={height}
                  style={{strokeWidth: 1, stroke: '#f1f1f1'}}/>
          ].concat(
            this.getWrapText(type.split("_").join(" "), 16).map((text, i)=>
              <text key={`${type}-text=${i}`} x={svg.width - 100} y={height + i * 15 - 5}>{text}</text>
            ))
        })}
        {
          dataArray.map(([record, ...records], i) => {
            var x = stageWidth * i + stageWidth / 2;
            return [
              <line key={'x-line' + i} x1={x} y1={0} x2={x} y2={svg.height - stageHeight / 2}
                    style={{strokeWidth: 1, stroke: '#f1f1f1'}}/>,
              !(i % 2) &&
              <text key={'x-text' + i} x={x - 32} y={svg.height - stageHeight / 4}>{record.substr(5, 11)}</text>
            ]
          })
        }
        {lines.map(this.renderLine.bind(this))}
        {points.map(this.renderPoint.bind(this))}

        {
          point &&
          this.getWrapText(point.title, 16).map((text, index)=>
            <text key={'hover-text-' + index} x={point.x + 10} y={point.y - 5 + index * 15}>{text}</text>
          )
        }
      </svg>
    )
  }
}