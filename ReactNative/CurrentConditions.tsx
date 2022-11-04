import {
  getGridpointForecast,
  getPoint,
  getQuantitativeValue,
  isGridpointForecastGeoJson,
  isPointGeoJson,
  isRelativeLocationGeoJson,
} from '@vavassor/nws-client';
import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useSWR from 'swr';
import {getCurrentPosition} from './getCurrentPosition';

export const CurrentConditions: FC = () => {
  const {data: geolocation} = useSWR('getCurrentPosition', getCurrentPosition);

  const {data: point} = useSWR(geolocation ? 'getPoint' : null, async () => {
    const p = await getPoint({
      latitude: geolocation!.coords.latitude,
      longitude: geolocation!.coords.longitude,
    });
    return isPointGeoJson(p) ? p.properties : p!;
  });

  const {data: forecast} = useSWR(
    point ? 'getGridpointForecast' : null,
    async () => {
      const f = await getGridpointForecast({
        forecastOfficeId: point!.gridId,
        gridX: point!.gridX,
        gridY: point!.gridY,
      });
      return isGridpointForecastGeoJson(f) ? f.properties : f;
    },
  );

  const formattedForecast = useMemo(() => {
    if (!forecast) {
      return undefined;
    }

    const period = forecast.periods[0];
    const temperature = getQuantitativeValue(
      period.temperature,
      '[degF]',
    ).value;
    const shortForecast = period.shortForecast;

    const updateTime = Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    }).format(new Date(forecast.updateTime));

    return {temperature, shortForecast, updateTime};
  }, [forecast]);

  const relativeLocation = isRelativeLocationGeoJson(point?.relativeLocation)
    ? point?.relativeLocation.properties
    : point?.relativeLocation;

  return (
    <View style={styles.currentConditions}>
      <Text>{`${relativeLocation?.city}, ${relativeLocation?.state} as of ${formattedForecast?.updateTime}`}</Text>
      <Text>{`${formattedForecast?.temperature} °F ${formattedForecast?.shortForecast}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  currentConditions: {padding: 16},
});
