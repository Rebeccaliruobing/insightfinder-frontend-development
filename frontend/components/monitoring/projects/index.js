import React from 'react';
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';
import {Console} from '../../../artui/react';
import AmazonProjects from './amazon';
import ProjectsGoogle from './google';
import CustomProjects from './custom';


class Projects extends React.Component {

  static contextTypes = {
    userInstructions: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.selectTab.bind(this);
    this._el = null;

    this.state = {
      tabStates: {
        custom: 'active',
        amazon: '',
        google: ''
      }
    }
  }

  selectTab(e, tab) {
    var tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, function (val) {
      return '';
    });
    tabStates[tab] = 'active';
    this.setState({tabStates: tabStates});
  }

  render() {

    var tabStates = this.state['tabStates'];
    var userInstructions = this.context.userInstructions;

    return (
      <Console.Content>
        <div className="main ui container" ref={c => this._el = c}>
          <Console.Breadcrumb>
            <IndexLink to="/" className="section">Home</IndexLink>
            <i className="right angle icon divider"/>
            <Link to="/monitoring" className="section">Cloud Monitoring</Link>
            <i className="right angle icon divider"/>
            <div className="active section">Projects</div>
          </Console.Breadcrumb>
          <div className="ui pointing secondary menu">
            <a className={tabStates['custom'] + ' item'}
               onClick={(e) => this.selectTab(e, 'custom')}>Insight Agent</a>
            <a className={tabStates['amazon'] + ' item'}
               onClick={(e) => this.selectTab(e, 'amazon')}>AWS CloudWatch</a>
            <a className={tabStates['google'] + ' item'}
               onClick={(e) => this.selectTab(e, 'google')}>Google Cloud Monitoring</a>
          </div>
          <div className={tabStates['amazon'] + ' ui tab segment'}>
            {tabStates['amazon'] === 'active' ? <AmazonProjects/> : null}
          </div>
          <div className={tabStates['google'] + ' ui tab segment'}>
            {tabStates['google'] === 'active' ? <ProjectsGoogle/> : null}
          </div>
          <div className={tabStates['custom'] + ' ui tab segment'}>
            {tabStates['custom'] === 'active' ? <CustomProjects/> : null}
          </div>
          <div className="ui message attached" dangerouslySetInnerHTML={{__html: userInstructions.cloudnewproject}}></div>
        </div>
      </Console.Content>
    )
  }
}

export default Projects;