function refreshWeather(response) {
  let temperature = document.querySelector("#weather-temperature");
  let city = document.querySelector("#city-name");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#weather-data-unit");
  let wind = document.querySelector("#weather-data-unit-wind");
  let time = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-icon");

  //console.log(response.data);
  city.innerHTML = response.data.city;
  description.innerHTML = response.data.condition.description;
  temperature.innerHTML = Math.round(response.data.temperature.current);
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  time.innerHTML = formatDate(date);
  icon.innerHTML = `<img src= "${response.data.condition.icon_url}" class="weather-icon"/>`;

  getForcast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
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

function getForcast(city) {
  let apiKey = "7cb8ee5ca2d9a7d635ae020542o0tf58";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  let days = [`Wed`, `Thur`, `Fri`, `Sat`, `Sun`];
  let forcastHtml = "";

  days.forEach(function (day) {
    forcastHtml =
      forcastHtml +
      `
<div class="weather-forecast-day">
<div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">🌤️</div>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">
              <strong>18º</strong>
            </span>
            <span class="weather-forecast-temperature-min">12º</span>
          </div>
</div>
`;
  });
  let forcast = document.querySelector("#weather-forcast");
  forcast.innerHTML = forcastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Miami");
