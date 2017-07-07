import {
	createReducer
} from '../lib/simpleReduxTool';
import {
	MapActions
} from './mapActionCreators';

import R from 'ramda';

const addTrafficLens = data => R.over(
	R.lensPath(['trafficData', data.routeId]),
	R.pipe(
		R.defaultTo([]),
		R.append(data)
	)
);


const mapHandlers = {
	[MapActions.ADD_ROUTE]: (state, action) => ({
		...state,
		routes: state.routes.concat(action.route)
	}),
	[MapActions.FETCH_DIRECTION_DATA_SUCCESS]: (state, {data}) => addTrafficLens(data)(state),
	[MapActions.DELETE_ROUTE]: (state, {
		routeId
	}) => ({
		...state,
		routes: state.routes.filter(r => r.id !== routeId)
	})
};

const MapReducer = createReducer(mapHandlers, {
	routes: [],
	trafficData: {}
});



export default MapReducer;