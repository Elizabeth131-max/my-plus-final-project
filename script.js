function myWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#topic");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = ` <img src="${response.data.condition.icon_url}"class="icon" />`;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formattedDate(date);
}
function formattedDate(date) {
  let minutes = date.getMinutes();
  let Hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${Hours}:${minutes}`;
}

function searchInput(city) {
  let apiKey = "3f7ef2457d28667co20b059a40t047b0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(myWeather);
}

function searchMe(event) {
  event.preventDefault();
  let enterInput = document.querySelector("#enter-input");

  searchInput(enterInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchMe);
searchInput("New york");
