import React from 'react';
import { Text, Card, CardItem, Left, Body, Right, Icon } from 'native-base';
import { object, func } from 'prop-types'

const RouteListItem = ({routeItem, onRouteClick}) => {
	console.log('route item ', routeItem)
	return (
		<Card>
			<CardItem icon onPress={ () => onRouteClick((routeItem)) }>
				<Left>
					<Icon name="bluetooth" />
				</Left>
				<Body>
					<Text>
						{JSON.stringify(routeItem)}
					</Text>
				</Body>
				<Right>
					<Icon name="arrow-forward" />
				</Right>
			</CardItem>
		</Card>
	)
}

RouteListItem.propTypes = {
	routeItem: object,
	onRouteClick: func
}

export default RouteListItem;
