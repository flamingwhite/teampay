import React, { Component } from 'react';
import { Container, Text, Content, Input, InputGroup, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import GooglePlaceInput from '../genericCmps/GooglePlaceInput';
import { Field, reduxForm } from 'redux-form';
import ReduxInput from '../genericCmps/reduxInput';
import PropTypes from 'prop-types';
import UUID from '../lib/uuidTool';

const renderGoogleInput = ({ input: { onChange } }) => <GooglePlaceInput onSelect={onChange}/>

@connect(
	state => ({
		routeForm: state.mapChunk.defaultRouteConfig
	})
)
@reduxForm({
	form:'locationInput'	
})
class LocationInputScreen extends Component {
	render() {

		const { handleSubmit, dispatch } = this.props;
		const createLocation = values => { }

		return (
			<Container>
				<Content>
					<Field
						name="location"
						component={renderGoogleInput}
					/>
					<Field
						name="alias"
						component={ReduxInput}
					/>
					<Field
						name="icon"
						component={Input}
					/>
					<Button onPress={handleSubmit(createLocation)}>
						<Text>Add Location</Text>
					</Button>
					
				</Content>
			</Container>

			);
	}
}


export default LocationInputScreen;