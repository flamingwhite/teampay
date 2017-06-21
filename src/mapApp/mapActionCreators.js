import {
	convertArrayToMirrorAction,
	createAsyncHttpAction,
	httpActionDispatcher
} from '../lib/simpleReduxTool';
import createUUID from '../lib/uuidTool';
import {
	get
} from '../lib/httpTool';

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



const createDirectionAPIUrl = (placeOne, placeTwo) => `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${placeOne}&destination=place_id:${placeTwo}&key=AIzaSyAJAmwOGIGRlWliaI2YbW53FwvHerVfIaE&departure_time=now`;

const fetchDirection = (placeOne, placeTwo) => dispatch => httpActionDispatcher({
	dispatch,
	actionName: 'FETCH_DIRECTION_DATA',
	url: createDirectionAPIUrl(placeOne, placeTwo),
});

const fetchDirectionData = routeConfig => dispatch => {

	let {
		fromLocation,
		toLocation
	} = routeConfig;
	let fromPlaceId = fromLocation.place_id;
	let toPlaceId = toLocation.place_id;

	return fetchDirection(fromPlaceId, toPlaceId);
}


const extractFromDirectionData = data => {
	let route = data.routes[0];
	return {
		duration: route.legs[0].duration_in_traffic.text
	};
};
const fetchTrafficData = route => dispatch => {
	let {
		fromLocation,
		toLocation
	} = route;
	let fromPlaceId = fromLocation.googlePlaceId;
	let toPlaceId = toLocation.googlePlaceId;
	let url = createDirectionAPIUrl(fromPlaceId, toPlaceId);
	return get(url).then(data => {
			return extractFromDirectionData(data)
		}).then(data => ({
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