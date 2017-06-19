import React, { Component } from 'react';
import { Container, Text, Content, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LocationListContainer from './containers/LocationListContainer'


@connect()
class LocationMainScreen extends Component {

	constructor(props) {
		super(props);
		this.gotoLocationInputScreen = this.gotoLocationInputScreen.bind(this);
		this.gotoLocationEditScreen = this.gotoLocationEditScreen.bind(this);
	}
	gotoLocationInputScreen() {
		let {navigator} = this.props;
		navigator.push({
			screen: 'locationInputScreen',
			title: 'Add a Location',
			animated: true
		});
	}

	gotoLocationEditScreen(location) {
		console.log('godoLocation', location);
		let {navigator } = this.props;

		navigator.push({
			screen: 'locationEditScreen',
			title: 'Edit Location',
			animated: true,
			passProps: {location}
		});

	}

	render() {
		return (
			<Container>
				<Content>
					<LocationListContainer onLocationPress={this.gotoLocationEditScreen}/>
					<Text>This is location list</Text>
					<Button onPress={ this.gotoLocationInputScreen }>
						<Text>Add a Location</Text>
					</Button>
				</Content>
			</Container>
			);
	}
}


LocationMainScreen.propTypes = {
	navigator: PropTypes.object,
	dispatch: PropTypes.func
};

export default LocationMainScreen;