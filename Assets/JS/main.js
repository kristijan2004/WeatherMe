const search = document.querySelector(".search");
const units = document.getElementById("units");
const language = document.getElementById("language");
search.addEventListener("keypress", findCity);

function findCity(e) {
  if (e.keyCode === 13) {
    getResult(search.value, units.value, language.value);
  }
}
function getResult(city, units, language) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${language}&appid=e62e773b5d92a033441d23a6b615c185`
  )
    .then((response) => {
      return response.json();
    })
    .then(displayResults);
}
function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>${
    units.value === "metric" ? "°C" : "°F"
  }</span>`;

  let weatherEl = document.querySelector(".current .weather");
  weatherEl.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}${
    units.value === "metric" ? "°C" : "°F"
  } / ${Math.round(weather.main.temp_max)}${
    units.value === "metric" ? "°C" : "°F"
  }`;
}
function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}

document.addEventListener(
  "load",
  getResult("Skopje", units.value, language.value)
);
