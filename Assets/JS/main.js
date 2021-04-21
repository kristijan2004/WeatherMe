let search = document.querySelector(".search");
let units = "metric";
let language = "en";
let btn = document.querySelectorAll(".btn");
let input = document.querySelectorAll(".langBtn");

let snow = document.querySelector(".snow");
let thunder = document.querySelector(".thunder");
let rain = document.querySelector(".rain");
let sun = document.querySelector(".sun");
let cloud = document.querySelector(".cloud");
let moon = document.querySelector(".moon");

let icon = document.querySelector(".weatherIcon");

search.addEventListener("keypress", findCity);

function findCity(e) {
  if (e.keyCode === 13) {
    if (search.value !== "") {
      getResult(search.value, units, language);
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
    let city = document.querySelector(".city");
    city.innerText = `${weather.name}`;

    // let now = new Date();
    // let date = document.querySelector(".date");
    // date.innerText = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>${
      units === "metric" ? "°C" : "°F"
    }</span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerText = `${
      language === "mk"
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
    let humidity = document.querySelector(".humidity");
    humidity.innerText = `${weather.main.humidity}%`;

    let today = new Date();
    let timezone = weather.timezone / 60 / 60;
    let hours = today.getHours() - 2;
    let currentCityTime = hours + timezone;
    if (currentCityTime > 23) {
      let newTime = currentCityTime - 24;
      currentCityTime = newTime;
    }

    let icon = document.querySelector(".weatherIcon");
    icon.innerHTML = "";
    icon.appendChild(
      weather.weather[0].main === "Clouds"
        ? cloud
        : weather.weather[0].main === "Snow"
        ? snow
        : weather.weather[0].main === "Clear"
        ? currentCityTime > 7 && currentCityTime < 20
          ? sun
          : moon
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
      units === "metric" ? "°C" : "°F"
    } / ${Math.round(weather.main.temp_max)}${
      units === "metric" ? "°C" : "°F"
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
btn.forEach((el) => {
  el.addEventListener("click", () => {
    if (el.classList.contains("active")) {
      console.log("as");
    } else {
      let active = document.querySelector(".active");
      active.classList.remove("active");
      el.classList.add("active");
    }
    units = el.value;
    getResult(document.querySelector(".city").innerText, units, language);
  });
});
input.forEach((el) => {
  el.addEventListener("click", () => {
    if (el.classList.contains("active1")) {
      let activeBtn = document.querySelector(".active1");
      console.log(activeBtn);
    } else {
      let activeBtn = document.querySelector(".active1");
      activeBtn.classList.remove("active1");
      el.classList.add("active1");
    }
    language = el.value;
    if (language === "en") {
      search.setAttribute("placeholder", "Search for a city...");
    } else {
      search.setAttribute("placeholder", "Пребарај град...");
    }
    getResult(document.querySelector(".city").innerText, units, language);
  });
});

document.addEventListener("load", getResult("Skopje", units, language));
