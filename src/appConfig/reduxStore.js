import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import rootReducer from './rootReducer';


function configStore(initState) {
	const store = createStore(rootReducer, initState, compose(
		applyMiddleware(thunk, logger)
	));
	return store;
};

var store = configStore({});

// if (module.hot) {
// 	module.hot.accept('./rootReducer', () => {
// 		const nextReducer = require('./rootReducer').default;

// 		store.replaceReducer(nextReducer);
// 	});
// };

export default store;