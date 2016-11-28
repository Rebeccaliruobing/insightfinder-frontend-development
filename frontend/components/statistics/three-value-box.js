import React, {PropTypes as T} from 'react';

const ThreeValueBox = ({title, previousValue, currentValue, predictedValue, duration='1d' }) => {
  const previousValueText = previousValue !== undefined ? previousValue.toFixed(1).toString() : '-';
  const previousValueArrow = _.isFinite(previousValue) && currentValue > previousValue ? 'transform:rotate(45deg),color:red' : 'trasnform:rotate(-45deg),color:green';
  const currentValueText = currentValue !== undefined ? currentValue.toFixed(1).toString() : '-';
  const predictedValueArrow = _.isFinite(predictedValue) && currentValue > predictedValue ? 'transform:rotate(45deg),color:red' : 'transform:rotate(-45deg),color:green';
  const predictedValueText = predictedValue !== undefined ? predictedValue.toFixed(1).toString() : '-';
  return (
    <div>
      <div>
        <span className="title">{title}</span>
        <span className="meta">{duration}d</span>
      </div>
      <div>
      	<table className="valueThreeTable">
					<tbody>
					<tr>
						<td style={{width:"26%"}}>
							<span className="value" style={{display:"block"}}>{`${previousValueText}`}</span>
						</td>
						<td style={{width:"8%"}}>
							<span><i className='long arrow right icon' style={{previousValueArrow}}></i></span>
						</td>
      			<td style={{width:"40%"}}>
							<span className="value">{`${currentValueText}`}</span>
						</td>
						<td style={{width:"8%"}}>
							<span><i className='long arrow right icon' style={{predictedValueArrow}}></i></span>
						</td>
      			<td style={{width:"26%"}}>
							<span className="value">{`${predictedValueText}`}</span>
						</td>
					</tr>
					<tr>
						<td><span className="valueThreeTableSubLabel">PREVIOUS</span></td>
						<td></td>
						<td><span className="valueThreeTableSubLabel">CURRENT</span></td>
						<td></td>
						<td><span className="valueThreeTableSubLabel">PREDICTED</span></td>
					</tr>
					</tbody>
				</table>
      </div>
    </div>
  )
};

ThreeValueBox.propTypes = {
  previousValue: T.number,
  currentValue: T.number,
  predictedValue: T.number,
  duration: T.string,
	title: T.string
};

export default ThreeValueBox;
