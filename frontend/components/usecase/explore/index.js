import React, { Component } from 'react';
import moment from 'moment';
import { Console, Link } from '../../../artui/react/index';

export default class ListAll extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    const weeks = 1;
    this.state = {
      view: 'chart',
      dateIndex: 0,
      timeIndex: 0,
      params: {
        showAddPanel: false,
        projects: [],
        weeks,
        endTime: moment(new Date()).toDate(),
        startTime: moment(new Date()).add(-7 * weeks, 'days'),
      },
      systemNames: ['Cassandra', 'Hadoop', 'Apache', 'Tomcat', 'MySQL', 'HDFS', 'Spark', 'Lighttpd', 'Memcached'],
      colors: ['#339999', '#1976d2', '#1ac986', '#2196f3', '#505077'],
      tabStates: {
        system: 'active',
        custom: '',
      },
    };
  }

  selectTab(e, tab) {
    let tabStates = this.state.tabStates;
    tabStates = _.mapValues(tabStates, () => '');
    tabStates[tab] = 'active';
    this.setState({ tabStates });
  }

  componentDidMount() {
  }

  handleData(data) {
    this.setState({ data }, () => {
      this.setHeatMap(0, 0);
    });
  }

  handleToggleFilterPanel() {
    this.setState({ showAddPanel: !this.state.showAddPanel }, () => {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp();
    });
  }

  render() {
    const { view, showAddPanel, params, colors, systemNames, tabStates } = this.state;
    const { userInstructions } = this.context;
    const publishedData = this.context.dashboardUservalues.publishedDataAllInfo;
    const allSystemNames = publishedData.map((item, index) => {
      return item.metaData.system;
    }).filter((el, index, arr) => {
      return (el != undefined && index === arr.indexOf(el));
    });
    const userSystemNames = allSystemNames.filter((el, index, arr) => {
      return (systemNames.indexOf(el) == -1 &&
        !(el.toLowerCase() == 'other' || el.toLowerCase() == 'others' || el.toLowerCase() == 'unknown'));
    });
    const userOtherSystemNames = allSystemNames.filter((el, index, arr) => {
      return (systemNames.indexOf(el) == -1 &&
        (el.toLowerCase() == 'other' || el.toLowerCase() == 'others' || el.toLowerCase() == 'unknown'));
    });

    const containerWidth = $('body').width() - 360;

    const blockStyle = {
      textAlign: 'center',
      backgroundColor: 'rgb(80, 80, 119)',
      width: 150,
      height: 150,
      lineHeight: '150px',
    };
    const wrapperStyle = {
      padding: 30,
    };
    const linkStyle = {
      display: 'block',
      color: '#fff',
    };


    return (
      <Console.Content>
        <div style={{ padding: 20 }}>
          <div className="ui pointing secondary menu">
                  <a
className={`${tabStates['system']  } item`}
                    onClick={e => this.selectTab(e, 'system')}
                  >Open Source Systems</a>
                  <a
className={`${tabStates['custom']  } item`}
                    onClick={e => this.selectTab(e, 'custom')}
                  >Custom Systems</a>
                </div>
          <div className={`${tabStates['custom']  } ui tab `}>
                  {!userSystemNames && userOtherSystemNames &&
            <div className="ui four column grid">
              <div className="wide column text-center" style={wrapperStyle}>
                <Link to="/usecase/list-some?system=Others" className="item text-white">
                  <div style={Object.assign({}, blockStyle, { backgroundColor: colors[4] })}>
                    <span>Others</span>
                  </div>
                </Link>
              </div>
            </div>
          }
                  {!userOtherSystemNames && userSystemNames && <div className="ui four column grid">
            { userSystemNames.map((system, index) => {
              const color = colors[index % 5];
              const link = '/usecase/list-some?system=' + system;
              return (
                  <div key={index} className="wide column text-center" style={wrapperStyle}>
                    <Link to={link} className="item text-white">
                      <div style={Object.assign({}, blockStyle, { backgroundColor: color })}>
                        <span>{system}</span>
                      </div>
                    </Link>
                  </div>
                );
            })
            }
            </div>
          }
                  {userSystemNames && userOtherSystemNames &&
            <div className="ui four column grid">
              <div className="wide column text-center" style={wrapperStyle}>
                <Link to="/usecase/list-some?system=Others" className="item text-white">
                  <div style={Object.assign({}, blockStyle, { backgroundColor: colors[4] })}>
                    <span>Others</span>
                  </div>
                </Link>
              </div>
              { userSystemNames.map((system, index) => {
              const color = colors[index % 5];
              const link = '/usecase/list-some?system=' + system;
              return (
                  <div key={index} className="wide column text-center" style={wrapperStyle}>
                    <Link to={link} className="item text-white">
                      <div style={Object.assign({}, blockStyle, { backgroundColor: color })}>
                        <span>{system}</span>
                      </div>
                    </Link>
                  </div>
                );
            })
            }
            </div>
          }
                </div>
          <div className={`${tabStates['system']  } ui tab `}>
            <div className="ui four column grid">
            { systemNames.map((system, index) => {
              const color = colors[index % 5];
              const link = '/usecase/list-some?system=' + system;
              return (
                  <div key={index} className="wide column text-center" style={wrapperStyle}>
                    <Link to={link} className="item text-white">
                      <div style={Object.assign({}, blockStyle, { backgroundColor: color })}>
                        <span>{system}</span>
                      </div>
                    </Link>
                  </div>
                );
            })
            }
          </div>
          </div>
        </div>
      </Console.Content>
    );
  }
}


            // <div className="wide column text-center" style={wrapperStyle}>
            //   <Link to="/usecase/list-some?system=Others" className="item text-white">
            //     <div style={Object.assign({},blockStyle)}>
            //       <span>Others</span>
            //     </div>
            //   </Link>
            // </div>
