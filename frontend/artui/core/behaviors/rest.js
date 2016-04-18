/*!
 * 利用Semantic UI API behaviors实现的rest API接口.
 * http://semantic-ui.com/behaviors/api.html
 */

;(function ($, window, document, undefined) {

  "use strict";

  var
    window = (typeof window != 'undefined' && window.Math == Math)
      ? window
      : (typeof self != 'undefined' && self.Math == Math)
      ? self
      : Function('return this')();

  $.rest = $.fn.rest = function(parameters) {
    var
      // use window context if none specified
      $allModules     = $.isFunction(this)
        ? $(window)
        : $(this);
    
    // 对其它命令直接转发给api, 如refresh, destroy等
    if ( parameters && !$.isPlainObject(parameters)) {
      return $allModules.api(parameters);
    }
    
    var
      settings        = ( $.isPlainObject(parameters) )
        ? $.extend(true, {}, $.fn.rest.settings, parameters)
        : $.extend({}, $.fn.rest.settings);
    
    var debug = function() {
      if(!settings.silent && settings.debug) {
        debug = Function.prototype.bind.call(console.info, console, settings.name + ':');
        debug.apply(console, arguments);
      }
    };
    var verbose = function() {
      if(!settings.silent && settings.verbose && settings.debug) {
        verbose = Function.prototype.bind.call(console.info, console, settings.name + ':');
        verbose.apply(console, arguments);
      }
    };
    var error = function() {
      if(!settings.silent) {
        error = Function.prototype.bind.call(console.error, console, settings.name + ':');
        error.apply(console, arguments);
      }
    };

    $allModules
      .each(function() {
        var
          $module         = $(this),
          
          rest_method     = settings.restMethod || $module.data('restMethod') || 'get',
          base            = !!settings.base && settings.base,
          action          = settings.action || $module.data('action'),
          endpoint        = base || (!!action && $.api.settings.api[action])
        ;
        
        if (!endpoint || !endpoint.endsWith('/')) {
          error('未指定rest base或action参数, 或url未以/结尾');
        } else {
          // 忽略rest参数, 将其它参数作为api参数
          let {resMethod, base, action, data, urlData, ...apiSettings} = parameters;
          let method = settings.endpoints[rest_method][0];
          let url = endpoint + settings.endpoints[rest_method][1];
          
          // 删除html上的method, action数据
          let domData = $module.data();
          settings.ignoreData.forEach((name) => {
            delete domData[name];
          });

          if (method === 'POST') {
            apiSettings['data'] = $.extend(true, {}, domData, data);
          } else {
            apiSettings['urlData'] = $.extend(true, {}, domData, urlData);
          }
          
          apiSettings['method'] = method;
          apiSettings['url'] = url;
          
          $module.api(apiSettings);
        }
      });
    
    // TODO: [REV] 如何处理返回值
    return this;
  };

  $.rest.settings = {
    name          : 'rest',
    
    debug         : false,
    verbose       : false,
    
    action        : false,
    base          : '',
    endpoints: {
      'create'    : ['POST', ''],
      'get'       : ['GET', '{id}'],
      'list'      : ['GET', '?page={/page}']
    },
    // 需要忽略的html上的data-数据
    ignoreData    : ['restMethod', 'action', 'reactid']
  };

})( jQuery, window, document );