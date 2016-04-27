/*
 * Details
**/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import {Dygraph} from '../../../artui/react/dataviz';

const Details = class extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  
  componentDidUpdate() {
  }
  
  componentWillUnmount() {
  }
    
  render() {
    return (
      <Dygraph data={[[1,10,100], [2,20,80], [3,50,60], [4,70,80]]}/>
    )
  }
};

Details.propTypes = {
};

Details.defaultProps = {
};

export default Details;