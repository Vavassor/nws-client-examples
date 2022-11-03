import { useQuery } from "@tanstack/react-query";
import {
  getGridpointForecastHourly,
  getQuantitativeValue,
  isGridpointForecastGeoJson,
} from "@vavassor/nws-client";
import { FC, Fragment, useMemo } from "react";
import { groupBy } from "./ArrayUtilities";
import { usePoint } from "./usePoint";

interface Day {
  name: string;
  periods: Period[];
}

interface Period {
  condition: string;
  startTime: string;
  temperature: string;
  wind: string;
}

const useHourlyForecast = () => {
  const { city, point, state } = usePoint();
  const { data: forecast } = useQuery(
    ["gridpointForecastHourly", point],
    () =>
      getGridpointForecastHourly({
        forecastOfficeId: point!.gridId,
        gridX: point!.gridX,
        gridY: point!.gridY,
      }),
    { enabled: !!point }
  );

  const days = useMemo(() => {
    if (isGridpointForecastGeoJson(forecast)) {
      const dayFormat = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      });

      const allPeriods = forecast.properties.periods.map((period) => {
        const temperatureValue = getQuantitativeValue(
          period.temperature,
          "[degF]"
        ).value;
        const temperature = temperatureValue
          ? temperatureValue.toString()
          : "--";
        const windSpeedValue = getQuantitativeValue(
          period.windSpeed,
          "[mi_i]/h"
        ).value;
        const wind = windSpeedValue ? windSpeedValue.toString() : "--";
        const hourPeriod: Period = {
          condition: period.shortForecast,
          startTime: period.startTime,
          temperature,
          wind,
        };
        return hourPeriod;
      });

      const result: Day[] = Object.entries(
        groupBy(allPeriods, (period) =>
          dayFormat.format(new Date(period.startTime))
        )
      ).map(([key, value]) => ({
        name: key,
        periods: value,
      }));

      return result;
    }
  }, [forecast]);

  return { city, days, state };
};

export const HourlyWeather: FC = () => {
  const { city, days, state } = useHourlyForecast();

  return (
    <section>
      {days && (
        <>
          <h2>{`Today's Forecast for ${city}, ${state}`}</h2>
          <table>
            <thead className="visually-hidden">
              <tr>
                <th id="time">Time</th>
                <th id="temperature">Temperature</th>
                <th id="condition">Condition</th>
                <th id="wind">Wind</th>
              </tr>
            </thead>
            <tbody>
              {days.slice(0, 4).map((day, index) => {
                const dayId = `day-${index}`;
                return (
                  <Fragment key={day.name}>
                    <tr>
                      <th colSpan={4} id={dayId} scope="colgroup">
                        {day.name}
                      </th>
                    </tr>
                    {day.periods.map((period) => (
                      <tr key={period.startTime}>
                        <td headers={`${dayId} time`}>
                          {new Intl.DateTimeFormat("en-US", {
                            timeStyle: "short",
                          }).format(new Date(period.startTime))}
                        </td>
                        <td headers={`${dayId} temperature`}>
                          {period.temperature} °F
                        </td>
                        <td headers={`${dayId} condition`}>
                          {period.condition}
                        </td>
                        <td headers={`${dayId} wind`}>{period.wind} mph</td>
                      </tr>
                    ))}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
};
