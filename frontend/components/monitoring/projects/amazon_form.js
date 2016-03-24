import React from 'react';
import _ from 'lodash';

class ProjectAmazonForm extends React.Component {
  render(){
    var styles = {
      display: 'block !important',
      top: 0,
    };

    return (
      <div className="ui dimmer modals page transition visible active">
      <div className="ui standard modal transition active scrolling visible" style={styles}>
        <i className="close icon"></i>
        <div className="header">
          Modal Title
        </div>
        <div className="image content">
        <div className="image">
          An image can appear on left or an icon
        </div>
        <div className="description">
      A description can appear on the right
      </div>
      </div>
      <div className="actions">
      <div className="ui button">Cancel</div>
      <div className="ui button">OK</div>
      </div>
      </div>
      </div>
      )
  }
}

export default ProjectAmazonForm;