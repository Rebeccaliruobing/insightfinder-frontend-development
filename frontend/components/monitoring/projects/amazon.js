import React from 'react';
import AmazonProjectModal from './amazon_modal';
import apis from '../../../apis';

class AmazonProjects extends React.Component {
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
      if (!window.confirm("Confirm deleting project?")) return;
      apis.postRemoveProject(projectName).then((resp)=> {
        if(resp.success) {
          this.context.root.loadData();
        } else {
          alert(resp.message);
        }
      }).catch((e)=> {
        console.error(e);
      });
    }
  }

  render() {
    return (
      <div className="ui attached">
        <button className="ui small positive action button"
                onClick={(e) => this.setState({showModal: true})}>
          <i className="icon plus"></i>Register
        </button>
        <table className="ui small table">
          <tbody>
          <tr className="bold">
            <td style={{width: '25%'}}>Project Name</td>
            <td style={{width: '25%'}}>Instance Type</td>
            <td style={{width: '25%'}}>Monitoring Type</td>
            <td style={{width: '25%'}}></td>
          </tr>
          {
            this.props.projects.map(({name, dataType, cloudType}, index)=> {
              return (
                <tr key={index}>
                  <td style={{width: '25%'}}>{name}</td>
                  <td style={{width: '25%'}}>{dataType}</td>
                  <td style={{width: '25%'}}>{cloudType}</td>
                  <td style={{width: '25%'}}>
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
          <AmazonProjectModal onClose={this.handleModalClose}/>
        }
      </div>
    )
  }
}

export default AmazonProjects;