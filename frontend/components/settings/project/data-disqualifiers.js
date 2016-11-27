import React, { PropTypes as T } from 'react';
import { autobind } from 'core-decorators';
import { Button } from '../../../artui/react/index';

class DataDisqualifiers extends React.Component {

  static propTypes = {
    projectInfo: T.object,
    saving: T.bool,
    saveProjectInfo: T.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      learningSkippingPeriod: props.projectInfo.learningSkippingPeriod,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { projectInfo } = nextProps;
    if (projectInfo) {
      this.setState({
        learningSkippingPeriod: projectInfo.learningSkippingPeriod,
      });
    }
  }

  @autobind
  handleLearningSkippingPeriodChange(e) {
    const v = e.target.value;
    this.setState({
      learningSkippingPeriod: v,
    });
  }

  @autobind
  handleSaveProjectSetting() {
    const { saveProjectInfo } = this.props;
    const { learningSkippingPeriod } = this.state;
    if (saveProjectInfo) {
      saveProjectInfo({
        learningSkippingPeriod,
      });
    }
  }

  render() {
    const { saving } = this.props;
    const { learningSkippingPeriod } = this.state;

    return (
      <div className="active ui tab">
        <h3>Time-Based Exclusions</h3>
        <p>
          As InsightFinder continuously learns about your
          environment, you will identify times that reflect
          invalid data that should <i>not</i> be used to
          identify performance baselines for your systems.
          These periods may include service windows, scheduled
          or unscheduled downtime, etc.
        </p>
        <p>
        You may specify your timeframe here as either a
        one-time or recurring period.  Examples include:
        </p>
        <ul>
          <li>Recurring: Every Sunday</li>
          <li>Recurring: Every Saturday 00:00-01:00 GMT</li>
          <li>One-Time: 2016-12-25 02:00-07:00 GMT</li>
        </ul>
        <p>
          If you need assistance or have questions, please contact
          us at support@insightfinder.com.
        </p>
        <div className="field">
          <div className="ui input">
            <input
              type="text"
              value={learningSkippingPeriod}
              onChange={this.handleLearningSkippingPeriodChange}
            />
          </div>
        </div>
        <div className="wide column">
          <Button
            className="blue"
            disabled={saving}
            onClick={this.handleSaveProjectSetting}
          >Update Learning Settings</Button>
        </div>
      </div>
    );
  }
}

export default DataDisqualifiers;
