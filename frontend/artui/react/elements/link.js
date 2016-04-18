/*
 * react-router中Link, IndexLink设置缺省对activeClassName
**/

import React from 'react';
import {Link as RLink, IndexLink as RIndexLink} from 'react-router';
 
export const Link = function(props) {
  return (
    <RLink activeClassName="active" {...props}>{props.children}</RLink>
  )
};

export const IndexLink = function (props) {
  return (
    <RIndexLink activeClassName="active" {...props}>{props.children}</RIndexLink>
  )
};