import {createReducer} from '../lib/simpleReduxTool';
import {AddressActions} from './addressActionCreator';


const addressHandler = {
	[AddressActions.ADD_ADDRESS_HISTORY]: (state, action) => ({
		...state,
		addressHistory: [action.address, ...state.addressHistory.filter(h => h.placeId != action.address.placeId)]
	}),
	[AddressActions.CLEAR_ADDRESS_HISTORY]: (state) => ({
		...state,
		addressHistory: []
	})
};


const AddressReducer = createReducer(addressHandler, {
	addressHistory: []
});

export default AddressReducer;