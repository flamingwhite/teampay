import {
	createGoogleAutoCompleteUrl,
	createGooglePlaceUrl,
	createGoogleReverseGeocodingUrl,
	createTrafficDurationUrl,
	parseGooglePlaceDetail,
	parseAutocompleteAddress,
	parseLines
} from './addressUtil';
import PolylineParser from 'polyline';

const googlePlaceDetail = placeId =>
	fetch(createGooglePlaceUrl(placeId))
	.then(r => r.json())
	.then(({
		result
	}) => {
		console.log('resulttt', result);
		const {
			formatted_address: title
		} = result;
		const {
			location
		} = result.geometry;
		const geocode = {
			latitude: location.lat,
			longitude: location.lng
		};
		const parts = parseGooglePlaceDetail(result.address_components);

		const lines = parseLines(parts);

		return {
			placeId,
			title,
			geocode,
			parts,
			...lines
		};
	});



const reverseGeocoding = ({
		latitude,
		longitude
	}) =>
	fetch(createGoogleReverseGeocodingUrl(latitude, longitude))
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

		const parts = parseGooglePlaceDetail(firstAddress.address_components);

		const { firstLine, secondLine } = parseLines(parts);

		return {
			placeId,
			title,
			geocode,
			parts,
			firstLine,
			secondLine
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
			}).then(data => {
				console.log('currrrrr', data);
				resolve(data)
			});
		})
	});

}


const placeAutocompleteSearch = input =>
	fetch(createGoogleAutoCompleteUrl(input))
	.then(r => r.json())
	.then(data => {
		let {
			predictions
		} = data;
		console.log('predi', predictions);
		return predictions.slice(0, 4).map(place => ({
			description: place.description.slice(0, place.description.lastIndexOf(',')),
			placeId: place.place_id,
			parts: parseAutocompleteAddress(place.terms)
		}));
	})

const trafficDuration = (placeIdOne, placeIdTwo) =>
	fetch(createTrafficDurationUrl(placeIdOne, placeIdTwo))
	.then(r => r.json())
	.then(r => {
		console.log('duration', r);
		let {
			routes
		} = r;
		let { legs } = routes[0];
		let leg = legs[0];
		let { distance, duration, duration_in_traffic } = leg;
		console.log(distance, duration, duration_in_traffic);
		console.log('polyline raw', routes[0].overview_polyline);
		console.log(PolylineParser.decode(routes[0].overview_polyline));
		
		return {
			distance: distance.text,
			duration: duration.text,
			durationInTraffic: duration_in_traffic.text,
			polyline: PolylineParser.decode(routes[0].overview_polyline.points)
				.map(([latitude, longitude]) => ({
					latitude,
					longitude
				})),
		};
	})

export {
	googlePlaceDetail,
	reverseGeocoding,
	getCurrentLocation,
	placeAutocompleteSearch,
	trafficDuration
};