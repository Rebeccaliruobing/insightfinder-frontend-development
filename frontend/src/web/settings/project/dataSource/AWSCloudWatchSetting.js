import React from 'react';
import { Input } from '../../../../lib/fui/react';

class AWSCloudWatchSetting extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="inline field required">
          <label>Project Name:</label>
          <Input />
        </div>
        <div className="inline field">
          <label>Description:</label>
          <Input />
        </div>
        <div className="inline field">
          <label>Sharing:</label>
          <Input />
          <div className="desc">
            To share your project, enter their User ID(s) in the above field.
                </div>
        </div>
      </div>
    );
  }
}

export default AWSCloudWatchSetting;
