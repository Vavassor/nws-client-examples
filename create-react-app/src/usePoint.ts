import { useQuery } from "@tanstack/react-query";
import {
  getPoint,
  isPointGeoJson,
  isRelativeLocationGeoJson,
} from "@vavassor/nws-client";
import { useEffect, useState } from "react";
import { getCurrentPosition } from "./getCurrentPosition";

export const usePoint = () => {
  const [city, setCity] = useState<string | undefined>();
  const [state, setState] = useState<string | undefined>();
  const { data: position } = useQuery(["currentPosition"], () =>
    getCurrentPosition({ timeout: 5000 })
  );
  const { data: point } = useQuery(
    ["point", position],
    async () => {
      const point = await getPoint({
        latitude: position!.coords.latitude,
        longitude: position!.coords.longitude,
      });
      return isPointGeoJson(point) ? point.properties : point!;
    },
    { enabled: !!position }
  );

  useEffect(() => {
    if (point) {
      const relativeLocation = point.relativeLocation;
      if (isRelativeLocationGeoJson(relativeLocation)) {
        setCity(relativeLocation.properties.city);
        setState(relativeLocation.properties.state);
      }
    }
  }, [point]);

  return { city, point, state };
};
