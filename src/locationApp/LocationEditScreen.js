import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { reduxForm, initialize } from 'redux-form';
import PropTypes from 'prop-types';
import { updateLocation, deleteLocation } from './locationActionCreators';
import LocationItemForm from './components/LocationItemForm';


@connect(
	state => ({
		routeForm: state.mapChunk.defaultRouteConfig
	})
)
@reduxForm({
	form: 'locationInput'	
})	
class LocationEditScreen extends Component {
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
		const { dispatch, location } = this.props;
		this.deleteLocation = this.deleteLocation.bind(this);

	}
	save(values) {
		console.log('save get callee');
		const {dispatch, navigator} = this.props;
		dispatch(updateLocation(values.id, values));
		navigator.pop();
	}
	deleteLocation() {
		const { dispatch, location, navigator } = this.props;
		dispatch(deleteLocation(location.id));
		navigator.pop();
	}
	render() {
		const { handleSubmit } = this.props;
		return (
			<Container>
				<LocationItemForm initialValues={this.props.location}>
					<Button onPress={handleSubmit(this.save)}>
						<Text>Edit Location</Text>
					</Button>
				<Button danger onPress={this.deleteLocation}>
					<Text>Delete Location</Text>
				</Button>
			</LocationItemForm>	
			</Container>

			);
	}
}

LocationEditScreen.propTypes = {
	dispatch: PropTypes.func,
	navigator: PropTypes.object,
	handleSubmit: PropTypes.func,
	location: PropTypes.object
	
};

export default LocationEditScreen;