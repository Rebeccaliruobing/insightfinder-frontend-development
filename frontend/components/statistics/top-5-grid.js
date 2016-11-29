import React, {PropTypes as T} from 'react';
import _ from 'lodash';
import Reactable from 'reactable';

export default class Top5Grid extends React.Component {
	static defaultProps = { title:"Top 5 Projects", 
										parentType:"Project", 
										parentName:"All", 
										duration:'7' };
				
	var (Table = Reactable.Table,
			Thead = Reactable.Thead,
			Th = Reactable.Th,
			Tr = Reactable.Tr,
			Td = Reactable.Td);

  return (
    <div>
      <Table>
        <Thead>
					<Th column="Project">Project</Th>
					<Th column="AnomalyCounts">
						Anomaly Counts<br />
					</Th>
					<Th column="AnomalyScores" >Anomaly Scores</Th>
					<Th column="AnomalyDurations">Anomaly Durations</Th>
					<Th column="AnomalyEvents">Anomaly Events</Th>
					<Th column="SeverityBreakdowns">Severity Breakdowns</Th>
				</Thead>
				<Tr>
					<Td column="Project">AWS Infra - US-East-1</Td>
					<Td column="AnomalyCounts">		
						1
					</Td>
					<Td column="AnomalyScores">
						2
					</Td>
					<Td column="AnomalyDurations">
						3
					</Td>
					<Td column="AnomalyEvents">
						4
					</Td>
					<Td column="SeverityBreakdowns">
						5
					</Td>
				</Tr>
				<Tr>
					<Td column="Project">AWS Infra - US-East-1</Td>
					<Td column="AnomalyCounts">		
						1
					</Td>
					<Td column="AnomalyScores">
						2
					</Td>
					<Td column="AnomalyDurations">
						3
					</Td>
					<Td column="AnomalyEvents">
						4
					</Td>
					<Td column="SeverityBreakdowns">
						5
					</Td>
				</Tr>
				<Tr>
					<Td column="Project">AWS Infra - US-East-1</Td>
					<Td column="AnomalyCounts">		
						1
					</Td>
					<Td column="AnomalyScores">
						2
					</Td>
					<Td column="AnomalyDurations">
						3
					</Td>
					<Td column="AnomalyEvents">
						4
					</Td>
					<Td column="SeverityBreakdowns">
						5
					</Td>
				</Tr>
				<Tr>
					<Td column="Project">AWS Infra - US-East-1</Td>
					<Td column="AnomalyCounts">		
						1
					</Td>
					<Td column="AnomalyScores">
						2
					</Td>
					<Td column="AnomalyDurations">
						3
					</Td>
					<Td column="AnomalyEvents">
						4
					</Td>
					<Td column="SeverityBreakdowns">
						5
					</Td>
				</Tr>
				<Tr>
					<Td column="Project">AWS Infra - US-East-1</Td>
					<Td column="AnomalyCounts">		
						1
					</Td>
					<Td column="AnomalyScores">
						2
					</Td>
					<Td column="AnomalyDurations">
						3
					</Td>
					<Td column="AnomalyEvents">
						4
					</Td>
					<Td column="SeverityBreakdowns">
						5
					</Td>
				</Tr>
			</Table>
    </div>
  )
};

Top5Grid.propTypes = {
	title: T.string,
  parentType: T.string,
  parentName: T.string,
  duration: T.number,
};

export default Top5Grid;
