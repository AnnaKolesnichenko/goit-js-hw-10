const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountry(country) {
    return fetch(`${BASE_URL}${country}`)
    .then(response => response.json());
   // .catch(error => console.log(error));
     
}


export default {fetchCountry};


