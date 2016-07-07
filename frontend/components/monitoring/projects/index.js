import React from 'react';
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';
import {Console} from '../../../artui/react';
import AmazonProjects from './amazon';
import ProjectsGoogle from './google';
import CustomProjects from './custom';


class Projects extends React.Component {

  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object
  };


  constructor(props) {
    super(props);
    this.selectTab.bind(this);
    this._el = null;
    let tabStates = ['custom','amazon','google'].indexOf(this.props.params.tabId);
    this.state = {
      tabStates: {
        custom: [-1, 0].indexOf(tabStates)!=-1?'active':'',
        amazon: tabStates == 1?'active':'',
        google: tabStates == 2?'active':''
      }
    }
  }

  selectTab(e, tab) {
    var tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, function (val) {
      return '';
    });
    tabStates[tab] = 'active';
    let pushTab = location.pathname.split('/').length ==3?'project-list/'+tab: tab;
    history.pushState({title: tab},'detail',pushTab);
    this.setState({tabStates: tabStates});
  }

  render() {

    var tabStates = this.state['tabStates'];
    var userInstructions = this.context.userInstructions;
    let {projectString, incidentAllInfo, dataAllInfo,projectSettingsAllInfo} = this.context.dashboardUservalues;
    let projectInfoArray = projectSettingsAllInfo.map((s)=> [s.projectName,s.zone,s.agentDataEnabled]);
    let projectGroupByType = {'AWS': [], 'Google': [], 'custom': []};

    if(projectString.length>0){
      projectString.split(',').map((s)=>s.split(":")).forEach((project)=>{
        let [name, dataType, cloudType] = project;
        let zone = projectInfoArray.find((pair)=>pair[0] == name)?(projectInfoArray.find((pair)=>pair[0] == name)[1]):"N/A";
        let agentDataEnabled = projectInfoArray.find((pair)=>pair[0] == name)?(projectInfoArray.find((pair)=>pair[0] == name)[2]):false;
        switch (dataType) {
          case 'AWS':
          case 'EC2':
          case 'RDS':
          case 'DynamoDB':
            projectGroupByType.AWS.push({name, dataType, cloudType,zone,agentDataEnabled});
            break;
          case 'GAE':
          case 'GCE':
            projectGroupByType.Google.push({name, dataType, cloudType,zone,agentDataEnabled});
            break;
          default:
            projectGroupByType.custom.push({name, dataType, cloudType,zone,agentDataEnabled});
        }
      });
    }

    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
          </div>
          <div className="ui pointing secondary menu">
            <a className={tabStates['custom'] + ' item'}
               onClick={(e) => this.selectTab(e, 'custom')}>Insight Agent</a>
            <a className={tabStates['amazon'] + ' item'}
               onClick={(e) => this.selectTab(e, 'amazon')}>AWS CloudWatch</a>
            <a className={tabStates['google'] + ' item'}
               onClick={(e) => this.selectTab(e, 'google')}>Google Cloud Monitoring</a>
          </div>
          <div className={tabStates['amazon'] + ' ui tab '}>
            {tabStates['amazon'] === 'active' ? <AmazonProjects projects={projectGroupByType.AWS}/> : null}
          </div>
          <div className={tabStates['google'] + ' ui tab '}>
            {tabStates['google'] === 'active' ? <ProjectsGoogle projects={projectGroupByType.Google}/> : null}
          </div>
          <div className={tabStates['custom'] + ' ui tab '}>
            {tabStates['custom'] === 'active' ? <CustomProjects projects={projectGroupByType.custom}/> : null}
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default Projects;