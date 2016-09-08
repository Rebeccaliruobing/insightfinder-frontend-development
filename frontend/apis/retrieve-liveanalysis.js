import store from 'store';
import getEndpoint from './get-endpoint';

/**
 * Api to retrieve project's live analysis data.
 * @param pname: The name of the project
 * @param mtype: The type of the model
 * @param pvalue: pvalue
 * @param cvalue: cvalue
 */
const retrieveLiveAnalysis = (projectName, modelType, pvalue, cvalue) => {
  const userName = store.get('userName');
  const token = store.get('token');

  return new Promise(function (resolve, reject) {
    $.ajax({
      type: 'POST',
      url: getEndpoint('liveAnalysis'),
      data: $.param({ userName, token, pvalue, cvalue, modelType, projectName }),
      beforeSend: function (request) {
        request.setRequestHeader("Accept", 'application/json');
      }
    }).done(function (resp) {
      if (resp.success) {
        // Parse the data.
        const data = resp.data;
        resolve({});
      } else {
        reject(resp.message);
      }
    }).fail(function (error) {
      console.log(arguments);
      console.log("Server Error", arguments);
      // reject("Server Error:" + error);
    });
  });
};

export default retrieveLiveAnalysis;
