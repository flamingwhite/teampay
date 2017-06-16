import React, { Component } from 'react';
import { Container, Text, Content } from 'native-base';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const GooglePlaceInput = props => {
	const { onSelect, defaultLocations, ...rest } = props;

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
			onPress={onSelect}
			getDefaultValue={() => ''}
			predefinedPlaces={defaultLocations}
			debounce={200}
			renderRightButton={() => <Text>Right></Text>}
			{...rest}

		/>
	);

}



export default GooglePlaceInput;