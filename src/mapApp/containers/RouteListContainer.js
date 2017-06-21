import React, { Component } from 'react';
import {connect} from 'react-redux';
import {activeRouteSelector} from '../mapSelectors';
import RouteList from '../components/RouteList';
import {Text} from 'native-base';


@connect(
	state => ({
		routes: activeRouteSelector(state)
	})
)
class RouteListContainer extends Component {
	render() {
		let { routes, onRouteClick } = this.props;
		console.log(routes, 'routesss');

		return (
			<RouteList {...this.props} routes={routes} onRouteClick={onRouteClick}></RouteList>
		)

	}

}

export default RouteListContainer;