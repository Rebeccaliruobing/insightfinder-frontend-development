import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const StatsList = ({title, list, topK, alt='Everything is normal', duration='1d', order='asc', width='three' }) => {
  const className = "ui statistic "+width+" wide column";
  let sortedList = $.map(list, function(val, key){
      return {
        key: key,
        val: val,
      }
    });
  sortedList = _.sortBy(sortedList,"val");
  if(order=='desc'){
    sortedList = sortedList.reverse();
  }
  let topKList = _.map(sortedList, a => {
    let key = a.key;
    if(key[0]!='-'){
      key = '- ' + key;
    }
    // if(key.length>24){
    //   key = key.slice(0,22)+"..";
    // }
    return key;
  }).slice(0, topK);
  return (
    <div className={className}>
      <div>
        <span className="title">{title}</span>
        <span className="meta">{duration}</span>
      </div>
        {topKList.length>0 && topKList.map((item, i) => {
          return (
            <div className="list error">{item}</div>
          )
        })}
        {topKList.length==0 &&
          <div className="list normal">{alt}</div>
        }
    </div>
  )
};

StatsList.propTypes = {
  title: T.string,
  list: T.object,
  topK: T.number,
  duration: T.string,
  width: T.string,
};

export default StatsList;
