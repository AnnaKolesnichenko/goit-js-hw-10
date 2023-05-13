import './css/styles.css';
import importFetch from './fetchCountries';
import debounce from 'debounce';
import Notiflix from 'notiflix';


const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

function onInputSearch(e) {
    e.preventDefault();

    const inputQuery = countryInput.value

    if(inputQuery.length <= 2) {
        Notiflix.Notify.info('Please narrow oyur search by entering more symbols');
        return;
    }
    importFetch.fetchCountry(inputQuery)
    .then(result => console.log(result))
    .then(renderListOfCountries)
    .catch(error => console.log(error));
}


function renderListOfCountries(country) {

    console.log(`hello from ${country}`);
    console.log(` ${population}`);
}

countryInput.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));


/*https://restcountries.com/v3.1/{service}?fields={field},{field},{field}
https://restcountries.com/v3.1/all?fields=name,capital,currencies*/







