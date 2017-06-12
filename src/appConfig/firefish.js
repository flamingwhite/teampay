let firebase = require('firebase');
let Rx = require('rxjs/Rx');
let {
	curry
} = require('ramda');

let app = null;
let connect = config => app = firebase.initializeApp(config);

var config = {
	apiKey: "AIzaSyDhghirxL19-LekWjgvfq4uLGXOO_zDeRo",
	authDomain: "justdemo-ac305.firebaseapp.com",
	databaseURL: "https://justdemo-ac305.firebaseio.com",
	projectId: "justdemo-ac305",
	storageBucket: "justdemo-ac305.appspot.com",
	messagingSenderId: "338492799528"
};
firebase.initializeApp(config);


let rxOn = (target, event) => Rx.Observable.create(obs => {
	target.on(event, evt => {
		obs.next(evt);
	});
});

let getRef = refOrPath => typeof refOrPath == 'string' ? firebase.database().ref(refOrPath) : refOrPath;

let fireStream = refOrPath => {
	refOrPath = getRef(refOrPath);
	return rxOn(refOrPath, 'value').map(value => value.val() || {});
};

let fireArrayStream = refOrPath => fireStream(refOrPath).map(data => Object.entries(data || {}).map(([_id, value]) => ({
	_id,
	...value
})));

fireArrayStream('users/').subscribe(v => console.log(v));

let firePush = curry((refOrPath, data) => {
	let ref = getRef(refOrPath);
	let newRecord = ref.push();
	newRecord.set({ ...data
	});
});

let fireUpdate = curry((refOrPath, data) => getRef(refOrPath).set(data));

let fireRemoveById = curry((refOrPath, _id) => getRef(refOrPath).child(_id).remove());


let fireOnce = refOrPath => {
	let ref = getRef(refOrPath);
	return Rx.Observable.create(obs => {
		ref.once('value').then(data => {
			obs.next(data.val());
			obs.complete();
		});
	});
}

let fireArrayOnce = refOrPath => fireOnce(refOrPath).map(data => Object.entries(data).map(([_id, value]) => ({
	_id,
	...value
})));

// let fireUpdateById = curry((refOrPath, _id, patch) => {
// 	let ref = getRef(refOrPath);
// 	return ref.child(_id).update(patch);
// })

let fireUpdateById = curry((refOrPath, _id, patch) => getRef(refOrPath).child(_id).update(patch));

let fireRef = refOrPath => {
	let ref = getRef(refOrPath);
	return {
		stream: () => fireStream(ref),
		arrayStream: () => fireArrayStream(ref),
		once: () => fireOnce(ref),
		arrayOnce: () => fireArrayOnce(ref),
		push: firePush(ref),
		removeById: fireRemoveById(ref),
		updateById: fireUpdateById(ref)
	};
}


module.exports = {
	connect,
	firebase,
	fireRef,
	fireStream,
	fireArrayStream,
	fireUpdate,
	fireRemoveById
};