import React, { useState } from "react";
import winter from "./assets/winter-bg.jpg";

function App() {
  // show location, day date and time,  weather in degrees celsius, type of weather, parameters of weather
  const apiKey = "85a0f9c6e34c4e619b5124543212610";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          if (data.code === 1006) {
            setWeatherData(data.message);
          }
        });
      setCity("");
    }
  };
  return (
    <div className="container">
      <main>
        <input
          type="search"
          placeholder="Search by city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={getWeather}
          className="input"
        />
      </main>
      <div className="weather">
        <p className="location">
          {weatherData && <i className="fas fa-map-marker-alt"></i>}
          {weatherData && weatherData.location && weatherData.location.name}
        </p>
      </div>
      <div className="type">
        <img
          src={
            weatherData &&
            weatherData.current &&
            weatherData.current.condition &&
            weatherData.current.condition.icon
          }
          alt="icon"
        />
        <p>
          {weatherData &&
            weatherData.current &&
            weatherData.current.condition &&
            weatherData.current.condition.text}
        </p>
      </div>
      <div className="temp">
        <h2>
          {weatherData && weatherData.current && weatherData.current.temp_c}{" "}
          &#8451;
        </h2>
      </div>
    </div>
  );
}

export default App;
