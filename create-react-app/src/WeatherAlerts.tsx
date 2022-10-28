import {
  getActiveAlerts,
  isAlertCollectionGeoJson,
} from "@vavassor/nws-client";
import React, { FC, useEffect, useState } from "react";
import { getCurrentPosition } from "./getCurrentPosition";

interface Alert {
  description: string;
}

export const WeatherAlerts: FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const updateAlerts = async () => {
      const position = await getCurrentPosition({ timeout: 5000 });

      const alertCollection = await getActiveAlerts({
        point: `${position.coords.latitude.toFixed(
          4
        )},${position.coords.longitude.toFixed(4)}`,
      });

      if (isAlertCollectionGeoJson(alertCollection)) {
        setAlerts(
          alertCollection.features.map((feature) => ({
            description: feature.properties.description,
          }))
        );
      }
    };

    updateAlerts();
  }, []);

  return (
    <section>
      <h2>Weather Alerts</h2>
      {alerts.length > 0 ? (
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
