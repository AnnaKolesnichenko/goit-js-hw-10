const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountry(country) {
    return fetch(`${BASE_URL}${country}`)
    .then(response => {
        if(!response.ok) {
            console.dir(response);
            throw new Error(response.status);
        }
        return response.json();
    })
           
        
        //response.json());
   // .catch(error => console.log(error));
     
}


export default {fetchCountry};


