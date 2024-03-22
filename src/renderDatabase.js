import cities from 'cities.json';
import autoCompleteSearchBarEventListeners from './cityLookup';

export  function autocompleteMatch(input) {


    function renderDatabase() {
        let citiesData = [];
        //gets the name of each city from database and adds it to an array
        for (let i=0; i<cities.length; i++) {
            citiesData.push(cities[i]);
        }
        return citiesData;
    }

    let searchTerms = renderDatabase();

    if(input =='') {
        return[];
    }
    let reg = new RegExp;

    const autoCompleteOptions = (cities) => {
            return cities.filter(c => {
            let city = c.name;
            city = city.toLowerCase();
            return city.includes(input.toLowerCase());
        });
    };
    return autoCompleteOptions(searchTerms);
}

export function showResults(val) {
    let res = document.getElementById('result');
    res.innerHTML = '';
    if (val.length < 3) {
        return;
    } else {
    let list = '';
    let terms = autocompleteMatch(val);
    // HOW MANY SEARCH RESULTS TO DISPLAY //
    let resultAmount = 10
    //
    // For function adds a list item for every term
    for (let i=0; i<terms.length; i++) {
        //Stops addin to list if the list length is greater than resultAmount
            if (i >= resultAmount) {        
            res.innerHTML = '<ul id="searchList">' + list + '</ul>';
            return;
        }
        list += '<li id="item' + i + '" class="item">' + terms[i].name + ', ' + terms[i].country + '</li>';
    }
    res.innerHTML = '<ul id="searchList">' + list + '</ul>';
    };
};


export function searchBarKeyUpEventListener() {
    document.getElementById('q').addEventListener('keyup', () => {
        showResults(document.getElementById('q').value);
        autoCompleteSearchBarEventListeners();
    });
}