import store from 'store';
import getEndpoint from './get-endpoint';
import DataParser from './data-parser';

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

        try {
          const data = resp.data;
          const parser = new DataParser(data);
          parser.getSummaryData();

          const ret = {};
          ret['statistics'] = data['instanceMetricJson'] || {};
          ret['summary'] = parser.summaryData || {};

          // TODO: Get incidents list object or array;
          ret['incidents'] = {};

          resolve(ret);
        } catch (e) {
          reject(`Data Error: ${e.message}`)
        }
      } else {
        reject(resp.message);
      }
    }).fail(function (resp) {
      console.log(resp);
      reject(`Server Error: ${resp.status}\n${resp.statusText}`);
    });
  });
};

export default retrieveLiveAnalysis;
