import { AppStateActions } from './appStateActionCreator';
import {createReducer} from '../lib/simpleReduxTool';


const appStateHandler = {
	[AppStateActions.APP_STATE_CHANGE]: (state, action) => ({
		...state,
		states: state.states.concat(action.nextState)
	})
};

const appActionReducer = createReducer(appStateHandler, { states: [] });

export default appActionReducer;

