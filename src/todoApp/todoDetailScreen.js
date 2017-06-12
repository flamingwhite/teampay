import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, InputGroup, Input } from 'native-base';
// import {Alert} from 'react-native';
import { object, func } from 'prop-types';
import { removeTodo, updateTodo } from './todoService';
import { dissoc } from 'ramda';

@connect()
class TodoScreen extends Component {
	constructor(props) {
		super(props);
		this.remove = this.remove.bind(this);
		this.toggle = this.toggle.bind(this);
		this.update = this.update.bind(this);
		this.state = {
			...this.props.activeTodo
		};
	}

	remove() {
		let {activeTodo, navigator} = this.props;
		removeTodo(activeTodo._id);
		navigator.pop()
	}

	update() {
		let { activeTodo, navigator } = this.props;
		updateTodo(activeTodo._id, dissoc('_id', this.state)).then(() => {
			console.log('done upd');
			console.log(arguments);
			// Alert.alert('Alert Title', 'was updated');
			navigator.pop();
		})
	}

	toggle() {
		let { done } = this.state;
		this.setState({ done: !done });
	}

	render() {
		console.log('redner of detail screen');
		let {activeTodo, navigator} = this.props;
		let { _id } = activeTodo;
		let { text } = this.state;
		console.log('the _id toupdate', _id);

		return (
			<View>
				<Text>
					{ JSON.stringify(this.state) }
				</Text>
				<InputGroup borderType="underline">
					<Input value={text} onChangeText={ text => this.setState({ text }) }></Input>
				</InputGroup>
				<Button onPress={ () => navigator.pop({
                      	animated: true
                      }) }>
					<Text>Go back</Text>
				</Button>
				<Button onPress={ () => this.remove() } danger>
					<Text>Remove this Todo</Text>
				</Button>
				<Button onPress={ () => this.toggle() } success>
					<Text>Toggle this Todo</Text>
				</Button>
				<Button onPress={ () => this.update() } success>
					<Text>Update this Todo</Text>
				</Button>
			</View>
		)


	}

}


TodoScreen.propTypes = {
	activeTodo: object,
	navigator: object,
	updateTodo: func
}

export default TodoScreen;