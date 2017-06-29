import React, { Component } from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Input, Button, Text, Item, Icon} from 'native-base';
import { connect } from 'react-redux';
import { visibileLocationSelector } from '../../locationApp/locationSelectors';
import { Field, reduxForm } from 'redux-form';
import { reduxFormValues } from '../../lib/reduxFormTool';
import RouteTimePicker from './RouteTimePicker';
import {showAddressPicker} from '../../lib/addressPickService';
import {shortTitleFromAddressParts} from '../../lib/googleAPIs/addressUtil';



const renderTimePicker = ({input: {onChange, value}}) => <RouteTimePicker onDateChange={ onChange } date={ value } />

const styles = {
	addressPicker: {
		color: 'black',
		fontSize: 14
	},
	addrInput: {
		fontSize: 14
	}
}

@connect(
	state => ({
		locations: visibileLocationSelector(state),
	})
)
@reduxForm({
	form: 'routeInput'
})
@reduxFormValues({
	form: 'routeInput'
})
class RouteItemForm extends Component {
	constructor(props) {
		super(props);
		this.renderAddressPicker = this.renderAddressPicker.bind(this);
		
	}
	renderAddressPicker(field, placeholder, icon = 'pin') {
		const {input} = field;
		const {onChange, value} = input;

		const pickAddress = () => {
			showAddressPicker({ title: placeholder, initValue: value })
				.then(data => onChange(data))
		}
		return (
				<Item onPress={pickAddress}>
					<Icon name={icon}></Icon>
					<Input style={styles.addrInput} disabled value={value.parts?shortTitleFromAddressParts(value.parts): ''} placeholder={placeholder}></Input>
				</Item>
		)
	}
	render() {
		console.log(this.props, 'does it has valuess');
		console.log(this.props.formValues, 'does it has valuess');
		return (
			<View>
				<Field name="startAddress" component={ v => this.renderAddressPicker(v, 'Pick a Start Location', 'locate') } />
				<Field name="endAddress" component={ v => this.renderAddressPicker(v, 'Pick a Destination') } />
				<Field name="startTime" component={ renderTimePicker } />
				<Field name="endTime" component={ renderTimePicker } />
				<Text>
					{JSON.stringify(this.props.formValues)}
				</Text>
				{
					this.props.children
				}
			</View>
			);
	}

}

export default RouteItemForm;
