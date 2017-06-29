export const addIcon = require('./add_black_16.png');
export const backIcon = require('./back_black_16.png');



// icons.js
import Ionicons from 'react-native-vector-icons/Ionicons';

const iconColor = 'black';
const iconSize = 32;

const icons = {};

export function loadIcon(config) {
	let name, color = iconColor,
		size = iconSize;
	if (typeof config == 'string') {
		name = config;
	} else {
		name = config.name;
		if (config.iconColor) color = config.iconColor;
		if (config.iconSize) size = config.iconSize;
	}

	console.log('indiv', config);
	return Ionicons.getImageSource(name, size, color);
}

export async function loadIcons(configs) {
	console.log('icon configs', configs);
	const tasks = configs.map((config) => loadIcon(config));
	const results = await Promise.all(tasks);
	const set = results.map((item, index) => ({
		[configs[index]]: item
	}));
	console.log('settt', set)
	console.log( Object.assign(icons, ...set))
	return Object.assign(icons, ...set);
}

export function getIcon(name) {
	return icons[name];
}