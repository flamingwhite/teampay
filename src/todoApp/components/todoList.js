import React  from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Container,  List } from 'native-base';
import TodoItem from './todoItem';

const TodoList = ({ todos, toggleTodo, onTodoClick }) => {
	return (
		<Container>
			<List>
				{todos.map(todo =>
					<TodoItem key={todo._id} todo={todo} toggleTodo={toggleTodo} onTodoClick={onTodoClick}/>)}
			</List>
		</Container>
	);
}

TodoList.propTypes = {
	todos: arrayOf(object),
	toggleTodo: func,
	onTodoClick: func
};

export default TodoList;