import React from 'react';
import CustomProjectModal from './custom_modal';
import apis from '../../../apis';


class CustomProjects extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };
  

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

  handleRemoveProject(projectName) {
    return (e) => {
      if (!window.confirm("Confirm?")) return;
      apis.postRemoveProject(projectName).then((resp)=> {
        this.context.root.loadData();
      }).catch((e)=> {

      });
    }
  }

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
          <tbody>
          {
            this.props.projects.map(({name, dataType, cloudType}, index)=> {
              return (
                <tr key={index}>
                  <td className="collapsing">
                    <div className="ui fitted checkbox">
                      <input type="checkbox"/><label></label>
                    </div>
                  </td>
                  <td>{name}</td>
                  <td>{dataType}</td>
                  <td>{cloudType}</td>
                  <td>
                    <button className="ui mini red button" onClick={this.handleRemoveProject(name)}>Remove</button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        {
          this.state.showModal &&
          <CustomProjectModal onClose={this.handleModalClose}/>
        }
      </div>
    )
  }
}

export default CustomProjects;