import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {AsyncStorage} from 'react-native';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import rootReducer from './rootReducer';
import { persistStore, autoRehydrate } from 'redux-persist';
import {fetchTrafficData} from '../mapApp/mapActionCreators.js'
import {activeRouteSelector} from '../mapApp/mapSelectors';

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

console.disableYellowBox = true;


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


// setInterval(() => {
// 	let state = store.getState();
// 	let route = activeRouteSelector(state)[1]
// 	if(route)
// 	store.dispatch(fetchTrafficData(route));
	

// }, 20000);

export default store;