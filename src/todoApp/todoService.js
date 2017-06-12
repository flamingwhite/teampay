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
	let newContent = {
		...todo,
		done: !todo.done
	};

	console.log('toggle todo ', JSON.stringify(todo));

	TodoRef.updateById(todo._id, { done: !todo.done });
}

export {
	TodoRef,
	addTodo,
	toggleTodo
};