import React, { Component } from 'react';
import { func } from 'prop-types';

import {  View} from 'react-native';
import { Button, Text , InputGroup, Input} from 'native-base';


class TodoInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
		this.buttonPress = this.buttonPress.bind(this);
	}

	buttonPress() {
		let text = this.state.text;
		console.log('addint todo in input', text);
		this.props.addTodo(text);
		this.setState({ text: '' });
	}
	render() {
		console.log('hello world this is todo Input box');
		return (
			<View>
				<InputGroup borderType="underline">
					<Input placeholder="New Todo" value={this.state.text} onChangeText={text => this.setState({ text })}></Input>
				</InputGroup>

				<Button primary block outline bordered small onPress={this.buttonPress}><Text>AddTodo</Text></Button>
			</View>
			);
	}
}

TodoInput.propTypes = {
	addTodo: func
};

export default TodoInput;
