import { LocationActions } from './locationActionCreators';
import { createReducer } from '../lib/simpleReduxTool';


const locationHandler = {
	[LocationActions.ADD_LOCATION]: (state, action) => ({
		...state,
		locations: state.locations.concat(action.location)
	}),
	[LocationActions.UPDATE_LOCATION]: (state, action) => ({
		...state,
		locations: state.locations.map(loc => loc.id == action.id ? ({
			...loc,
			...action.location
		}) : loc)
	}),

	[LocationActions.DELETE_LOCATION]: (state, { id }) => ({
		...state,
		locations: state.locations.map(loc => loc.id == id ? {
			...loc,
			deleted: true
		}: loc)
	})
};

const LocationReducer = createReducer(locationHandler, {
	locations: []
});


export default LocationReducer;

