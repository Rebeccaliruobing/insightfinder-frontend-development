import React from 'react';
import AmazonProjectModal from './amazon_modal';

class AmazonProjects extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }
  
  componentDidMount() {
    this.loadProjects()
  }
  
  loadProjects() {
    //  TODO: load projects
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
            <th>AWS Access Id</th>
            <th>Secret Access Key</th>
            <th>Availability Zone</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td className="collapsing">
              <div className="ui fitted checkbox">
                <input type="checkbox"/><label></label>
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
          <AmazonProjectModal onClose={this.handleModalClose}/>
        }
      </div>
    )
  }
}

export default AmazonProjects;