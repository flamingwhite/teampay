import React, { Component } from 'react';
import { Container, Text, Content } from 'native-base';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { googlePlaceDetail } from '../lib/googleAPIs';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const GooglePlaceInput = props => {
	const { onSelect, defaultLocations, defaultValue='', ...rest } = props;

	console.log('input, ', props);

	const onUserPick = data => {
		let { place_id: placeId } = data;
		return googlePlaceDetail(placeId).then(detail => {
			console.log('detail', detail);
			onSelect({
				...data,
				...detail,
				latlng: {
					latitude:detail.geometry.location.lat,
					longitude: detail.geometry.location.lng
				}
			})
		})
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
			renderRightButton={() => <Text>Right></Text>}
			{...rest}

		/>
	);

}



export default GooglePlaceInput;