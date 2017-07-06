import {createSelector} from 'reselect';
import {config} from './config';
let {stateChunkName, recentLimit = 3} = config;

console.log('statechunk', stateChunkName);

const recentAddressCreator = (historySize = 3) => createSelector(
	state => state[stateChunkName].addressHistory,
	(_, props) => props.initValue,
	(addressHistory, initValue) => addressHistory.filter(s => !initValue || s.placeId != initValue.placeId).slice(0, historySize)
);

const recentAddressSelector = recentAddressCreator(recentLimit);

export {
	recentAddressCreator,
	recentAddressSelector
};