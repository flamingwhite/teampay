import React, { Component } from 'react';
import { Container, Text, Content, Button, ListItem } from 'native-base';
import { StyleSheet, View, LayoutAnimation } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RouteListContainer from './containers/RouteListContainer';
import { Col, Row, Grid } from "react-native-easy-grid";

import Icon from 'react-native-vector-icons/Ionicons';
import navbarButton from '../decorators/navbarButton';
import AddressPicker from '../genericCmps/AddressPicker';
import controlNavTabs from '../decorators/controlNavTab';


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

@controlNavTabs()
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
		this.props.rightClick.subscribe(a => {
			console.log('subm sub rightclik', a);
			this.navigateToRouteInput();
		})

		this.state = {
			nodes: [1, 2, 3],
			width:20
		}
		this.addNode=this.addNode.bind(this)
		this.s = 'hidden'

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

	addNode() {
		console.log('add node clicked');
		this.setState({
			nodes: this.state.nodes.concat(4),
			width: this.state.width+20
		});
		

		// this.props.navigator.toggleTabs({
		// 	to: this.s,
		// 	animated: true
		// })
		// this.props.navigator.toggleNavBar({
		// 	to: this.s,
		// 	animated: true
		// })
		this.s = this.s == 'hidden'?'shown':'hidden';
	}

	render() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)

		return (
			<Container style={{backgroundColor:'gray'}}>
				<Content>
					<Button onPress={this.addNode} style={{position:'absolute',right:0,bottom:0}}><Text>Add</Text></Button>
					<RouteListContainer onRouteClick={ this.navigateToTrafficSummary }></RouteListContainer>
					<AddressPicker></AddressPicker>
					{
						this.state.nodes.map(n => <Text style={{backgroundColor:'green', width:this.state.width}}>{n}</Text>)
					}
				</Content>
			</Container>
			);
	}
}


MapMainScreen.propTypes = {
	navigator: PropTypes.object
};

export default MapMainScreen;