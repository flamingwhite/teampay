import React, { Component } from 'react';
import { Container, Text, Content, Input, InputGroup } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import RouteInputForm from './components/RouteInputForm';
import RouteItemForm from './components/RouteItemForm';
import {reduxForm} from 'redux-form';


console.log('in input screen', MapView);




@connect(
	state => ({
		routeForm: state.mapChunk.defaultRouteConfig
	})
)
@reduxForm({
	form: 'routeInput'
})
class RouteInputScreen extends Component {
	render() {
		return (
			<Container>
				<Content>
					<Text>Input a Route</Text>
					<RouteInputForm></RouteInputForm>
					<RouteInputForm></RouteInputForm>
					<RouteInputForm/>
				</Content>
			</Container>

			);
	}
}

RouteInputScreen.proptypes = {
	startTime: PropTypes.string,
	endTime: PropTypes.string,
	routeForm: PropTypes.object
}

export default RouteInputScreen;