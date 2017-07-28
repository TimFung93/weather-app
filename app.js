const axios = require('axios');
const yargs = require('yargs');

const myKey = require('./config.json');
const key = myKey.key


const argv = yargs
	.options({
		a: {
			demand: true,
			describe: 'Address to fetch weather for',
			alias: 'address',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;
 
let encodedUrl = encodeURIComponent(argv.address)
let geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedUrl}`

axios.get(geoCodeUrl)
	.then(res => {
		if (res.data.status === 'ZERO_RESULTS') {
			throw new Error('Unable to find that address')
		}
		let lat = res.data.results[0].geometry.location.lat
		let lng = res.data.results[0].geometry.location.lng
		let weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}`
		console.log(res.data.results[0].formatted_address)
		return axios.get(weatherUrl);
	})
	.then(res => {
		let temperature = Math.round((res.data.currently.temperature - 32) * 0.5556)
		let apparentTemperature = Math.round((res.data.currently.apparentTemperature - 32 ) * 0.5556)
		console.log(`It's currently ${temperature} degrees. It feels liks ${apparentTemperature} degrees`)
	})
	.catch(err => {
		if (err.code === 'ENOTFOUND') {
			console.log('Unable to connect to API server')
		} else {
			console.log(err.message)
		}
	
	});





