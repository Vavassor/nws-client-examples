import {
  getQuantitativeValue,
  GridpointForecastGeoJson,
  isRelativeLocationGeoJson,
  PointGeoJson,
  RelativeLocation,
  RelativeLocationGeoJson,
} from "@vavassor/nws-client";

export interface GridpointForecast {
  shortForecast: string;
  temperatureFahrenheit: string;
  updateTime: string;
  updateTimeIso: string;
}

export interface Point {
  city: string;
  gridId: string;
  gridX: number;
  gridY: number;
  state: string;
}

export const mapGridpointForecast = (forecast: GridpointForecastGeoJson) => {
  const period = forecast.properties.periods[0];

  const temperatureValue = getQuantitativeValue(
    period.temperature,
    "[degF]"
  )?.value?.toString();
  const temperatureFahrenheit = temperatureValue
    ? `${temperatureValue} °F`
    : "--";

  const updateTimeIso = forecast.properties.updateTime;
  const updateTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  }).format(new Date(updateTimeIso));

  const result: GridpointForecast = {
    shortForecast: period.shortForecast,
    temperatureFahrenheit,
    updateTime,
    updateTimeIso,
  };

  return result;
};

export const mapPoint = (point: PointGeoJson) => {
  const relativeLocation = getRelativeLocation(
    point.properties.relativeLocation
  );
  const result: Point = {
    city: relativeLocation.city,
    gridId: point.properties.gridId,
    gridX: point.properties.gridX,
    gridY: point.properties.gridY,
    state: relativeLocation.state,
  };
  return result;
};

const getRelativeLocation = (
  relativeLocation: RelativeLocation | RelativeLocationGeoJson
) => {
  return isRelativeLocationGeoJson(relativeLocation)
    ? relativeLocation.properties
    : relativeLocation;
};
