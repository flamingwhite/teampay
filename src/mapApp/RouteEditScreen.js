import React, { Component } from 'react';
import { Container, Text, Content, Input, InputGroup, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import RouteItemForm from './components/RouteItemForm';
import { reduxForm } from 'redux-form';
import {addRoute} from './mapActionCreators';


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
	constructor(props) {
		super(props);
		this.createRoute = this.createRoute.bind(this);
	}
	createRoute(values) {
		console.log('creating routes with ,,', values);
		this.props.dispatch(addRoute(values));
		this.props.navigator.pop()
		
	}
	render() {
		const { handleSubmit, route } = this.props;
		console.log(route,'rhte route to editttt');
		return (
			<Container>
				<Content>
					<Text>Input a Route</Text>
					<RouteItemForm initialValues={route}>
						<Button onPress={handleSubmit(this.createRoute)}>
							<Text>Update Route</Text>
						</Button>
					</RouteItemForm>
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