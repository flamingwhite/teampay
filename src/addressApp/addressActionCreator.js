import {convertArrayToMirrorAction} from '../lib/simpleReduxTool';

const syncActions = convertArrayToMirrorAction([
	'ADD_ADDRESS_HISTORY',
	'CLEAR_ADDRESS_HISTORY'
]);

const AddressActions = syncActions;

const addAddressHistory = address => {
	return {
		type: AddressActions.ADD_ADDRESS_HISTORY,
		address
	};
};

const clearAddressHistory = () => ({
	type: AddressActions.CLEAR_ADDRESS_HISTORY
});



export { AddressActions, addAddressHistory, clearAddressHistory };