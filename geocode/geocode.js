const request = require('request');



const geoCodeAddress = (address, callBack) => {
	let encodedURL = encodeURIComponent(address)
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}`,
		json: true
	}, (err, res, body) => {
		if (err) {
			callBack('Error has occured, unable to connect to Google Servers')
		} else if (body.status === 'ZERO_RESULTS') {
			callBack('Unable to find that address')
		} else {
			callBack(undefined, {
				address: body.results[0].formatted_address,
				lat:body.results[0].geometry.location.lat,
				lng:body.results[0].geometry.location.lng
			})
			// console.log(JSON.stringify(res, undefined, 2))			
		};
	});
};

module.exports = {
	geoCodeAddress
}