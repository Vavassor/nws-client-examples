import { isPoint, isRelativeLocationGeoJson } from "@vavassor/nws-client";
import { useEffect, useState } from "react";
import { getCurrentPosition } from "./getCurrentPosition";
import { nwsClient } from "./nws";

export const usePoint = () => {
  const [city, setCity] = useState<string | undefined>();
  const [state, setState] = useState<string | undefined>();

  useEffect(() => {
    const updatePoint = async () => {
      const position = await getCurrentPosition({
        timeout: 5000,
      });

      const point = await nwsClient.getPoint({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      if (isPoint(point)) {
        const relativeLocation = point.relativeLocation;
        if (isRelativeLocationGeoJson(relativeLocation)) {
          setCity(relativeLocation.properties.city);
          setState(relativeLocation.properties.state);
        }
      }
    };

    updatePoint();
  }, []);

  return { city, state };
};
