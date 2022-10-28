import {
  getQuantitativeValue,
  isGridpointForecastGeoJson,
} from "@vavassor/nws-client";
import React, { FC, useEffect, useState } from "react";
import { getCurrentPosition } from "./getCurrentPosition";
import { nwsClient } from "./nws";
import { usePoint } from "./usePoint";

export const CurrentConditions: FC = () => {
  const [shortForecast, setShortForecast] = useState<string | undefined>();
  const [temperatureFahrenheit, setTemperatureFahrenheit] = useState("0");
  const [updateTime, setUpdateTime] = useState<string | undefined>();
  const [updateTimeIso, setUpdateTimeIso] = useState<string | undefined>();
  const { city, state } = usePoint();

  useEffect(() => {
    const updateForecast = async () => {
      const position = await getCurrentPosition({
        timeout: 5000,
      });

      const forecast = await nwsClient.getGridpointForecast({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      const now = new Date();
      setUpdateTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
        }).format(now)
      );
      setUpdateTimeIso(now.toISOString());

      if (isGridpointForecastGeoJson(forecast)) {
        const period = forecast.properties.periods[0];
        const temperatureQv = getQuantitativeValue(
          period.temperature,
          "[degF]"
        );
        if (temperatureQv.value !== null) {
          setTemperatureFahrenheit(temperatureQv.value.toString());
        }
        setShortForecast(period.shortForecast);
      }
    };

    updateForecast();
  }, []);

  return (
    <section>
      <h2>
        {city}, {state} as of <time dateTime={updateTimeIso}>{updateTime}</time>
      </h2>
      <p>{temperatureFahrenheit} °F</p>
      <p>{shortForecast}</p>
    </section>
  );
};
