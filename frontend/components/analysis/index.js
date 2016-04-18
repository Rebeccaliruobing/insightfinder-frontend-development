import React from 'react';
import {Link} from 'react-router';
import {Console} from '../../artui/react';

import Navbar from './navbar';

class Analysis extends React.Component {

  render() {
    return (
      <Console.Wrapper>
        <Navbar/>
        {this.props.children}
      </Console.Wrapper>
    )
  }
}

export default Analysis;