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


export default store;