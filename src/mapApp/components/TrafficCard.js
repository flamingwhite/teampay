import React, { Component } from 'react';
import { Container, Text, Content, Button, Card, CardItem, Left, Body, Right } from 'native-base';
import {View} from 'react-native';
import {parseLines} from '../../googleAddressPicker/googleAPIs/addressUtil';
import MapView from 'react-native-maps';
import {getIcon} from '../../icons';

const styles = {
	map: {
		height: 200,
		width: 300
	},
	searchItem: {
		borderBottomWidth: 0	
	},
	searchInput: {
		height: 38,
		fontSize: 14,
		borderBottomWidth:0
	}
};


const TrafficCard = props => {
	console.log('traffic card prop ', props);
	const { route, onRouteClick } = props;
	const { startAddress, endAddress } = route;

	const startLine = parseLines(startAddress.parts).firstLine;
	const endLine = parseLines(endAddress.parts).firstLine;

	const { distance, duration, durationInTraffic, polyline } = props.trafficData;



	return (
		<View>
			<Card>
				<CardItem>
					<Body>
						<Button onPress={onRouteClick}>
							<Text>Click</Text>
						</Button>
						<Text>{startLine}</Text>
						<Text>{endLine}</Text>
						<Text>{durationInTraffic}</Text>
					</Body>
				</CardItem>
				<CardItem>
				<Body>
					<MapView
						ref={r => this[route.id] = r}
						style={styles.map}
						onLayout={() => this[route.id].fitToCoordinates([startAddress.geocode, endAddress.geocode], {
							edgePadding: {
								top: 40,
								bottom: 40,
								right: 40,
								left: 40
							}, animated: false
						})}
						
						
					>
						<MapView.Marker
							coordinate={route.startAddress.geocode}
							image={getIcon('ios-radio-button-on')}
							title={route.startAddress.title}
						/>
						<MapView.Marker
							coordinate={route.endAddress.geocode}
							title={route.endAddress.title}
						/>
						{
							polyline&&
							<MapView.Polyline
								coordinates={polyline}
								strokeWidth={3}
							/>
						}
					</MapView>
				</Body>
				</CardItem>
			</Card>
		</View>

	);
};


export default TrafficCard;