import React, {PropTypes as T} from 'react';

const IncidentsList = ({incidents}) => {
  console.log(incidents);

  return (
    <table className="ui table">
      <tbody>
      <tr><td>list</td></tr>
      </tbody>
    </table>
  )
};

IncidentsList.propTypes = {
  incidents: T.object,
};

export default IncidentsList;
