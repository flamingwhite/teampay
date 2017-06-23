import React, { Component } from 'react';
import { Input,Text, Button,Content, Left, Body,Right, Item, Icon } from 'native-base';
import {StyleSheet, View, LayoutAnimation} from 'react-native';
import Modal from 'react-native-modal';

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
		backgroundColor:'lightgray'
	},
	absoluteInput: {
		height: 30,
	}


});

class AddressPicker extends Component{
	constructor(props) {
		super(props);
		this.state = {
			fullMode: false
		}
		this.toggleFullMode = this.toggleFullMode.bind(this);
		
	}
	toggleFullMode(mode) {
		const { onFullMode, onNormalMode} = this.props;
		console.log('toggle to ', mode);
		this.setState({ fullMode: mode});
		if (mode) onFullMode();
		else onNormalMode();

	}

	render() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		const { fullMode } = this.state;
		return(
			<View style={fullMode? styles.full: styles.normal}>
				<Input placeholder="ABC" onFocus={() => this.toggleFullMode(true)} ></Input>
				<Input placeholder="DDD"></Input>
				<Modal isVisible={this.state.fullMode} style={{ backgroundColor: 'white', justifyContent:'flex-start'}}>
					<View style={{height:70}}>
						<Item>
							<Icon active name="home"></Icon>
							<Input  placeholder="Address"></Input>
						</Item>					
					</View>
						<Content>
						<Button onPress={() => this.toggleFullMode(false)}><Text>Back</Text></Button>
						<Button><Text>Hello</Text></Button>
					</Content>
				</Modal>
			</View>
			
		);
	}
}



export default AddressPicker;