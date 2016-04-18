/*
 * 对Semantic UI api behavior的扩展如下:
 * http://semantic-ui.com/behaviors/api.html
 *
 * 1. 当使用serializeForm=true时, 需要使用form-serializer库.
 *    https://www.npmjs.com/package/form-serializer
 *
 * 2. 当response.success为false时, 触发onFailure事件.
 */

import 'form-serializer';

$.fn.api.settings.successTest = function(response) {
  if(response && response.success){
    return response.success
  }
  return false;
};
