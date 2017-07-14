import {combineEpics} from 'redux-observable';
import {fetchDurationEpic} from '../mapApp/mapEpics';

const rootEpic = combineEpics(
	fetchDurationEpic
);

export default rootEpic;