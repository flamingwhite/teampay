import {convertArrayToMirrorAction } from '../lib/simpleReduxTool';
import UUID from '../lib/uuidTool';


const syncActions = convertArrayToMirrorAction([
	'ADD_LOCATION',
	'UPDATE_LOCATION',
	'DELETE_LOCATION'
]);

const LocationActions = syncActions;


const addLocation = ({ icon ='locate', alias = '', meta }) => {
	const id = UUID();
	let { place_id: googlePlaceId} = meta;
	return {
		type: LocationActions.ADD_LOCATION,
		location: {
			id,
			icon,
			alias,
			googlePlaceId,
			meta,
		}
	};
};

const updateLocation = (id, location) => ({
	type: LocationActions.UPDATE_LOCATION,
	id,
	location
});


const deleteLocation = id => ({
	type: LocationActions.DELETE_LOCATION,
	id
})


export {
	LocationActions,
	addLocation,
	updateLocation,
	deleteLocation
};