import React from "react";
import "./App.css";
import { CurrentConditions } from "./CurrentConditions";
import { HourlyWeather } from "./HourlyWeather";
import { WeatherAlerts } from "./WeatherAlerts";
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
