import React, { Component } from 'react';
import { Picker, View, Text } from 'native-base';
import { connect } from 'react-redux';
import { visibileLocationSelector } from '../../locationApp/locationSelectors';
import { Field, reduxForm } from 'redux-form';
import { reduxFormValues } from '../../lib/reduxFormTool';
import RouteTimePicker from './RouteTimePicker';



const renderTimePicker = ({input: {onChange, value}}) => <RouteTimePicker onDateChange={ onChange } date={ value } />

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
		console.log(this.props, 'does it has valuess');
		console.log(this.props.formValues, 'does it has valuess');
		return (
			<View>
				<Field name="fromLocationId" component={ v => this.renderLocationPicker(v, 'Select a Start Location') } />
				<Field name="toLocationId" component={ v => this.renderLocationPicker(v, 'Select a Destination') } />
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
