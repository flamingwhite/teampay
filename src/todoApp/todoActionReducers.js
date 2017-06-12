import {convertArrayToMirrorAction, createReducer} from '../lib/simpleReduxTool';
import store from '../appConfig/reduxStore';
import { fireRef } from '../appConfig/firefish';

let TodoActions = convertArrayToMirrorAction([
	'ADD_TODO',
	'TOGGLE_TODO',
	'SET_VISIBILITY_FILTER',
	'SYNC_TODOS'
]);

console.log('TODOACTIOS',TodoActions);

let todoHandlers = {
	[TodoActions.ADD_TODO]: (state, action) => state.concat(action.todo),
	[TodoActions.TOGGLE_TODO]: (state, action) => state.map(todo => todo._id == action.todoId ? { ...todo, done: !todo.done } : todo),
	[TodoActions.SET_VISIBILITY_FILTER]: (state, action) => ({
		...state,
		visibilityFilter: action.filterKey
	}),
	[TodoActions.SYNC_TODOS]: (state, action) => ({
		...state,
		todos: action.todos
	})
};

let TodoReducer = createReducer(state = ({
	todos: [],
	visibilityFilter: 'ALL'
}), todoHandlers);

let todos = fireRef('todos/');
todos.arrayStream().subscribe(todos => store.dispatch({
	type: TodoActions.SYNC_TODOS,
	todos
}));

export {
	TodoActions,
	TodoReducer
};

