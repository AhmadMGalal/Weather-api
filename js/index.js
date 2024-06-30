const APIKEY = '178b58859fc043aba77213836242906';
const BASE_URL = 'http://api.weatherapi.com/v1';
const endPoint = '/forecast.json';
let today = {
  date: 0,
  day: 0,
  month: 0,
};
const noForecasteDays = 3;

// ...................//
let searchInput = document.getElementById('search');

let todayByDay = document.getElementById('todayByDay');
let todayByDate = document.getElementById('todayByDate');
let todaycity = document.getElementById('city');
let todayTemp = document.getElementById('todayTemp');
let todayWeatherIcon = document.getElementById('todayWeatherIcon');
let todayWeatherText = document.getElementById('todayWeatherText');
let todayHumdaity = document.getElementById('todayHumdaity');
let todayWind = document.getElementById('todayWind');
let todayWindDirection = document.getElementById('todayWindDirection');

let forecastDate = document.getElementsByClassName('forecast-date');
let forecastTemp = document.getElementsByClassName('forecast-temp');
let forecastIcon = document.getElementsByClassName('forecast-icon');
let forecastText = document.getElementsByClassName('forecast-text');

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
function getTodayDate() {
  let date = new Date();
  let todayDate = date.getDate();
  let todayDay = date.getDay();
  let todayMonth = date.getMonth();
  today = {
    date: todayDate,
    day: todayDay,
    month: todayMonth,
  };
  return today;
}
async function appHandler(cityName) {
  let today = getTodayDate();
  let weatherData = await getWeatherData(cityName);
  displayTodayWeather(weatherData, today);
  displayForecastWeather(weatherData, today);
}

// fetch weather data
async function getWeatherData(city) {
  let url = `${BASE_URL}${endPoint}?key=${APIKEY}&q=${city}&days=${noForecasteDays}`; // setting URL of weather API
  try {
    let weatherResponse = await fetch(`${url}`);
    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch...');
    }
    let weatherResult = await weatherResponse.json();
    return weatherResult;
  } catch (error) {
    console.log(error);
  }
}

// display weather data
function displayTodayWeather(data, today) {
  todayByDay.innerHTML = weekday[today.day];
  todayByDate.innerHTML = today.date + month[today.month];
  todaycity.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayWeatherText.innerHTML = data.current.condition.text;
  todayWeatherIcon.setAttribute('src', `https:${data.current.condition.icon}`);
  todayHumdaity.innerHTML = data.current.humidity + '%';
  todayWind.innerHTML = data.current.wind_kph + 'Km/h';
  todayWindDirection.innerHTML = data.current.wind_dir;
}
function displayForecastWeather(data, today) {
  let foreData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    forecastTemp[i].innerHTML = foreData[i + 1].day.maxtemp_c;
    forecastIcon[i].setAttribute(
      'src',
      `https:${foreData[i + 1].day.condition.icon}`
    );
    forecastText[i].innerHTML = foreData[i + 1].day.condition.text;
    forecastDate[i].innerHTML = weekday[today.day + i + 1];
  }
}

appHandler((city = 'cairo'));

searchInput.addEventListener('input', function () {
  console.log(searchInput.value);
  city = searchInput.value;
  appHandler(city);
});
