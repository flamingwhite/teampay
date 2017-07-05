let config = {
	stateChunkName: 'addressChunk',
	showRecent: true

}

const init = opts => {
	config = {
		...config,
		...opts
	};
}

export {
	init,
	config
}

