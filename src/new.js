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

    const inputQuery = countryInput.value;

    importFetch.fetchCountry(inputQuery)
    .then(countries => {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';

        if (countries.length >= 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

        } else if (inputQuery.trim() === '') {
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            
        } else if ( countries.length > 1) {
            countryList.insertAdjacentHTML('beforeend', renderOneCountry(countries));

        } else if(countries.length === 1) {
            countryList.insertAdjacentHTML('beforeend', renderOneCountry(countries));
            countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
        }

        console.log(countries)})
        .catch(onErrorName);
}


function renderCountryInfo(countries) {
    const countryMarkUp = countries.map(({capital, population, languages}) => {
        const lang = Object.values(languages);

        return `<ul class="list">
                    <li class="list-capital"><p>Capital: ${capital}</p></li>
                    <li class="list-population"><p>Population: ${population}</p></li>                        
                    <li class="list-languages"><p>Languages: ${lang}</p></li>
                </ul>
      `
}).join('');
return countryMarkUp;
}
    

function renderOneCountry(countries) {
    const countryMarkUp = countries.map(({name, flags}) => {
        return `
            <li class="list-item">
              <img class="list-flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="list-name">${name.official}</h2>
          </li>
          `
    }).join('');
    return countryMarkUp;
}

function onErrorName() {
    Notiflix.Notify.info('There is no country in the list of countries');
}




countryInput.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));