/* eslint-disable no-console */
import store from 'store';
import $ from 'jquery';
import getEndpoint from './get-endpoint';

const retrieveExecDBStatisticsData = (projectName, endTimestamp, modelType, numberOfDays) => {
  const userName = store.get('userName');
  const token = store.get('token');

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: getEndpoint('SystemsStatsDataServlet', 1),
      data: $.param({
        userName, token, projectName, endTimestamp, modelType, numberOfDays, operation: 'post',
      }),
      beforeSend: (request) => {
        request.setRequestHeader('Accept', 'application/json');
      },
    }).done((resp) => {
      if (resp.success) {
        try {
          const data = resp.data;
          resolve(data);
        } catch (e) {
          console.log(e);
          reject(`Data Error: ${e.message}`);
        }
      } else {
        reject(resp.message);
      }
    }).fail((resp) => {
      console.log(resp);
      reject(`Server Error: ${resp.status}\n${resp.statusText}`);
    });
  });
};

export default retrieveExecDBStatisticsData;