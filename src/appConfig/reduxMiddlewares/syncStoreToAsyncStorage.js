import {AsyncStorage} from 'react-native';

let storeKey = 'reduxStore';

var sync = store => next => action => {
	
	console.log('starting sync store to AsyncStorage', JSON.stringify(action));
	let result = next(action);

	console.log('state', JSON.stringify(store.getState()))
	
	AsyncStorage.setItem(storeKey, JSON.stringify(store.getState()))
		.then(d => {
			console.log('AsyncStore is synced =============================================' )
		});

	return result;
};


export default sync;