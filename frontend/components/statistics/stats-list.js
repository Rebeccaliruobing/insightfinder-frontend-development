import React, {PropTypes as T} from 'react';
import _ from 'lodash';

const StatsList = ({title, list, topK, normalValue='-1', duration='1d', order='asc', valFormat='', valMultiplier=1, width='three' }) => {
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
  let alt='Everything is normal';
  return (
    <div className={className}>
      <div>
        <span className="title">{title}</span>
        <span className="meta">{duration}</span>
      </div>
        {topKList.length>0 && topKList.map((item, i) => {
          let val = '';
          if(valFormat=='frequency'){
            val = ' (x' + item.val + ')';
          } else if(valFormat=='duration'){
            val = ' (' + item.val + ' min)';
          } else if(valFormat=='percentage'){
            let value = item.val * valMultiplier;
            val = ' (' + value.toFixed(1) + '%)';
          }
          return (
            <div key={i} className={item.style}>{item.key + val}</div>
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
