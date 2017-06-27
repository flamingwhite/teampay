import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Input, Text, Button, Content, Left, Body, Right, Item, Icon } from 'native-base';
import { StyleSheet,TextInput, View, LayoutAnimation, TouchableHighlight } from 'react-native';
import Rx from 'rxjs/Rx';
import {connect} from 'react-redux';
import GooglePlaceInput from '../genericCmps/GooglePlaceInput';
import {addAddressHistory} from '../addressApp/addressActionCreator';
import {recentAddressSelector} from '../addressApp/addressSelectors';
import {getCurrentLocation, placeAutocompleteSearch} from '../lib/googleAPIs';

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
				isOpen: false,
				searchValue: '',
				suggestions: []
			}

			this.openPicker = this.openPicker.bind(this);
			this.close = this.close.bind(this);
			this.select = this.select.bind(this);
			this.cancel = this.cancel.bind(this);
			this.changeSearch = this.changeSearch.bind(this);
			
			this.addressStream = new Rx.Subject();
			this.searchStream = new Rx.Subject();

			this.searchStream
				.filter(search => search.length > 2)
				.debounceTime(2000)
				.distinctUntilChanged()
				.flatMap(placeAutocompleteSearch)
				.subscribe(places => {
					console.log('suggsss', places);
					this.setState({
						suggestions: places
					})
				})


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
				isOpen: true,
			});
		}

		close() {
			this.setState({
				isOpen: false,
				suggestions: [],
				searchValue: ''
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

		changeSearch(search) {
			this.setState({ searchValue: search });
			this.searchStream.next(search);
		}

		render() {
			let { recentAddrs } = this.props;
			let {isOpen, currentLocation, suggestions, searchValue} = this.state;
			let {close, openPicker, select, cancel, addressStream, changeSearch} = this;
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
								suggestions.map(s => <Text>{JSON.stringify(s)}</Text>)
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
							<TextInput placeholder='Search' value={searchValue} style={{ height: 120, paddingTop: 50 }} onChangeText={changeSearch}></TextInput>
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