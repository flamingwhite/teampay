import React, { Component } from 'react';
import { Field } from 'redux-form';
import { StyleSheet } from 'react-native';
import { Content, View, Text, Input } from 'native-base';
import ReduxInput from '../../genericCmps/reduxInput';
import GooglePlaceInput from '../../genericCmps/GooglePlaceInput';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { reduxFormValues } from '../../lib/reduxFormTool';


const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

const renderGoogleInput = ({input: {value, onChange}}) => <GooglePlaceInput defaultValue={ value.description } onSelect={ onChange } />




@reduxForm({
	form: 'locationInput'
})
@reduxFormValues({
	form: 'locationInput'	
})
class LocationItemForm extends Component {
	constructor(props) {
		super(props);
		this.renderMap = this.renderMap.bind(this);

	}
	renderMap(fieldData) {
		console.log('fielddata,', fieldData);
		const { input } = fieldData;
		const { value } = input;
		const { geometry, description } = value;
		if (!geometry) {
			return <View />;
		}
		
		console.log(value, description, 'the value from rendermap');
		const latlng = {
			latitude: geometry.location.lat,
			longitude: geometry.location.lng
		}
		return (
			<MapView style={ styles.map } style={ { height: 200 } } region={ { ...latlng, latitudeDelta: 0.3, longitudeDelta: 0.2 } }>
				<MapView.Marker
					title="Address"
					description={description}
					coordinate={latlng}
				/>
			</MapView>
		)
	}
	render() {
		console.log('this.props is ', this.props);
		console.log(this.props.children,' children is');
		const {children} = this.props

		return (
			<Content>
				<Field name="meta" component={ renderGoogleInput } />
				<Field name="alias" component={ ReduxInput } />
				<Field name="icon" component={ Input } />
				<Field name="meta" component={ this.renderMap } />
				<Field name="meta" component={field => <Text>{field.input.value.description}</Text>} />
				{
					this.props.children
				}
			</Content>
		);
	}

}

LocationItemForm.propTypes = {
	input: PropTypes.object
};



export default LocationItemForm;

