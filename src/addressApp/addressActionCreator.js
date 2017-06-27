import {convertArrayToMirrorAction} from '../lib/simpleReduxTool';

const syncActions = convertArrayToMirrorAction([
	'ADD_ADDRESS_HISTORY'
]);

const AddressActions = syncActions;

const addAddressHistory = address => {
	return {
		type: AddressActions.ADD_ADDRESS_HISTORY,
		address
	};
}

export { AddressActions, addAddressHistory };