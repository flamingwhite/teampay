import { createReducer} from '../lib/simpleReduxTool';
import { MapActions } from './mapActionCreators';


const extractFromDirectionData = data => {
	let route = data.routes[0];
	return {
		time: route.legs[0].duration_in_traffic.text
	};
};

const mapHandlers = {
	[MapActions.ADD_ROUTE]: (state, action) => ({
		...state,
		routes: state.routes.concat(action.route)
	}),
	[MapActions.FETCH_DIRECTION_DATA_SUCCESS]: (state, action) => {
		const data = action.data;
		return {
			...state,
			trafficData: {
				...state.trafficData,
				[data.routeId]: (state.trafficData[data.routeId] || []).concat(data)
			}
		};
	},
	[MapActions.DELETE_ROUTE]: (state, { routeId }) => ({
		...state,
		routes: state.routes.filter(r => r.id !== routeId)
	})
};

const MapReducer = createReducer(mapHandlers, {
	routes: [],
	trafficData: {}
});



export default MapReducer;

