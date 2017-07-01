/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/**
 * Server generate pattern name based on the id. This will not work for customized pattern
 * name.
**/

const logPatternNameToId = (str) => {
  return str.replace('Pattern', '').trim();
};

export default logPatternNameToId;
