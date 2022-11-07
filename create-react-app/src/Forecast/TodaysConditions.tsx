import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  getGridpointGeoJson,
  getQuantitativeValue,
  getUcumCode,
  GridpointQuantitativeValueLayer,
  QuantitativeValue,
} from "@vavassor/nws-client";
import React, { FC, useMemo } from "react";
import { usePoint } from "./usePoint";
import { UcumLhcUtils } from "@lhncbc/ucum-lhc";

const utils = UcumLhcUtils.getInstance();

export const TodaysConditions: FC = () => {
  const { city, point, state } = usePoint();
  const { data: gridpoint } = useQuery(
    ["gridpoint", point],
    () =>
      getGridpointGeoJson({
        forecastOfficeId: point!.properties.gridId,
        gridX: point!.properties.gridX.toString(),
        gridY: point!.properties.gridY.toString(),
      }),
    { enabled: !!point }
  );

  const formattedGridpoint = useMemo(() => {
    if (!gridpoint) {
      return undefined;
    }

    const getQuantitativeValueFromLayer = (
      layer: GridpointQuantitativeValueLayer | undefined
    ) => {
      const currentValue = layer?.values[0];
      return currentValue && currentValue.value !== null && layer?.uom
        ? getQuantitativeValue(currentValue.value, layer?.uom)
        : undefined;
    };

    const format = (
      value: QuantitativeValue | undefined,
      toUnitCode: string
    ) => {
      if (value) {
        const ucumCode = getUcumCode(value.unitCode);
        if (ucumCode && value.value !== null) {
          const convertedValue = utils.convertUnitTo(
            ucumCode,
            value.value,
            toUnitCode
          );
          if (convertedValue.toVal) {
            const formattedValue = convertedValue.toVal.toFixed(0);
            const formattedUnit =
              convertedValue.toUnit.getProperty("printSymbol");
            return {
              formattedText: `${formattedValue}${formattedUnit}`,
              formattedValue,
              value: convertedValue.toVal,
            };
          }
        }
      }
      return { formattedText: "--", formattedValue: "--", value: undefined };
    };

    const get8WindCompassAbbreviation = (degrees: number | undefined) => {
      if (!degrees) {
        return undefined;
      }
      const index = Math.floor(degrees / 45) % 8;
      const abbreviations = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
      return abbreviations[index];
    };

    const dewPoint = format(
      getQuantitativeValueFromLayer(gridpoint.properties.dewpoint),
      "[degF]"
    ).formattedText;

    const maxTemperature = format(
      getQuantitativeValueFromLayer(gridpoint.properties.maxTemperature),
      "[degF]"
    ).formattedText;
    const minTemperature = format(
      getQuantitativeValueFromLayer(gridpoint.properties.minTemperature),
      "[degF]"
    ).formattedText;

    const pressure = format(
      getQuantitativeValueFromLayer(gridpoint.properties.pressure),
      "[in_i'Hg]"
    ).formattedText;

    const relativeHumidity = format(
      getQuantitativeValueFromLayer(gridpoint.properties.relativeHumidity),
      "%"
    ).formattedText;

    const windSpeedMph = format(
      getQuantitativeValueFromLayer(gridpoint.properties.windSpeed),
      "[mi_i]/h"
    );
    const windSpeed = windSpeedMph.value
      ? `${windSpeedMph.formattedValue} mph`
      : windSpeedMph.formattedText;

    const windDirection = get8WindCompassAbbreviation(
      format(
        getQuantitativeValueFromLayer(gridpoint.properties.windDirection),
        "deg"
      ).value
    );

    const visibility = format(
      getQuantitativeValueFromLayer(gridpoint.properties.visibility),
      "[mi_i]"
    ).formattedText;

    return {
      dewPoint,
      maxTemperature,
      minTemperature,
      pressure,
      relativeHumidity,
      visibility,
      windDirection,
      windSpeed,
    };
  }, [gridpoint]);

  return (
    <Box as="section" borderRadius="lg" borderWidth="1px" px={8} py={4}>
      <Heading as="h2" size="lg">
        Weather today in {city}, {state}
      </Heading>
      <p>
        Low / High: {formattedGridpoint?.minTemperature} /{" "}
        {formattedGridpoint?.maxTemperature}
      </p>
      <p>Pressure: {formattedGridpoint?.pressure}</p>
      <p>Humidity: {formattedGridpoint?.relativeHumidity}</p>
      <p>Dew point: {formattedGridpoint?.dewPoint}</p>
      <p>
        Wind: {formattedGridpoint?.windDirection}{" "}
        {formattedGridpoint?.windSpeed}
      </p>
      <p>Visibility: {formattedGridpoint?.visibility}</p>
    </Box>
  );
};
