import React, {PropTypes as T} from 'react';
import {Button} from '../../artui/react';

const IncidentsList = ({ incidents }) => {
  return (
    <table className="ui compact table">
      <thead>
      <tr>
        <th>Id</th>
        <th>Start Time</th>
        <th>Duration</th>
        <th>Root Cause Type</th>
        <th>Root Cause Scope</th>
        <th>Root Cause Affected Functions</th>
        <th>Suggested Actions</th>
        <th/>
      </tr>
      </thead>
      <tbody>
      {incidents.map((incident, index)=>(
        <tr key={index}>
          <td>{incident.id}</td>
          <td>{incident.start}</td>
          <td>{incident.duration}</td>
          <td>
            <pre>{incident.rootcauseName}</pre>
          </td>
          <td>N/A</td>
          <td>N/A</td>
          <td/>
          <td><Button className="orange"
                      style={{width: 80, paddingLeft:0, paddingRight:0}}>Causal Graph</Button></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
};

export default IncidentsList;
