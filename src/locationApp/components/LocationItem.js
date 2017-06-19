import React from 'react';
import { ListItem, Text, Icon, Right } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const LocationItem = (props) => {
	const {icon, alias, meta: {description}, onLocationPress, ...rest} = props;
	return (
		<ListItem onPress={ onLocationPress } {...rest}>
			<Ionicons active name={ 'ios-' + icon } size={ 30 } />
			<Text>
				{ alias },
				{ description }
			</Text>
			<Right>
				<Icon name="arrow-forward" />
			</Right>
		</ListItem>
	)

}

LocationItem.propTypes = {
	id: PropTypes.string,
	onLocationPress: PropTypes.func,
	icon: PropTypes.string,
	alias: PropTypes.string,
	description: PropTypes.string,
	meta: PropTypes.object
};

export default LocationItem;