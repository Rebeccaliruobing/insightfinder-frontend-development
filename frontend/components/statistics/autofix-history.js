import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const AutoFixHistory = ({title, duration }) => {
	const defaultProps = { title:"AutoFix Action History", 
										duration:'7' };
				
  return (
    <div className="ui four column vertically divided divided grid">
			<div className="row">
				<div className="column">
					<h4> Projects</h4>
				</div>
				<div className="column">
					<h4>Action Taken</h4>
				</div>
				<div className="column">
					<h4>Execution Count</h4>
				</div>
				<div className="column">
					<h4>Impact</h4>
				</div>
			</div>
			<div className="row">
				<div className="column">
					Project Name #1
				</div>
				<div className="column">
					Auto-Scale Up (+1)
				</div>
				<div className="column">
					13
				</div>
				<div className="column">
					Load distributed.  18 hours additional compute resources.
				</div>
			</div>
			<div className="row">
				<div className="column">
					Project Name #2
				</div>
				<div className="column">
					System Reboot
				</div>
				<div className="column">
					3
				</div>
				<div className="column">
					Multiple outages detected.  Service Restored.
				</div>
			</div>
			<div className="row">
				<div className="column">
					Project Name #3
				</div>
				<div className="column">
					Auto-Scale Down (-1)
				</div>
				<div className="column">
					2
				</div>
				<div className="column">
					Minimum of 2 hours over-provisioned resources terminated.
				</div>
			</div>
			<div className="row">
				<div className="column">
					Project Name #4
				</div>
				<div className="column">
					Reboot
				</div>
				<div className="column">
					1
				</div>
				<div className="column">
					Auto-detected outage. Service Restored.
				</div>
			</div>
    </div>
  )
};

AutoFixHistory.propTypes = {
	title: T.string,
  duration: T.number
};

export default AutoFixHistory;
