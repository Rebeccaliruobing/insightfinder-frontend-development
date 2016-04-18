import React from 'react';

export function ModelType(props) {
  let {tag, ...others} = props;
  
  tag = tag || 'div';
  return React.createElement(tag, {
    ...others
  }, [
    (
      <label key="label">Model Type</label>
    ), (
      <select key="values" className="ui fluid dropdown">
        <option value="cpu(holistic)">cpu(holistic)</option>
        <option value="casandra(holistic)">casandra(holistic)</option>
        <option value="casandra(split)">casandra(split)</option>
        <option value="cpu-nofilter(holistic)">cpu-nofilter(holistic)</option>
        <option value="cpu-nofilter(split)">cpu-nofilter(split)</option>
        <option value="cpu-filter(holistic)">cpu-filter(holistic)</option>
        <option value="cpu-filter(split)">cpu-filter(split)</option>
      </select>
    )
  ]);
}

export function AnomalyThreshold(props) {
  let {tag, ...others} = props;

  tag = tag || 'div';
  return React.createElement(tag, {
    ...others
  }, [
    (
      <label key="label">Anomaly Threshold</label>
    ), (
      <select key="values" className="ui fluid dropdown">
        <option value="0.99">0.99</option>
        <option value="0.97">0.97</option>
        <option value="0.95">0.95</option>
        <option value="0.9">0.9</option>
        <option value="0.5">0.5</option>
        <option value="0.25">0.25</option>
      </select>
    )
  ]);
}

export function DurationThreshold(props) {
  let {tag, ...others} = props;

  tag = tag || 'div';
  return React.createElement(tag, {
    ...others
  }, [
    (
      <label key="label">Duration Threshold</label>
    ), (
      <select key="values" className="ui fluid dropdown">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    )
  ]);
}
