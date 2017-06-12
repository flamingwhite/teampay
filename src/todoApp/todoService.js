import {
	fireRef
} from '../appConfig/firefish';


let TodoRef = fireRef('todos/');

let addTodo = text => {
	console.log('add new todo service', text);
	TodoRef.push({
		text,
		done: false
	});
}

let toggleTodo = todo => {
	console.log('toggle todo ', JSON.stringify(todo));
	TodoRef.updateById(todo._id, { done: !todo.done });
}

let removeTodo = todoId => TodoRef.removeById(todoId);

let updateTodo = (_id, patch) => TodoRef.updateById(_id, patch);

export {
	TodoRef,
	addTodo,
	toggleTodo,
	removeTodo,
	updateTodo
};