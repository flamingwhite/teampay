import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TodoInput from './components/todoInput';
import { Container, Button, Text, Header, Title, Content, Left, Right, Body, Icon } from 'native-base';
import { addTodo, toggleTodo } from './todoService';
import TodoList from './components/todoList';
import AppHeader from '../layout/appHeader';
import AppFooter from '../layout/appFooter';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

class TodoApp extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log('Render of TodoApp.index');
		let {todos} = this.props;
		return (
			<Container style={ { flex: 1 } }>
				<AppHeader></AppHeader>
				<Content>
					<TodoInput addTodo={ addTodo }></TodoInput>
					<TodoList style={ { flex: 1 } } todos={ todos } toggleTodo={ toggleTodo }></TodoList>
					<Text></Text>
				</Content>
				<AppFooter style={ { flex: 1,maxHeight:30 } }></AppFooter>
			</Container>
			);
	}
}

export default connect(state => ({
	todos: state.todos
}))(TodoApp);
