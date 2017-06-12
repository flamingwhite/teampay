import React from 'react';
import { Text, Button, ListItem, Left, Body, Right, Icon } from 'native-base';

const TodoItem = ({todo, toggleTodo}) => {
	console.log('item ', todo)
	return (
		<ListItem icon onPress={evt => toggleTodo((todo))}>
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

export default TodoItem;
// <Button onPress={evt => toggleTodo(todo)}>
// 	<Text>
// 		{ todo.text } ==>
// 		{ String(todo.done) }
// 	</Text>
// </Button>