/* eslint-disable no-console */
import store from 'store';
import $ from 'jquery';
import getEndpoint from './get-endpoint';

const retrieveHeatmapData = (modelType, endTimestamp, numberOfDays, operation="loadHourly") => {
  const userName = store.get('userName');
  const token = store.get('token');

  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: getEndpoint('execDashboard'),
      data: $.param({
        userName, token, endTimestamp, modelType, numberOfDays, operation
      }),
      beforeSend: (request) => {
        request.setRequestHeader('Accept', 'application/json');
      },
    }).done((resp) => {
      console.log("Query Response: "+resp);
      if (resp.success) {
        try {
          const data = resp.data;
          console.log("[retrieve-heatmap-data.js] resp.data: "+JSON.stringify(resp.data));
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

export default retrieveHeatmapData;
