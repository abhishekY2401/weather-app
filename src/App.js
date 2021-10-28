import React, { useState } from "react";

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
        />
      </main>
      <div className="weather">
        <i className="fas fa-map-marker-alt"></i>
        <p className="location">
          {weatherData && weatherData.location && weatherData.location.name},{" "}
          {weatherData && weatherData.location && weatherData.location.country}
        </p>
      </div>
    </div>
  );
}

export default App;
