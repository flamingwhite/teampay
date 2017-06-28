import React, { Component } from 'react';
import { Input, Text, Button, Content, Left, Body, Right, Item, Icon } from 'native-base';
import { StyleSheet, View, LayoutAnimation, TouchableHighlight } from 'react-native';
import GooglePlaceInput from './GooglePlaceInput';
import addressPickerDecorator from '../decorators/addressPickerDecorator';

const styles = StyleSheet.create({
	full: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		height: '100%',
		backgroundColor: 'yellow'
	},
	normal: {
		backgroundColor: 'lightgray'
	},
	absoluteInput: {
		height: 30,
	}


});

@addressPickerDecorator()
class AddressPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'DDD',
		}

		let { initValue } = props;

		let { addressStream, onAddressSelect } = this.props;
		this.state = {
			address: initValue,
			text: initValue? initValue.title: ''
		}

		this.props.addressStream.subscribe(d => {
			this.setState({
				address: d,
				text: d.title
			})
			console.log('from address stream', d)
			onAddressSelect(d);
		});
	}


	render() {
		let { openPicker } = this.props;
		let { text } = this.state;
		return (
			<Input value={text} placeholder="ABC" onFocus={openPicker}></Input>
		);
	}

}



export default AddressPicker;