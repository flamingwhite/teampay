import React from 'react';
import PropTypes from 'prop-types';
import {  List } from 'native-base';
import LocationItem from './LocationItem';
import Swipeout from 'react-native-swipeout';

const LocationList = props => {
	const { locations, onLocationPress, ...rest } = props;
	const leftBtns = [{
		text: 'Left'
	}]
	const rightBtns = [{
		text: 'Edit'
	}, {
		text: 'Delete'	
	}]

	const renderSwipe = loc => (
		<Swipeout left={leftBtns} right={rightBtns}>
			<LocationItem key={loc.id} onLocationPress={() => onLocationPress(loc)} {...loc} />
		</Swipeout>
	)

	return (
		<List {...rest}>
			{locations.map(renderSwipe) }
		</List>
	);
}

LocationList.propTypes = {
	locations: PropTypes.array,
	onLocationPress: PropTypes.func
};


export default LocationList;