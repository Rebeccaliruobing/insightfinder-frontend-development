/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React, { PropTypes as T } from 'react';
import _ from 'lodash';

const highlightContent = (rawData, word) => {
  if (_.isString(word) && _.isString(rawData)) {
    const regex = new RegExp(`\\b(${word.trim()})\\b`, 'mgi');
    return rawData.replace(regex, '<span class="highlight">$1</span>');
  }

  return rawData || '';
};

const EventTable = ({ highlightWord, eventDataset, ...props }) => {
  const ds = eventDataset || [];
  return (
    <div {...props} style={{ borderTop: '2px solid black', overflowY: 'auto' }}>
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
            ds.map((event, idx) => (
              <tr key={idx}>
                <td className="no">{idx + 1}</td>
                <td>{event.datetime}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: highlightContent(event.rawData, highlightWord),
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
