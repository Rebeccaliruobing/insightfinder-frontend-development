import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import R from 'ramda';
import moment from 'moment';
import { getProjectModels, pickProjectModel, removeProjectModel } from '../../../apis/projectSettings';
import { Tile } from '../../../src/lib/fui/react';
import ModelTile from './ModelTile';

class ModelSettings extends React.Component {
  static propTypes = {
    projectName: T.string.isRequired,
    instanceGroup: T.string,
  }

  static defaultProps = {
    projectName: '',
    instanceGroup: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      models: [],
      pickedModelKeys: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.reloadData(this.props.projectName, this.props.instanceGroup);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.projectName !== this.props.projectName ||
      nextProps.instanceGroup !== this.props.instanceGroup) {
      this.reloadData(nextProps.projectName, nextProps.instanceGroup);
    }
  }

  @autobind
  reloadData(projectName, instanceGroup) {
    if (projectName) {
      this.setState({
        loading: true,
      }, () => {
        getProjectModels(projectName, instanceGroup).then((data) => {
          const models = data.modelKeys || [];
          const pickedModelKeys = R.map(
            m => m.modelKey,
            R.filter(m => m.pickedFlag)(models));

          this.setState({
            models,
            pickedModelKeys,
            loading: false,
          });
        }).catch(() => {
          this.setState({
            models: [],
            pickedModelKeys: [],
            loading: false,
          });
        });
      });
    }
  }

  @autobind()
  handleUpdate() {
    const { projectName, instanceGroup } = this.props;
    this.reloadData(projectName, instanceGroup);
  }

  @autobind
  handlePickProjectModel(projectName, instanceGroup, key) {
    const { models } = this.state;
    const pickedModel = R.find(m => m.modelKey === key, models);
    const { startTimestamp, endTimestamp, modelKey } = pickedModel;
    const modelKeyObj = {
      startTimestamp, endTimestamp, modelKey,
    };

    this.setState({
      loading: true,
    }, () => {
      pickProjectModel(projectName, instanceGroup, JSON.stringify(modelKeyObj))
        .then(() => {
          this.setState({
            loading: false,
            pickedModelKeys: [key],
          });
        });
    });
  }

  @autobind
  handleRemoveProjectModel(projectName, instanceGroup, key) {
    const { models } = this.state;
    const pickedModel = R.find(m => m.modelKey === key, models);
    const { startTimestamp, endTimestamp, modelKey } = pickedModel;
    const modelKeyObj = {
      startTimestamp, endTimestamp, modelKey,
    };

    this.setState({
      loading: true,
    }, () => {
      removeProjectModel(projectName, instanceGroup, JSON.stringify(modelKeyObj))
        .then(() => {
          this.reloadData(projectName, instanceGroup);
        });
    });
  }

  render() {
    const { projectName, instanceGroup } = this.props;
    const { models, pickedModelKeys, loading } = this.state;

    const pickedModels = R.filter(m => R.find(R.equals(m.modelKey), pickedModelKeys), models);
    const pickedModel = pickedModels.length > 0 ? pickedModels[0] : null;

    return (
      <Tile isAncestor className={`model-settings ${loading ? 'ui form loading' : ''}`}>
        <Tile
          isParent isVertical size={3}
          style={{ padding: 0, marginRight: 10 }}
        >
          <h4>Picked Model</h4>
          {pickedModel &&
            <div style={{ paddingBottom: '1em', paddingRight: '1em' }}>
              {`You picked model 
              ${moment(pickedModel.startTimestamp).format('MM/DD HH:mm')}-
              ${moment(pickedModel.endTimestamp).format('MM/DD HH:mm')}
              to be used ${
                pickedModel.pickedExpiry?
                  'till ' + moment(pickProjectModel.pickedExpiry).format('MM/DD HH:mm')
                  : 'for the next 24 hours'}.`
              }
            </div>
          }
          {pickedModels.length === 0 &&
            <h4 style={{ marginTop: 0 }}>No picked model</h4>
          }
          {pickedModels.map(m => (
            <ModelTile key={m.modelKey} model={m} big projectName={projectName} />
          ))}
        </Tile>
        <Tile isParent isVertical size={9} style={{ padding: 0 }}>
          <h4>Model list</h4>
          <div className="ui info message" style={{ marginTop: 0 }}>
            Each heat map models the behavior of one instance. Red areas represent frequent behaviors
            (i.e. normal states) and the size of the red areas indicates the ranges of different metric
            values.
          </div>
          <Tile isParent isFluid style={{ padding: 0 }}>
            {models.length === 0 &&
              <h4>No model available</h4>
            }
            {models.map((m, idx) => (
              <ModelTile
                key={idx} model={m}
                picked={R.find(R.equals(m.modelKey), pickedModelKeys)}
                projectName={projectName}
                instanceGroup={instanceGroup}
                pickProjectModel={this.handlePickProjectModel}
                removeProjectModel={this.handleRemoveProjectModel}
              />
            ))}
          </Tile>
        </Tile>
      </Tile>
    );
  }
}

export default ModelSettings;
