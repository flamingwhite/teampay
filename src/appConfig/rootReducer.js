import { TodoReducer } from '../todoApp/todoActionReducers';
import { combineReducers } from 'redux';

let rootReducer = combineReducers({
	todos: TodoReducer
});


export default rootReducer;