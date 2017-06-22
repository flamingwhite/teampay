import React from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Container, List } from 'native-base';
import RouteListItem from './RouteListItem';

const RouteList = ({routes, onRouteClick}) => {
	return (
		<List>
			{ routes.map(route => <RouteListItem key={ route.id } routeItem={ route } onRouteClick={ onRouteClick } />) }
		</List>
		);
}

RouteList.propTypes = {
	routes: arrayOf(object),
	onRouteClick: func,
};

export default RouteList;