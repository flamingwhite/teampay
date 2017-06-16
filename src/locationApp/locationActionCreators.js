import {convertArrayToMirrorAction } from '../lib/simpleReduxTool';


const syncActions = convertArrayToMirrorAction([
	'ADD_LOCATION',
	'UPDATE_LOCATION'
]);

const LocationActions = syncActions;


const addLocation = location => ({
	type: LocationActions.ADD_LOCATION,
	location
});

const updateLocation = (id, location) => ({
	type: LocationActions.UPDATE_LOCATION,
	id,
	location
});


export {
	LocationActions,
	addLocation,
	updateLocation
};