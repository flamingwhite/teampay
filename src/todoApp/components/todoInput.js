import React, { Component } from 'react';

import { TextInput, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text } from 'native-base';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	todoInput: {
		height: 40,
		borderColor: 'black',
		borderWidth: 2
	}
});

@connect()
export default class TodoInput extends Component {
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
				<TextInput style={styles.todoInput} value={this.state.text} onChangeText={text => this.setState({ text })} />
				<Button primary block outline bordered small onPress={this.buttonPress}><Text>AddTodo</Text></Button>
			</View>
			);
	}
}
;

