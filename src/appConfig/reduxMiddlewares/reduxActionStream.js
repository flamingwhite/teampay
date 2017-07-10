import Rx from 'rxjs/Rx';

const reduxActionStream = new Rx.Subject();

const reduxActionStreamMiddleware = store => next => action => {

	console.log('logging action---middleware', action);

	reduxActionStream.next(action);

	return next(action);
}


export {
	reduxActionStreamMiddleware,
	reduxActionStream
}
