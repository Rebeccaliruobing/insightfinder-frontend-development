/*
 * 用于实现管理控制台界面中的主体结构。包括：Topbar，Navbar及Content
**/

import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router';

class Console extends React.Component {
  render() {

    let {className, topbar, ...others} = this.props;
    let classes = classNames(className, 'ui console');

    return (
      <div className={classes} {...others}>
        {topbar}
        {this.props.children}
      </div>
    )
  }
}

class Topbar extends React.Component {
  render() {
    let {className, logo, ...others} = this.props;
    var classes = classNames('topbar', className);
    return (
      <div className={classes} {...others}>
        <a className="logo" href="/"><img src={logo} /></a>
        <div className="inner">
          <div className="ui menu">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Topbar.propTypes = {
  logo: React.PropTypes.string.isRequired
};

Console.Topbar = Topbar;

Console.Wrapper = function(props) {
  let {className, ...others} = props;
  var classes = classNames('wrapper', className);
  return (
    <div className={classes} {...others}>{props.children}</div>
  )
};

Console.Navbar = function(props) {
  let {className, ...others} = props;
  var classes = classNames('navbar', className);
  return (
    <div className={classes} {...others}>{props.children}</div>
  )
};

Console.Content = function(props) {
  let {className, ...others} = props;
  var classes = classNames('content', className);
  return (
    <div className={classes} {...others}>{props.children}</div>
  )
};

Console.Breadcrumb = function(props) {
  let {className, ...others} = props;
  var classes = classNames('ui breadcrumb', className);
  return (
    <div className="ui basic attached segment">
      <div className={classes} {...others}>{props.children}</div>
    </div>
  )
};

export default Console;