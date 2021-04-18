const search = document.querySelector(".search");
const units = document.getElementById("units");
const language = document.getElementById("language");

let snow = document.querySelector(".snow");
let thunder = document.querySelector(".thunder");
let rain = document.querySelector(".rain");
let sun = document.querySelector(".sun");
let cloud = document.querySelector(".cloud");

search.addEventListener("keypress", findCity);

function findCity(e) {
  if (e.keyCode === 13) {
    if (search.value !== "") {
      getResult(search.value, units.value, language.value);
    } else {
      document.querySelector(".validName").style.opacity = "0.6";
      setTimeout(() => {
        document.querySelector(".validName").style.opacity = "0";
      }, 3000);
    }
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
  if (weather.cod === "404") {
    document.querySelector(".validName").style.opacity = "0.6";
    setTimeout(() => {
      document.querySelector(".validName").style.opacity = "0";
    }, 3000);
  } else {
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
    weatherEl.innerText = `${
      language.value === "mk"
        ? `${
            weather.weather[0].main === "Clouds"
              ? "Облаци"
              : `${
                  weather.weather[0].main === "Snow"
                    ? "Снег"
                    : `${
                        weather.weather[0].main === "Clear"
                          ? "Чисто"
                          : `${
                              weather.weather[0].main ===
                              ("Fog" || "Mist" || "Smoke" || "Dust")
                                ? "Магла"
                                : `${
                                    weather.weather[0].main === "Rain"
                                      ? "Дожд"
                                      : `${
                                          weather.weather[0].main === "Drizzle"
                                            ? "Дожд"
                                            : `${
                                                weather.weather[0].main ===
                                                  "Thunderstorm" && "Грмотевици"
                                              }`
                                        }`
                                  }`
                            }`
                      }`
                }`
          }`
        : weather.weather[0].main
    }`;

    let icon = document.querySelector(".weatherIcon");
    icon.innerHTML = "";
    icon.appendChild(
      weather.weather[0].main === "Clouds"
        ? cloud
        : weather.weather[0].main === "Snow"
        ? snow
        : weather.weather[0].main === "Clear"
        ? sun
        : weather.weather[0].main === ("Fog" || "Mist" || "Smoke" || "Dust")
        ? cloud
        : weather.weather[0].main === "Rain"
        ? rain
        : weather.weather[0].main === "Drizzle"
        ? rain
        : weather.weather[0].main === "Thunderstorm" && thunder
    );

    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${Math.round(weather.main.temp_min)}${
      units.value === "metric" ? "°C" : "°F"
    } / ${Math.round(weather.main.temp_max)}${
      units.value === "metric" ? "°C" : "°F"
    }`;
  }
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
