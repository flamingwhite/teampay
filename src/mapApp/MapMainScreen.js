import React, { Component } from 'react';
import { Container, Text, Content, Button } from 'native-base';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RouteListContainer from './containers/RouteListContainer';
import { Col, Row, Grid } from "react-native-easy-grid";

import Icon from 'react-native-vector-icons/Ionicons';
import navbarButton from '../decorators/navbarButton';


console.log(MapView);

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
		height: 400
	},
});

@navbarButton({
	id: 'addRoute',
	title: 'Add'
})
@connect(
	state => ({
		time: state.mapChunk.time
	})
)
class MapMainScreen extends Component {

	constructor(props) {
		super(props);
		this.navigateToRouteInput = this.navigateToRouteInput.bind(this);
		this.navigateToTrafficSummary = this.navigateToTrafficSummary.bind(this);
		console.log('pppppmap', this.props);
		this.props.navClickSub.subscribe(a => {
			console.log('subm sub', a);
		})

	}
	navigateToRouteInput() {
		let {navigator} = this.props;
		navigator.push({
			screen: 'routeInputScreen',
			title: 'Create a New Route',
			animated: true
		});
	}



	navigateToTrafficSummary(route) {
		console.log('route in callbackkkeeee', route);
		let {navigator} = this.props;
		navigator.push({
			screen: 'routeTrafficSummaryScreen',
			title: 'summary ' + route.id,
			animated: true,
			passProps: {
				route
			}
		})
	}

	render() {
		const geocode = {
			latitude: 33.91,
			longitude: -84.458
		};
		return (
			<Container>
				<Grid>
					<Row size={ 6 }>
						<Content>
							<RouteListContainer onRouteClick={ this.navigateToTrafficSummary }></RouteListContainer>
						</Content>
					</Row>
					<Row size={1} style={{}}>
						<Button onPress={ this.navigateToRouteInput }>
							<Text>Add a Route</Text>
						</Button>
					</Row>
				</Grid>
			</Container>
			);
	}
}


MapMainScreen.propTypes = {
	navigator: PropTypes.object
};

export default MapMainScreen;