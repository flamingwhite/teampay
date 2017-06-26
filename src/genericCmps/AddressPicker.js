import React, { Component } from 'react';
import { Input, Text, Button, Content, Left, Body, Right, Item, Icon } from 'native-base';
import { StyleSheet, View, LayoutAnimation, TouchableHighlight } from 'react-native';
import GooglePlaceInput from './GooglePlaceInput';
import Modal from 'react-native-modalbox';
import EvIcon from 'react-native-vector-icons/EvilIcons';

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

class AddressPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullMode: false
		}
		this.toggleFullMode = this.toggleFullMode.bind(this);
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.onAddressSelect = this.onAddressSelect.bind(this);
	}

	toggleFullMode(mode) {
		this.setState({
			fullMode: mode
		});
	}

	showModal() {
		this.toggleFullMode(true);
	}
	hideModal() {
		this.toggleFullMode(false);
	}
	onAddressSelect() {

	}



	render() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		const {fullMode} = this.state;
		const { showModal, hideModal } = this;
		return (
			<View>
				<Input placeholder="ABC" onFocus={showModal}></Input>
				<Input placeholder="DDD"></Input>
				<Modal isOpens={fullMode} style={{ backgroundColor: 'white', justifyContent: 'flex-start' }}>
					<View>
						<Item>
							<TouchableHighlight onPress={hideModal} style={{paddingLeft:10}}>
								<Icon name="arrow-back" fontSize={ 35 }></Icon>
							</TouchableHighlight>
						</Item>
					</View>
				</Modal>
			</View>

			);
	}
}



export default AddressPicker;