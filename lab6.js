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

function getRequestObject() {
  if (window.XMLHttpRequest) {
    return(new XMLHttpRequest());
  } else {
    return(null);
  }
}

//Make an HTTP request to the given address. 
//Display result in the HTML element that has given ID.

function ajaxResult(address,row) {
  var request = getRequestObject();
  request.onreadystatechange = 
    function() { showResponseText(request,row); };
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
	if(weather.length == 3){
		var index = 0;
		if ((weather[0].location.name == "Phoenix" && weather[1].location.name == "Tokyo") || (weather[1].location.name == "Phoenix" && weather[0].location.name == "Tokyo")){
			index = 2;
		}else if((weather[0].location.name == "Phoenix" && weather[2].location.name == "Tokyo") || (weather[2].location.name == "Phoenix" && weather[0].location.name == "Tokyo")){
			index = 1;
		}
		weather[index] = content;
	}else {
		weather.push(content);
	}
	if (weather.length > 0) {
		var hottestCity = getHottestCity();
		var nicestCity = getNicestCity();
		document.getElementById("title1").innerHTML = "The average temperature is " + getAverageTemperature() + " and the hottest city is " + hottestCity;
		document.getElementById("title2").innerHTML = "The city with the nicest weather is " + nicestCity;
	}
  }
}

function getAverageTemperature(){
	var sum = 0.0;
	var avg = 0.0;
	
	for (var i=0; i< weather.length; i++) {
		sum = sum + weather[i].current.temp_f;
	}
	
	if (weather.length > 0)
		avg = sum/weather.length;
	
	//console.log("avg = " + avg);
	return avg.toFixed(2);

}

function getHottestCity(){
	
	var hot = 0.0;
	var city = "";
	
	//console.log("weather Hot " + weather.length);
	for (var i=0; i< weather.length; i++) {
		if (hot < weather[i].current.temp_f) {
			hot = weather[i].current.temp_f;
			city = weather[i].location.name;
		}
	}
	
	return city;

}

function getNicestCity(){
	var city;		//nicest city to be returned
	var bestScore = 0;	//best score out of all cities

	//nicest city ideal variables to be calculated
	var idealTemp = 75;
	var idealWind=10; 
	var idealHumidity= 50;
	
	var score = [0, 0, 0];	//score for each city

	//iterate through to calculate score
	for (var i =0; i < weather.length; i++){
		score[i] += Math.abs(weather[i].current.temp_f - idealTemp);
		score[i] += Math.abs(weather[i].current.wind_mph - idealWind);
		score[i] += Math.abs(weather[i].current.humidity - idealHumidity);
	}

	//iterate to find the best score
	for (var j = 0; j < score.length; j++){
		if (bestScore < score[j]){
			city = weather[j].location.name;
		}
	}

	return city;
}

function ajaxForecastResult(row) {
  var request = getRequestObject();
  var address;
  
  if(row == 2)
	  address = phoenixForecast;
  
  else if(row == 3)
	  address = tokyoForecast;
  
  else
	  address = currentForecast;
  
  request.onreadystatechange = 
    function() { showForecastText(request,row); };
  request.open("GET", address, true);
  request.send(null);
}

//Put response text in the HTML element that has given ID.
function showForecastText(request, row) {
  if ((request.readyState == 4) && (request.status == 200)) {
	var content = JSON.parse(request.responseText);
	var dayIndexNumber = -1;
	var nightIndexNumber = -1;
	
	for(var i in content.forecast.forecastday[0].hour){
		if(dayIndexNumber == -1 || nightIndexNumber == -1){
			if(content.forecast.forecastday[0].hour[i].is_day == 0)
				nightIndexNumber = i;
			if(content.forecast.forecastday[0].hour[i].is_day == 1)
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
	if(content.forecast.forecastday[0].hour[dayIndexNumber].will_it_rain == 0)
		document.getElementById("forecastSummaryDay").innerHTML += "<br>It likely won't rain.";
	else
		document.getElementById("forecastSummaryDay").innerHTML += "<br>It will likely rain.";
	if(content.forecast.forecastday[0].hour[dayIndexNumber].will_it_snow == 0)
		document.getElementById("forecastSummaryDay").innerHTML += "  It likely won't snow.";
	else
		document.getElementById("forecastSummaryDay").innerHTML += "  It will likely snow.";
	if(content.forecast.forecastday[0].hour[dayIndexNumber].cloud == 0)
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
	if(content.forecast.forecastday[0].hour[nightIndexNumber].will_it_rain == 0)
		document.getElementById("forecastSummaryNight").innerHTML += "<br>It likely won't rain.";
	else
		document.getElementById("forecastSummaryNight").innerHTML += "<br>It will likely rain.";
	if(content.forecast.forecastday[0].hour[nightIndexNumber].will_it_snow == 0)
		document.getElementById("forecastSummaryNight").innerHTML += "  It likely won't snow.";
	else
		document.getElementById("forecastSummaryNight").innerHTML += "  It will likely snow.";
	if(content.forecast.forecastday[0].hour[nightIndexNumber].cloud == 0)
		document.getElementById("forecastSummaryNight").innerHTML += "  It isn't very cloudy tonight.";
	else
		document.getElementById("forecastSummaryNight").innerHTML += "  It is very cloudy tonight.";
  }
}

function forecast(resultRegion){
	ajaxForecastResult(resultRegion);
}

function refresh(){
	ajaxResult(phoenixAddress,2);
	ajaxResult(tokyoAddress,3);
	ajaxResult(currentAddress,4);
	if (weather.length > 0) {
		var hottestCity = getHottestCity();
		var nicestCity = getNicestCity();
		document.getElementById("title1").innerHTML = "The average temperature is " + getAverageTemperature() + " and the hottest city is " + hottestCity;
		document.getElementById("title2").innerHTML = "The city with the nicest weather is " + nicestCity;
		weather.length = 0;
	}
}

function dropdown(city){
	if(city == "paris"){
		document.getElementById("41").innerHTML = "Paris";
		currentAddress = parisAddress;
		currentForecast = parisForecast;
	}
	else if(city == "florence"){
		document.getElementById("41").innerHTML = "Florence";
		currentAddress = florenceAddress;
		currentForecast = florenceForecast;
	}
	else if(city == "athens"){
		document.getElementById("41").innerHTML = "Athens";
		currentAddress = athensAddress;
		currentForecast = athensForecast;
	}
	else if(city == "honolulu"){
		document.getElementById("41").innerHTML = "Honolulu";
		currentAddress = honoluluAddress;
		currentForecast = honoluluForecast;
	}
	else{
		document.getElementById("41").innerHTML = "San Fransisco";
		currentAddress = sanfransiscoAddress;
		currentForecast = sanfransiscoForecast;
	}
	
	ajaxResult(currentAddress,4);
}

refresh();