import {
	createReducer
} from '../lib/simpleReduxTool';
import {
	AddressActions
} from './addressActionCreator';

import R from 'ramda';


const addressHandler = {

	[AddressActions.ADD_ADDRESS_HISTORY]: (state, {
		address
	}) => R.over(
		R.lensProp('addressHistory'),
		R.pipe(
			R.filter(h => h.placeId !== address.placeId),
			R.prepend(address)
		),
		state
	),
	[AddressActions.CLEAR_ADDRESS_HISTORY]: R.set(
		R.lensProp('addressHistory'),
		[]
	)
};


const AddressReducer = createReducer(addressHandler, {
	addressHistory: []
});

export default AddressReducer;