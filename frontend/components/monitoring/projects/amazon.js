import React from 'react';
import AmazonProjectModal from './amazon_form';

class AmazonProjects extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalSize: 'small',
    };
  }

  handleModalClose = () => this.setState({showModal: false});

  render() {
    return (
      <div>
        <table className="ui striped table unstackable">
          <thead className="full-width">
          <tr>
            <th colSpan="5">
              <div className="ui left floated small primary labeled icon button"
                   onClick={(e) => this.setState({showModal: true})}>
                <i className="plus icon" />Register
              </div>
              <div className="ui left floated small labeled icon button"
                   onClick={() => this.setState({modalSize: 'fullscreen'})}>
                <i className="remove icon" />Remove
              </div>
            </th>
          </tr>
          <tr>
            <th className="collapsing">
              <div className="ui fitted checkbox">
                <input type="checkbox" /><label></label>
              </div>
            </th>
            <th>Project Name</th>
            <th>AWS Access Id</th>
            <th>Secret Access Key</th>
            <th>Availability Zone</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td className="collapsing">
              <div className="ui fitted checkbox">
                <input type="checkbox" /><label></label>
              </div>
            </td>
            <td>12</td>
            <td>AWE</td>
            <td>AWE</td>
            <td>AWE</td>
          </tr>
          <tr>
            <td className="collapsing">
              <div className="ui fitted checkbox">
                <input type="checkbox" /><label></label>
              </div>
            </td>
            <td>12</td>
            <td>AWE</td>
            <td>AWE</td>
            <td>AWE</td>
          </tr>
          </tbody>
        </table>
        {
          this.state.showModal &&
          <AmazonProjectModal size={this.state['modalSize']} onClose={this.handleModalClose}/>
        }
      </div>
    )
  }
}

export default AmazonProjects;