import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { autobind } from 'core-decorators';
import VLink from 'valuelink';
import { Modal, Dropdown } from '../../artui/react';
import { Input } from '../../src/lib/fui/react';
import { IncidentActionTaken } from '../selections';
import apis from '../../apis';
import './incident.less';

class TakeActionModal extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  constructor(props) {
    super(props);
    this.state = {
      action: 'ignore',
      oneTime: 'one-time',
      instanceId: undefined,
      actionMap: {},
      customAction: undefined,
      textLoaded: true,
      eventName: '',
    };
    this.state.actionMap['ignore'] = 'ignore';
    this.state.actionMap['scale-up'] = 'coldclone';
    this.state.actionMap['reboot'] = 'filterreboot';
    this.state.actionMap['migrate'] = 'dummy';
    this.state.actionMap['custom'] = 'custom';
  }

  componentDidMount() {
    this.loadTriageAction(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadTriageAction(nextProps);
  }

  handleActionChange(value) {
    this.setState({ action: value });
  }

  loadTriageAction(props) {
    let { incident, projectName } = props;
    let eventType = incident.rootCauseJson.rootCauseTypes;
    apis.loadTriageActionRecord(projectName, eventType).then(resp => {
      if (resp.found) {
        this.setState({
          customAction: resp.data.triageAction,
          textLoaded: true,
        });
      } else {
        this.setState({
          action: 'ignore',
          instanceId: undefined,
          customAction: undefined,
          textLoaded: true,
        });
      }
    });
  }

  @autobind
  handleTriageSave() {
    let { incident, projectName } = this.props;
    let { customAction } = this.state;
    let eventType = incident.rootCauseJson.rootCauseTypes;
    if (customAction != undefined) {
      apis.saveTriageActionRecord(projectName, eventType, customAction).then(resp => {
        alert(resp.message);
      });
    }
  }

  @autobind
  handleSubmit() {
    let { incident, projectName } = this.props;
    let { instanceId, action } = this.state;
    let operation = 'dummy';
    if (this.state.actionMap[action]) {
      operation = this.state.actionMap[action];
    }
    if (operation == '') {
      alert('Ignoring this event.');
      return;
    }
    if (!instanceId && incident.anomalyMapJson) {
      for (var k in incident.anomalyMapJson) {
        if (!(operation == 'filterreboot' && instanceId == 'i-55d26464')) {
          instanceId = k;
          break;
        }
      }
    }
    if (instanceId) {
      apis.postUserAction(projectName, instanceId, operation).then(resp => {
        console.log(resp);
        if (resp.success) {
          alert('Success: action ' + action + ' was sent to instance ' + instanceId);
        } else {
          alert('Failed to send action ' + action + ' to instance ' + instanceId);
        }
      });
    } else {
      alert('Cannot find instance to take action on.');
    }
  }

  render() {
    let { incident, projectName, ...rest } = this.props;
    const eventNameLink = VLink.state(this, 'eventName');
    let { action, oneTime, instanceId, customAction, textLoaded } = this.state;
    let instances = Object.keys(incident.rootCauseByInstanceJson);
    let actions = [];
    let self = this;
    _.forEach(incident.suggestedActionsByInstanceJson, function(saInstance, key) {
      let pos1 = saInstance.indexOf(' on ');
      let pos2 = saInstance.indexOf(' instanceId ');
      let tagName = 'N/A';
      let action = '';
      if (pos1 != -1) {
        tagName = saInstance.substring(pos1 + 4, pos2);
        action = saInstance.substring(2, pos1);
      } else {
        action = saInstance.substring(2, pos2);
      }
      actions.push({
        action: action,
        instanceId: key,
        instanceName: tagName,
      });
    });

    return (
      <Modal {...rest} size="small" closable>
        <div className="content" style={{ paddingBottom: 0 }}>
          <h5 style={{ display: 'inline-block', width: 80 }}>Name:</h5>
          <Input valueLink={eventNameLink} style={{ width: 380 }} />
          <div className="ui button orange" style={{ float: 'right', minWidth: 110 }}>
            Set Name
          </div>
        </div>
        <div className="content" style={{ paddingTop: 10 }}>
          <h5>Suggested action: </h5>
          <div style={{ maxHeight: 300, overflow: 'auto' }}>
            <table className="ui small table action-table">
              <thead>
                <tr className="bold">
                  <th>Suggested Action</th>
                  <th>Instance Name</th>
                  <th>Instance ID</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {action.action}
                      </td>
                      <td>
                        {action.instanceName}
                      </td>
                      <td>
                        {action.instanceId}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="content" style={{ padding: '0 20px' }}>
          <h5>Take action on this event: </h5>
          <div style={{ display: 'flex' }}>
            <div className="content" style={{ padding: 10 }}>
              <div>Action</div>
              <IncidentActionTaken
                value={action}
                onChange={value => this.handleActionChange(value)}
                style={{ minWidth: 120 }}
              />
            </div>
            <div className="content" style={{ padding: 10 }}>
              <div style={{ color: 'white' }}>space</div>
              <Dropdown
                mode="select"
                value={oneTime}
                text={oneTime}
                onChange={(v, t) => this.setState({ oneTime: v })}
                style={{ minWidth: 120 }}
              >
                <i className="dropdown icon" />
                <div className="menu">
                  <div className="item">one-time</div>
                  <div className="item">always</div>
                </div>
              </Dropdown>
            </div>
            <div className="content" style={{ padding: 10 }}>
              <div>Instance Id</div>
              <Dropdown
                mode="select"
                value={instanceId}
                text={instanceId}
                onChange={(v, t) => this.setState({ instanceId: v })}
                style={{ minWidth: 150 }}
              >
                <i className="dropdown icon" />
                <div className="menu">
                  {instances.map((instance, index) => {
                    return (
                      <div className="item" key={index}>
                        {instance}
                      </div>
                    );
                  })}
                </div>
              </Dropdown>
            </div>
          </div>
          <div
            className="ui button orange"
            style={{ float: 'right', marginTop: '-44px', minWidth: 110 }}
            onClick={this.handleSubmit}
          >
            Take Action
          </div>
        </div>
        <hr />
        <div className="content" style={{ padding: '0 20px' }}>
          <h5>Triage history:</h5>
          <form className="ui reply form">
            <div className="field">
              <textarea
                value={customAction}
                rows="4"
                readOnly={!textLoaded}
                onChange={e => this.setState({ customAction: e.target.value })}
              />
            </div>
          </form>
          <div
            className="ui button orange"
            style={{ float: 'right', minWidth: 110 }}
            onClick={this.handleTriageSave}
          >
            Save Triage
          </div>
        </div>
      </Modal>
    );
  }
}

export default TakeActionModal;
