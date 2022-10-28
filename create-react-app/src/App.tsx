import React from "react";
import "./App.css";
import { CurrentConditions } from "./CurrentConditions";
import { HourlyWeather } from "./HourlyWeather";
import { WeatherAlerts } from "./WeatherAlerts";

function App() {
  return (
    <div className="App">
      <h1>Weather</h1>
      <CurrentConditions />
      <WeatherAlerts />
      <HourlyWeather />
    </div>
  );
}

export default App;
