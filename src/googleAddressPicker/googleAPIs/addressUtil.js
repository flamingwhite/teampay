import R from 'ramda';

const apiKey = 'AIzaSyAJAmwOGIGRlWliaI2YbW53FwvHerVfIaE';

export const createGooglePlaceUrl = placeId => `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

export const createGoogleReverseGeocodingUrl = (latitude, longitude) => `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${latitude},${longitude}`

export const createGoogleAutoCompleteUrl = input => `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeURI(input)}&key=${apiKey}`;

export const createTrafficDurationUrl = (placeIdOne, placeIdTwo) =>
	`https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${placeIdOne}&destination=place_id:${placeIdTwo}&key=${apiKey}&departure_time=now`;


export const parseGooglePlaceDetail = addressComponent => {
	let map = {
		number: 'street_number',
		street: 'route',
		city: 'locality',
		state: 'administrative_area_level_1',
		country: 'country',
		'postal': 'postal_code'
	};

	return Object.entries(map).reduce((acc, cur) => {
		let [key, name] = cur;

		let fou = addressComponent.find(ac => ac.types.includes(name));
		if (fou) {
			acc[key] = fou.short_name;
		}
		return acc;
	}, {});
};

export const parseAutocompleteAddress = terms => {
	let map = ['country', 'state', 'city', 'street', 'number'];
	let parts = {};
	terms.reverse().forEach((data, idx) => {
		parts[map[idx]] = data.value;
	});

	console.log('partssss', parts);
	return parts;
}

export const parseLines = parts => {
	let { number = '', street = '', city, state } = parts;
	let firstLine, secondLine;

	if (street) {
		firstLine = `${number} ${street}`;
		secondLine = `${city}, ${state}`;
	} else {
		firstLine = city;
		secondLine = state;
	}
	return {
		firstLine,
		secondLine
	};
};

export const shortTitleFromAddressParts = parts => {
	let {
		number = '', street = '', city, state
	} = parts;
	if (street) return `${number} ${street}`;
	return `${city}, ${state}`
}