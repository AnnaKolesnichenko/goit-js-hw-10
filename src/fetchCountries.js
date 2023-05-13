const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountry(country) {
    return fetch(`${BASE_URL}/name/${country}`)
    .then(response => response.json())
     
}

export default {fetchCountry};


