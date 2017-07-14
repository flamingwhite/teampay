import {
	trafficDuration
} from '../googleAddressPicker/googleAPIs';
import createUUID from '../lib/uuidTool.js';
import {
	Observable
} from 'rxjs/Rx';
import {
	MapActions,
	fetchDurationFulfilled,
	fetchDurationRejected
} from './mapActionCreators';

export const fetchDurationEpic = action$ =>
	action$.ofType(MapActions.FETCH_DURATION)
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
			}))
			.map(fetchDurationFulfilled)
			.catch(fetchDurationRejected);
	});