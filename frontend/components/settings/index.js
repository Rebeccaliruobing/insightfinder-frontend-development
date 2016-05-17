import React from 'react';

import {Console, Link} from '../../artui/react';

import Navbar from './navbar';

export class Settings extends React.Component {
  render() {
    return (
      <Console.Wrapper>
        <Navbar/>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}