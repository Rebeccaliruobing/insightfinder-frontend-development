import React from 'react';
import ProjectAmazonForm from './amazon_form';

class ProjectsAmazon extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    return (
      <div>
      <table className="ui striped table unstackable">
        <thead className="full-width">
          <tr>
            <th colSpan="3">
              <div className="ui left floated small primary labeled icon button"
                onClick={(e) => this.setState({showModal: true})}>
                <i className="plus icon" />Register
              </div>
              <div className="ui left floated small labeled icon button">
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
            <th>Project Id</th>
            <th>Type</th>
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
          </tr>
          <tr>
            <td className="collapsing">
              <div className="ui fitted checkbox">
                <input type="checkbox" /><label></label>
              </div>
            </td>
            <td>12</td>
            <td>AWE</td>
          </tr>
        </tbody>
      </table>
        { this.state.showModal ? <ProjectAmazonForm/> : null}
      </div>
    )
  }
}

export default ProjectsAmazon;