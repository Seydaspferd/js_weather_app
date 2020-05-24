window.addEventListener('load', localFunction);

function localFunction() {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let iconDiv = document.querySelector('.icondiv');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');
  let icon;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=2f1fe7005e5ea71d86671279f2db3fbc`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const temperature = data.main.temp;
          const location = data.name;
          const weather = data.weather[0].main;
          icon = data.weather[0].icon;

          //Set DOM Elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = weather;
          locationTimezone.textContent = location;
          iconDiv.style.content = `url("http://openweathermap.org/img/wn/${icon}@4x.png")`;

          //formula for celsius
          let fahrenheit = temperature * (9 / 5) + 32;

          // change celsius to fahrenheit on click
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === '°C') {
              temperatureSpan.textContent = '°F';
              temperatureDegree.textContent = Math.floor(fahrenheit);
            } else {
              temperatureSpan.textContent = '°C';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
}

// function for different city

document.getElementById('inputbtn').addEventListener('click', cityFunction);

function cityFunction() {
  let cityname = document.getElementById('input').value;
  let temperatureDescription = document.querySelector(
    '.city-temperature-description'
  );
  let temperatureDegree = document.querySelector('.city-temperature-degree');
  let locationTimezone = document.querySelector('.city-location-timezone');
  let iconDiv = document.querySelector('.city-icondiv');
  let temperatureSection = document.querySelector('.city-temperature');
  let temperatureSpan = document.querySelector('.city-temperature span');
  let icon;

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=2f1fe7005e5ea71d86671279f2db3fbc`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const temperature = data.main.temp;
      const location = data.name;
      const weather = data.weather[0].main;
      icon = data.weather[0].icon;

      //Set DOM Elements from API
      temperatureDegree.textContent = temperature;
      temperatureDescription.textContent = weather;
      locationTimezone.textContent = location;
      iconDiv.style.content = `url("http://openweathermap.org/img/wn/${icon}@4x.png")`;

      //formula for celsius
      let fahrenheit = temperature * (9 / 5) + 32;

      // change celsius to fahrenheit on click
      // temperatureSection.removeEventListener('click', eventFunction);
      const hasEventlistener = false;

      if (!hasEventlistener) {
        temperatureSection.addEventListener('click', eventFunction);
        hasEventlistener = true;
      }

      function eventFunction() {
        if (temperatureSpan.textContent === '°C') {
          temperatureSpan.textContent = '°F';
          temperatureDegree.textContent = Math.floor(fahrenheit);
        } else if (temperatureSpan.textContent === '°F') {
          temperatureSpan.textContent = '°C';
          temperatureDegree.textContent = temperature;
        }
      }
    });
}
