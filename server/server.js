const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const hbs = require('hbs');
const moment = require('moment');


const {responses} = require('./responses/responses');
const {calc_celsius} = require('./responses/calc_celsius');
const {selectIcon} = require('./responses/selectIcon');

const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname,'../views/partials')
const app = express();


// const myKey = require('./../config.json');
// const key = myKey.key
const port = process.env.PORT || 8080;

app.set('view engine', 'hbs');
app.use(express.static(publicPath))



hbs.registerPartials(partialsPath)

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
				return new Error('Unable to find that address')
			}
			let lat = res.data.results[0].geometry.location.lat
			let lng = res.data.results[0].geometry.location.lng
			let weatherUrl = `https://api.darksky.net/forecast/a422c5839ded8434ccba6e5167dc91ad/${lat},${lng}`
			console.log(res.data.results[0].formatted_address)
			formatted_address = res.data.results[0].formatted_address
			return axios.get(weatherUrl)
		}).then(res => {
			// const convert celciuis
			const currentTime = moment().valueOf()
			const formattedTime = moment(currentTime).format('h:mm A')
			const currentIcon = selectIcon(res.data.currently.icon)
			const temperature = calc_celsius(res.data.currently.temperature)
			const apparentTemperature = calc_celsius(res.data.currently.apparentTemperature)
			const description = res.data.hourly.summary
			const responsesDescriptions = responses(temperature)
			console.log(`It's currently ${temperature} degrees. It feels liks ${apparentTemperature} degrees`)
			if(temperature >= 23) {
				response.render('hot', {
					temperature,
					apparentTemperature,
					formatted_address,
					description,
					responsesDescriptions,
					currentIcon,
					formattedTime

				});
			} else if(temperature  <= 22 && temperature >= 15) {
				response.render('cool', {
					temperature,
					apparentTemperature,
					formatted_address,
					description,
					responsesDescriptions,
					currentIcon,
					formattedTime
				});
			} else if (temperature <= 15 && temperature >= 3) {
				response.render('cold', {
					temperature,
					apparentTemperature,
					formatted_address,
					description,
					responsesDescriptions,
					currentIcon,
					formattedTime
				})
			} else {
					response.render('veryCold', {
					temperature,
					apparentTemperature,
					formatted_address,
					description,
					responsesDescriptions,
					currentIcon,
					formattedTime
				})
			}	
		}).catch(err => {
			if (err.code === 'ENOTFOUND') {
				return 'Network error'
			} else {
				return err.message
			}
		})
});


app.listen(port , () => {
	console.log(`localhost started on ${port}`)
});