import {
	createReducer
} from '../lib/simpleReduxTool';
import {
	MapActions
} from './mapActionCreators';

import R from 'ramda';


const mapHandlers = {
	[MapActions.ADD_ROUTE]: (state, {
		route
	}) => R.over(
		R.lensProp('routes'),
		R.append(route),
		state
	),

	[MapActions.FETCH_DURATION_SUCCESS]: (state, {
		data
	}) => R.over(
		R.lensPath(['trafficData', data.routeId]),
		R.append(data),
		state
	),

	[MapActions.DELETE_ROUTE]: (state, {
		routeId
	}) => R.over(
		R.lensProp('routes'),
		R.filter(r => r.id !== routeId),
		state
	),

	[MapActions.CLEAR_TRAFFIC_DATA]: (state, {
		routeId
	}) => R.over(
		R.lensProp('trafficData'),
		R.dissoc(routeId),
		state
	)
};

const MapReducer = createReducer(mapHandlers, {
	routes: [],
	trafficData: {}
});



export default MapReducer;