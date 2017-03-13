const hourlyData = require('./hourly-data.json');

const aggregateToMultiHourData = (jsonResponse, durationInDays = 7, periodInHours = 3, endTimestamp) => {

	// Make sure data isn't an empty array
	jsonResponse = hourlyData;
	console.log(jsonResponse);

	// Set up date and variables for epoch math
	let d = new Date();
	const viewMillisOffset = d.getTimezoneOffset() * 60 * 1000;
	const millisInDay = 24 * 60 * 60 * 1000;
	const millisInHour = 60 * 60 * 1000;
	console.log(endTimestamp + " :: " + durationInDays);
	let earliestDataHour = topOfHour(endTimestamp - (durationInDays * millisInDay));
	let earliestViewHour = topOfHour(endTimestamp - (durationInDays * millisInDay) - viewMillisOffset);
	console.log("edh: " + earliestDataHour);
	console.log("evh: " + earliestViewHour);
	if (topOfHour(earliestDataHour - viewMillisOffset) == topOfDay(earliestDataHour - viewMillisOffset)) {
		earliestViewHour = topOfDay(earliestDataHour - viewMillisOffset);
	} else {
		earliestViewHour = topOfDay(earliestDataHour + millisInDay - viewMillisOffset);
	}
	// Initialize 'aggregates' (return object)
	let aggregates = {};
	aggregates['duration'] = durationInDays;
	aggregates['endTimestamp'] = endTimestamp;
	aggregates['period'] = periodInHours;
	aggregates['dayLabels'] = [];
	aggregates['totalEvents'] = 0;
	aggregates['totalAnomalyScore'] = 0;
	aggregates['totalAnomalyCount'] = 0;
	aggregates['totalEventDuration'] = 0;
	aggregates['totalDurationEvents'] = 0;

	// Setup time metadata in response
  
	// Make month 01-12 and pad other fields appropriately
	function mdhFormatter(value, field) {
		if (field == "month") { value = value + 1 };
		if (value < 10) { value = "0" + value; }
		return value;
	}
	// Returns epoch in millis for beginning of the hour
	function topOfHour(epoch) {
		epoch = epoch - (epoch % (60 * 60 * 1000));
		return epoch;
	}
	// Returns epoch in millis for beginning of day
	function topOfDay(epoch) {
		epoch = epoch - (epoch % (24 * 60 * 60 * 1000));
		return epoch;
	}
	// Returns well-formatted date for data access
	function dateFormatter(date) {
		return date.getUTCFullYear() + "" + mdhFormatter(date.getUTCMonth(), "month") + "" + mdhFormatter(date.getUTCDate(), "date") + "" + mdhFormatter(date.getUTCHours(), "hours");
	}
  
	let utcNow = dateFormatter(d);
	let viewNow = dateFormatter(new Date(d.getTime() - viewMillisOffset));

	console.log("UTC Now: " + utcNow + "  View Now: " + viewNow + "  Duration: " + durationInDays + "  endTimestamp: " + endTimestamp);
  
	aggregates['earliestDataHour'] = earliestDataHour;
  
	aggregates['earliestViewHour'] = earliestViewHour;
	console.log("evh: " + earliestViewHour + "  " + new Date(earliestViewHour) + "  edh: " + earliestDataHour + "  " + new Date(earliestDataHour));
	console.log(aggregates);
  
	if (jsonResponse['success']) {
	  
		// Aggregate all values to hours
		for (var pname in jsonResponse['data']) {
			if (pname === undefined) {
				continue;
			} else {
				if (aggregates[pname] === undefined) {
					aggregates[pname] = {};
					aggregates[pname]['totalEvents'] = 0;
					aggregates[pname]['totalAnomalyScore'] = 0;
					aggregates[pname]['totalAnomalyCount'] = 0;
					aggregates[pname]['totalEventDuration'] = 0;
					aggregates[pname]['totalDurationEvents'] = 0;
				}
				//console.log(pname);
				for (var gname in jsonResponse['data'][pname]) {
					if (gname === undefined) {
						continue;
					} else {
						if (aggregates[pname][gname] === undefined) {
							aggregates[pname][gname] = {};
							aggregates[pname][gname]['totalEvents'] = 0;
							aggregates[pname][gname]['totalAnomalyScore'] = 0;
							aggregates[pname][gname]['totalAnomalyCount'] = 0;
							aggregates[pname][gname]['totalEventDuration'] = 0;
							aggregates[pname][gname]['totalDurationEvents'] = 0;
						}
						//console.log(gname);
						for (var hour in jsonResponse['data'][pname][gname]) {
							if (hour == undefined || hour == "") {
								continue;
							} else {
								if (aggregates[hour] === undefined) {
									aggregates[hour] = {};
									aggregates[hour]['totalEvents'] = 0;
									aggregates[hour]['totalAnomalyScore'] = 0;
									aggregates[hour]['totalAnomalyCount'] = 0;
									aggregates[hour]['totalEventDuration'] = 0;
									aggregates[hour]['totalDurationEvents'] = 0;
								}
								if (aggregates[pname][hour] === undefined) {
									aggregates[pname][hour] = {};
									aggregates[pname][hour]['totalEvents'] = 0;
									aggregates[pname][hour]['totalAnomalyScore'] = 0;
									aggregates[pname][hour]['totalAnomalyCount'] = 0;
									aggregates[pname][hour]['totalEventDuration'] = 0;
									aggregates[pname][hour]['totalDurationEvents'] = 0;
								}
								if (aggregates[pname][gname][hour] === undefined) {
									aggregates[pname][gname][hour] = {};
									aggregates[pname][gname][hour]['totalEvents'] = 0;
									aggregates[pname][gname][hour]['totalAnomalyScore'] = 0;
									aggregates[pname][gname][hour]['totalAnomalyCount'] = 0;
									aggregates[pname][gname][hour]['totalEventDuration'] = 0;
									aggregates[pname][gname][hour]['totalDurationEvents'] = 0;
								}
							}
							//console.log(hour);
						  
							// Fields
							// Aggregate Totals
							aggregates['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
							// console.log("aggTotalEvents: "+aggregates['totalEvents']);
							aggregates['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
							aggregates['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
							aggregates['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
							aggregates['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
							// Aggregate/Hour Totals
							aggregates[hour]['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
							aggregates[hour]['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
							aggregates[hour]['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
							aggregates[hour]['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
							aggregates[hour]['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
							// Project Totals
							aggregates[pname]['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
							aggregates[pname]['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
							aggregates[pname]['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
							aggregates[pname]['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
							aggregates[pname]['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
							// Project/Hour Totals
							aggregates[pname][hour]['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
							aggregates[pname][hour]['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
							aggregates[pname][hour]['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
							aggregates[pname][hour]['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
							aggregates[pname][hour]['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
							// Group Totals
							aggregates[pname][gname]['totalEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfEvents'];
							aggregates[pname][gname]['totalAnomalyScore'] += jsonResponse['data'][pname][gname][hour]['totalAnomalyScore'];
							aggregates[pname][gname]['totalAnomalyCount'] += jsonResponse['data'][pname][gname][hour]['numberOfAnomalies'];
							aggregates[pname][gname]['totalEventDuration'] += jsonResponse['data'][pname][gname][hour]['totalEventDuration'];
							aggregates[pname][gname]['totalDurationEvents'] += jsonResponse['data'][pname][gname][hour]['numberOfDurationEvents'];
						}  // hour
					}
				}  // gname
			}
		}  // pname
	}	// "success" 

	// Declare fields/variables for the heatmap grid
	let dayCtr = 1,
		periodCtr = 1,
		hourCtr = 1,
		dateKey = "",
		tempEvents = 0,
		tempCount = 0,
		tempScore = 0,
		tempDuration = 0,
		entry = {},
		cell = {};
	aggregates['heatmap'] = [];

	for (var i = earliestViewHour + viewMillisOffset; i < (earliestViewHour + (durationInDays * millisInDay)); i = i + 3600000) {
		console.log('evh: ' + earliestViewHour);
		entry = new Date(i);
		dateKey = dateFormatter(entry);
	  
		// Add hour values to period totals
		if (aggregates[dateKey] !== undefined) {
			tempEvents += aggregates[dateKey]['totalEvents'];
			tempCount += aggregates[dateKey]['totalAnomalyCount'];
			tempScore += aggregates[dateKey]['totalAnomalyScore'];
			tempDuration += aggregates[dateKey]['totalEventDuration'];
			tempDurationEvents += aggregates[dateKey]['totalDurationEvents'];
		}

		if (hourCtr % periodInHours == 0) {

			aggregates['heatmap'].push({
				'day': dayCtr, 'period': periodCtr, 'value': tempScore, 'totalEvents': tempEvents,
				'totalAnomalyCount': tempCount, 'totalAnomalyScore': tempScore,
				'totalEventDuration': tempDuration, 'totalDurationEvents': tempDurationEvents, 'title': ""
			});
			hourCtr = 1;
			tempEvents = 0;
			tempCount = 0;
			tempScore = 0;
			tempDuration = 0;
			periodCtr++;
			if (periodCtr > (24 / periodInHours)) {
				periodCtr = 1;
				dayCtr++;
				aggregates['dayLabels'].push(entry.getMonth() + "/" + entry.getDate());
			}
		} else {
			hourCtr++;
		}
	}
	console.log("aggregates['heatmap']: " + aggregates['heatmap']);
  
	return aggregates;
}

export default aggregateToMultiHourData;
