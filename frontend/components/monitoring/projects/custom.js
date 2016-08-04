import React from 'react';
import CustomProjectModal from './custom_modal';
import CustomProjectLicenseKeyModal from './custom_modal_licensekey';
import apis from '../../../apis';


class CustomProjects extends React.Component {
  static contextTypes = {
    root: React.PropTypes.object,
  };
  

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showLicenseKeyModal: false,
      licenseKeyMessage: ''
    };
  }


  componentDidMount() {
    this.loadProjects()
  }

  loadProjects() {
    //  TODO: load projects
  }

  handleModalClose = () => this.setState({showModal: false});

  handleRegisterSuccess(modal){
    this.setState({
      licenseKeyMessage: modal.message,
      showLicenseKeyModal: true
    });
  }

  handleRemoveProject(projectName) {
    return (e) => {
      if (!window.confirm("Confirm deleting project?")) return;
      apis.postRemoveProject(projectName).then((resp)=> {
        if(resp.success) {
          window.alert(resp.message);
          this.context.root.loadData();
        } else {
          alert(resp.message);
        }
      }).catch((e)=> {

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
            <td style={{width: '16%'}}>Zone</td>
            <td style={{width: '16%'}}>Monitoring Type</td>
            <td style={{width: '16%'}}></td>
          </tr>
          {
            this.props.projects.map(({name, dataType, zone, cloudType,flag}, index)=> {
              if(cloudType==='FileReplay'){
                cloudType='File';
              }else if(cloudType==='PrivateCloud'){
                cloudType='Private';
              }
              return (
                <tr key={index}>
                  <td style={{width: '16%'}}>{name}</td>
                  <td style={{width: '16%'}}>{cloudType}</td>
                  <td style={{width: '16%'}}>{zone}</td>
                  <td style={{width: '16%'}}>Agent</td>
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
          <CustomProjectModal onClose={this.handleModalClose} onSubmit={this.handleRegisterSuccess.bind(this)}/>
        }
        {
          this.state.showLicenseKeyModal &&
          <CustomProjectLicenseKeyModal {...this.state} onClose={this.handleLicenseKeyModalClose}/>
        }
      </div>
    )
  }
}

export default CustomProjects;