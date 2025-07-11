function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
function getWeather(city) {
  let apiKey = "cd5f9606005650b1bc0ec15a2ef26ad0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(showWeather)
    .catch((error) => {
      alert("City not found. Please try again.");
      console.error(error);
    });
}
function showWeather(response) {
  let data = response.data;

  let temperature = Math.round(data.main.temp);
  document.querySelector(".current-temperature-value").innerHTML = temperature;

  let city = data.name;
  document.querySelector("#current-city").innerHTML = city;

  let description = data.weather[0].description;
  let humidity = data.main.humidity;
  let wind = Math.round(data.wind.speed);
  let details = `${description}, Humidity: <strong>${humidity}%</strong>, Wind: <strong>${wind} km/h</strong>`;
  document.querySelector(".current-details").innerHTML = `${formatDate(
    new Date()
  )}, ${details}`;

  let weatherMain = data.weather[0].main.toLowerCase();
  let emoji = "☀️";
  if (weatherMain.includes("cloud")) emoji = "☁️";
  else if (weatherMain.includes("rain")) emoji = "🌧️";
  else if (weatherMain.includes("snow")) emoji = "❄️";
  else if (weatherMain.includes("clear")) emoji = "☀️";
  else if (weatherMain.includes("thunderstorm")) emoji = "⛈️";
  else if (weatherMain.includes("mist") || weatherMain.includes("fog"))
    emoji = "🌫️";

  document.querySelector(".current-temperature-icon").innerHTML = emoji;
}
