import React from 'react';
import GoogleProjectModal from './google_modal';
import apis from '../../../apis';

class GoogleProjects extends React.Component {
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
      if (!window.confirm("Delete this project?")) return;
      apis.postRemoveProject(projectName).then((resp)=> {
        if(resp.success) {
          window.alert(resp.message);
          this.context.root.loadData();
        } else {
          alert(resp.message);
        }
      }).catch((e)=> {
        console.log(e);
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
            <td style={{width: '16%'}}>Project Name</td>
            <td style={{width: '16%'}}>Instance Type</td>
            <td style={{width: '16%'}}>Data Type</td>
            <td style={{width: '16%'}}>Region</td>
            <td style={{width: '16%'}}>Monitoring Type</td>
            <td style={{width: '16%'}}></td>
          </tr>
          {
            this.props.projects.map(({name, projectType, dataType, zone, cloudType, agentDataEnabled, flag}, index)=> {
              return (
                <tr key={index}>
                  <td style={{width: '16%'}}>{name}</td>
                  <td style={{width: '16%'}}>{projectType}</td>
                  <td style={{width: '16%'}}>{dataType}</td>
                  <td style={{width: '16%'}}>{zone}</td>
                  <td style={{width: '16%'}}>{cloudType}</td>
                  <td style={{width: '16%'}}>
                    <button className="ui mini red button" onClick={this.handleRemoveProject(name)}>{flag?"Unshare":"Remove"}</button>
                  </td>
                </tr>
              )
            })
          }
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