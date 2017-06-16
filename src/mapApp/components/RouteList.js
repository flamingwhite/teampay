import React  from 'react';
import { func, arrayOf, object } from 'prop-types';
import { Container,  List } from 'native-base';
import RouteListItem from './RouteListItem';

const RouteList = ({ routeItems, onRouteClick }) => {
	return (
		<Container>
			<List>
				{routeItems.map(route =>
					<RouteListItem key={route._id} routeItem={route}  onRouteClick={onRouteClick}/>)} </List>
		</Container>
	);
}

RouteList.propTypes = {
	routeItems: arrayOf(object),
	onRouteClick: func,
};

export default RouteList;