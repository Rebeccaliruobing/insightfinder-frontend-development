import React, { PropTypes as T } from 'react';

const getArrowStyles = (left, right, reverse = false) => {
  const up = {
    transform: 'rotate(-45deg)',
    color: 'red',
  };
  const down = {
    transform: 'rotate(45deg)',
    color: 'green',
  };

  if (left !== undefined && right !== undefined) {
    if (left > right) {
      return !reverse ? down : up;
    } else if (left === right) {
      return {};
    }
    return !reverse ? up : down;
  }

  return {};
};

const ThreeValueBox = ({
  title, previousValue, currentValue, predictedValue, duration = 7,
}) => {
  const previousValueText = previousValue !== undefined ? previousValue.toFixed(1).toString() : '-';
  const currentValueText = currentValue !== undefined ? currentValue.toFixed(1).toString() : '-';
  const predictedValueText = predictedValue !== undefined ? predictedValue.toFixed(1).toString() : '-';

  const previousArrowStyle = getArrowStyles(previousValue, currentValue);
  const predictedArrowStyle = getArrowStyles(currentValue, predictedValue);

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
              <td style={{ width: '30%' }}>
                <span className="value">{`${previousValueText}`}</span>
              </td>
              <td style={{ width: '5%' }}>
                <span><i className="long arrow right icon" style={previousArrowStyle} /></span>
              </td>
              <td style={{ width: '30%' }}>
                <span className="value">{`${currentValueText}`}</span>
              </td>
              <td style={{ width: '5%' }}>
                <span><i className="long arrow right icon" style={predictedArrowStyle} /></span>
              </td>
              <td style={{ width: '30%' }}>
                <span className="value">{`${predictedValueText}`}</span>
              </td>
            </tr>
            <tr>
              <td><span className="valueThreeTableSubLabel">PREVIOUS</span></td>
              <td />
              <td><span className="valueThreeTableSubLabel">CURRENT</span></td>
              <td />
              <td><span className="valueThreeTableSubLabel">PREDICTED</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

ThreeValueBox.propTypes = {
  previousValue: T.number,
  currentValue: T.number,
  predictedValue: T.number,
  duration: T.string,
  title: T.string,
};

export default ThreeValueBox;
