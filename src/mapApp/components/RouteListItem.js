import React from 'react';
import { Text, Card, ListItem, Left, Body, Right, Icon } from 'native-base';
import { object, func } from 'prop-types'

const RouteListItem = ({routeItem, onRouteClick}) => {
	console.log('route item ', routeItem)
	return (
		<ListItem icon onPress={ () => onRouteClick((routeItem)) }>
			<Left>
				<Icon name="bluetooth" />
			</Left>
			<Body>
				<Text style={ { height: 40 } }>
					{ JSON.stringify(routeItem) }
				</Text>
			</Body>
			<Right>
				<Icon name="arrow-forward" />
			</Right>
		</ListItem>
	)
}

RouteListItem.propTypes = {
	routeItem: object,
	onRouteClick: func
}

export default RouteListItem;
