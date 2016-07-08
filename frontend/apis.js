import store from 'store';

const baseUrl = window.API_BASE_URL || '/api/v1/';
const DEBUG = false;

//
// When we run frontend on localhost python web server and connect api with different host,
// Chrome will report cross-domain error, we need to install the chrome plugin to avoid it:
// https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
//

// We use two ways to call server side api: semantic ui api behavior & ajax.
// Semantic-ui api behavior provides ui button integration, and ajax is easy to use.
// http://semantic-ui.com/behaviors/api.html
// TODO: Change to use one method to call server side api?

$.fn.api.settings.successTest = function (response) {
  if (response && response.success && (response.success == true || response.success.toLowerCase() === 'true')) {
    return response.success
  }
  return false;
};

$.fn.api.settings.api = {
  'login': `${baseUrl}login-check`,
  'signup': `${baseUrl}get-signup-code`,
  'signup2': `${baseUrl}signup`,
  'get username reminder': `${baseUrl}get-username-reminder`,
  'get temp password': `${baseUrl}get-temp-password`,
  'reset password': `${baseUrl}reset-password`,

  'dashboard uservalues': `${baseUrl}dashboard-uservalues`,
  'live analysis': `${baseUrl}liveAnalysis`,
  'cloud outlier detection': `${baseUrl}cloudOutlierDetection`,
  'cloud rollout check': `${baseUrl}cloudRolloutCheck`,
  'display project model': `${baseUrl}displayProjectModel`,

  'dashboard dailysummaryreport': `${baseUrl}dashboard-dailysummaryreport`,
  'published detection': `${baseUrl}publishedDetection`,
  'post mortem': `${baseUrl}postMortem`,
  'add custom project': `${baseUrl}add-custom-project`,
  'add aws project': `${baseUrl}add-amazon-project`,
  'add google project': `${baseUrl}add-google-project`,
  'remove project': `${baseUrl}remove-project`,
  'project setting': `${baseUrl}emailAlertSetting`,
  'project data': `${baseUrl}projectData`
};

let request = function (method, action, data, resolve, reject) {
  var formData = new FormData();
  _.keys(data).forEach((k)=> formData.append(k, data[k]));
  let xhr;
  switch (method) {
    case 'GET':
      xhr = $.get($.fn.api.settings.api[action], data);
      break;
    case 'HEAD':
      xhr = $.get($.fn.api.settings.api[action], data);
      break;
    default:
      xhr = $.post($.fn.api.settings.api[action], data);
      break;
  }
  xhr.done(function (resp) {
    resolve(resp);
  }).fail(function (error) {
    console.log(arguments);
    console.log("Server Error", arguments);
    reject(error);
  })
};

let requestGet = function (action, data, resolve, reject) {
  return request('GET', action, data, resolve, reject);
};
let requestPost = function (action, data, resolve, reject) {
  return request('POST', action, data, resolve, reject);
};


/**
 总体:
 Dashboard,
 DailySummaryReport,

 项目分析:
 PostMortem,
 PublishedDetection,
 LiveAnalysis,

 热图:
 CloudOutlierDetection,
 RolloutCheck,
 DisplayProjectModel,
 DisplayFileModel,

 文件分析:
 UploadVisualization,
 UploadTraining,
 UploadUpdate,
 UploadDetection,
 */
export default {

  postLogin(userName, password) {
    return new Promise(function (resolve, reject) {
      requestPost('login', {userName, password}, resolve, reject);
    });
  },
  /**
   *
   * @param userName
   * @param other
   * @param token
   * @param operation
   * @returns {Promise}
   */
  postDashboardUserValues (operation:String = 'display', other, userName:String = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      requestPost('dashboard uservalues', {userName, token, operation, ...other}, resolve, reject);
    });
  },
  postJSONDashboardUserValues (operation:String = 'display', other, userName:String = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['dashboard uservalues'],
        data: $.param({userName, token, operation, ...other}),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },
  postDashboardDailySummaryReport (forceReload, userName:String = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      let currentResp = store.get('dailyReportResponse');
      if (!forceReload && currentResp) {
        resolve(currentResp);
      } else {
        $.ajax({
          type: 'POST',
          url: $.fn.api.settings.api['dashboard dailysummaryreport'],
          data: $.param({userName, token}),
          beforeSend: function (request) {
            request.setRequestHeader("Accept", 'application/json');
          }
        }).done(function (resp) {
          store.set('dailyReportResponse', resp);
          resolve(resp);
        }).fail(function (error) {
          console.log(arguments);
          console.log("Server Error", arguments);
          reject(error);
        });
      }
    });
  },
  /**
   *
   * @param userName
   * @param token
   * @param pvalue
   * @param cvalue
   * @param modelType
   * @param projectName
   * @returns {Promise}
   */
  postLiveAnalysis(projectName, modelType, pvalue, cvalue, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['live analysis'],
        data: $.param({userName, token, pvalue, cvalue, modelType, projectName}),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },


  /**
   *
   * @param modelKey
   * @param startTime
   * @param endTime
   * @param modelStart
   * @param modelEnd
   * @param userName
   * @param token
   * @param pvalue
   * @param cvalue
   * @param modelType
   * @param projectName
   * @returns {Promise}
   */
  postPostMortem(projectName, pvalue, cvalue, modelType, startTime, endTime, modelStartTime, modelEndTime, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['post mortem'],
        data: $.param({
          userName,
          token,
          pvalue,
          cvalue,
          modelType,
          projectName,
          startTime,
          endTime,
          modelStartTime,
          modelEndTime
        }),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },

  /**
   *
   * @param userName
   * @param token
   * @param startTime
   * @param endTime
   * @param projectName
   * @param origin
   * @returns {Promise}
   */
  postCloudOutlierDetection(startTime, endTime, projectName, origin = 'cloudoutlier', userName = store.get('userName'), token = store.get('token'),) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['cloud outlier detection'],
        data: $.param({startTime, endTime, projectName, origin, userName, token}),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },

  /**
   *
   * @param userName
   * @param token
   * @param startTime
   * @param endTime
   * @param projectName
   * @param origin
   * @returns {Promise}
   */
  postCloudRolloutCheck(startTime, endTime, projectName, origin = 'cloudrollout', userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['cloud rollout check'],
        data: $.param({startTime, endTime, projectName, origin, userName, token}),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },
  /**
   *
   * @param startTime
   * @param endTime
   * @param projectName
   * @param origin
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postDisplayProjectModel(startTime, endTime, projectName, origin = 'clouddisplay', userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['display project model'],
        data: $.param({startTime, endTime, projectName, origin, userName, token}),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },


  /**
   *
   * @param pvalue
   * @param cvalue
   * @param modelKey
   * @param modelName
   * @param projectName
   * @param modelType
   * @param fromUser
   * @param dataChunkName
   * @param metaData
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postUseCase(pvalue, cvalue, modelKey, modelName, projectName, modelType, fromUser, dataChunkName, metaData, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['published detection'],
        data: $.param({
          pvalue,
          cvalue,
          modelKey,
          modelName,
          projectName,
          modelType,
          fromUser,
          dataChunkName,
          metaData,
          userName,
          token
        }),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },

  /**
   *
   * @param projectName
   * @param projectCloudType
   * @param samplingInterval
   * @param email
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postAddCustomProject(projectName, projectCloudType, samplingInterval, email = '', userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['add custom project'],
        data: $.param({projectName, projectCloudType, samplingInterval, email, userName, token}),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },

  /**
   *
   * @param projectName
   * @param email
   * @param zone
   * @param access_key
   * @param secrete_key
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postAddAWSProject(projectName, zone, instanceType, access_key, secrete_key, hasAgentData, email = '', userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['add aws project'],
        data: $.param({
          projectName, 
          zone, 
          instanceType,
          'access-key': access_key,
          'secrete-key': secrete_key,
          hasAgentData, 
          email,
          userName,
          token
        }),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },
  /**
   *
   * @param projectName
   * @param projectId
   * @param filename
   * @param projectType
   * @param userName
   * @param token
   * @returns {Promise}
   */

  postAddGoogleProject(projectName, projectId, projectType, serviceAccount, filename, hasAgentData, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['add google project'],
        data: $.param({
          projectName,
          'project-id': projectId,
          'project-type': projectType,
          'filename': filename,
          'service-account': serviceAccount,
          hasAgentData,
          userName,
          token
        }),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },
  /**
   *
   * @param projectName
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postRemoveProject(projectName, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['remove project'],
        data: $.param({projectName, userName, token}),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },
  /**
   *
   * @param projectName
   * @param cvalue
   * @param pvalue
   * @param cvalueEmail
   * @param pvalueEmail
   * @param cvalueFilter
   * @param pvalueFilter
   * @param minAnomalyRatioFilter
   * @param sharedUsernames
   * @param projectHintMapFilename
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postProjectSetting(projectName, cvalue, pvalue, cvalueEmail, pvalueEmail, cvalueFilter, pvalueFilter, minAnomalyRatioFilter, sharedUsernames, projectHintMapFilename, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['project setting'],
        data: $.param({
          projectName,
          cvalue,
          pvalue,
          'cvalue-email': cvalueEmail,
          'pvalue-email': pvalueEmail,
          'cvalue-filter': cvalueFilter,
          'pvalue-filter': pvalueFilter,
          minAnomalyRatioFilter,
          sharedUsernames,
          projectHintMapFilename,
          userName,
          token
        }),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },
  /**
   *
   * @param projectName
   * @param startTime
   * @param endTime
   * @param groupId
   * @param instanceName
   * @param userName
   * @param token
   * @returns {Promise}
   */
  postProjectData(projectName, startTime, endTime, groupId, instanceName, userName = store.get('userName'), token = store.get('token')) {
    return new Promise(function (resolve, reject) {
      // if(DEBUG && store.get('postProjectData')) originResolve(store.get('postProjectData'));
      // let resolve = function (resp) {
      //   if(DEBUG) store.set('postProjectData', resp);
      //   return originResolve
      // };
      $.ajax({
        type: 'POST',
        url: $.fn.api.settings.api['project data'],
        data: $.param({
          projectName,
          startTime,
          endTime,
          groupId,
          instanceName,
          userName,
          token
        }),
        beforeSend: function (request) {
          request.setRequestHeader("Accept", 'application/json');
        }
      }).done(function (resp) {
        resolve(resp);
      }).fail(function (error) {
        console.log(arguments);
        console.log("Server Error", arguments);
        reject(error);
      });
    });
  },

};
