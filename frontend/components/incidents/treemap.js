import React, {PropTypes as T} from 'react';

const IncidentsTreeMap = ({incidents}) => {
  console.log(incidents);
  return (
    <div className="">treemap</div>
  )
};

IncidentsTreeMap.propTypes = {
  incidents: T.object,
};

export default IncidentsTreeMap;
