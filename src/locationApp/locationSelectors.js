import { createSelector } from 'reselect';


const visibileLocationSelector = createSelector(
	state => state.locationChunk.locations,
	locations => locations.filter(loc => !loc.deleted)
);

export {
	visibileLocationSelector
};
