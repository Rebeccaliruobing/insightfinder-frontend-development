import React, {Component}   from 'react';
import {Link, IndexLink}    from 'react-router';
import {
  Modal, Console, ButtonGroup, Button, Dropdown, Accordion, Message
}                           from '../../../artui/react/index';
import apis                 from '../../../apis';
import FilterBar            from './filter-bar';

export default class ListAll extends Component {
  static contextTypes = {
    userInstructions: React.PropTypes.object,
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    let weeks = 1;
    this.state = {
      view: 'chart',
      dateIndex: 0,
      timeIndex: 0,
      params: {
        showAddPanel: false,
        projects: [],
        weeks: weeks,
        endTime: moment(new Date()).toDate(),
        startTime: moment(new Date()).add(-7 * weeks, 'days')
      }
    };
  }

  componentDidMount() {
  }

  handleData(data) {
    this.setState({data: data}, ()=> {
      this.setHeatMap(0, 0);
    })
  }

  handleToggleFilterPanel() {
    this.setState({showAddPanel: !this.state.showAddPanel}, ()=> {
      this.state.showAddPanel ? this.$filterPanel.slideDown() : this.$filterPanel.slideUp()
    })
  }

  handleFilterChange(data) {
    let {cvalue, pvalue} = data;
    let {modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData,} = data.activeItem;
    metaData = JSON.stringify(metaData);

    apis.postUseCase(pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData).then((resp)=>{
      debugger;
    }).catch((err)=>{
    
    });
  }

  render() {
    const {view, showAddPanel, params} = this.state;
    const {userInstructions, router} = this.context;
    

    let system = this.props.location.query.system;

    return (
      <Console.Content>
        <div className="ui main tiny container" ref={c => this._el = c}>
          <div className="ui clearing vertical segment">
            <div className="ui breadcrumb">
              <IndexLink to="/" className="section">Home</IndexLink>
              <i className="right angle icon divider"/>
              <Link to="/cloud/monitoring" className="section">Use Cases</Link>
              <i className="right angle icon divider"/>
              <div className="active section">List All {system ? `(${system})` : ''}</div>
            </div>
            <ButtonGroup className="right floated basic icon">
              <Button onClick={this.handleToggleFilterPanel.bind(this)}>
                <i className="ellipsis horizontal icon"/>
              </Button>
              <Button>
                <i className="setting icon"/>
              </Button>
            </ButtonGroup>
          </div>

          <div className="ui vertical segment filterPanel"
               ref={(c)=>this.$filterPanel = $(ReactDOM.findDOMNode(c))}>
            <i className="close link icon" style={{float:'right', marginTop: '-10px'}}
               onClick={this.handleToggleFilterPanel.bind(this)}/>
            <FilterBar loading={this.state.loading} {...this.props} onSubmit={this.handleFilterChange.bind(this)}/>
          </div>

          <div className="ui vertical segment">
          </div>
        </div>
      </Console.Content>
    );
  }
}