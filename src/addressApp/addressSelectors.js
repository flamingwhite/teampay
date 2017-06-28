import {createSelector} from 'reselect';

const recentAddressCreator = (historySize = 3) => createSelector(
	state => state.addressChunk.addressHistory,
	(_, props) => props.initValue,
	(addressHistory, initValue) => addressHistory.filter(s => !initValue || s.placeId != initValue.placeId).slice(0, historySize)
);

const recentAddressSelector = recentAddressCreator(3);

export {
	recentAddressCreator,
	recentAddressSelector
};