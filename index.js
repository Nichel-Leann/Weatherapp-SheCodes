function refreshWeather(response) {
  let temperature = document.querySelector("#weather-temperature");
  let city = document.querySelector("#city-name");

  city.innerHTML = response.data.city;
  temperature.innerHTML = Math.round(response.data.temperature.current);
}

function searchCity(city) {
  let apiKey = "7cb8ee5ca2d9a7d635ae020542o0tf58";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Miami");
