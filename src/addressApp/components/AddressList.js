import React from 'react';
// import { Card, List, ListItem } from 'react-native-elements';
import { Card, CardItem, Icon, Text, Body } from 'native-base';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';

const styles = {
	street: {
		fontSize: 13
	},
	state: {
		color: 'gray',
		fontSize: 12
	}

};

const lines = parts => {
	let { number = '', street = '', city, state } = parts;
	let firstLine, secondLine;
	if (street) {
		firstLine = `${number} ${street}`;
		secondLine = `${city}, ${state}`;
	} else {
		firstLine = city;
		secondLine = state;
	}
	return {
		firstLine,
		secondLine
	};
}

const AddressList = props => {
	const {list = [], icon='pin', onAddressPress} = props;

	const renderRow = item => {
		let { firstLine, secondLine } = lines(item.parts);
		return (
			<TouchableOpacity onPress={() => onAddressPress(item)}>
				<CardItem >
					<Icon name={icon} color="red"></Icon>
					<Body>
						<Text style={styles.street}>{firstLine}</Text>
						<Text style={styles.state}>{secondLine}</Text>
					</Body>
				</CardItem>
			</TouchableOpacity>
		);
	}

	return (
		<Card>
			{ list.map(renderRow) }
		</Card>
	)


}

export default AddressList;