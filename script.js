// excess all the elements
const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector("#search-btn");
const weather_image = document.querySelector(".weather-img");
const temprature = document.querySelector(".temp");
const description = document.querySelector(".description");
const humdity = document.querySelector(".hum-data");
const wind_speed = document.querySelector(".speed-data");
const location_not_found = document.querySelector(".location-not-found");
const weatherbox = document.querySelector(".weather-box");
const weather = document.querySelector(".weather-additonal");

// fetching data(city) from api
async function checkWeather(city) {
  const api_key = "531665965ac94b3bf8d501751c884e5d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_image.style.display = "none";

    wind_speed.style.display = "none";
    humdity.style.display = "none";
    temprature.style.display = "none";
    description.style.display = "none";

    console.log("error");
    return;
  }

  wind_speed.style.display = "flex";
  humdity.style.display = "flex";
  temprature.style.display = "flex";
  description.style.display = "flex";

  location_not_found.style.display = "none";
  weather_image.style.display = "flex";

  // adding value to the elements
  temprature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humdity.innerHTML = `${weather_data.main.humidity} %`;
  wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_image.src = "./image cloud.png";
      break;
    case "Clear":
      weather_image.src = "./image clear.png";
      break;
    case "Rain":
      weather_image.src = "./image rain.png";
      break;
    case "Mist":
      weather_image.src = "./image mist.png";
      break;
    case "Snow":
      weather_image.src = "./image snow.png";
      break;
  }
}
// get result by clicking on icon button
searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
// get result by pressing enter
inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(inputBox.value);
  }
});
