import {createSelector} from 'reselect';

const activeRouteSelector = createSelector(
	state => state.mapChunk.routes,
	state => state.locationChunk.locations,
	(routes, locations) => routes.filter(r => !r.deleted).map(r => ({
		...r,
		fromLocation: locations.find(loc => loc.id == r.fromLocationId),
		toLocation: locations.find(loc => loc.id == r.toLocationId)
	}))
);

const routeTrafficDataSelector = createSelector(
	state => state.mapChunk.trafficData,
	(state, props) => props.route,
	(trafficData, route) => trafficData[route.id]
);

export { activeRouteSelector, routeTrafficDataSelector };
