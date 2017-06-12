import React, { Component } from 'react';
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

export default TodoList;