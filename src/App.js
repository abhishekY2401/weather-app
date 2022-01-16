import React, { useState } from "react";
import "./index.css";
import Error404 from "./Components/Error404"

function App() {
  // show location, day date and time,  weather in degrees celsius, type of weather, parameters of weather
  const apiKeyWeather = "85a0f9c6e34c4e619b5124543212610";
  // const apiKeyImage = "FUvogg6bXQSTCVHO4w48gWpHVLveHYbiUG8RLIHrLUs";
  const [weatherData, setWeatherData] = useState({});
  // const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKeyWeather}&q=${city}`
      )
        .then(response => {
          console.log(response)

          if (response.ok) {
            return response.json();
          } else {
            throw new Error("No Matching Location Found!");
          }
        })
        .then(data => {
          setWeatherData(data)
          // getImage()
          console.log(data)
          setError("");
        })
        .catch(err => {
          setError(err)
          console.log(err.length);
          setWeatherData("");
          // setImage("");
        })
      setCity("");

    };
  };

  // Not fetching images because not required
  // const getImage = () => {
  //   fetch(
  //     `https://api.unsplash.com/search/photos/?query=${city}&client_id=${apiKeyImage}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setImage(data);
  //     });
  // };

  return (
    <div className="main-head">
      <div className="container">
        <main>
          <header className="nav-bar">
            <nav>
              <i class="fas fa-cloud"></i>
              <a href="/" className="heading">WeatherCast</a>
            </nav>
          </header>
          <h2 className="head-2">Get Weather details for your search.</h2>
          <input
            type="search"
            placeholder="Search by city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={getWeather}
            className="input"
          />
        </main>
      </div>
          
      <div class="weat-data">
        {/* {image && 
        <img
          src={
            image &&
            image.results[2] &&
            image.results[2].links &&
            image.results[2].links.download
          }
          className="bg-img"
          alt="bg"
        />} */}

        {error && 
          (<div className="err"> 
            <Error404 />
          </div>)
        }  

        {Object.keys(weatherData).length > 0 && 
        (<div className="time">
          <p>
            {weatherData &&
              weatherData.location &&
              weatherData.location.localtime}
          </p>
        </div>)
        }

        {Object.keys(weatherData).length > 0 && 
        (<div className="weather">
          <p className="location">
            {weatherData && <i className="fas fa-map-marker-alt"></i>}
            {weatherData && weatherData.location && weatherData.location.name}
          </p>
          <h2>
            {weatherData && weatherData.current && weatherData.current.temp_c}{" "}
            &#8451;
          </h2>
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
        </div>)
        }
      </div>
    </div>
  );
}

export default App;
