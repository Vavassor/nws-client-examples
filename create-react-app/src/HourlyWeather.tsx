import {
  getQuantitativeValue,
  isGridpointForecastGeoJson,
} from "@vavassor/nws-client";
import { FC, Fragment, useEffect, useState } from "react";
import { groupBy } from "./ArrayUtilities";
import { getCurrentPosition } from "./getCurrentPosition";
import { nwsClient } from "./nws";
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

export const HourlyWeather: FC = () => {
  const [days, setDays] = useState<Day[]>([]);
  const { city, state } = usePoint();

  useEffect(() => {
    const updateForecast = async () => {
      const position = await getCurrentPosition({
        timeout: 5000,
      });

      const forecast = await nwsClient.getGridpointForecastHourly({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

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

        setDays(
          Object.entries(
            groupBy(allPeriods, (period) =>
              dayFormat.format(new Date(period.startTime))
            )
          ).map(([key, value]) => ({
            name: key,
            periods: value,
          }))
        );
      }
    };

    updateForecast();
  }, []);

  return (
    <section>
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
                    <td headers={`${dayId} condition`}>{period.condition}</td>
                    <td headers={`${dayId} wind`}>{period.wind} mph</td>
                  </tr>
                ))}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
