import R from 'ramda';


class Maybe {
	constructor(v) {
		this._value = v;
	}

	static of(v) {
		return new Maybe(v);
	}

	_isNothing() {
		return this._value === null || this._value === undefined;
	}

	map(f) {
		return this._isNothing() ? Maybe.of(null) : Maybe.of(f(this._value));
	}
}

Maybe.of({ id: 3 }) .map(R.assoc('name', 'yong')).map(R.prop('name')).map(R.prop('hel')).map(R.prop('dd'))

Maybe.of({ id: 3 }) .map(R.pipe(R.prop('id'), R.prop('name'), R.prop('dd')))


class Pro {

	constructor(f) {
		this.stack = R.identity;
		this.stack = this.stack.bind(this);

		this._status = 'pending';
		f(d => {
			this._status = 'fulfill';
			this.stack(d);
		}, () => {
			this._status = 'reject';
			console.log('pro reject');
		});
	}

	static resolve(d) {
		return new Pro((res, re) => res(d))
	}

	then(f) {
		this.stack = R.compose(f, this.stack);
		return this;
	}
}

var p = new Pro((res, rej) => {
	setTimeout(() => {
		console.log('2000, res');
		res(300);
	}, 2000)
}).then(d => d + 200).then( d => d+200).then(d => d+300) .then(console.log)

var p2=Pro.resolve('dffff').then(console.log)


