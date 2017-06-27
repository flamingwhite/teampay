import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Input, Text, Button, Content, Left, Body, Right, Item, Icon } from 'native-base';
import { StyleSheet, View, LayoutAnimation, TouchableHighlight } from 'react-native';
import Rx from 'rxjs/Rx';

const addressPickerDecorator = config => InnerCmp => {


	class Wrapper extends Component {
		constructor(props) {
			super(props);
			this.state = {
				isOpen: false
			}

			this.openPicker = this.openPicker.bind(this);
			this.close = this.close.bind(this);
			this.select = this.select.bind(this);
			this.cancel = this.cancel.bind(this);
			this.addressStream = new Rx.Subject();
		}

		openPicker() {
			this.setState({
				isOpen: true
			});
		}

		close() {
			this.setState({
				isOpen: false
			});
		}

		select(data) {
			this.addressStream.next(data);
			this.close();
		}
		cancel() {
			this.close();
		}

		render() {
			let {isOpen} = this.state;
			let {close, openPicker, select, cancel, addressStream} = this;
			return (
				<View>
					<InnerCmp {...this.props} openPicker={ openPicker } addressStream={ addressStream }></InnerCmp>
					<Modal isVisible={ isOpen } style={ { backgroundColor: 'white', justifyContent: 'flex-start' } }>
						<View>
							<TouchableHighlight onPress={ close } style={ { paddingLeft: 10 } }>
								<Icon name="arrow-back" fontSize={ 35 }></Icon>
							</TouchableHighlight>
							<Button onPress={ () => select('i am selected'+ new Date().toString()) }>
								<Text>Waht is that</Text>
							</Button>
							<Button onPress={cancel}>
								<Text>Cancel</Text>
							</Button>
						</View>
					</Modal>
				</View>
				);
		}

	}

	Wrapper.propTypes = {
		navigator: PropTypes.object
	};

	return Wrapper;
}

export default addressPickerDecorator;