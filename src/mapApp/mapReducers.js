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
		const timeObj = extractFromDirectionData(action.data);
		return {
			...state,
			...timeObj
		};
	}
};

const MapReducer = createReducer(mapHandlers, {
	routes: []
});



export default MapReducer;

