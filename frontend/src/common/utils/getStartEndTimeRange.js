/* @flow */
import moment from 'moment';

const getStartEndTimeRange = (
  startTime: ?String, endTime: ?String,
  days: Number, dateFormat: String,
) => {
  // Limit the start/end time to number of days. If overflow, use the startTime to get endTime.
  const mStart = (startTime ? moment(startTime, dateFormat) :
    moment().subtract(days - 1, 'days')).startOf('day');
  let mEnd = (endTime ? moment(endTime, dateFormat) : moment()).endOf('day');

  const diffDays = mEnd.diff(mStart, 'days');

  if (diffDays > (days - 1) || diffDays < 0) {
    mEnd = mStart.clone().add(days - 1, 'days').endOf('day');
  }
  const mNow = moment();
  if (endTime > mNow) {
    mEnd = mNow.endOf('day');
  }

  startTime = mStart.format(dateFormat);
  endTime = mEnd.format(dateFormat);

  return { startTime, endTime };
};

export default getStartEndTimeRange;
