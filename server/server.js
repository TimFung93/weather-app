const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');


const app = express();


const myKey = require('./../config.json');
const {responses} = require('./responses/responses');
const key = myKey.key


const port = process.env.PORT || 8080;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, './../public')));





app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




app.get('/', (req, res) => {
	res.render('home')
});


app.get('/weather/:address', (req, response) => {
	let formatted_address;
	const address = req.query.address


	let encodedUrl = encodeURIComponent(address)
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
			formatted_address = res.data.results[0].formatted_address
			return axios.get(weatherUrl)
		}).then(res => {
			let temperature = Math.round((res.data.currently.temperature - 32) * 0.5556)
			let apparentTemperature = Math.round((res.data.currently.apparentTemperature - 32 ) * 0.5556)
			let description = res.data.minutely.summary
			let responsesDescriptions = responses(temperature)
			console.log(`It's currently ${temperature} degrees. It feels liks ${apparentTemperature} degrees`)
			if(temperature >= 23) {
				response.render('hot', {
					temperature,
					apparentTemperature,
					formatted_address,
					description,
					responsesDescriptions
				});
			} else if(temperature  <= 22 && temperature >= 15) {
				response.render('cool', {
					temperature,
					apparentTemperature,
					formatted_address,
					description,
					responsesDescriptions
				});
			}	
		}).catch(err => {
			if (err.code === 'ENOTFOUND') {
				console.log('Unable to connect to API server')
			} else {
				console.log(err.message)
			}
		})
});




app.listen(port , () => {
	console.log(`localhost started on ${port}`)
});