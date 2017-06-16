import React from 'react';
import {CardItem, Text, Icon, Right } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const LocationItem = ({icon, description}) => {

	return (
		<CardItem>
			<Ionicons active name={icon} size={30} />
			<Text>{description}</Text>
			<Right>
				<Icon name="arrow-forward" />
			</Right>
		</CardItem>
	)

}

LocationItem.propTypes = {
	icon: PropTypes.string,
	description: PropTypes.string
};

export default LocationItem;