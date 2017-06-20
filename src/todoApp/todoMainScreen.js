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




var PushNotification = require('react-native-push-notification');

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});


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
