import React, { FC } from "react";
import { useGetCurrentPositionQuery } from "./geolocationApi";
import { useGetGridpointForecastQuery, useGetPointQuery } from "./nwsApi";
import { skipToken } from "@reduxjs/toolkit/query";

export const CurrentConditions: FC = () => {
  const { data: currentPosition } = useGetCurrentPositionQuery();
  const { data: point } = useGetPointQuery(
    currentPosition
      ? {
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        }
      : skipToken
  );
  const { data: forecast } = useGetGridpointForecastQuery(
    point
      ? {
          forecastOfficeId: point.gridId,
          gridX: point.gridX,
          gridY: point.gridY,
        }
      : skipToken
  );

  return (
    <section>
      <h2>
        {point?.city}, {point?.state} as of{" "}
        <time dateTime={forecast?.updateTimeIso}>{forecast?.updateTime}</time>
      </h2>
      <p>{forecast?.temperatureFahrenheit}</p>
      <p>{forecast?.shortForecast}</p>
    </section>
  );
};
