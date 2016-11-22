import React, {PropTypes as T} from 'react';

const AnomalyScore = ({previousValue, duration='1d' }) => {
  const previousValueText = previousValue !== undefined ? previousValue.toFixed(1).toString() : '-';
  const previousValueArrow = _.isFinite(previousValue) && currentValue > previousValue ? 'rotateDown45' : 'rotateUp45';
  const currentValueText = currentValue !== undefined ? currentValue.toFixed(1).toString() : '-';
  const predictedValueArrow = _.isFinite(predictedValue) && currentValue > predictedValue ? 'rotateDown45' : 'rotateUp45';
  const predictedValueText = predictedValue !== undefined ? predictedValue.toFixed(1).toString() : '-';
  return (
    <div className="ui statistic three wide column">
      <div>
        <span className="title">Anomaly Score</span>
        <span className="meta">{duration}</span>
      </div>
      <div>
      	<table border='0'>
					<tr>
						<td>
							<span className="previousValue">{`${previousValueText}`}</span>
						</td>
						<td>
							<span className={previousValueArrow}><i classname='fa FaLongRightArrow fa-2x'></i></span>
						</td>
      			<td>
							<span className="currentValue">{`${currentValueText}`}</span>
						</td>
						<td>
							<span className={predictedValueArrow}><i classname='fa FaLongRightArrow fa-2x'></i></span>
						</td>
      			<td>
							<span className="predictedValue">{`${predictedValueText}`}</span>
						</td>
					</tr>
					<tr>
						<td><span className="valueSubLabel">Previous Period</span></td>
						<td></td>
						<td><span className="valueSubLabel">Current Period</span></td>
						<td></td>
						<td><span className="valueSubLabel">Predicted Period</span></td>
					</tr>
				</table>
      </div>
    </div>
  )
};

AnomalyScore.propTypes = {
  previousValue: T.number,
  currentValue: T.number,
  predictedValue: T.number,
  duration: T.string,
};
