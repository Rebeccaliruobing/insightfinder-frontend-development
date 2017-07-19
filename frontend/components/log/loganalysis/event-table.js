/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import _ from 'lodash';
import R from 'ramda';

const highlightContent = (rawData, word) => {
  if (_.isString(word) && _.isString(rawData)) {
    const regex = new RegExp(`\\b(${word.trim()})\\b`, 'mgi');
    return rawData.replace(regex, '<span class="highlight">$1</span>');
  }

  return rawData || '';
};

type Props = {
  highlightWord: String,
  eventDataset: Array<Object>,
  className: String,
  totalCount: Number,
  pageSize: Number,
  currentPage: Number,
  onPageChanged: Function,
};

class EventTable extends React.PureComponent {
  props: Props;

  static defaultProps = {
    highlightWord: null,
    eventDataset: [],
    className: '',
  };

  render() {
    let {
      highlightWord,
      eventDataset,
      className,
      totalCount,
      pageSize,
      currentPage,
      ...rest
    } = this.props;
    const ds = eventDataset || [];

    /*
    totalCount = 234;
    pageSize = 50;
    currentPage = 3;
    */

    const pages = [];
    const showPaging = _.isNumber(totalCount) && _.isNumber(pageSize) && _.isNumber(currentPage);

    if (showPaging) {
      const pageCount = Math.floor((totalCount + pageSize - 1) / pageSize);
    }

    return (
      <div className="flex-col">
        {showPaging &&
          <div style={{ textAlign: 'right', paddingBottom: 4 }}>
            <div className="ui pagination menu" style={{ fontSize: 12, boxShadow: 'none' }}>
              {R.map(
                p =>
                  <a key={p} className={`${p === currentPage ? 'active' : ''}item`}>
                    {p}
                  </a>,
                pages,
              )}
            </div>
          </div>}
        <div
          {...rest}
          className={`flex-grow ${className}`}
          style={{ borderTop: '2px solid black', overflowY: 'auto' }}
        >
          <table className="log-event-table">
            <thead>
              <tr>
                <th width={130}>Timestamp</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {ds.map((event, idx) =>
                <tr key={idx}>
                  <td>
                    {event.datetime}
                  </td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: highlightContent(event.rawData, highlightWord),
                    }}
                  />
                </tr>,
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EventTable;
