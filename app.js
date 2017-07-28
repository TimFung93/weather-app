const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');


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
 
let address = argv.address

geocode.geoCodeAddress(address, (error, addressResults) => {
	if(error) console.log(error)
	else {
		console.log(addressResults.address)
		weather.getWeather(addressResults, (error, weatherResults) => {
			if(error) console.log(error)
				else {
					//console.log(JSON.stringify(weatherResults, undefined, 2))
					console.log(`Right now its ${weatherResults.currentTemp} but it feels like ${weatherResults.apparentTemp}.`)
				}
		})
	}
});







