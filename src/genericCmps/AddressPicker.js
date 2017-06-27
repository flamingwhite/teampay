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
			data: 'DDD'
		}

		let { addressStream, onAddressSelect } = this.props;

		this.props.addressStream.subscribe(d => {
			this.setState({data: d})
			console.log('from address stream', d)
			onAddressSelect(d);
		});
	}


	render() {
		let { openPicker } = this.props;
		let { data } = this.state;
		return (
			<Input value={data} placeholder="ABC" onFocus={openPicker}></Input>
		);
	}

}



export default AddressPicker;