import React, { Component } from 'react';
import {View, LayoutAnimation, TouchableHighlight, ScrollView } from 'react-native';
import {Item, Input, Icon} from 'native-base';
import Rx from 'rxjs/Rx';
import { connect } from 'react-redux';
import { addAddressHistory } from './addressActionCreator';
import { recentAddressSelector } from './addressSelectors';
import { getCurrentLocation, placeAutocompleteSearch, googlePlaceDetail } from './googleAPIs';
import AddressList from './components/AddressList';
import MapView from 'react-native-maps';
import {getIcon} from '../icons';
import {shortTitleFromAddressParts} from './googleAPIs/addressUtil';

const styles = {
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	searchItem: {
		borderBottomWidth: 0	
	},
	searchInput: {
		height: 38,
		fontSize: 14,
		borderBottomWidth:0
	}
};

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
			searchValue: props.initValue ? shortTitleFromAddressParts(props.initValue.parts) : '',
			suggestions: [],
			address: props.initValue || null
		}

		console.log('AddressPickScreen props', props);
		let { onCancel } = props;

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
		const { currentLocation } = this.state;
		// if (!loc) {
		// 	loc = this.state.currentLocation;		
		// }
		if (!loc && !currentLocation) {
			return <View/>
		}

		const markers = [loc, currentLocation&&{
			...currentLocation,
			icon: getIcon('ios-home')
		}].filter(l => l);


		const renderMarker = (addr, icon) => addr&&<MapView.Marker
			coordinate={addr.geocode}
			image={icon}
		/>
		const { geocode } = loc;
		const fit = () => this.mapRef.fitToCoordinates(markers.map(l => l.geocode), {
			edgePadding: {
				top: 40,
				bottom: 40,
				left: 40,
				right: 40
			}, animated: false
		}, )
		return (
			<MapView
				ref={r => this.mapRef = r}
				onLayout={fit}
				style={styles.map}
				style={{ height: 200 }}
				region={{ ...geocode, latitudeDelta: 0.3, longitudeDelta: 0.3 }}
				>
				{
					markers.map(m => renderMarker(m, m.icon))
				}

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
					<Item style={styles.searchItem}>
						<Input placeholder="Search" value={searchValue} onChangeText={changeSearch} style={styles.searchInput}></Input>
						<TouchableHighlight onPress={() => changeSearch('')}>
							<Icon name="ios-close" active></Icon>
						</TouchableHighlight>
					</Item>
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
					<AddressList icon="time" list={ recentAddrs } onAddressPress={ select } />
					{renderMap()}
				</ScrollView>
			</View>
		);
	}

}


export default AddressPickScreen;