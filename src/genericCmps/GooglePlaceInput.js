import React, { Component } from 'react';
import { Container, Text, Content, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { googlePlaceDetail } from '../lib/googleAPIs';

const GooglePlaceInput = props => {
	const { onSelect, defaultLocations, defaultValue='', ...rest } = props;

	console.log('input, ', props);

	const onUserPick = async data => {

		let { place_id: placeId, description } = data;
		let detail = await googlePlaceDetail(placeId);
		// let { formatted_address: title } = detail;
		// let { location } = detail.geometry;
		// let geocode = {
		// 	latitude: location.lat,
		// 	longitude: location.lng
		// };

		console.log('detail is ', detail);
		onSelect(detail);

	}

	return (
		<GooglePlacesAutocomplete
			placeholder='Search'
			minLength={2} // minimum length of text to search
			autoFocus={false}
			query={{
				language: 'en', // language of the results
				key: 'AIzaSyAg3pFdbpVP6hTSrZ5ZWAczWCfy6eOc1zQ',
				types: 'address'
				// types: '(cities)', // default: 'geocode'
			}}
			onPress={onUserPick}
			getDefaultValue={() => defaultValue}
			predefinedPlaces={defaultLocations}
			debounce={200}
			styles={{
				textInputContainer: {
				backgroundColor: 'rgba(0,0,0,0)',
				borderTopWidth: 0,
				borderBottomWidth:0
			},
			textInput: {
				marginLeft: 0,
				marginRight: 0,
				height: 38,
				color: '#5d5d5d',
				fontSize: 16
			},
			predefinedPlacesDescription: {
				color: '#1faadb'
			},
			}}
			{...rest}

		/>
	);

}



export default GooglePlaceInput;