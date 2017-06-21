import React, { Component } from 'react';
import { Container, Text, Content, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import EIcon from 'react-native-vector-icons/EvilIcons';
import RouteListContainer from './containers/RouteListContainer';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)
const eIcon = (<EIcon name="camera" size={80}   color="orange" />)


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
		height:400
	},
});

@connect(
	state => ({ time: state.mapChunk.time })
)
class MapMainScreen extends Component {

	constructor(props) {
		super(props);
		this.navigateToRouteInput = this.navigateToRouteInput.bind(this);
		this.navigateToTrafficSummary = this.navigateToTrafficSummary.bind(this);

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
		let { navigator } = this.props;
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
		const geocode = { latitude: 33.91, longitude: -84.458 };
		return (
			<Container>
				<Content style={ styles.container }>
					<RouteListContainer onRouteClick={this.navigateToTrafficSummary}></RouteListContainer>
					<Text>Map up Map time is {this.props.time}</Text>
					<Button onPress={ this.navigateToRouteInput }>
						<Text>Add a Route</Text>
					</Button>
				</Content>
			</Container>
			);
	}
}


MapMainScreen.propTypes = {
	navigator: PropTypes.object
};

export default MapMainScreen;