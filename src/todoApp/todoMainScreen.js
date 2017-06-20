import React, { Component } from 'react';
import { object, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import TodoInput from './components/TodoInput';
import { View,  Text,   Content, Footer } from 'native-base';
import { addTodo, toggleTodo } from './todoService';
import TodoListContainer from './components/TodoListContainer';
import FooterFilterLink from './components/TodoFilterTab';
import ScrollableTabView from 'react-native-scrollable-tab-view';
// import CameraTest from './components/CameraTest';

@connect( state => ({ todos: state.todoChunk.todos }))
class TodoApp extends Component {

	constructor(props) {
		super(props);
		this.onTodoClick = this.onTodoClick.bind(this);
	}

	onTodoClick(todo) {
		console.log(this.props)

		this.props.navigator.push({
			screen: 'todoDetailScreen',
			title: 'hello detail',
			passProps: { activeTodo: todo },
			animated: true
		});
	}


	render() {
		console.log('Render of TodoApp.index');
		let {todos} = this.props;
		return (
			<View style={ { flex: 1 } }>
				<ScrollableTabView>
					<Content tabLabel="hello">
						<TodoInput addTodo={ addTodo }></TodoInput>
						<TodoListContainer style={{ flex: 1 }} todos={todos} toggleTodo={toggleTodo} onTodoClick={this.onTodoClick}></TodoListContainer>
						<Text></Text>
					</Content>
					<Content tabLabel="World">
						<Text>World text</Text>
						{/*<CameraTest></CameraTest> */}
					</Content>
					<Content tabLabel="How">
					</Content>
				</ScrollableTabView>
				<Footer>
					<FooterFilterLink filterKey="ALL" text="All"></FooterFilterLink>
					<FooterFilterLink filterKey="DONE" text="Completed"></FooterFilterLink>
					<FooterFilterLink filterKey="UNDONE" text="UnCompleted"></FooterFilterLink>

				</Footer>
			</View>
			);
	}
}

TodoApp.propTypes = {
	todos: arrayOf(object),
	navigator: object
};

export default TodoApp;
