import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Input, Text, Button, Content, Left, Body, Right, Item, Icon, ListItem, Separator } from 'native-base';
import { StyleSheet, TextInput, View, LayoutAnimation, TouchableHighlight, Keyboard, ScrollView } from 'react-native';
import Rx from 'rxjs/Rx';
import { connect } from 'react-redux';
import { addAddressHistory } from '../addressApp/addressActionCreator';
import { recentAddressSelector } from '../addressApp/addressSelectors';
import { getCurrentLocation, placeAutocompleteSearch, googlePlaceDetail } from '../lib/googleAPIs';
import { clearAddressHistory } from '../addressApp/addressActionCreator';
import AddressList from '../addressApp/components/AddressList';
import navbarButton from '../decorators/navbarButton';


@navbarButton(null, {
	id: 'back',
	title: 'Back'
})
@connect(
	(state, props) => (({
		recentAddrs: recentAddressSelector(state, props)
	}))
)
class AddressPickScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			searchValue: props.initValue ? props.initValue.title : '',
			suggestions: [],
			address: props.initValue || null
		}

		console.log('AddressPickScreen props', props);
		let { onCancel, leftClick } = props;
		leftClick.subscribe(onCancel);

		

		this.select = this.select.bind(this);
		this.changeSearch = this.changeSearch.bind(this);
		this.addressStream = new Rx.Subject();
		this.searchStream = new Rx.Subject();


		this.searchStream
			.filter(search => search.length > 2)
			.debounceTime(500)
			.distinctUntilChanged()
			.flatMap(placeAutocompleteSearch)
			.subscribe(places => {
				console.log('suggsss', places);
				this.setState({
					suggestions: places
				});
				this.forceUpdate();
			})


	}
	// componentWillReceiveProps(props) {
	// 	let {initValue} = props;
	// 	console.log('the initvalue in receive', initValue);

	// 	if (initValue) {
	// 		this.setState({
	// 			address: initValue,
	// 			searchValue: initValue.title
	// 		})
	// 	}

	// }

	componentWillMount() {
		getCurrentLocation().then(currentLocation => {
			this.setState({
				currentLocation
			});
		})
	}

	async select(data) {
		let { onAddressSelect } = this.props;
		let detail = data;
		if (!detail.geocode) {
			detail = await googlePlaceDetail(data.placeId);
		}
		let newAddress = {
			...data,
			...detail
		}
		onAddressSelect(newAddress);
		this.setState({
			searchValue: newAddress.title
		})
		this.props.dispatch((addAddressHistory(newAddress)));
	}

	changeSearch(search) {
		this.setState({
			searchValue: search
		});
		if (search.length < 3) {
			this.setState({
				suggestions: []
			});
			return;
		}
		this.searchStream.next(search);
	}

	render() {

		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

		let {recentAddrs} = this.props;
		let { currentLocation, suggestions, searchValue} = this.state;
		let { select, cancel,  changeSearch} = this;


		return (
			<View>
				<View>
					<TextInput placeholder='Search' value={ searchValue } style={ { height: 40 } } onChangeText={ changeSearch }></TextInput>
				</View>
				<ScrollView keyboardShouldPersistTaps="always">
					{ currentLocation &&
						<Text>Current Location:
							{ currentLocation.title }
						</Text>
					}
					<AddressList list={ suggestions } onAddressPress={ select }></AddressList>
					<AddressList list={ recentAddrs } onAddressPress={ select } />
					<Button onPress={ cancel }>
						<Text>Cancel</Text>
					</Button>
					<Button danger onPress={ () => this.props.dispatch(clearAddressHistory()) }>
						<Text>Clear History</Text>
					</Button>
					<TextInput placeholder="abc" style={ { height: 40 } }></TextInput>
				</ScrollView>
			</View>
			);
	}

}


export default AddressPickScreen;