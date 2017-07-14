import {
	trafficDuration
} from '../googleAddressPicker/googleAPIs';
import createUUID from '../lib/uuidTool.js';
import {
	Observable
} from 'rxjs/Rx';

export const fetchDurationEpic = action$ =>
	action$.ofType('FETCH_DURATION')
	.flatMap(action => {
		let {
			route
		} = action;
		let {
			startAddress,
			endAddress
		} = route;
		let fromPlaceId = startAddress.placeId;
		let toPlaceId = endAddress.placeId;

		console.log('running through fetchDurationEpic', route);

		return Observable.fromPromise(trafficDuration(fromPlaceId, toPlaceId))
			.map(data => ({
				...data,
				time: new Date(),
				routeId: route.id,
				id: createUUID()
			})).map(data => ({
				type: 'FETCH_DURATION_SUCCESS',
				data
			}))
			.catch(err => ({
				type: 'FETCH_DURATION_ERR',
				err
			}));


	});