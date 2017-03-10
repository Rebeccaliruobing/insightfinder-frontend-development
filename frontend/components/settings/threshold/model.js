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
  }

  static defaultProps = {
    projectName: '',
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
    this.reloadData(this.props.projectName);
  }

  componentWillReceiveProps(nextProps) {
    this.reloadData(nextProps.projectName);
  }

  @autobind
  reloadData(projectName) {
    if (projectName) {
      this.setState({
        loading: true,
      }, () => {
        getProjectModels(projectName).then((data) => {
          const models = data.modelKeys || [];
          const pickedModelKeys = R.map(
            m => m.modelKey,
            R.filter(m => m.userPickedFlag)(models));

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
    const { projectName } = this.props;
    this.reloadData(projectName);
  }

  @autobind
  handlePickProjectModel(projectName, key) {
    const { models } = this.state;
    const pickedModel = R.find(m => m.modelKey === key, models);
    const { startTimestamp, endTimestamp, modelKey } = pickedModel;
    const modelKeyObj = {
      startTimestamp, endTimestamp, modelKey,
    };

    this.setState({
      loading: true,
    }, () => {
      pickProjectModel(projectName, JSON.stringify(modelKeyObj))
        .then(() => {
          this.setState({
            loading: false,
            pickedModelKeys: [key],
          });
        });
    });
  }

  @autobind
  handleRemoveProjectModel(projectName, key) {
    const { models } = this.state;
    const pickedModel = R.find(m => m.modelKey === key, models);
    const { startTimestamp, endTimestamp, modelKey } = pickedModel;
    const modelKeyObj = {
      startTimestamp, endTimestamp, modelKey,
    };

    this.setState({
      loading: true,
    }, () => {
      removeProjectModel(projectName, JSON.stringify(modelKeyObj))
        .then(() => {
          this.reloadData(projectName);
        });
    });
  }

  render() {
    const { projectName } = this.props;
    const { models, pickedModelKeys, loading } = this.state;

    const pickedModels = R.filter(m => R.find(R.equals(m.modelKey), pickedModelKeys), models);
    const pickedModel = pickedModels.length > 0 ? pickedModels[0] : null;

    return (
      <Tile isAncestor className={`model-settings ${loading ? 'ui form loading' : ''}`}>
        <Tile isParent isVertical size={3} style={{ padding: 0 }}>
          <h4>Picked Model</h4>
          {pickedModel &&
            <div style={{ paddingBottom: '1em' }}>
              {`You picked model ${moment(pickedModel.startTimestamp).format('YYYY/M/D')}
               to be used for the next 24 hours.`}
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
            {models.map(m => (
              <ModelTile
                key={m.modelKey} model={m}
                picked={R.find(R.equals(m.modelKey), pickedModelKeys)}
                projectName={projectName}
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
