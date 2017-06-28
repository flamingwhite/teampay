import React from 'react';
import { Card, List, ListItem } from 'react-native-elements';

const AddressList = props => {
	let {list = [], onAddressPress} = props;

	return (
		<List>
			{ list.map((item, i) => (
				<ListItem key={i} title={item.description} leftIcon={{ name: 'home' }} onPress={() => onAddressPress(item)} />
				))
			}
		</List>
	)


}

export default AddressList;