import { TodoReducer } from '../todoApp/todoActionReducers';
import { combineReducers } from 'redux';
import MapReducer from '../mapApp/mapReducers';
import LocationReducer from '../locationApp/locationReducers';
import { reducer } from 'redux-form';
import AppStateReducer from '../appState/appStateReducer';




const combined = combineReducers({
	appStateChunk: AppStateReducer,
	todoChunk: TodoReducer,
	mapChunk: MapReducer,
	locationChunk: LocationReducer,
	form: reducer
});


const rootReducer = (state = {}, action) => {
	let newState = combined(state, action);
	return newState;
}

export default rootReducer;