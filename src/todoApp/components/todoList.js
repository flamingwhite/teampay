import React, { Component } from 'react';
import { func } from 'prop-types';
import { Container, Content, List, ListItem, Text } from 'native-base';
import TodoItem from './todoItem';

const TodoList = ({ todos, toggleTodo }) => {
	return (
		<Container>
			<List>
				{todos.map(todo =>
					<TodoItem key={todo._id} todo={todo} toggleTodo={toggleTodo} />)}
			</List>
		</Container>
	);
}

TodoList.propTypes = {
	todos: func,
	toggleTodo: func
};

export default TodoList;