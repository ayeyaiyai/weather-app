const weatherCityDiv = document.querySelector('.weather-city');
const weatherCountryDiv = document.querySelector('.weather-country');
const weatherDescriptionDiv = document.querySelector('.weather-description');
const actualTempDiv = document.querySelector('.actual-temp');
const approxTempDiv = document.querySelector('.approx-temp');
const highLowDiv = document.querySelector('.high-low');
const humidityDiv = document.querySelector('.humidity');
const windSpeedDiv = document.querySelector('.wind-speed');
const img = document.querySelector('img');
const dateContainerDiv = document.querySelector('.date-container');
const submit = document.querySelector('.search');
const input = document.querySelector('search-bar');


function kelvinToFahrenheit(temp) {
  let tempFahrenheit = (1.8 * (temp-273) + 32);
  tempFahrenheit = tempFahrenheit.toFixed();
  return tempFahrenheit;
}

function getTime(unixTimestamp) {
  unixTimestamp = unixTimestamp * 1000;
  const dateObject = new Date(unixTimestamp);
  const humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat;
}

function lightMode() {
  let element = document.body;
  let searchButton = document.querySelector('.search');
  let searchSection = document.querySelector('.search-bar');
  let lightToggle = document.querySelector('.light-mode-button');
  element.classList.toggle("light-mode");
  searchButton.classList.toggle("search-button-light");
  searchSection.classList.toggle("search-section-light");
  lightToggle.classList.toggle("search-button-light");
}

async function getWeather(city) {
  const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=d9bf74a4d66e88d20957ca83f86d674e', {mode: 'cors'})
  const weatherSource = await response.json();
  const weatherObj = {
    weatherDescription: (weatherSource.weather[0].description),
    temp: weatherSource.main.temp,
    feelsLike: weatherSource.main.feels_like,
    tempMax: weatherSource.main.temp_max,
    tempMin: weatherSource.main.temp_min,
    weatherCity: weatherSource.name,
    weatherCountry: weatherSource.sys.country,
    humidity: weatherSource.main.humidity,
    windSpeed: weatherSource.wind.speed,
    iconName: weatherSource.weather[0].icon,
    dt: weatherSource.dt
  }

  weatherDescriptionDiv.textContent = weatherObj.weatherDescription;

  weatherObj.temp = kelvinToFahrenheit(weatherObj.temp);
  actualTempDiv.textContent = ("currently: " + weatherObj.temp + "°F");

  weatherObj.feelsLike = kelvinToFahrenheit(weatherObj.feelsLike);
  approxTempDiv.textContent = ("feels like: " + weatherObj.feelsLike + "°F");

  weatherObj.tempMax = kelvinToFahrenheit(weatherObj.tempMax);

  weatherObj.tempMin = kelvinToFahrenheit(weatherObj.tempMin);

  let highLow = ("high: " + weatherObj.tempMax + "°F | low: " + weatherObj.tempMin + "°F");
  highLowDiv.textContent = highLow;

  let weatherLocation = (weatherObj.weatherCity + ", " + weatherObj.weatherCountry);
  weatherCityDiv.textContent = weatherLocation;

  humidityDiv.textContent = ("humidity: " + weatherObj.humidity + "%");

  windSpeedDiv.textContent = ("wind speed: " + weatherObj.windSpeed + "m/s");

  img.src = ('http://openweathermap.org/img/w/' + weatherObj.iconName + '.png')

  dateContainerDiv.textContent = ("last refreshed: " + getTime(weatherObj.dt));
}

getWeather("Columbus");

function updateCity() {
  var inputVal = document.getElementById("city").value;
  getWeather(inputVal);
}

submit.addEventListener("click", () => {
  updateCity();
});