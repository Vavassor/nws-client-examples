import { useQuery } from "@tanstack/react-query";
import {
  getGridpointForecast,
  getQuantitativeValue,
  isGridpointForecastGeoJson,
} from "@vavassor/nws-client";
import React, { FC, useEffect, useState } from "react";
import { usePoint } from "./usePoint";

export const CurrentConditions: FC = () => {
  const [shortForecast, setShortForecast] = useState<string | undefined>();
  const [temperatureFahrenheit, setTemperatureFahrenheit] = useState("0");
  const [updateTime, setUpdateTime] = useState<string | undefined>();
  const [updateTimeIso, setUpdateTimeIso] = useState<string | undefined>();
  const { city, point, state } = usePoint();
  const { data: forecast } = useQuery(
    ["gridpointForecast", point],
    () =>
      getGridpointForecast({
        forecastOfficeId: point!.gridId,
        gridX: point!.gridX,
        gridY: point!.gridY,
      }),
    { enabled: !!point }
  );

  useEffect(() => {
    if (isGridpointForecastGeoJson(forecast)) {
      setUpdateTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
        }).format(new Date(forecast.properties.updateTime))
      );
      setUpdateTimeIso(forecast.properties.updateTime);

      const period = forecast.properties.periods[0];
      const temperatureQv = getQuantitativeValue(period.temperature, "[degF]");
      if (temperatureQv.value !== null) {
        setTemperatureFahrenheit(temperatureQv.value.toString());
      }
      setShortForecast(period.shortForecast);
    }
  }, [forecast]);

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
