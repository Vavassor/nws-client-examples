import { Box, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  getGridpointForecastGeoJson,
  getQuantitativeValue,
} from "@vavassor/nws-client";
import React, { FC, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { usePoint } from "./usePoint";

export const CurrentConditions: FC = () => {
  const { city, point, state } = usePoint();
  const { data: forecast } = useQuery(
    ["gridpointForecast", point],
    () =>
      getGridpointForecastGeoJson({
        featureFlags: ["forecast_temperature_qv", "forecast_wind_speed_qv"],
        forecastOfficeId: point!.properties.gridId,
        gridX: point!.properties.gridX,
        gridY: point!.properties.gridY,
      }),
    { enabled: !!point }
  );
  const { t } = useTranslation("todaysWeather");

  const formattedForecast = useMemo(() => {
    if (!forecast) {
      return undefined;
    }

    const properties = forecast.properties;

    const updateTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    }).format(new Date(properties.updateTime));
    const updateTimeIso = properties.updateTime;

    const period = properties.periods[0];
    const temperatureQv = getQuantitativeValue(period.temperature, "[degF]");
    const temperatureFahrenheit =
      temperatureQv.value !== null ? temperatureQv.value.toFixed(0) : undefined;
    const shortForecast = period.shortForecast;

    return {
      shortForecast,
      temperatureFahrenheit,
      updateTime,
      updateTimeIso,
    };
  }, [forecast]);

  return (
    <Box as="section" borderRadius="lg" borderWidth="1px" px={8} py={4}>
      {formattedForecast && (
        <>
          <Heading as="h1" size="lg">
            <Trans i18nKey="currentConditionsCard.heading" t={t}>
              {{ city }}, {{ state }} as of{" "}
              <time dateTime={formattedForecast.updateTimeIso}>
                {{ updateTime: formattedForecast.updateTime } as any}
              </time>
            </Trans>
          </Heading>
          <Text>
            {formattedForecast.temperatureFahrenheit
              ? `${formattedForecast.temperatureFahrenheit} °F`
              : "--"}
          </Text>
          <Text>{formattedForecast.shortForecast}</Text>
        </>
      )}
    </Box>
  );
};
