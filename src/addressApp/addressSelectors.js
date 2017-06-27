import {createSelector} from 'reselect';

const recentAddressCreator = (historySize = 3) => createSelector(
	state => state.addressChunk.addressHistory,
	addressHistory => addressHistory.slice(0, historySize)
);

const recentAddressSelector = recentAddressCreator(3);

export {
	recentAddressCreator,
	recentAddressSelector
};