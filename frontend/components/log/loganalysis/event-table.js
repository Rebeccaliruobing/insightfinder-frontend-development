/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React, { PropTypes as T } from 'react';
import _ from 'lodash';
import R from 'ramda';

const highlightContent = (rawData, word) => {
  if (_.isString(word) && _.isString(rawData)) {
    const regex = new RegExp(`\\b(${word})\\b`, 'mgi');
    return rawData.replace(regex, '<span class="highlight">$1</span>');
  }

  return rawData || '';
};

const EventTable = ({ highlightWord, eventDataset, ...props }) => {
  const ds = eventDataset || [];
  return (
    <div {...props} style={{ border: '2px solid black', overflowY: 'auto' }}>
      <table className="log-event-table">
        <thead>
          <tr>
            <th width={40} className="no">#</th>
            <th width={110}>Time</th>
            <th>Event</th>
          </tr>
        </thead>
        <tbody>
          {
            R.reverse(ds).map((event, idx) => (
              <tr key={idx}>
                <td className="no">{idx + 1}</td>
                <td>{event[0]}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: highlightContent(event[1], highlightWord),
                  }}
                />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

EventTable.propTypes = {
  highlightWord: T.string,
  eventDataset: T.array,
  className: T.string,
};

EventTable.defaultProps = {
  highlightWord: null,
  eventDataset: [],
  className: '',
};

export default EventTable;
