function onGeoOk(position) {
  const API_KEY = "0e8faeec4989507bdf9768c26c2acc79";
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector(".weather");
      weather.innerText = `It's ${data.weather[0].main}`;
      //   const location = document.querySelector("#weather span:nth-child(2)");
      //   const weather = document.querySelector("#weather span:last-child");
      //   location.innerText = data.name;
      //   weather.innerText = data.weather[0].main;
      // if (data.weather[0].main.includes("Clouds")) {
      //   weatherIcon.src = `img/cloud.png`;
      // } else if (data.weather[0].main.includes("Clear")) {
      //   weatherIcon.src = `img/clear.png`;
      // } else if (data.weather[0].main.includes("Rain")) {
      //   weatherIcon.src = `img/rain.png`;
      // } else if (data.weather[0].main.includes("Thunder")) {
      //   weatherIcon.src = `img/thunder.png`;
      // } else {
      //   weatherIcon.src = `img/mist.png`;
      // }
    });
}

function onGeoError() {
  console.log("Can't found weather");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//https://api.openweathermap.org/data/2.5/weather?lat=lat&lon=lng&appid=API_KEY
