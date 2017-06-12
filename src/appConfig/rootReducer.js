import { TodoReducer } from '../todoApp/todoActionReducers';
import { combineReducers } from 'redux';

let rootReducer = combineReducers({
	todoChunk: TodoReducer
});


export default rootReducer;