import { useState } from "react";
import axios from "axios";

const WEATHER_API = process.env.REACT_APP_WEATHER_APPID;

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${WEATHER_API}`;
  const weatherIcon = `https://openweathermap.org/img/wn/`;

  const handleClick = (event) => {
    setLocation(event.target.value);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13 && location.length !== 2) {
      axios
        .get(URL)
        .then((response) => {
          setData(response.data);
          setLocation("");
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        });
    }
  };

  const timezoneParsed = data.timezone;
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    seconds: "numeric",
    day: "numeric",
    weekday: "short",
    month: "short",
    // year: "numeric",
  };
  const localTime = date.getTime();
  const localOffset = date.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const weatherLocation = utc + 1000 * timezoneParsed;
  const LocationDate = new Date(weatherLocation).toLocaleString(
    "en-US",
    options
  );

  return (
    <div className="App">
      <div className="app_container">
        <div className="searchbar">
          <input
            type="text"
            value={location}
            onChange={handleClick}
            onKeyDown={handleEnter}
            placeholder="Enter Location"
            name="location"
          />
          {errorMessage && (
            <p className="err">
              {errorMessage} <br /> Check your spelling and verify you enter
              correct Location!
            </p>
          )}
        </div>
        <div className="container">
          {data.main && (
            <div className="main">
              <p className="time">{LocationDate}</p>
              <div className="location">
                <h2>{data.name}</h2>
                <p>{data.sys.country}. </p>
              </div>
              <div className="">
                <div className="degrees">
                  <img
                    src={weatherIcon + data.weather[0].icon + ".png"}
                    alt=""
                    className="icons"
                  />
                  <h1 className="deg">
                    {`${data.main.temp.toFixed()}°`}
                    <span className="cent">c</span>
                  </h1>
                </div>
              </div>
              <div className="descr">
                <h3 className="">{data.weather[0].description}</h3>
              </div>
            </div>
          )}

          {data.main && (
            <div className="footer">
              <div>
                <h3>Feels Like</h3>
                <h2>{data.main.feels_like.toFixed()}°</h2>
              </div>
              <div>
                <h3>Humidity</h3>
                <h2>{data.main.humidity}%</h2>
              </div>
              <div>
                <h3>Wind Speed</h3>
                <h2>{data.wind.speed.toFixed(1)}m/s </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
