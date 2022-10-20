import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputValueWithTrim = e.target.value.trim();

  if (inputValueWithTrim.length === 0) {
    clearMarkup();
    return;
  }

  fetchCountries(inputValueWithTrim)
    .then(renderMarkup)
    .catch(() => {
      clearMarkup();
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderMarkup(countries) {
  if (countries.length === 1) {
    countryList.classList.add('info');
    clearMarkup();
    renderMarkupList(countries);
    renderMarkupInfo(countries[0]);
  } else if (countries.length > 1 && countries.length <= 10) {
    countryList.classList.remove('info');
    countryInfo.innerHTML = '';
    renderMarkupList(countries);
  } else {
    clearMarkup();
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function renderMarkupList(countries) {
  const markup = countries
    .map(({ flags, name }) => {
      return `<li class="country__item">
                <img class="country__flag" src="${flags.svg}" alt="flag">
                 <p class="country__name">${name.official}</p>
            </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function renderMarkupInfo({ capital, population, languages }) {
  const languagesArr = Object.values(languages);
  const languagesWithSpace = languagesArr.join(', ');
  console.log(languagesWithSpace);
  const markup = `
          <p class="country__capital"><b>Capital: </b> ${capital}</p>
          <p class="country__population"><b>Population: </b> ${population}</p>
          <p class="country__language"><b>Languages: </b> ${languagesWithSpace}</p>
     `;

  countryInfo.innerHTML = markup;
}

function clearMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
