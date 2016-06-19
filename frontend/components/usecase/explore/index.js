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
      }
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
    const {view, showAddPanel, params} = this.state;
    const {userInstructions} = this.context;


    const containerWidth = $("body").width() - 360;

    const blockStyle = {
      textAlign: 'center',
      backgroundColor: 'rgb(80, 80, 119)',
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
          <div className="ui five column grid">
            <div className="wide column text-center" style={wrapperStyle}>
              <div style={Object.assign({},blockStyle, {backgroundColor: '#339999'})}>
                <a style={linkStyle} href={`/usecase/list-some?system=Cassandra`}>Cassandra</a>
              </div>
            </div>
            <div className="wide column text-center" style={wrapperStyle}>
              <div style={Object.assign({}, blockStyle, {backgroundColor: '#66ccff'})}>
                <a style={linkStyle} href={`/usecase/list-some?system=Hadoop`}>Hadoop</a>
              </div>
            </div>
            <div className="wide column text-center" style={wrapperStyle}>
              <div style={Object.assign({}, blockStyle)}>
                <a style={linkStyle} href={`/usecase/list-some?system=Other`}>Other</a>
              </div>
            </div>
          </div>
        </div>
      </Console.Content>
    );
  }

}