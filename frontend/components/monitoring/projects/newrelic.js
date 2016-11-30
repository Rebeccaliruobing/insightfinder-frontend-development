import React from 'react';
import NewRelicProjectModal from './newrelic_modal';
import apis from '../../../apis';

class NewRelicProjects extends React.Component {
    static contextTypes = {
        root: React.PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            projectsList: this.props.projects
        };
    }

    componentDidMount() {
        this.loadProjects()
    }

    loadProjects() {
        //  TODO: load projects
    }

    loadApiRemoveProjects(e,projectName) {
        $(e.target).addClass('loading');
        apis.postRemoveProject(projectName).then((resp)=> {
            if (resp.success) {
                window.alert(resp.message);
                this.context.root.loadData();
            } else {
                alert(resp.message);
            }
        }).catch((e)=> {
            console.error(e);
        });

    }

    handleModalClose = () => this.setState({showModal: false});

    handleModalCancel = () => $('#btn-register').removeClass('loading');

    handleRemoveProject(projectName) {
        let {projectsList}= this.state;
        let self = this;
        return (e) => {
            if (!window.confirm("Delete this project?")) return;
            let removeProject = [];
            //(projectsList || []).map(function (value, index) {
            //    if (value['name'] != projectName) {
            //        removeProject.push(value);
            //    }
            //});
            self.loadApiRemoveProjects(e,projectName);
            $(e.target).removeClass('loading');
            //if (removeProject.length != projectsList.length) {
            //    this.setState({'projectsList': removeProject}, function () {
            //        self.loadApiRemoveProjects(projectName);
            //    });
            //}
        }
    }

    render() {
        let {projectsList} = this.state;
        return (
            <div className="ui attached">
                <button id="btn-register" className="ui small positive action button"
                        onClick={(e) => {this.setState({showModal: true});$(e.target).addClass('loading');}}>
                    <i className="icon plus"></i>Register
                </button>
                <table className="ui small table">
                    <tbody>
                    <tr className="bold">
                        <td style={{width: '16%'}}>Project Name</td>
                        <td style={{width: '16%'}}>Instance Type</td>
                        <td style={{width: '16%'}}>Region</td>
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
                            <td style={{width: '16%'}}>DataDog</td>
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
                    <NewRelicProjectModal onClose={this.handleModalClose} onCancel={this.handleModalCancel}/>
                }
            </div>
        )
    }
}

export default NewRelicProjects;