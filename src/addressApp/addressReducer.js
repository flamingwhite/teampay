import {createReducer} from '../lib/simpleReduxTool';
import {AddressActions} from './addressActionCreator';


const addressHandler = {
	[AddressActions.ADD_ADDRESS_HISTORY]: (state, action) => ({
		...state,
		addressHistory: [action.address, ...state.addressHistory]
	})
};


const AddressReducer = createReducer(addressHandler, {
	addressHistory: []
});

export default AddressReducer;