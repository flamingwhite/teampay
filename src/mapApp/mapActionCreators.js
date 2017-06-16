import {convertArrayToMirrorAction,  createAsyncHttpAction, httpActionDispatcher} from '../lib/simpleReduxTool';

const syncActions = convertArrayToMirrorAction([
	'ADD_ROUTE',
]);

const asyncActions = ['FETCH_DIRECTION_DATA'];

const MapActions = asyncActions.map(createAsyncHttpAction)
	.reduce((acc, cur) => ({
		...acc,
		...cur
	}), syncActions);



const createDirectionAPIUrl = (placeOne, placeTwo) => `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${placeOne}&destination=place_id:${placeTwo}&key=AIzaSyAJAmwOGIGRlWliaI2YbW53FwvHerVfIaE&departure_time=now`;

const fetchDirection = (placeOne, placeTwo) => dispatch => httpActionDispatcher({
	dispatch,
	actionName: 'FETCH_DIRECTION_DATA',
	url: createDirectionAPIUrl(placeOne, placeTwo),
});

export {
	MapActions,
	fetchDirection
};

