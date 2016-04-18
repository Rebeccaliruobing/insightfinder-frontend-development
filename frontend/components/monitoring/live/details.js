/*
 * Details
**/

import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import {Wireframes} from '../../../artui/prototype';

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
      <div>
        <img src={Wireframes.media_paragraph} />
      </div>
    )
  }
};

Details.propTypes = {
};

Details.defaultProps = {
};

export default Details;