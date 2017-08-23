const selectIcon = (icon) => {
	if (icon === "clear-day"){
		return '/assets/imgs/clear-day.svg'
	} else if (icon === "clear-night") {
		return '/assets/imgs/clear-night.svg'
	} else if (icon === "rain") {
		return '/assets/imgs/rain.svg'
	} else if (icon === "snow") {
		return '/assets/imgs/snow.svg'
	} else if (icon === "sleet") {
		return '/assets/imgs/sleet.png'
	} else if (icon === "wind") {
		return '/assets/imgs/wind.svg'
	} else if (icon === "fog") {
		return '/assets/imgs/fog.svg'
	} else if (icon === "cloudy") {
		return '/assets/imgs/cloud.svg'
	} else if (icon === "partly-cloudy-day") {
		return '/assets/imgs/partly_cloudy_day.svg'
	} else if (icon === "partly-cloudy-night") {
		return '/assets/imgs/partly_cloudy_night.svg'
	} else if (icon === "hail") {
		return '/assets/imgs/hail.svg'
	} else if (icon === "thunderstorm") {
		return '/assets/imgs/rain.svg'
	} else if (icon === "tornado") {
		return '/assets/imgs/tornado.svg'
	} else {``
		return '/assets/imgs/cloud.svg'
	}

}


module.exports = {
	selectIcon
}