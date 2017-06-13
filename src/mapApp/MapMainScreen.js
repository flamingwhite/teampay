import React, { Component } from 'react';
import { Container, Header, Text, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import MapView from 'react-native-maps';

console.log(MapView);

export default class MapMainScreen extends Component {
	render() {
		return (
			<Container>
				<Header>
					<Title>Header</Title>
				</Header>
				<Content>
					<Text>What's up Map</Text>
					<MapView initialRegion={ { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421, } } style={{flex:1, height:300, width:300}}/>
				</Content>
				<Footer>
					<FooterTab>
						<Button transparent>
							<Icon name='ios-call' />
						</Button>
					</FooterTab>
				</Footer>
			</Container>
			);
	}
}