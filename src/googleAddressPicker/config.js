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

const getConfig = () => config;

export {
	init,
	config,
	getConfig,
}

