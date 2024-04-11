function refreshWeather(response) {
  if (!response.data.city) {
    return false;
  }

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForcast(city) {
  let apiKey = "7cb8ee5ca2d9a7d635ae020542o0tf58";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  //console.log(response.data);

  let forcastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forcastHtml =
        forcastHtml +
        `
<div class="weather-forecast-day">
<div class="weather-forecast-date">${formatDay(day.time)}</div>
          

          <img src= "${day.condition.icon_url}" class="weather-forecast-icon" />
          
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature-max">
              <strong>${Math.round(day.temperature.maximum)}°</strong> 
            </div>
            <div class="weather-forecast-temperature-min"> ${Math.round(
              day.temperature.minimum
            )}°</div>
          </div>
</div>
`;
    }
  });

  let forcast = document.querySelector("#weather-forcast");
  forcast.innerHTML = forcastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Miami");
