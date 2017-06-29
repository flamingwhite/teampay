import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, TextInput, View, LayoutAnimation, TouchableHighlight, Keyboard, ScrollView } from 'react-native';
import Rx from 'rxjs/Rx';
import { connect } from 'react-redux';
import { addAddressHistory } from '../addressApp/addressActionCreator';
import { recentAddressSelector } from '../addressApp/addressSelectors';
import { getCurrentLocation, placeAutocompleteSearch, googlePlaceDetail } from '../lib/googleAPIs';
import AddressList from '../addressApp/components/AddressList';
import navbarButton from '../decorators/navbarButton';
import MapView from 'react-native-maps';
import {getIcon} from '../icons';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

const getSearchInput = parts => {
	let { number = '', street = '', city, state } = parts;
	if (street) return `${number} ${street}`;
	return `${city}, ${state}`
}

@navbarButton({
	leftButtons: [{
		id: 'back',
		get icon() {
			return getIcon('ios-arrow-back')
		}
	}]
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
			searchValue: props.initValue ? getSearchInput(props.initValue.parts) : '',
			suggestions: [],
			address: props.initValue || null
		}

		console.log('AddressPickScreen props', props);
		let { onCancel, navButtonClick } = props;
		navButtonClick('back').subscribe(onCancel);

		this.select = this.select.bind(this);
		this.changeSearch = this.changeSearch.bind(this);
		this.addressStream = new Rx.Subject();
		this.searchStream = new Rx.Subject();
		this.renderMap = this.renderMap.bind(this);
		

		this.currentLocationPromise = getCurrentLocation();
		this.currentLocationPromise.then(currentLocation =>
			this.setState({
				currentLocation
			}));


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
			});


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

	renderMap() {
		let loc = this.props.initValue
		if (!loc) {
			loc = this.state.currentLocation;		
		}
		if (!loc) {
			return <Text/>
		}
		let { geocode } = loc;
		return (
			<MapView style={styles.map} style={{ height: 200 }} region={{...geocode, latitudeDelta: 0.3, longitudeDelta: 0.3}}>
				<MapView.Marker
					title={loc.title}
					coordinate={geocode}
				/>
			</MapView>
		);
		
	}

	render() {

		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

		let {recentAddrs} = this.props;
		let { currentLocation, suggestions, searchValue} = this.state;
		let { select, changeSearch, renderMap} = this;


		return (
			<View>
				<View>
					<TextInput placeholder='Search' value={ searchValue } style={ { height: 40 } } onChangeText={ changeSearch }></TextInput>
				</View>
				<ScrollView keyboardShouldPersistTaps="always">
					<AddressList list={ suggestions } onAddressPress={ select } />
					{
						currentLocation &&
						<AddressList
							icon='locate'
							list={[currentLocation]}
							onAddressPress={select}
						/>
					}
					<AddressList list={ recentAddrs } onAddressPress={ select } />
					{renderMap()}
				</ScrollView>
			</View>
		);
	}

}


export default AddressPickScreen;