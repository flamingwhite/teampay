let createReducer = (initialState, handlers) => (state, action) => {
	if (Object.keys(handlers).includes(action.type)) {
		return handlers[action.type](state || initialState, action);
	}
	return state || initialState;
};

let convertArrayToMirrorAction = arr => arr.reduce((accu, cur) => ({
	...accu,
	[cur]: cur
}), {});

export {
	createReducer,
	convertArrayToMirrorAction
};