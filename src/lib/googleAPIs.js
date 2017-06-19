
const createGooglePlaceUrl = placeId => {

	let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyAJAmwOGIGRlWliaI2YbW53FwvHerVfIaE`;

	console.log('the url is 0000000,', url);
	return url

}

const googlePlaceDetail = placeId =>
	fetch(createGooglePlaceUrl(placeId))
		.then(r => r.json())
		.then(data => {
			console.log('from place api ', data);
			return data.result;
		});


export {
	googlePlaceDetail
};