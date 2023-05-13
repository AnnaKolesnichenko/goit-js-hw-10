import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import _debounce from 'debounce';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryTitle = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function onInputSearch(e) {
    e.preventDefault();

    const inputQuery = searchInput.value.trim();

    fetchCountries.fetchCountry(inputQuery)
    .then(countries => {
        countryTitle.innerHTML = '';
        countryInfo.innerHTML = '';

        if(countries.length >= 10) {
            onNarrowSearch();

        } else if (inputQuery.trim() === '') {
            countryTitle.innerHTML = '';
            countryInfo.innerHTML = '';
            
        } else if(countries.length > 1) {
            countryTitle.insertAdjacentHTML('beforeend', renderCountryTitle(countries));

        } else if(countries.length === 1) {
            countryTitle.insertAdjacentHTML('beforeend', renderCountryTitle(countries));
            countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
        }  
    })
    .catch(onErrorAlert);
}

function renderCountryTitle(countries) {
    const titleMarkUp = countries.map(({flags, name}) => {
        return `
                <li class="list-item" >
                    <img class="list-item_flag" src="${flags.svg}" alt="${name}" >
                    <h1 class="list-item_name"><b>${name.official}</b></h1> 
                </li>
        `
    }).join('');
    return titleMarkUp;
}

function renderCountryInfo(countries) {
    const infoMarkUp = countries.map(({capital, population, languages}) => {
        const lang = Object.values(languages);
        return `
                <ul class="country list">
                    <li class="country-capital"><p><b>Capital</b>: ${capital}</p></li>
                    <li class="country-population"><p><b>Populaiton</b>: ${population}</p></li>
                    <li class="country-langs"><b>Languages</b>: ${lang}</li>
                </ul>
        `
        }).join('');
        return infoMarkUp;
}


function onNarrowSearch() {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}

function onErrorAlert() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}

searchInput.addEventListener('input', _debounce(onInputSearch, DEBOUNCE_DELAY));