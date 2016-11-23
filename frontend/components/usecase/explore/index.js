import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import {Link, IndexLink}    from 'react-router';
import {
  Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
import apis                 from '../../../apis';
import FilterBar            from './filter-bar';

export default class ListAll extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    let weeks = 1;
    this.state = {
      view: 'chart',
      dateIndex: 0,
      timeIndex: 0,
      params: {
        showAddPanel: false,
        projects: [],
        weeks: weeks,
        endTime: moment(new Date()).toDate(),
        startTime: moment(new Date()).add(-7 * weeks, 'days')
      },
      systemNames: ['Cassandra','Hadoop','Apache','Tomcat','MySQL','HDFS','Spark','Lighttpd','Memcached'],
      colors:['#339999','#1976d2','#1ac986','#2196f3','#505077'],
    };
  }

  componentDidMount() {
  }

  handleData(data) {
    this.setState({data: data}, ()=> {
      this.setHeatMap(0, 0);
    })
  }

  handleToggleFilterPanel() {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleFilterChange(data) {
    let startTime = moment(data.startTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    let endTime = moment(data.endTime).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    this.setState({loading: true}, () => {
      apis.postCloudOutlierDetection(startTime, endTime, data.projectName, 'cloudoutlier').then((resp)=> {
        if (resp.success) {
          resp.data.splitByInstanceModelData = JSON.parse(resp.data.splitByInstanceModelData);
          resp.data.holisticModelData = JSON.parse(resp.data.holisticModelData);
          resp.data.splitByGroupModelData = JSON.parse(resp.data.splitByGroupModelData);
          this.handleData(resp.data);
          this.$filterPanel.slideUp()
        }
        this.setState({loading: false});
      }).catch(()=> {
        this.setState({loading: false});
      })
    });
  }

  render() {
    const {view, showAddPanel, params, colors, systemNames} = this.state;
    const {userInstructions} = this.context;


    const containerWidth = $("body").width() - 360;

    const blockStyle = {
      textAlign: 'center',
      backgroundColor: 'rgb(80, 80, 119)',
      width: 150,
      height: 150,
      lineHeight: `150px`
    };
    const wrapperStyle = {
      padding: 30
    };
    const linkStyle = {
      display: 'block',
      color: '#fff',
    };


    return (
      <Console.Content>
        <div style={{padding: 20}}>
          <div className="ui four column grid">
            { systemNames.map((system, index)=> {
                let color = colors[index % 5];
                let link = "/usecase/list-some?system="+system;
                return(
                  <div className="wide column text-center" style={wrapperStyle}>
                    <Link to={link} className="item text-white">
                      <div style={Object.assign({},blockStyle, {backgroundColor: color})}>
                        <span>{system}</span>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
            <div className="wide column text-center" style={wrapperStyle}>
              <Link to="/usecase/list-some?system=Others" className="item text-white">
                <div style={Object.assign({},blockStyle)}>
                  <span>Others</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }

}