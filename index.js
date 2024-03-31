function refreshWeather(response) {
  let temperature = document.querySelector("#weather-temperature");
  let city = document.querySelector("#city-name");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#weather-data-unit");
  let wind = document.querySelector("#weather-data-unit-wind");
  //let icon = document.querySelector("#weather-icon");

  console.log(response.data);
  city.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  //icon.innerHTML = response.data.condition.icon_url;
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

//response.data.condition.icon_url;
