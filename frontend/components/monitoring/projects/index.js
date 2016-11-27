import React from 'react';
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';
import {Console} from '../../../artui/react';
import AmazonProjects from './amazon';
import ProjectsGoogle from './google';
import CustomProjects from './custom';
import DataDogProjects from './datadog';
import NewRelicProjects from './newrelic';


class Projects extends React.Component {

  static contextTypes = {
    userInstructions: React.PropTypes.object,
    dashboardUservalues: React.PropTypes.object
  };


  constructor(props) {
    super(props);
    this.selectTab.bind(this);
    this._el = null;
    let tabStates = ["custom","amazon","google","datadog","newrelic"].indexOf(_.last(location.pathname.split('/')));
    this.state = {
      tabStates: {
        custom: [-1, 0].indexOf(tabStates)!=-1?'active':'',
        amazon: tabStates == 1?'active':'',
        google: tabStates == 2?'active':'',
        datadog: tabStates == 3?'active':'',
        newrelic: tabStates == 4?'active':'',
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
  projectList(projectString,projectGroupByType,projectInfoArray){
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
            switch(cloudType) {
              case 'DataDog':
                projectGroupByType.datadog.push({name, dataType, cloudType,zone,agentDataEnabled});
                break;
              case 'NewRelic':
                projectGroupByType.newrelic.push({name, dataType, cloudType,zone,agentDataEnabled});
                break;
              default:
                projectGroupByType.custom.push({name, dataType, cloudType,zone,agentDataEnabled});
            }
        }
      });
    }

  }
  sharedProjectList(sharedProjectString,projectGroupByType,projectInfoArray){
    if(sharedProjectString.length>0){
      sharedProjectString.split(',').map((s)=>s.split(":")).forEach((project)=>{
        let [name, dataType, cloudType, master] = project;
        let zone = projectInfoArray.find((pair)=>pair[0] == name)?(projectInfoArray.find((pair)=>pair[0] == name)[1]):"N/A";
        let agentDataEnabled = projectInfoArray.find((pair)=>pair[0] == name)?(projectInfoArray.find((pair)=>pair[0] == name)[2]):false;
        name = name+"@"+master;
        let flag = true;
        switch (dataType) {
          case 'AWS':
          case 'EC2':
          case 'RDS':
          case 'DynamoDB':
            projectGroupByType.AWS.push({name, dataType, cloudType,zone,agentDataEnabled, flag});
            break;
          case 'GAE':
          case 'GCE':
            projectGroupByType.Google.push({name, dataType, cloudType,zone,agentDataEnabled, flag});
            break;
          default:
            switch(cloudType) {
              case 'DataDog':
                projectGroupByType.datadog.push({name, dataType, cloudType,zone,agentDataEnabled});
                break;
              case 'NewRelic':
                projectGroupByType.newrelic.push({name, dataType, cloudType,zone,agentDataEnabled});
                break;
              default:
                projectGroupByType.custom.push({name, dataType, cloudType,zone,agentDataEnabled});
            }
        }
      });
    }
    return projectGroupByType;
  }

  render() {
    var tabStates = this.state['tabStates'];
    var userInstructions = this.context.userInstructions;
    let {projectString, sharedProjectString,incidentAllInfo, dataAllInfo,projectSettingsAllInfo} = this.context.dashboardUservalues;
    let projectInfoArray = projectSettingsAllInfo.map((s)=> [s.projectName,s.zone,s.agentDataEnabled]);
    let projectGroupByType = {'AWS': [], 'Google': [], 'custom': [], 'datadog': [], 'newrelic': []};

    this.projectList(projectString,projectGroupByType,projectInfoArray);
    this.sharedProjectList(sharedProjectString,projectGroupByType,projectInfoArray);
    console.log(_.last(location.pathname.split('/')));
    return (
      <Console.Content className="projects">
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
            <a className={tabStates['datadog'] + ' item'}
               onClick={(e) => this.selectTab(e, 'datadog')}>DataDog</a>
            <a className={tabStates['newrelic'] + ' item'}
               onClick={(e) => this.selectTab(e, 'newrelic')}>New Relic</a>
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
          <div className={tabStates['datadog'] + ' ui tab '}>
            {tabStates['datadog'] === 'active' ? <DataDogProjects projects={projectGroupByType.datadog}/> : null}
          </div>
          <div className={tabStates['newrelic'] + ' ui tab '}>
            {tabStates['newrelic'] === 'active' ? <NewRelicProjects projects={projectGroupByType.newrelic}/> : null}
          </div>
        </div>
      </Console.Content>
    )
  }
}

export default Projects;