import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const StatsList = ({title, list, topK, alt='Everything is normal', normalValue='-1', duration='1d', order='asc', width='three' }) => {
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
    if(a.key[0]!='-'){
      a.key = '- ' + a.key;
    }
    // if(key.length>24){
    //   key = key.slice(0,22)+"..";
    // }
    if(a.val == normalValue){
      a['style'] = "list omit";
    } else {
      a['style'] = "list error";
    }
    return a;
  }).slice(0, topK);
  return (
    <div className={className}>
      <div>
        <span className="title">{title}</span>
        <span className="meta">{duration}</span>
      </div>
        {topKList.length>0 && topKList.map((item, i) => {
          return (
            <div key={i} className={item.style}>{item.key}</div>
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
