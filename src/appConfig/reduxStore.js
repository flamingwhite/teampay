import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {AsyncStorage} from 'react-native';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import {reduxActionStreamMiddleware} from './reduxMiddlewares/reduxActionStream';
import rootReducer from './rootReducer';
import rootEpic from './rootEpic';
import {createEpicMiddleware} from 'redux-observable';
import { persistStore, autoRehydrate } from 'redux-persist';



console.disableYellowBox = true;


const epicMiddleware = createEpicMiddleware(rootEpic);

function configStore(initState) {
	const store = createStore(rootReducer, initState, compose(
		applyMiddleware(thunk, logger, reduxActionStreamMiddleware, epicMiddleware),
		autoRehydrate()
	));
	return store;
}

var store = configStore(undefined);

persistStore(store, {
	storage: AsyncStorage
});


export default store;