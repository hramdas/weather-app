function getWeather(){
    // after button click
    var cityName = document.querySelector(".inputText").value;

    fetch("https://meta-weather.vercel.app/api/location/search/?query="+cityName)
        .then(function weather(data){
            return data.json();
        })
        .then(function weather(data){
            var woeId = data[0].woeid;


            fetch("https://meta-weather.vercel.app/api/location/"+woeId+"/")
                .then(function weather(data){
                    return data.json();
                })
                .then(function weather(data){
                    console.log(data)
                    var cityTitle = data.title;
                    var country = data.parent.title;
                    var date = getDate(data.time);

                    var weatherData = data.consolidated_weather[0];
                    var generalWeather = weatherData.weather_state_name;
                    var temp = weatherData.the_temp;
                    var humidity  = weatherData.humidity;
                    var wind = weatherData.wind_speed;

                    
                    console.log(cityTitle, country, date, generalWeather, temp);

                    var cityElement = document.querySelector(".city-name");
                    cityElement.textContent = cityTitle;

                    var countryElement = document.querySelector(".country");
                    countryElement.textContent = country;

                    var subtitleTextElement = document.querySelector(".subtitle");
                    subtitleTextElement.textContent = date + ", " + generalWeather;

                    var tempElement = document.querySelector(".temperature");
                    tempElement.textContent = temp + "°C";
                    
                    var humidityEl = document.querySelector("#humidity");
                    humidityEl.textContent = "humidity: " + humidity + "%";

                    var windEl = document.querySelector("#wind");
                    windEl.textContent = "wind: " + parseInt(wind) + " Km/h"
                })

        })

}

//Datetime
function getDate(dateString){
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(dateString);
    return `${days[d.getDay()]}, ${d.toLocaleTimeString('en-US', {hour: 'numeric', minute:'numeric'})}`;
}