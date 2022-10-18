const BASE_URL = `https://restcountries.com/v3.1/name`;

export function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
    // `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
    // `https://restcountries.com/v3.1/name/${name}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

// export default { fetchCountries };
