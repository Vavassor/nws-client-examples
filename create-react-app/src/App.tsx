import React from "react";
import "./App.css";
import { CurrentConditions } from "./Forecast/CurrentConditions";
import { HourlyWeather } from "./Forecast/HourlyWeather";
import { WeatherAlerts } from "./Forecast/WeatherAlerts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Weather</h1>
        <CurrentConditions />
        <WeatherAlerts />
        <HourlyWeather />
      </div>
    </QueryClientProvider>
  );
}

export default App;
