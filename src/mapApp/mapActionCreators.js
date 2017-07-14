import {
	convertArrayToMirrorAction,
	createActionsForAsync
} from '../lib/simpleReduxTool';
import createUUID from '../lib/uuidTool';

export const MapActions = convertArrayToMirrorAction([
	'ADD_ROUTE',
	'DELETE_ROUTE',
	'CLEAR_TRAFFIC_DATA',
	...createActionsForAsync('FETCH_DURATION')
]);

export const clearTrafficData = routeId => ({
	type: MapActions.CLEAR_TRAFFIC_DATA,
	routeId
});

export const fetchDurationFulfilled = data => ({
	type: MapActions.FETCH_DURATION_FULFILLED,
	data
});

export const fetchDurationRejected = err => ({
	type: MapActions.FETCH_DURATION_REJECTED,
	err
})

export const addRoute = route => ({
	type: MapActions.ADD_ROUTE,
	route: {
		id: createUUID(),
		...route
	}
});

export const deleteRoute = routeId => ({
	type: MapActions.DELETE_ROUTE,
	routeId
});
