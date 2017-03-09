import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import R from 'ramda';
import moment from 'moment';
import { getProjectModels, pickProjectModel } from '../../../apis/projectSettings';
import { Box, Tile } from '../../../src/lib/fui/react';
import ModelTile from './ModelTile';

class ModelLine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hovered: false,
    };
  }

  @autobind
  handleHover() {
    this.setState({ hovered: !this.state.hovered });
  }

  @autobind
  handleSelected() {
    const { projectName, startTimestamp, endTimestamp, modelKey } = this.props;
    const modelKeyObj = {
      startTimestamp, endTimestamp, modelKey,
    };
    this.props.onLoading(true);

    pickProjectModel(projectName, JSON.stringify(modelKeyObj)).then(() => {
      this.props.onUpdate();
    });
  }

  render() {
    const { startTimestamp, endTimestamp, modelKey, userPickedFlag } = this.props;
    const { hovered } = this.state;
    const stime = moment(startTimestamp).format('YYYY-MM-DD HH:mm');
    const etime = moment(endTimestamp).format('YYYY-MM-DD HH:mm');
    return (
      <div
        className={userPickedFlag ? 'fui tile' : 'fui tile'}
        onMouseOver={this.handleHover}
        onMouseOut={this.handleHover}
      >
        {`[${stime},${etime}] ${modelKey}`}
        <i
          className="icon checkmark action"
          style={{ ...(userPickedFlag || !hovered) ? { display: 'none' } : {} }}
          {...userPickedFlag ? {} : { onClick: this.handleSelected }}
        />
      </div>
    );
  }
}

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
        });
      });
    }
  }

  @autobind()
  handleUpdate() {
    const { projectName } = this.props;
    this.reloadData(projectName);
  }

  @autobind()
  handleLoading(loading) {
    this.setState({
      loading,
    });
  }

  @autobind
  handlePickProjectModel(projectName, modelKey) {
    // TODO: Call server side
    this.setState({
      pickedModelKeys: [modelKey],
    });
  }

  render() {
    const { projectName } = this.props;
    const { models, pickedModelKeys, loading } = this.state;

    const pickedModels = R.filter(m => R.find(R.equals(m.modelKey), pickedModelKeys), models);
    return (
      <Tile isAncestor className={`model-settings ${loading ? 'ui form loading' : ''}`}>
        <Tile isParent isVertical size={3} style={{ padding: 0 }}>
          <h4>Picked Model</h4>
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
            {models.map(m => (
              <ModelTile
                key={m.modelKey} model={m}
                picked={R.find(R.equals(m.modelKey), pickedModelKeys)}
                projectName={projectName}
                pickProjectModel={this.handlePickProjectModel}
              />
            ))}
          </Tile>
        </Tile>
      </Tile>
    );
  }
}

export default ModelSettings;
