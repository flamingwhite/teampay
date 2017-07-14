import React from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Container, List } from 'native-base';
import RouteListItem from './RouteListItem';
import TrafficCardContainer from '../containers/TrafficCardContainer';

const RouteList = ({routes, onRouteClick}) => {
	return (
		<List>
			{ routes.map(route => <TrafficCardContainer key={ route.id } route={ route } onRouteClick={ () => onRouteClick(route) } />) }
		</List>
		);
}

RouteList.propTypes = {
	routes: arrayOf(object),
	onRouteClick: func,
};

export default RouteList;