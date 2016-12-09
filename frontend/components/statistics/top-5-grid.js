import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const Top5Grid = ({title, parentType, parentName, duration }) => {
	const defaultProps = { title:"Top 5 Projects / Groups", 
										parentType:"Project", 
										parentName:"All", 
										duration:'7' };
				
  return (
    <div className="ui equal width padded grid">
			<div className="row">
				<div className="three wide column">
					<h4 style={{padding:"14 0 0 14"}}> Project/Group Name</h4>
				</div>
				<div className="ui center aligned three wide column">
					<h4>Anomaly Scores</h4>
					<div className="ui center aligned equal width divided grid">
						<div className="row">
							<div className="column">
								<h5>Previous</h5>
							</div>
							<div className="column">
								<h5>Current</h5>
							</div>
							<div className="column">
								<h5>Predicted</h5>
							</div>
						</div>
					</div>	
				</div>
				<div className="ui center aligned three wide column">
					<h4>Anomaly Events</h4>
					<div className="ui center aligned equal width divided grid">
						<div className="row">
							<div className="column">
								<h5>Previous</h5>
							</div>
							<div className="column">
								<h5>Current</h5>
							</div>
							<div className="column">
								<h5>Predicted</h5>
							</div>
						</div>
					</div>
				</div>
				<div className="ui center aligned three wide column">
					<h4>Anomaly Durations</h4>
					<div className="ui center aligned equal width divided grid">
						<div className="row">
							<div className="column">
								<h5>Previous</h5>
							</div>
							<div className="column">
								<h5>Current</h5>
							</div>
							<div className="column">
								<h5>Predicted</h5>
							</div>
						</div>
					</div>
				</div>
				<div className="ui center aligned three wide column">
					<h4>Anomaly Severities</h4>
					<div className="ui center aligned equal width divided grid">
						<div className="row">
							<div className="column">
								<i className="remove circle icon" style={{color:"red"}}></i>	
							</div>
							<div className="column">
								<i className="minus circle icon" style={{color:"orange"}}></i>	
							</div>
							<div className="column">
								<i className="check circle icon" style={{color:"green"}}></i>	
							</div>
							<div className="column">
								<i className="selected radio icon" style={{color:"grey"}}></i>	
							</div>
						</div>
					</div>
				</div>
			</div>

    </div>
  )
};

Top5Grid.propTypes = {
	title: T.string,
  parentType: T.string,
  parentName: T.string,
  duration: T.number
};

export default Top5Grid;
