/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import _ from 'lodash';
import R from 'ramda';
import { autobind } from 'core-decorators';

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
  pageNo: Number,
  onPageChanged: Function,
};

class EventTable extends React.PureComponent {
  props: Props;

  static defaultProps = {
    highlightWord: null,
    eventDataset: [],
    className: '',
  };

  @autobind
  handlePageClick(pageNo) {
    return e => {
      const { pageSize, onPageChanged } = this.props;
      e.preventDefault();
      if (onPageChanged) {
        onPageChanged(pageNo, pageSize);
      }
    };
  }

  render() {
    const {
      highlightWord,
      eventDataset,
      className,
      totalCount,
      pageSize,
      pageNo,
      onPageChanged,
      ...rest
    } = this.props;
    const ds = eventDataset || [];

    const pages = [];
    const showPaging = _.isNumber(totalCount) && _.isNumber(pageSize) && _.isNumber(pageNo);
    const bufferCount = 2;

    if (showPaging) {
      const pageCount = Math.floor((totalCount + pageSize - 1) / pageSize);
      pages.push(1);

      if (pageNo - bufferCount - 1 > 1) {
        pages.push('...');
      }
      for (let i = bufferCount; i > 0; i -= 1) {
        if (pageNo - i > 1) {
          pages.push(pageNo - i);
        }
      }
      if (pageNo !== 1) {
        pages.push(pageNo);
      }

      for (let i = 1; i <= bufferCount; i += 1) {
        if (pageNo + i < pageCount) {
          pages.push(pageNo + i);
        }
      }

      if (pageNo + bufferCount - 1 < pageCount) {
        pages.push('...');
      }
      if (pageCount !== 1 && pageNo !== pageCount) {
        pages.push(pageCount);
      }
    }

    return (
      <div className="flex-col">
        {showPaging &&
          <div style={{ textAlign: 'right', paddingBottom: 4 }}>
            <div className="ui pagination menu" style={{ fontSize: 12, boxShadow: 'none' }}>
              {R.addIndex(R.map)((p, idx) => {
                if (p === '...') {
                  return (
                    <a key={`${p}-${idx}`} className="item" style={{ cursor: 'inherit' }}>
                      {p}
                    </a>
                  );
                } else if (p === pageNo) {
                  return (
                    <a key={`${p}-${idx}`} className="active item" style={{ cursor: 'inherit' }}>
                      {p}
                    </a>
                  );
                } else {
                  return (
                    <a key={`${p}-${idx}`} className="item" onClick={this.handlePageClick(p)}>
                      {p}
                    </a>
                  );
                }
              }, pages)}
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
