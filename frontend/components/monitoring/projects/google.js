import React from 'react';
import GoogleProjectModal from './google_modal';

class GoogleProjects extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  handleModalClose = () => this.setState({showModal: false});

  render() {
    return (
      <div className="ui segment attached">
        <button className="ui small positive action button"
                onClick={(e) => this.setState({showModal: true})}>
          <i className="icon plus"></i>Register
        </button>
        <button className="ui small negative disabled button">
          <i className="icon remove"></i>Remove
        </button>
        <table className="ui small table">
          <thead>
          <tr>
            <th className="collapsing">
              <div className="ui fitted checkbox">
                <input type="checkbox" /><label></label>
              </div>
            </th>
            <th>Project Name</th>
            <th>Project Id</th>
            <th>Project Type</th>
            <th>Service Account Email</th>
            <th>.p12 key file</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td className="collapsing">
              <div className="ui fitted checkbox">
                <input type="checkbox" /><label></label>
              </div>
            </td>
            <td>test1</td>
            <td></td>
            <td></td>
            <td>GAE</td>
            <td></td>
          </tr>
          <tr>
            <td className="collapsing">
              <div className="ui fitted checkbox">
                <input type="checkbox" /><label></label>
              </div>
            </td>
            <td>test2</td>
            <td></td>
            <td></td>
            <td>GCE</td>
            <td></td>
          </tr>
          </tbody>
        </table>
        {
          this.state.showModal &&
          <GoogleProjectModal onClose={this.handleModalClose}/>
        }
      </div>
    )
  }
}

export default GoogleProjects;