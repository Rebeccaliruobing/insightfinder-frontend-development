import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import moment from 'moment';
import { getProjectModels, pickProjectModel } from '../../../apis/projectSettings';

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
        className={userPickedFlag ? 'selected item' : 'item'}
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
      getProjectModels(projectName).then((data) => {
        this.setState({
          models: data.modelKeys || [],
          loading: false,
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

  render() {
    const { projectName } = this.props;
    const { models, loading } = this.state;
    return (
      <div className={`model-settings ${loading ? 'ui loading form' : ''}`}>
        {models.map(model => (
          <ModelLine
            key={model.modelKey}
            projectName={projectName} {...model}
            onUpdate={this.handleUpdate} onLoading={this.handleLoading}
          />
        ))}
      </div>
    );
  }
}

export default ModelSettings;
