const responses = (temperature) => {

	if(temperature >= 23) {
		return "Pretty hot. T-shirt and shorts are recommended"
	} else if(temperature  <= 22 && temperature >= 15) {
		return "Pretty cool. You might be able to get away with a long sleeve"
	} else if(temperature <= 14 && temperature >= 3) {
		return "Chilly, recommend a jacket. Or very thick sweater..."
	} else {
		return "Very Chilly, recommend a thick jacket"
	}

}

module.exports = {
	responses
}