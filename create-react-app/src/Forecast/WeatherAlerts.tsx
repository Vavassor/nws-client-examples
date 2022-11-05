import { useQuery } from "@tanstack/react-query";
import { getActiveAlertsGeoJson } from "@vavassor/nws-client";
import React, { FC, useMemo } from "react";
import { getCurrentPosition } from "../Common/getCurrentPosition";

interface Alert {
  description: string;
}

export const WeatherAlerts: FC = () => {
  const { data: position } = useQuery(["currentPosition"], () =>
    getCurrentPosition({ timeout: 5000 })
  );
  const { data: alertCollection } = useQuery(
    ["activeAlerts"],
    () =>
      getActiveAlertsGeoJson({
        point: `${position!.coords.latitude.toFixed(
          4
        )},${position!.coords.longitude.toFixed(4)}`,
      }),
    { enabled: !!position }
  );

  const alerts = useMemo(() => {
    if (!alertCollection) {
      return undefined;
    }
    const result: Alert[] = alertCollection.features.map((feature) => ({
      description: feature.properties.description,
    }));
    return result;
  }, [alertCollection]);

  return (
    <section>
      <h2>Weather Alerts</h2>
      {alerts && alerts.length > 0 ? (
        <ul>
          {alerts.map((alert) => (
            <li>{alert.description}</li>
          ))}
        </ul>
      ) : (
        <p>No weather alerts.</p>
      )}
    </section>
  );
};
