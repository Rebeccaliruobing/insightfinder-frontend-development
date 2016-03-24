import React from 'react';
import _ from 'lodash';
import {Link, IndexLink} from 'react-router';
import ProjectsAmazon from './amazon';
import ProjectsGoogle from './google';


class Projects extends React.Component {

  constructor(props) {
    super(props);
    this.selectTab.bind(this);

    this.state = {
      tabStates: {
        amazon: 'active',
        google: ''
      }
    }
  }

  selectTab(e, tab) {
    var tabStates = this.state['tabStates'];
    tabStates = _.mapValues(tabStates, function(val){ return ''; });
    tabStates[tab] = 'active';
    this.setState({tabStates: tabStates});
  }

  render() {

    var tabStates = this.state['tabStates'];

    return (
      <div>
        <div className="ui breadcrumb segment">
          <IndexLink to="/" className="section">Home</IndexLink>
          <i className="right angle icon divider"></i>
          <Link to="/monitoring" className="section">Cloud Monitoring</Link>
          <i className="right angle icon divider"></i>
          <div className="active section">Projects</div>
        </div>
        <div className="ui pointing secondary menu">
          <a className={tabStates['amazon'] + ' item'} 
            onClick={(e) => this.selectTab(e, 'amazon')}>Amazon Cloud</a>
          <a className={tabStates['google'] + ' item'} 
            onClick={(e) => this.selectTab(e, 'google')}>Google Cloud</a>
        </div>
        <div className={tabStates['amazon'] + ' ui tab segment'}>
          {tabStates['amazon'] === 'active' ? <ProjectsAmazon/> : null} 
        </div>
        <div className={tabStates['google'] + ' ui tab segment'}>
          {tabStates['google'] === 'active' ? <ProjectsGoogle/> : null} 
        </div>
      </div>
    )
  }
}

export default Projects;