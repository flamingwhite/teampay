import { get, post, put, deletex } from './httpTool';


const createReducer = (handlers, initialState) => (state, action) => {
	if (state === undefined) {
		return initialState;
	}
	if (Object.keys(handlers).includes(action.type)) {
		return handlers[action.type](state, action);
	}
	return state;
};

const convertArrayToMirrorAction = arr => arr.reduce((accu, cur) => ({
	...accu,
	[cur]: cur
}), {});

const createAsyncHttpAction = action => convertArrayToMirrorAction([action + "_REQUEST", action + '_SUCCESS', action + '_ERROR']);

const httpActionDispatcher = ({
	dispatch,
	actionName,
	payload = {},
	startActionPayload,
	requestPayload,
	successPayload,
	successParamName = 'data',
	method = 'get',
	url
}) => {

	startActionPayload = startActionPayload || payload;
	successPayload = successPayload || payload;
	requestPayload = requestPayload || payload;


	dispatch({
		type: actionName + '_REQUEST',
		...startActionPayload
	});

	method = method.toLowerCase();


	let http = get;
	if (method == 'post') http = post;
	else if (method == 'put') http = put;
	else if (method == 'delete') http = deletex;

	return http(url, requestPayload).then(

		result => {
			console.log('result is ', result);
			dispatch({
				type: actionName + '_SUCCESS',
				[successParamName]: result,
				...successPayload
			})
		},
		err => dispatch({
			type: actionName + '_ERROR',
			err
		})
	)


}

export {
	createReducer,
	convertArrayToMirrorAction,
	createAsyncHttpAction,
	httpActionDispatcher
};