import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Input, Text, Button, Content, Left, Body, Right, Item, Icon } from 'native-base';
import { StyleSheet, View, LayoutAnimation, TouchableHighlight } from 'react-native';
import Rx from 'rxjs/Rx';
import {connect} from 'react-redux';
import GooglePlaceInput from '../genericCmps/GooglePlaceInput';
import {addAddressHistory} from '../addressApp/addressActionCreator';
import {recentAddressSelector} from '../addressApp/addressSelectors';
import {getCurrentLocation} from '../lib/googleAPIs';

const addressPickerDecorator = config => InnerCmp => {



	@connect(
		state => (({
			recentAddrs: recentAddressSelector(state)
		}))
	)
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
		componentWillMount() {
			getCurrentLocation().then(currentLocation => {
				this.setState({
					currentLocation
				});
			})
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
			let { addressStream,  close } = this;
			addressStream.next(data);
			this.props.dispatch((addAddressHistory(data)));
			close();
		}
		cancel() {
			this.close();
		}

		render() {
			let { recentAddrs } = this.props;
			let {isOpen, currentLocation} = this.state;
			let {close, openPicker, select, cancel, addressStream} = this;
			return (
				<View>
					<InnerCmp {...this.props} openPicker={ openPicker } addressStream={ addressStream }></InnerCmp>
					<Modal isVisible={ isOpen } style={ { backgroundColor: 'white', justifyContent: 'flex-start' } }>
						<View>
							<TouchableHighlight onPress={ close } style={ { paddingLeft: 10 } }>
								<Icon name="arrow-back" fontSize={ 35 }></Icon>
							</TouchableHighlight>
							{
								currentLocation &&
								<Text>Current Location: {currentLocation.title}</Text>
							}
							{
								recentAddrs.map(addr => <Text>{addr}</Text>)
							}
							<Button onPress={ () => select('i am selected'+ new Date().toString()) }>
								<Text>Waht is that</Text>
							</Button>
							<Button onPress={cancel}>
								<Text>Cancel</Text>
							</Button>
							<GooglePlaceInput></GooglePlaceInput>
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