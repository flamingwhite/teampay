import {convertArrayToMirrorAction, createReducer} from '../lib/simpleReduxTool';
import store from '../appConfig/reduxStore';
import { fireRef } from '../appConfig/firefish';

let TodoActions = convertArrayToMirrorAction([
	'ADD_TODO',
	'TOGGLE_TODO',
	'SYNC_TODOS'
]);

console.log('TODOACTIOS',TodoActions);

let todoHandlers = {
	[TodoActions.ADD_TODO]: (state, action) => state.concat(action.todo),
	[TodoActions.TOGGLE_TODO]: (state, action) => state.map(todo => todo._id == action.todoId ? { ...todo, done: !todo.done } : todo),
	[TodoActions.SYNC_TODOS]: (state, action) => action.todos
};

let TodoReducer = createReducer(state = [{
	_id: 1001,
	title: 'Go Wash the clothes',
	done: false
}], todoHandlers);

let todos = fireRef('todos/');
todos.arrayStream().subscribe(todos => store.dispatch({
	type: TodoActions.SYNC_TODOS,
	todos
}));

export {
	TodoActions,
	TodoReducer
};

