var {Observable} = require('rxjs/Rx');
var R = require('ramda');

var a =Observable.of(1, 2, 3).map(a => {
	console.log('a, pressed', a);
	return a+1
})

a.subscribe(console.log)

