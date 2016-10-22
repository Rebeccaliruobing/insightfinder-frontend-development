import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const StatsList = ({title, list, topK, duration='1d', width='three' }) => {
  const className = "ui statistic "+width+" wide column";
  let sortedList = $.map(list, function(val, key){
      return {
        key: key,
        val: val,
      }
    });
  sortedList = _.sortBy(sortedList,"val").reverse();
  let topKList = _.map(sortedList, a => {
    let key = a.key;
    if(key[0]!='-'){
      key = '- ' + key;
    }
    if(key.length>26){
      key = key.slice(0,24)+"..";
    }
    return key;
  }).slice(0, topK);
  return (
    <div className={className}>
      <div>
        <span className="title">{title}</span>
        <span className="meta">{duration}</span>
      </div>
      {topKList.map((item, i) => {
        return (
          <div className="list">{item}</div>
        )
      })}
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
