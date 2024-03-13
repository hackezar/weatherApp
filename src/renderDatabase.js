import cities from 'cities.json';

export  function autocompleteMatch(input) {

    function renderDatabase() {
        let citiesData = [];
        //gets the name of each city from database and adds it to an array
        for (let i=0; i<cities.length; i++) {
            citiesData.push(cities[i].name);
        }
        return citiesData;
    }

    let searchTerms = renderDatabase();

    if(input =='') {
        return[];
    }
    let reg = new RegExp(input);
    return searchTerms.filter(function(term) {
        if (term.match(reg)) {
            return term;
        }
    });
}

export function showResults(val) {
    let res = document.getElementById('result');
    res.innerHTML = '';
    let list = '';
    let terms = autocompleteMatch(val);
    for (let i=0; i<terms.length; i++) {
        list += '<li>' + terms[i] + '</li>';
    }
    res.innerHTML = '<ul>' + list + '</ul>';
}

export function keyUpEventListener() {
    document.getElementById('q').addEventListener('keyup', () => {
        showResults(document.getElementById('q').value);
    })
}