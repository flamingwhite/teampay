import thunk from 'redux-thunk';
import logger from 'redux-logger';
import syncStoreToAsyncStorage from './reduxMiddlewares/syncStoreToAsyncStorage';
import {AsyncStorage} from 'react-native';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import rootReducer from './rootReducer';
import { persistStore, autoRehydrate } from 'redux-persist';

// let emptyState = {
// 	todoChunk: {
// 		visibilityFilter: 'ALL',
// 		todos: []
// 	},
// 	mapChunk: {
// 		defaultRouteConfig: {
// 			startTime: '5:00 pm',
// 			endTime: '7:00 pm'
// 		},
// 		newRouteForm: {}
// 	}
// };


function configStore(initState) {
	const store = createStore(rootReducer, initState, compose(
		applyMiddleware(thunk, logger),
		autoRehydrate()
	));
	return store;
}

var store = configStore(undefined);

persistStore(store, {
	storage: AsyncStorage
});

// AsyncStorage.getItem('reduxStore')
// 	.then(data => {
// 		console.log('STORE GET FROM ASYNCSTORE', data);
// 		let newStore = JSON.parse(data);
// 		if (!data) {
// 			newStore = emptyState;
// 			console.warn('async store is null, use empty store');
// 		}
// 		store.dispatch({
// 			type: 'ASYNC_STORE',
// 			store: newStore
// 		});
// 	})



export default store;