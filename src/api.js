import { kelvinToFarenheight, metersPerSecondToMilesPerHour } from "./temperatureConversions";

export const getWeather = async (data) => {
    try{
    let units = 'imperial'
    let lat = data[0].lat;
    let long = data[0].lng;
    let api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=c4597d4293ed36523bdcd0b9b6ea8a63&units=' + units;
    await fetch(api, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            updateWeatherDOM(response);
        })
    } catch(error) {
        console.log(error);
    }
}

export const getForecast = async (data) => {
    try {
        let lat = data[0].lat;
        let long = data[0].lng;
        let api = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=c4597d4293ed36523bdcd0b9b6ea8a63';
        await fetch(api, {mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            updateForecastDOM(response);
        })
    } catch(error) {
        console.log(error);
    }
}


export function updateWeatherDOM(val) {
    console.log(val);
    let temp = document.getElementById('temperature');
    let humidity = document.getElementById('humidity');
    let pressure = document.getElementById('pressure');
    let wind = document.getElementById('wind');
    let weather = document.getElementById('weather');
    // Convers base unit of kelvin to farenheight and outputs that value. Default is Kelvin
    temp.innerHTML = 'Temperature: ' + kelvinToFarenheight(val.main.temp).toFixed(1) + ' F';

    // Default is %
    humidity.innerHTML = 'Humidity: ' + val.main.humidity + '%';
    // Default is hPa
    pressure.innerHTML = 'Air Pressure: ' + val.main.pressure + ' hPa';
    // Default is meters per second
    wind.innerHTML = "Wind: " + metersPerSecondToMilesPerHour(val.wind.speed) + ' mph';
    
    weather.innerHTML = "Weather: " + val.weather[0].description;
}

export function updateForecastDOM(val) {
    document.getElementById('forecastContainer').innerHTML = "";
    let forecastCount = 8;
    for (let i = 0; i < forecastCount; i++) {
        let container = document.getElementById('forecastContainer');
        let forecastDiv = document.createElement('div');
        forecastDiv.setAttribute('class', 'forecastDiv');
        let time = document.createElement('div');
        time.setAttribute('class', 'forecastData');
        time.innerHTML = "UTC: " + val.list[i].dt_txt;
        let temp = document.createElement('div');
        temp.setAttribute('class', 'forecastData');
        temp.innerHTML = 'Temp: ' + val.list[i].main.temp + ' F';
        let weather = document.createElement('div');
        weather.setAttribute('class', 'forecastData');
        weather.innerHTML = 'Weather: ' + val.list[i].weather[0].description;
        let wind = document.createElement('div');
        wind.setAttribute('class', 'forecastData');
        wind.innerHTML = 'Wind: ' + val.list[i].wind.speed.toFixed(0) + ' MPH, with gusts up to ' + val.list[i].wind.gust.toFixed(0) + ' MPH.'
        forecastDiv.appendChild(time);
        forecastDiv.appendChild(temp);
        forecastDiv.appendChild(weather);
        forecastDiv.appendChild(wind);
        container.appendChild(forecastDiv);
    }
}