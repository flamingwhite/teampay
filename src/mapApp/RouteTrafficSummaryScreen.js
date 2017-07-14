import React, { Component } from 'react';
import { Container, Text, Content, Button } from 'native-base';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {routeTrafficDataSelector} from './mapSelectors';
import {fetchTrafficData, clearTrafficData} from './mapActionCreators';
import MapView from 'react-native-maps';
import {getIcon} from '../icons';
import controlNavTab from '../decorators/controlNavTab';
import navbarButton from '../decorators/navbarButton';
import {Navigation} from 'react-native-navigation';



const styles = {
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		height:200
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


@navbarButton({
	leftButtons: [{
		id: 'back',
		get icon() {
			return getIcon('ios-arrow-back');
		}
	}]
})
@connect(
	(state, props) => ({
		trafficData: routeTrafficDataSelector(state, props)
	})
)
class RouteTrafficSummaryScreen extends Component {

	constructor(props) {
		super(props);
		this.navigateToRouteEdit = this.navigateToRouteEdit.bind(this);
		console.log('routes', props.route);
		// this.props.toggleNavBar(false)
		props.navButtonClick('back').subscribe(() => Navigation.dismissModal());

		this._clearTrafficData = this._clearTrafficData.bind(this);
		

	}

	componentWillMount() {
		let { route, dispatch } = this.props;
		dispatch({
			type: 'FETCH_DURATION',
			route
		});
		// dispatch(fetchTrafficData(route));
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

	_clearTrafficData() {
		let { route, dispatch } = this.props;
		dispatch(clearTrafficData(route.id));
	}


	render() {
		console.log('traffic datas', this.props.trafficData);
		let { route } = this.props;

		let {polyline} = this.props.trafficData[this.props.trafficData.length -1]
		console.log('polyline is ', polyline);
		let { startAddress, endAddress } = route;
		return (
			<Container>
				<Content>
					<MapView
						ref={r => this.mapRef = r}
						style={styles.map}
						onLayout={() => this.mapRef.fitToCoordinates([startAddress.geocode, endAddress.geocode], {
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
					{
						this.props.trafficData.reverse().map(td => <Button><Text>{td.durationInTraffic}</Text></Button>)
					}
					<Button onPress={ this.navigateToRouteEdit }>
						<Text>Add a Route</Text>
					</Button>
					<Button danger onPress={ this._clearTrafficData }>
						<Text>Clear TrafficData</Text>
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