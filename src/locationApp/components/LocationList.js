import React from 'react';
import PropTypes from 'prop-types';
import {  List } from 'native-base';
import LocationItem from './LocationItem';

const LocationList = props => {
	let { locations, onLocationPress, ...rest } = props;
	return (
		<List {...rest}>
			{locations.map(loc => <LocationItem key={loc.id} onLocationPress={() => onLocationPress(loc)} {...loc} />) }
		</List>
	);
}

LocationList.propTypes = {
	locations: PropTypes.array,
	onLocationPress: PropTypes.func
};


export default LocationList;