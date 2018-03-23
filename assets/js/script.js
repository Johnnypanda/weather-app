$(document).ready(function(){
	//get lat and long
	var loc, key, wd, fahr;
	//API key
	key = "12d10aff5c29b4947737f39b00533f83";
	//Fahrenheit temp
	fahr = false;

	//Render the data
	function render(wd){
		  	//Declare all necessary variables
  			var location, weather, temperature, icon;
  			location = wd.name;
  			weather = wd.weather[0].description.toUpperCase();
  			temperature = displayTemp(wd.main.temp, fahr);
  			icon = wd.weather[0].icon;

  			//Get the necessary information
  			$('#location').html(location);
  			$('#temperature').html(temperature);
  			$('#description').html(weather);
  			//Change the weather icon
  			$('#temperature').prepend('<div><img src="http://openweathermap.org/img/w/' + icon + '.png"></div>');
  			//TOGGLE Celsius or Fahrenheit on click
	}
	//Convert C in F
	function displayTemp(cTemp, f){
		////T(°F) = T(°C) × 9/5 + 32
		if(f) return Math.round(cTemp * 9/5 + 32) + " °F";
		return cTemp + " °C";
	}

	//Get the latitude and longtitude with API
	$.getJSON('https://ipinfo.io', function(d){

  		console.log("assigning the data...");
  		loc = d.loc.split(",");
  		//Get the weather API data (wd)
  		$.getJSON('http://api.openweathermap.org/data/2.5/weather?units=metric&lat='
  			+ loc[0] +'&lon=' + loc[1] + '&APPID=' + key, function(apiData){
  			wd = apiData;
  			render(apiData, fahr);

  			//Call the switch function, the tricky part is
  			//that we have to change the boolean value
  			$('#switch').click(function(){
  				fahr = !fahr;
  				render(wd, fahr);
  			});
  		});
	});
});

