import React, { Component } from 'react';
import { Container, Text, Content, Button } from 'native-base';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



@connect()
class LocationMainScreen extends Component {

	constructor(props) {
		super(props);
		this.navigateToLocationInput = this.navigateToLocationInput.bind(this);

	}
	navigateToLocationInput() {
		let {navigator} = this.props;
		navigator.push({
			screen: 'locationInputScreen',
			title: 'Add a Location',
			animated: true
		});
	}

	render() {
		return (
			<Container>
				<Content>
					<Text>This is location list</Text>
					<Button onPress={ this.navigateToLocationInput }>
						<Text>Add a Location</Text>
					</Button>
				</Content>
			</Container>
			);
	}
}


LocationMainScreen.propTypes = {
	navigator: PropTypes.object
};

export default LocationMainScreen;