import React from 'react';
// import { Card, List, ListItem } from 'react-native-elements';
import { Card, CardItem, Icon, Text, Body } from 'native-base';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
	street: {
		color:'red'
	},
	state: {
		color: 'gray',
		fontSize: 10
	}

});

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
					<Icon name={icon} backgroundColor="red"></Icon>
					<Body>
						<Text style={{fontSize: 14}}>{firstLine}</Text>
						<Text style={{color:'gray', fontSize: 12}}>{secondLine}</Text>
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