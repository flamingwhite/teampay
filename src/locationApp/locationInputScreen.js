import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { addLocation } from './locationActionCreators';
import LocationItemForm from './components/LocationItemForm';


@connect(
	state => ({
		routeForm: state.mapChunk.defaultRouteConfig
	})
)
@reduxForm({
	form: 'locationInput'
})
class LocationInputScreen extends Component {
	constructor(props) {
		super(props);
		this.createLocation = this.createLocation.bind(this);

	}
	createLocation(values) {
		let {dispatch, navigator} = this.props;
		dispatch(addLocation(values));
		navigator.pop();
	}
	render() {

		const {handleSubmit} = this.props;

		return (
			<Container>
				<LocationItemForm>
					<Button success onPress={handleSubmit(this.createLocation)}>
						<Text>Add a Location</Text>
					</Button>
				</LocationItemForm>
			</Container>

			);
	}
}

LocationInputScreen.propTypes = {
	dispatch: PropTypes.func,
	navigator: PropTypes.object,
	handleSubmit: PropTypes.func
};

export default LocationInputScreen;