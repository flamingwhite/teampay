import { TodoReducer } from '../todoApp/todoActionReducers';
import { combineReducers } from 'redux';
import MapReducer from '../mapApp/mapReducers';
import LocationReducer from '../locationApp/locationReducers';
import { reducer } from 'redux-form';

let combined = combineReducers({
	todoChunk: TodoReducer,
	mapChunk: MapReducer,
	locationChunk: LocationReducer,
	form: reducer
});

const rootReducer = (state = {}, action) => {
	let newState = combined(state, action);
	if (action.type == 'ASYNC_STORE') {
		newState = action.store
	}
	return newState;
}

export default rootReducer;