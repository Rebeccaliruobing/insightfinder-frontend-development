import React from 'react';
import { autobind } from 'core-decorators';
import { Button } from '../../../artui/react/index';

class DataDisqualifiers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
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
            <input type="text" />
          </div>
        </div>
        <div className="wide column">
          <Button className="blue">Update Learning Settings</Button>
        </div>
      </div>
    );
  }
}

export default DataDisqualifiers;
