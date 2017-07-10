import {
	createSelector
} from 'reselect';
import RichArray from '../lib/richArray'
import R from 'ramda';

export const activeRouteSelector = createSelector(
	state => state.mapChunk.routes,
	state => state.locationChunk.locations,
	(routes, locations) => routes.filter(r => !r.deleted).map(r => ({
		...r,
		fromLocation: locations.find(loc => loc.id == r.fromLocationId),
		toLocation: locations.find(loc => loc.id == r.toLocationId)
	}))
);

export const routeTrafficDataSelector = createSelector(
	state => state.mapChunk.trafficData,
	(state, props) => props.route,
	(trafficData, route) => RichArray(trafficData[route.id])
);

export const latestTrafficData = createSelector(
	state => state.mapChunk.trafficData,
	(state, props) => props.route,
	(trafficData, route) => R.pipe(
		R.sortBy(d => new Date(d.time)),
		R.reverse
	)(RichArray(trafficData[route.id]))
)