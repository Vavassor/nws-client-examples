import { Box, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getActiveAlertsGeoJson } from "@vavassor/nws-client";
import { FC, useMemo } from "react";
import { getCurrentPosition } from "../Common/getCurrentPosition";

interface Alert {
  description: string;
  eventName: string;
  headline: null | string | undefined;
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
      eventName: feature.properties.event,
      headline: feature.properties.headline,
    }));

    return result;
  }, [alertCollection]);

  return (
    <Box borderRadius="lg" borderWidth="1px" px={8} py={4}>
      <Heading as="h2" size="lg">
        Weather Alerts
      </Heading>
      {alerts && alerts.length > 0 ? (
        <UnorderedList>
          {alerts.map((alert) => (
            <ListItem>{alert.headline || alert.eventName}</ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text>No weather alerts.</Text>
      )}
    </Box>
  );
};
