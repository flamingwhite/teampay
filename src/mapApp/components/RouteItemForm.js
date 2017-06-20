import React, { Component } from 'react';
import { Picker, View, Text } from 'native-base';
import { connect } from 'react-redux';
import { visibileLocationSelector } from '../../locationApp/locationSelectors';
import { Field } from 'redux-form';




@connect(
	state => ({
		locations: visibileLocationSelector(state)
	})
)
class RouteItemForm extends Component {
	constructor(props) {
		super(props);
		this.renderLocationPicker = this.renderLocationPicker.bind(this);
	}
	renderLocationPicker(field, placeholder) {
		const {locations} = this.props;
		console.log('locations==', locations);
		console.log('field==', field);
		const {input} = field;
		const {onChange, value} = input;

		return (
			<Picker supportedOrientations={ ['portrait', 'landscape'] } mode="dropdown" selectedValue={ value } onValueChange={ v => onChange(v) } placeholder={ placeholder }>
				{ locations.map(loc => <Picker.Item key={ loc.id } label={ loc.alias } value={ loc.id } />) }
			</Picker>
		)


	}
	render() {
		return (
			<View>
				<Field name="formLocationId" component={ v => this.renderLocationPicker(v, 'Select a Start Location') } />
				<Field name="toLocationId" component={ v => this.renderLocationPicker(v, 'Select a Destination') } />
			</View>
			);
	}

}

export default RouteItemForm;

//     <Picker
//         supportedOrientations={['portrait','landscape']}
//         iosHeader="Select one"
//         mode="dropdown"
//         selectedValue={this.state.selected1}
//         onValueChange={this.onValueChange.bind(this)}>
//         <Item label="Wallet" value="key0" />
//         <Item label="ATM Card" value="key1" />
//         <Item label="Credit Card" value="key2" />
//         <Item label="Debit Card" value="key3" />
//    </Picker>