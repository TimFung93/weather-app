const request = require('request');


const myKey = require('./../config.json');
const key = myKey.key



const getWeather = (addressObject, callBack) => {
	request({
		url: `https://api.darksky.net/forecast/${key}/${addressObject.lat},${addressObject.lng}`,
		json: true
	}, (error, res, body) => {
		if (!error && res.statusCode === 200) {
			//callBack(`The Current Temperature in ${addressObject.address} is ${body.currently.temperature} fahrenheit but it feels like ${body.currently.apparentTemperature} fahrenheit`)
			callBack(undefined, {
				currentTemp: body.currently.temperature,
				apparentTemp : body.currently.apparentTemperature
			})
		} else {
			console.log(res.statusCode)
			callBack('Unable to connect to API server')
		}
	});
};

module.exports = {
	getWeather
}



//${addressObject.lat},${addressObject.lng}`
// Lat: 43.8115993

// Longitude: -79.2702091