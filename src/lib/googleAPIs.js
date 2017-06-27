const apiKey = 'AIzaSyAJAmwOGIGRlWliaI2YbW53FwvHerVfIaE';
const createGooglePlaceUrl = placeId => {

	let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;

	console.log('the url is 0000000,', url);
	return url

}

const createGoogleReverseGeocoingUrl = (latitude, longitude) => {
	let url = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${latitude},${longitude}`

	console.log('reverse geourl', url);
	return url;
}

const createGoogleAutoCompleteUrl = input => {
	let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=${encodeURI(input)}&key=${apiKey}`;
	console.log('autocomplete url', url);
	return url;
};

const googlePlaceDetail = placeId =>
	fetch(createGooglePlaceUrl(placeId))
	.then(r => r.json())
	.then(({
		result
	}) => {
		let {
			formatted_address: title
		} = result;
		let {
			location
		} = result.geometry;
		let geocode = {
			latitude: location.lat,
			longitude: location.lng
		};

		return {
			placeId,
			title,
			geocode
		};
	});



const reverseGeocoding = ({
		latitude,
		longitude
	}) =>
	fetch(createGoogleReverseGeocoingUrl(latitude, longitude))
	.then(r => r.json())
	.then(data => {
		let {
			results
		} = data;
		let firstAddress = results[0];
		let {
			formatted_address: title,
			place_id: placeId
		} = firstAddress;
		let geocode = {
			latitude: firstAddress.geometry.location.lat,
			longitude: firstAddress.geometry.location.lng
		};

		return {
			placeId,
			title,
			geocode
		}

	});

const getCurrentLocation = () => {
	return new Promise((resolve) => {

		navigator.geolocation.getCurrentPosition(pos => {
			let {
				coords
			} = pos;
			let {
				latitude,
				longitude
			} = coords;
			reverseGeocoding({
				latitude,
				longitude
			}).then(resolve);
		})
	});

}


const placeAutocompleteSearch = input =>
	fetch(createGoogleAutoCompleteUrl(input))
	.then(r => r.json())
	.then(data => {
		let { predictions } = data;
		return predictions.slice(0, 4).map(place => ({
			description: place.description,
			placeId: place.place_id
		}));
	})

export {
	googlePlaceDetail,
	reverseGeocoding,
	getCurrentLocation,
	placeAutocompleteSearch
};