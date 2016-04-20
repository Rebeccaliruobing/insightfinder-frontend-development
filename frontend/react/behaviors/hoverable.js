import React from 'react';

/*
 * Hoverable用于当组件hover时, 对现有的内容进行替换或增加内容.
 * - hovered可以通过props来设置
**/

const Hoverable = class extends React.Component {
  
  constructor(props) { 
    super(props);
    this.state = {
      _hovered: false
    };
  }

  render() {
    let {tag, content, children, hovered, replace, ...others} = this.props;
    
    let allChildren = [];
    
    if (hovered || this.state['_hovered']) {
      if (replace) {
        allChildren = content;
      } else {
        allChildren.push(children);
        allChildren.push(content);
      }
    } else {
      allChildren = children;
    }
    
    return React.createElement(tag, {
      onMouseEnter: () => this.setState({_hovered: true}),
      onMouseLeave: () => this.setState({_hovered: false}),
      ...others
    }, allChildren);
  }
};

Hoverable.propTypes = {
  tag: React.PropTypes.string,
  hovered: React.PropTypes.bool,
  replace: React.PropTypes.bool,
  content: React.PropTypes.node,
  children: React.PropTypes.node
};

Hoverable.defaultProps = {
  tag: 'div',
  hovered: false,
  replace: false
};

export default Hoverable;