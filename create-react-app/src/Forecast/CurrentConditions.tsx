import { useQuery } from "@tanstack/react-query";
import {
  getGridpointForecast,
  getQuantitativeValue,
  isGridpointForecastGeoJson,
} from "@vavassor/nws-client";
import React, { FC, useMemo } from "react";
import { usePoint } from "./usePoint";

export const CurrentConditions: FC = () => {
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

  const formattedForecast = useMemo(() => {
    const properties = isGridpointForecastGeoJson(forecast)
      ? forecast.properties
      : forecast;
    if (!properties) {
      return undefined;
    }

    const updateTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    }).format(new Date(properties.updateTime));
    const updateTimeIso = properties.updateTime;

    const period = properties.periods[0];
    const temperatureQv = getQuantitativeValue(period.temperature, "[degF]");
    const temperatureFahrenheit =
      temperatureQv.value !== null ? temperatureQv.value.toString() : undefined;
    const shortForecast = period.shortForecast;

    return {
      shortForecast,
      temperatureFahrenheit,
      updateTime,
      updateTimeIso,
    };
  }, [forecast]);

  return (
    <section>
      {formattedForecast && (
        <>
          <h2>
            {city}, {state} as of{" "}
            <time dateTime={formattedForecast.updateTimeIso}>
              {formattedForecast.updateTime}
            </time>
          </h2>
          <p>
            {formattedForecast.temperatureFahrenheit
              ? `${formattedForecast.temperatureFahrenheit} °F`
              : "--"}
          </p>
          <p>{formattedForecast.shortForecast}</p>
        </>
      )}
    </section>
  );
};
