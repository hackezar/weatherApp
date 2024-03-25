import cities from 'cities.json';
import { getWeather, getForecast } from './api';

export default function searchBarEventListeners() {

    function retreiveCityData(cityName, country) {
        let data = cities.filter((city) => city.name == cityName);
        return data;
    }

    function updateTitleDOM(data) {
        let titleDOM = document.getElementById('cityTitle');
        titleDOM.innerHTML = data[0].name;
    }


    let list = document.querySelectorAll('.item');
    list.forEach((element) => {
        element.addEventListener('click', () => {
            let data = element.innerHTML;
            data = data.split(', ');
            let cityName = data[0];
            let country = data[1];
            data = retreiveCityData(cityName, country);
            updateTitleDOM(data);
            getWeather(data);
            getForecast(data);
            document.getElementById('main').style.display = 'flex';
        })
    })
}