import React, { Component } from 'react';
import { Container, Text, Content, Input, InputGroup } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import GooglePlaceInput from './components/GooglePlaceInput';
import RouteTimePicker from './components/RouteTimePicker';
import PropTypes from 'prop-types';
import RouteInputForm from './components/RouteInputForm';

console.log('in input screen', MapView);




@connect(
	state => ({
		routeForm: state.mapChunk.defaultRouteConfig
	})
)
class RouteInputScreen extends Component {
	render() {
		let {startTime, endTime} = this.props.routeForm;
		return (
			<Container>
				<Content>
					<Text>Input a Route</Text>
					<RouteInputForm></RouteInputForm>
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