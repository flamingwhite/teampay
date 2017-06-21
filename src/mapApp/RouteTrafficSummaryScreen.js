import React, { Component } from 'react';
import { Container, Text, Content, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {routeTrafficDataSelector} from './mapSelectors';


@connect(
	(state, props) => ({
		trafficData: routeTrafficDataSelector(state, props)
	})
)
class RouteTrafficSummaryScreen extends Component {

	constructor(props) {
		super(props);
		this.navigateToRouteEdit = this.navigateToRouteEdit.bind(this);

	}
	navigateToRouteEdit() {

		console.log('route in callbackkkeeee', route);
		let { navigator, route } = this.props;
		navigator.push({
			screen: 'routeEditScreen',
			title: 'Edit ' + route.id,
			animated: true,
			passProps: {
				route
			}
		})
	}

	render() {
		return (
			<Container>
				<Content>
					{
						this.props.trafficData.map(td => <Button><Text>{td.duration}</Text></Button>)
					}
					<Button onPress={ this.navigateToRouteEdit }>
						<Text>Add a Route</Text>
					</Button>
				</Content>
			</Container>
			);
	}
}


RouteTrafficSummaryScreen.propTypes = {
	navigator: PropTypes.object
};

export default RouteTrafficSummaryScreen;