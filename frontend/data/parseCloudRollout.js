// TODO: Remove these code if the parser has no error
// apis.postCloudRolloutCheck(
//     startTime, endTime, data.projectName, 'cloudrollout').then((resp)=> {
//     if (resp.success) {
//         resp.data.originData = Object.assign({}, resp.data);
//         resp.data.projectName = data.projectName;
//
//         resp.data.rolloutCheckModelKeyList = JSON.parse(resp.data.rolloutCheckModelKeyList);
//         resp.data.modelData = resp.data.rolloutCheckModelKeyList;
//         let groups = {};
//         resp.data.modelData.forEach((dataArray)=> {
//             dataArray.mapData.forEach((data)=> {
//                 if (!groups[data.groupId]) {
//                     groups[data.groupId] = []
//                 }
//                 groups[data.groupId].push(Object.assign({}, data, {
//                     startTime: dataArray.startTime,
//                     endTime: dataArray.endTime
//                 }));
//             });
//         });
//         resp.data.modelData = groups;
//         this.handleData(resp.data);
//     }
//     this.setState({ loading: false });
// }).catch(()=> {
//     this.setState({ loading: false });
// })

import moment from 'moment';

/**
 * Parse the cloud rollout API response into rollout data.
 * @param projectName - Project name
 * @param startTime
 * @param endTime
 * @param resp - Api response from server
 */
const parseCloudRollout = (projectName, startTime, endTime, resp) => {
    if (!resp.success || !resp.data || !resp.data.rolloutCheckModelKeyList) {
        return {};
    }

    const modelKeyList = JSON.parse(resp.data.rolloutCheckModelKeyList);

    let groupsData = {};
    modelKeyList.forEach((model)=> {

        const startTime = moment(model.startTime).format('MM-DD HH:mm');
        const endTime = moment(model.endTime).format('MM-DD HH:mm');

        // Group the data by group_id.
        model.mapData.forEach((data)=> {

            const groupId = data.groupId;
            if (!groupsData[groupId]) {
                groupsData[groupId] = {
                    groupId: groupId,
                    metricNames: null,
                    data: [],
                };
            }

            // For each group, all data in that group has the same metrics.
            const metricNameList = data.metricNameList;
            if (metricNameList && !groupsData[groupId].metricNames) {
                // Get the first part of from the metric, and remove duplicated.
                let names = metricNameList.map( m => m.split('[')[0]);
                names = new Array(...new Set(names));
                groupsData[groupId].metricNames = names.join(',');
            }
            const metricNames = groupsData[groupId].metricNames;
            let title;
            if (!groupId) {
                title = <span>Holistic {metricNames}<br/>{startTime} - {endTime} </span>
            } else {
                title = <span>Group {groupId} {metricNames}<br/>{startTime} - {endTime}</span>
            }

            let params = {
                projectName,
                startTime,
                endTime,
            };

            if (data.instanceName) {
                title = data.instanceName;
                params.instanceName = data.instanceName;
            } else {
                params.groupId = groupId;
            }

            const nasData = [];
            if(data.NASValues) {
                data.NASValues.forEach((line, index) => {
                    var lineArray = line.split(",");
                    var colIndex = lineArray[0];
                    nasData.push({
                        colIndex: colIndex % 32,
                        rowIndex: parseInt(index / 32),
                        value: lineArray[1]
                    });
                });
            }

            groupsData[groupId].data.push({
                groupId,
                startTime,
                title,
                endTime,
                duration: 120,
                itemSize: 4,
                data: nasData,
                link: `/projectDataOnly?${$.param(params)}`,
            });
        });
    });

    return {
        projectName,
        startTime,
        endTime,
        modelData: groupsData,
    };
};

export default parseCloudRollout;

