import React from 'react';
import { Text, Button, ListItem, Left, Body, Right, Icon } from 'native-base';
import {object, func} from 'prop-types'

const TodoItem = ({todo, toggleTodo, onTodoClick}) => {
	console.log('item ', todo)
	return (
		<ListItem icon onPress={evt => onTodoClick((todo))}>
			<Left>
				<Icon name="bluetooth" />
			</Left>
			<Body>
				<Text>
					{ todo.text } =>
					{ String(todo.done) }
				</Text>
			</Body>
			<Right>
				<Icon name="arrow-forward" />
			</Right>
		</ListItem>
	)
}

TodoItem.propTypes = {
	todo: object,
	toggleTodo: func,
	onTodoClick: func
}

export default TodoItem;
// <Button onPress={evt => toggleTodo(todo)}>
// 	<Text>
// 		{ todo.text } ==>
// 		{ String(todo.done) }
// 	</Text>
// </Button>