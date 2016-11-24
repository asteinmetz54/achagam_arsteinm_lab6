phoenixAddress = "http://api.apixu.com/v1/current.json?key=0097897ebbcd4590a0043811162011&q=Phoenix";
tokyoAddress = "http://api.apixu.com/v1/current.json?key=0097897ebbcd4590a0043811162011&q=Tokyo";
parisAddress = "http://api.apixu.com/v1/current.json?key=0097897ebbcd4590a0043811162011&q=Paris";
florenceAddress = "http://api.apixu.com/v1/current.json?key=0097897ebbcd4590a0043811162011&q=Florence";
athensAddress = "http://api.apixu.com/v1/current.json?key=0097897ebbcd4590a0043811162011&q=Athens";
honoluluAddress = "http://api.apixu.com/v1/current.json?key=0097897ebbcd4590a0043811162011&q=Honolulu";
sanfransiscoAddress = "http://api.apixu.com/v1/current.json?key=0097897ebbcd4590a0043811162011&q=San Francisco";
phoenixForecast = "http://api.apixu.com/v1/forecast.json?key=0097897ebbcd4590a0043811162011&q=Phoenix&days=1";
tokyoForecast = "http://api.apixu.com/v1/forecast.json?key=0097897ebbcd4590a0043811162011&q=Tokyo&days=1";
parisForecast = "http://api.apixu.com/v1/forecast.json?key=0097897ebbcd4590a0043811162011&q=Paris&days=1";
florenceForecast = "http://api.apixu.com/v1/forecast.json?key=0097897ebbcd4590a0043811162011&q=Florence&days=1";
athensForecast = "http://api.apixu.com/v1/forecast.json?key=0097897ebbcd4590a0043811162011&q=Athens&days=1";
honoluluForecast = "http://api.apixu.com/v1/forecast.json?key=0097897ebbcd4590a0043811162011&q=Honolulu&days=1";
sanfransiscoForecast = "http://api.apixu.com/v1/forecast.json?key=0097897ebbcd4590a0043811162011&q=San Francisco&days=1";

currentAddress = "http://api.apixu.com/v1/current.json?key=0097897ebbcd4590a0043811162011&q=Paris";
currentForecast = "http://api.apixu.com/v1/forecast.json?key=0097897ebbcd4590a0043811162011&q=Paris&days=1";
var weather = [];
var pastWeather = [];

function getRequestObject() {
	if (window.XMLHttpRequest) {
		return (new XMLHttpRequest());
	} else {
		return (null);
	}
}

//Make an HTTP request to the given address. 
//Display result in the HTML element that has given ID.

function ajaxResult(address, row) {
	var request = getRequestObject();
	request.onreadystatechange =
		function () { showResponseText(request, row); };
	request.open("GET", address, true);
	request.send(null);
}

//Put response text in the HTML element that has given ID.
function showResponseText(request, row) {
	if ((request.readyState == 4) && (request.status == 200)) {
		var content = JSON.parse(request.responseText);
		
		document.getElementById(row + "2").innerHTML = content.current.last_updated;
		document.getElementById(row + "3").innerHTML = content.current.temp_f;
		document.getElementById(row + "4").innerHTML = content.current.feelslike_f;
		document.getElementById(row + "5").innerHTML = content.current.humidity;
		document.getElementById(row + "6").innerHTML = content.current.wind_mph;
		document.getElementById(row + "7").innerHTML = content.current.condition.text;
		
		document.getElementById(row + "2").style.color = "black";
		document.getElementById(row + "3").style.color = "black";
		document.getElementById(row + "4").style.color = "black";
		document.getElementById(row + "5").style.color = "black";
		document.getElementById(row + "6").style.color = "black";
		document.getElementById(row + "7").style.color = "black";
		
		/*
		if(weather.length > 2){
				console.log("weather: " + weather[2].location.name + " content: " + content.location.name);
				
				weather[2].current.temp_f = 0;
				weather[2].current.feelslike_f = 0;
				weather[2].current.humidity = 0;
				weather[2].current.wind_mph = 0;
		}
		*/
		
		for(var i = 0; i < weather.length; i++){
			var j = i + 2;
			
			if(weather[i].location.name == content.location.name){
				
				var timeDifference = (Date.parse(content.current.last_updated) - Date.parse(weather[i].current.last_updated))/1000;

				if(timeDifference > 0)
					document.getElementById(j + "2").innerHTML = content.current.last_updated + " (+" + timeDifference + "s)";
				else if(timeDifference < 0)
					document.getElementById(j + "2").innerHTML = content.current.last_updated + " (-" + timeDifference + "s)";
			
				if (parseFloat(weather[i].current.temp_f) > parseFloat(content.current.temp_f))
					document.getElementById(j + "3").style.color = "blue";
				else if (parseFloat(weather[i].current.temp_f) < parseFloat(content.current.temp_f))
					document.getElementById(j + "3").style.color = "red";
				else
					document.getElementById(j + "3").style.color = "black";

				if (parseFloat(weather[i].current.feelslike_f) > parseFloat(content.current.feelslike_f))
					document.getElementById(j + "4").style.color = "blue";
				else if (parseFloat(weather[i].current.feelslike_f) < parseFloat(content.current.feelslike_f))
					document.getElementById(j + "4").style.color = "red";
				else
					document.getElementById(j + "4").style.color = "black";

				if (parseInt(weather[i].current.humidity) > parseInt(content.current.humidity))
					document.getElementById(j + "5").style.color = "blue";
				else if (parseInt(weather[i].current.humidity) < parseInt(content.current.humidity))
					document.getElementById(j + "5").style.color = "red";
				else
					document.getElementById(j + "5").style.color = "black";

				if (parseFloat(weather[i].current.wind_mph) > parseFloat(content.current.wind_mph))
					document.getElementById(j + "6").style.color = "blue";
				else if (parseFloat(weather[i].current.wind_mph) < parseFloat(content.current.wind_mph))
					document.getElementById(j + "6").style.color = "red";
				else
					document.getElementById(j + "6").style.color = "black";
			}
		}
		
		if (weather.length == 3) {
			var sameLocation = false;
			
			for(var i = 0; i < weather.length; i++){
				if(weather[i].location.name == content.location.name){
					weather[i] = content;
					sameLocation = true;
				}
			}
			
			// if this is a new location, make sure we save its content
			if(sameLocation == false){
				weather[2] = content;
			}
		}
		
		else
			weather.push(content);
		
		resetWeatherIndex();
			
		if (weather.length > 0){
			var hottestCity = getHottestCity();
			var nicestCity = getNicestCity();
			document.getElementById("title1").innerHTML = "The average temperature is " + getAverageTemperature() + " and the hottest city is " + hottestCity;
			document.getElementById("title2").innerHTML = "The city with the nicest weather is " + nicestCity;
		}
	}
}

function resetWeatherIndex(){
	var PhoenixContent = "";
	var TokyoContent = "";
	var OtherContent = "";
	
	if(weather.length == 3){
		for(var i = 0; i < weather.length; i++){
			if(weather[i].location.name == "Phoenix")
				PhoenixContent = weather[i];
			else if(weather[i].location.name == "Tokyo")
				TokyoContent = weather[i];
			else
				OtherContent = weather[i];
		}
		
		weather[0] = PhoenixContent;
		weather[1] = TokyoContent;
		weather[2] = OtherContent;
	}
}

function getAverageTemperature() {
	var sum = 0.0;
	var avg = 0.0;

	for (var i = 0; i < weather.length; i++) {
		sum = sum + weather[i].current.temp_f;
	}

	if (weather.length > 0)
		avg = sum / weather.length;

	//console.log("avg = " + avg);
	return avg.toFixed(2);

}

function getHottestCity() {

	var hot = 0.0;
	var city = "";

	//console.log("weather Hot " + weather.length);
	for (var i = 0; i < weather.length; i++) {
		if (hot < weather[i].current.temp_f) {
			hot = weather[i].current.temp_f;
			city = weather[i].location.name;
		}
	}

	return city;

}

function getNicestCity() {
	var city;		//nicest city to be returned
	var bestScore = 10000;	//best score out of all cities

	//nicest city ideal variables to be calculated
	var idealTemp = 70.0;
	var idealFeelsLike = 70.0;
	var idealWind = 10.0;
	var idealHumidity = 20;

	var score = [0, 0, 0];	//score for each city

	//iterate through to calculate score
	for (var i = 0; i < weather.length; i++) {
		score[i] += Math.abs(((weather[i].current.temp_f - idealTemp)/idealTemp)*10);
		score[i] += Math.abs(((weather[i].current.feelslike_f - idealFeelsLike)/idealFeelsLike)*10);
		score[i] += Math.abs(((weather[i].current.wind_mph - idealWind)/idealWind)*10);
		score[i] += Math.abs(((weather[i].current.humidity - idealHumidity)/idealHumidity)*10);
	}

	//iterate to find the best score
	// ideal city is the one with the lowest score
	if (weather.length == 3) {
		for (var j = 0; j < score.length; j++) {
			if (bestScore > score[j]) {
				bestScore = score[j];
				city = weather[j].location.name;
			}
		}
	}
	else
		city = "";

	return city;
}

function ajaxForecastResult(row) {
	var request = getRequestObject();
	var address;

	if (row == 2)
		address = phoenixForecast;

	else if (row == 3)
		address = tokyoForecast;

	else
		address = currentForecast;

	request.onreadystatechange =
		function () { showForecastText(request, row); };
	request.open("GET", address, true);
	request.send(null);
}

//Put response text in the HTML element that has given ID.
function showForecastText(request, row) {
	if ((request.readyState == 4) && (request.status == 200)) {
		var content = JSON.parse(request.responseText);
		var dayIndexNumber = -1;
		var nightIndexNumber = -1;

		for (var i in content.forecast.forecastday[0].hour) {
			if (dayIndexNumber == -1 || nightIndexNumber == -1) {
				if (content.forecast.forecastday[0].hour[i].is_day == 0)
					nightIndexNumber = i;
				if (content.forecast.forecastday[0].hour[i].is_day == 1)
					dayIndexNumber = i;
			}
		}

		document.getElementById("forecastSummaryDay").innerHTML = content.location.name + " Forecast<br><br>";

		document.getElementById("forecastSummaryDay").innerHTML += "Day<br>Time: " + content.forecast.forecastday[0].hour[dayIndexNumber].time;
		document.getElementById("forecastSummaryDay").innerHTML += "  Temperature (Fahrenheit): " + content.forecast.forecastday[0].hour[dayIndexNumber].temp_f;
		document.getElementById("forecastSummaryDay").innerHTML += "  Condition: " + content.forecast.forecastday[0].hour[dayIndexNumber].condition.text;
		document.getElementById("forecastSummaryDay").innerHTML += "<br>Wind (Miles per Hour): " + content.forecast.forecastday[0].hour[dayIndexNumber].wind_mph;
		document.getElementById("forecastSummaryDay").innerHTML += "  Wind Direction: " + content.forecast.forecastday[0].hour[dayIndexNumber].wind_dir;
		document.getElementById("forecastSummaryDay").innerHTML += "  Pressure (Inches): " + content.forecast.forecastday[0].hour[dayIndexNumber].pressure_in;
		document.getElementById("forecastSummaryDay").innerHTML += "  Precipitation (Inches): " + content.forecast.forecastday[0].hour[dayIndexNumber].precip_in;
		document.getElementById("forecastSummaryDay").innerHTML += "  Humidity: " + content.forecast.forecastday[0].hour[dayIndexNumber].humidity;
		document.getElementById("forecastSummaryDay").innerHTML += "<br>Feels Like (Fahrenheit): " + content.forecast.forecastday[0].hour[dayIndexNumber].feelslike_f;
		document.getElementById("forecastSummaryDay").innerHTML += "  Wind Chill (Fahrenheit): " + content.forecast.forecastday[0].hour[dayIndexNumber].windchill_f;
		document.getElementById("forecastSummaryDay").innerHTML += "  Heat Index (Fahrenheit): " + content.forecast.forecastday[0].hour[dayIndexNumber].heatindex_f;
		document.getElementById("forecastSummaryDay").innerHTML += "  Dewpoint (Fahrenheit): " + content.forecast.forecastday[0].hour[dayIndexNumber].dewpoint_f;
		if (content.forecast.forecastday[0].hour[dayIndexNumber].will_it_rain == 0)
			document.getElementById("forecastSummaryDay").innerHTML += "<br>It likely won't rain.";
		else
			document.getElementById("forecastSummaryDay").innerHTML += "<br>It will likely rain.";
		if (content.forecast.forecastday[0].hour[dayIndexNumber].will_it_snow == 0)
			document.getElementById("forecastSummaryDay").innerHTML += "  It likely won't snow.";
		else
			document.getElementById("forecastSummaryDay").innerHTML += "  It will likely snow.";
		if (content.forecast.forecastday[0].hour[dayIndexNumber].cloud == 0)
			document.getElementById("forecastSummaryDay").innerHTML += "  It isn't very cloudy tonight.";
		else
			document.getElementById("forecastSummaryDay").innerHTML += "  It is very cloudy tonight.";

		document.getElementById("forecastSummaryNight").innerHTML = "Night<br>Time: " + content.forecast.forecastday[0].hour[nightIndexNumber].time;
		document.getElementById("forecastSummaryNight").innerHTML += "  Temperature (Fahrenheit): " + content.forecast.forecastday[0].hour[nightIndexNumber].temp_f;
		document.getElementById("forecastSummaryNight").innerHTML += "  Condition: " + content.forecast.forecastday[0].hour[nightIndexNumber].condition.text;
		document.getElementById("forecastSummaryNight").innerHTML += "<br>Wind (Miles per Hour): " + content.forecast.forecastday[0].hour[nightIndexNumber].wind_mph;
		document.getElementById("forecastSummaryNight").innerHTML += "  Wind Direction: " + content.forecast.forecastday[0].hour[nightIndexNumber].wind_dir;
		document.getElementById("forecastSummaryNight").innerHTML += "  Pressure (Inches): " + content.forecast.forecastday[0].hour[nightIndexNumber].pressure_in;
		document.getElementById("forecastSummaryNight").innerHTML += "  Precipitation (Inches): " + content.forecast.forecastday[0].hour[nightIndexNumber].precip_in;
		document.getElementById("forecastSummaryNight").innerHTML += "  Humidity: " + content.forecast.forecastday[0].hour[nightIndexNumber].humidity;
		document.getElementById("forecastSummaryNight").innerHTML += "<br>Feels Like (Fahrenheit): " + content.forecast.forecastday[0].hour[nightIndexNumber].feelslike_f;
		document.getElementById("forecastSummaryNight").innerHTML += "  Wind Chill (Fahrenheit): " + content.forecast.forecastday[0].hour[nightIndexNumber].windchill_f;
		document.getElementById("forecastSummaryNight").innerHTML += "  Heat Index (Fahrenheit): " + content.forecast.forecastday[0].hour[nightIndexNumber].heatindex_f;
		document.getElementById("forecastSummaryNight").innerHTML += "  Dewpoint (Fahrenheit): " + content.forecast.forecastday[0].hour[nightIndexNumber].dewpoint_f;
		if (content.forecast.forecastday[0].hour[nightIndexNumber].will_it_rain == 0)
			document.getElementById("forecastSummaryNight").innerHTML += "<br>It likely won't rain.";
		else
			document.getElementById("forecastSummaryNight").innerHTML += "<br>It will likely rain.";
		if (content.forecast.forecastday[0].hour[nightIndexNumber].will_it_snow == 0)
			document.getElementById("forecastSummaryNight").innerHTML += "  It likely won't snow.";
		else
			document.getElementById("forecastSummaryNight").innerHTML += "  It will likely snow.";
		if (content.forecast.forecastday[0].hour[nightIndexNumber].cloud == 0)
			document.getElementById("forecastSummaryNight").innerHTML += "  It isn't very cloudy tonight.";
		else
			document.getElementById("forecastSummaryNight").innerHTML += "  It is very cloudy tonight.";
		
		// draw the forecast chart as well
		drawChart(content.forecast.forecastday[0].hour);
	}
}

function forecast(resultRegion) {
	ajaxForecastResult(resultRegion);
}


function dropdown(city) {
	if (city == "paris") {
		document.getElementById("41").innerHTML = "Paris";
		currentAddress = parisAddress;
		currentForecast = parisForecast;
	}
	else if (city == "florence") {
		document.getElementById("41").innerHTML = "Florence";
		currentAddress = florenceAddress;
		currentForecast = florenceForecast;
	}
	else if (city == "athens") {
		document.getElementById("41").innerHTML = "Athens";
		currentAddress = athensAddress;
		currentForecast = athensForecast;
	}
	else if (city == "honolulu") {
		document.getElementById("41").innerHTML = "Honolulu";
		currentAddress = honoluluAddress;
		currentForecast = honoluluForecast;
	}
	else {
		document.getElementById("41").innerHTML = "San Fransisco";
		currentAddress = sanfransiscoAddress;
		currentForecast = sanfransiscoForecast;
	}

	ajaxResult(currentAddress, 4);
}

function drawChart(forecastHour) {
	
	var hours = [];
	var temp = [];
	
	for (i=0; i<forecastHour.length; i++) {
		temp[i] = forecastHour[i].temp_f;
		var myDate = new Date(forecastHour[i].time);
		hours[i] = myDate.getHours();
	}
	
	var ctx = document.getElementById('myChart');
	if (ctx != null)
		var ctx = ctx.getContext('2d');
	
	if (ctx != null) {
		var myChart = new Chart(ctx, {
		  type: 'line',
		  //height: 30,
		  //width: 40,
		  data: {
			labels: hours,
			datasets: [{
			  label: 'forecast',
			  data: temp,
			  backgroundColor: "rgba(153,255,51,0.4)"
			}]
		  }
		});
	}
}

function refresh() {
	ajaxResult(phoenixAddress, 2);
	ajaxResult(tokyoAddress, 3);
	ajaxResult(currentAddress, 4);
	
	if (weather.length > 0) {
		var hottestCity = getHottestCity();
		var nicestCity = getNicestCity();
		document.getElementById("title1").innerHTML = "The average temperature is " + getAverageTemperature() + " and the hottest city is " + hottestCity;
		document.getElementById("title2").innerHTML = "The city with the nicest weather is " + nicestCity;
	}
	
}

refresh();