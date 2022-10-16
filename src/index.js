import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', e => {
  fetchCountry(e.currentTarget.value).then(countries => {
    // console.log(countries);
    renderMarkupCounter(countries);
  });
});

function fetchCountry(country) {
  return fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(error => {
      console.log('SuperError!!!', error);
    });
}

function renderMarkupCounter(countries) {
  const markup = countries
    .map(({ flags, name }) => {
      return `<li>
                <img class="flag" src="${flags.svg}" alt="flag">
                 <p>${name.common}</p>
            </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}
