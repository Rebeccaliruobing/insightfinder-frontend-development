/*
 * react-router中Link, IndexLink设置缺省对activeClassName
**/

import React from 'react';

// TODO: v1=> next 
/*
import {Link as RLink, IndexLink as RIndexLink} from 'react-router';

export const Link = (props) => (
  <RLink activeClassName="active" {...props}>{props.children}</RLink>
);

export const IndexLink = (props) => (
  <RIndexLink activeClassName="active" {...props}>{props.children}</RIndexLink>
);
*/

import { NavLink } from 'react-router-dom';

export const Link = props => (
  <NavLink {...props}>{props.children}</NavLink>
);

export const IndexLink = props => (
  <NavLink {...props}>{props.children}</NavLink>
);
