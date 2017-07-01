/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/**
 * Convert log pattern top k string into a keywords array.
 *
 * The string contains keywords and count?.
 * 'warn'(3), 'false'(3), 'slf4j'(3), '0a'(3), 'avro'(3), 'guice'(3), 'log4j'(3), 'mapper'(3), 'paranamer'(3), 'protobuf'(3)
**/

import R from 'ramda';

const logPatternTopK2Array = (str) => {
  // Remove the count like: (3), remove '', and then get the word, like warn.
  const keywords = R.filter(
    k => Boolean(k),
    R.map(
      k => k.trim(),
      str && str.length > 0 ? str.replace(/\(\d+\)/g, '').replace(/'/g, '').split(',') : [],
    ),
  );

  return keywords;
};

export default logPatternTopK2Array;
