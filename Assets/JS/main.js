let search = document.querySelector('.search');
let units = 'metric';
let language = 'en';
let btn = document.querySelectorAll('.btn');
let input = document.querySelectorAll('.langBtn');

let longitude;
let latitude;

let currentWeather;

let snow = document.querySelector('.snow');
let thunder = document.querySelector('.thunder');
let rain = document.querySelector('.rain');
let sun = document.querySelector('.sun');
let cloud = document.querySelector('.cloud');
let moon = document.querySelector('.moon');

let icon = document.querySelector('.weatherIcon');

search.addEventListener('keypress', findCity);
// findCity function uses the event.keyCode to check if the user is clicking on the Enter button and if the input
// is not empty it uses the input value to fetch the desired city. if the input is empty it displays an error
//message depending if the language is set to English or Macedonian.
function findCity(e) {
  if (e.keyCode === 13) {
    if (search.value !== '') {
      getResult(search.value, units, language);
    } else {
      if (language === 'en') {
        document.querySelector('.validName').innerText =
          'Please enter a valid city name...';
      } else {
        document.querySelector('.validName').innerText =
          'Ве молиме внесете валидно име на град...';
      }

      document.querySelector('.validName').style.opacity = '0.6';
      setTimeout(() => {
        document.querySelector('.validName').style.opacity = '0';
      }, 3000);
    }
  }
}
// getResult is simple fetch function which requires 3 parameters.
function getResult(city, units, language) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=${language}&appid=e62e773b5d92a033441d23a6b615c185`
  )
    .then((response) => response.json())
    .then((data) => displayResults(data));
}
// displayResults is the main function in the application. The only parameter that is required is the weather object
// which is fetched from the findCity function.
function displayResults(weather) {
  console.log(weather);
  if (weather.cod === '404') {
    if (language === 'en') {
      document.querySelector('.validName').innerText = 'City not found...';
    } else {
      document.querySelector('.validName').innerText =
        'Градот не е пронајден...';
    }

    document.querySelector('.validName').style.opacity = '0.6';
    setTimeout(() => {
      document.querySelector('.validName').style.opacity = '0';
    }, 3000);
  }
  if (weather.cod === '404') {
    document.querySelector('.validName').style.opacity = '0.6';
    setTimeout(() => {
      document.querySelector('.validName').style.opacity = '0';
    }, 3000);
  } else {
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}`;

    let now = new Date();
    let date = document.querySelector('.date');
    if (language === 'en') {
      date.innerText = dateBuilder(now);
    } else {
      date.innerText = dateBuilderMk(now);
    }
    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>${
      units === 'metric' ? '°C' : '°F'
    }</span>`;

    let weatherEl = document.querySelector('.weather');
    weatherEl.innerText = weather.weather[0].description;
    // weatherEl.innerText = `${
    //   language === 'mk'
    //     ? `${
    //         weather.weather[0].main === 'Clouds'
    //           ? 'Облаци'
    //           : `${
    //               weather.weather[0].main === 'Snow'
    //                 ? 'Снег'
    //                 : `${
    //                     weather.weather[0].main === 'Clear'
    //                       ? 'Чисто'
    //                       : `${
    //                           weather.weather[0].main ===
    //                           ('Fog' || 'Mist' || 'Smoke' || 'Dust')
    //                             ? 'Магла'
    //                             : `${
    //                                 weather.weather[0].main === 'Rain'
    //                                   ? 'Дожд'
    //                                   : `${
    //                                       weather.weather[0].main === 'Drizzle'
    //                                         ? 'Дожд'
    //                                         : `${
    //                                             weather.weather[0].main ===
    //                                               'Thunderstorm' && 'Грмотевици'
    //                                           }`
    //                                     }`
    //                               }`
    //                         }`
    //                   }`
    //             }`
    //       }`
    //     : weather.weather[0].main
    // }`
    let humidity = document.querySelector('.humidity');
    humidity.innerText = `${weather.main.humidity}%`;

    let wind = document.querySelectorAll('.wind');
    wind.forEach((el) => {
      if (units === 'metric') {
        if (language === 'en') {
          el.innerText = `${weather.wind.speed} km/H`;
        } else {
          el.innerText = `${weather.wind.speed} км/ч`;
        }
      } else {
        if (language === 'en') {
          el.innerText = `${weather.wind.speed} mph`;
        } else {
          el.innerText = `${weather.wind.speed} м/ч`;
        }
      }
    });

    let today = new Date();
    let timezone = weather.timezone / 60 / 60;
    let hours = today.getHours() - 1;
    let currentCityTime = hours + timezone;
    if (currentCityTime > 23) {
      let newTime = currentCityTime - 24;
      currentCityTime = newTime;
    }
    console.log(currentCityTime);

    let icon = document.querySelector('.weatherIcon');
    icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"></img>`;
    // icon.appendChild(
    //   weather.weather[0].main === 'Clouds'
    //     ? cloud
    //     : weather.weather[0].main === 'Snow'
    //     ? snow
    //     : weather.weather[0].main === 'Clear'
    //     ? currentCityTime > 7 && currentCityTime < 20
    //       ? sun
    //       : moon
    //     : weather.weather[0].main === ('Fog' || 'Mist' || 'Smoke' || 'Dust')
    //     ? cloud
    //     : weather.weather[0].main === 'Rain'
    //     ? rain
    //     : weather.weather[0].main === 'Drizzle'
    //     ? rain
    //     : weather.weather[0].main === 'Thunderstorm' && thunder
    // )

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}${
      units === 'metric' ? '°C' : '°F'
    } / ${Math.round(weather.main.temp_max)}${
      units === 'metric' ? '°C' : '°F'
    }`;
  }
  search.value = '';
}
function dateBuilder(d) {
  let months = [
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
    'December'
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  // let year = d.getFullYear();
  let ordinalNumber;
  if (date === 1 || date === 21) {
    ordinalNumber = 'st';
  } else if (date === 2 || date === 22) {
    ordinalNumber = 'nd';
  } else if (date === 3 || date === 23) {
    ordinalNumber = 'rd';
  } else {
    ordinalNumber = 'th';
  }
  return `${day}, ${date}${ordinalNumber} of ${month}`;
}
function dateBuilderMk(d) {
  let months = [
    'Јануари',
    'Февруари',
    'Март',
    'Април',
    'Мај',
    'Јуни',
    'Јули',
    'Август',
    'Септември',
    'Октомври',
    'Ноември',
    'Декември'
  ];
  let days = [
    'Недела',
    'Понеделник',
    'Вторник',
    'Среда',
    'Четврток',
    'Петок',
    'Сабота'
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  // let year = d.getFullYear();
  let ordinalNumber;
  if (date === 1 || date === 21) {
    ordinalNumber = 'ви';
  } else if (date === 2 || date === 22) {
    ordinalNumber = 'ри';
  } else {
    ordinalNumber = 'ти';
  }
  return `${day}, ${date}${ordinalNumber} ${month}`;
}
//simple function for toggling class between 2 buttons.
btn.forEach((el) => {
  el.addEventListener('click', () => {
    if (el.classList.contains('active')) {
      console.log('as');
    } else {
      let active = document.querySelector('.active');
      active.classList.remove('active');
      el.classList.add('active');
    }
    units = el.value;
    getResult(document.querySelector('.city').innerText, units, language);
  });
});
input.forEach((el) => {
  el.addEventListener('click', () => {
    if (el.classList.contains('active1')) {
      let activeBtn = document.querySelector('.active1');
      console.log(activeBtn);
    } else {
      let activeBtn = document.querySelector('.active1');
      activeBtn.classList.remove('active1');
      el.classList.add('active1');
    }
    language = el.value;
    if (language === 'en') {
      search.setAttribute('placeholder', 'Search for a city...');
    } else {
      search.setAttribute('placeholder', 'Пребарај град...');
    }
    getResult(document.querySelector('.city').innerText, units, language);
  });
});
document.addEventListener('load', getResult('Skopje', units, language));
