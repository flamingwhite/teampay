import React, { Component } from 'react';
import { Container, Header, Text, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

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
  },
});

export default class MapMainScreen extends Component {
	render() {
		return (
			<Container>
				<Header>
					<Title>Header</Title>
				</Header>
				<Content style={styles.container}>
					<Text>What's up Map</Text>
					<MapView style={styles.map} initialRegion={ { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421, } } style={{flex:1, height:300, width:300}}/>
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