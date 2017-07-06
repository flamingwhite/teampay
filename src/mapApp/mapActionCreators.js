import {
	convertArrayToMirrorAction,
	createAsyncHttpAction,
} from '../lib/simpleReduxTool';
import createUUID from '../lib/uuidTool';
import {
	trafficDuration
} from '../googleAddressPicker/googleAPIs';

const syncActions = convertArrayToMirrorAction([
	'ADD_ROUTE',
	'DELETE_ROUTE'
]);

const asyncActions = ['FETCH_DIRECTION_DATA'];

const MapActions = asyncActions.map(createAsyncHttpAction)
	.reduce((acc, cur) => ({
		...acc,
		...cur
	}), syncActions);

const extractFromDirectionData = data => {
	let route = data.routes[0];
	return {
		duration: route.legs[0].duration_in_traffic.text
	};
};
const fetchTrafficData = route => dispatch => {
	let {
		startAddress,
		endAddress
	} = route;
	let fromPlaceId = startAddress.placeId;
	let toPlaceId = endAddress.placeId;
	return trafficDuration(fromPlaceId, toPlaceId).then(data => ({
			...data,
			time: new Date(),
			routeId: route.id,
			id: createUUID()

		})).then(data => dispatch({
			type: 'FETCH_DIRECTION_DATA_SUCCESS',
			data
		}))
		.catch(e => console.log(e));


}

const addRoute = route => ({
	type: MapActions.ADD_ROUTE,
	route: {
		id: createUUID(),
		...route
	}
});
const deleteRoute = routeId => ({
	type: MapActions.DELETE_ROUTE,
	routeId
})

export {
	MapActions,
	fetchTrafficData,
	addRoute,
	deleteRoute
};