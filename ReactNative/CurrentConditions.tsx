import {
  getGridpointForecastGeoJson,
  getPointGeoJson,
  getQuantitativeValue,
  isRelativeLocationGeoJson,
} from '@vavassor/nws-client';
import React, {FC, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useSWR from 'swr';
import {getCurrentPosition} from './getCurrentPosition';

export const CurrentConditions: FC = () => {
  const {data: geolocation} = useSWR('getCurrentPosition', getCurrentPosition);

  const {data: point} = useSWR(geolocation ? 'getPoint' : null, () => {
    return getPointGeoJson({
      latitude: geolocation!.coords.latitude,
      longitude: geolocation!.coords.longitude,
    });
  });

  const {data: forecast} = useSWR(point ? 'getGridpointForecast' : null, () => {
    return getGridpointForecastGeoJson({
      forecastOfficeId: point!.properties.gridId,
      gridX: point!.properties.gridX,
      gridY: point!.properties.gridY,
    });
  });

  const formattedForecast = useMemo(() => {
    if (!forecast) {
      return undefined;
    }

    const properties = forecast.properties;
    const period = properties.periods[0];
    const temperature = getQuantitativeValue(
      period.temperature,
      '[degF]',
    ).value;
    const shortForecast = period.shortForecast;

    const updateTime = Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    }).format(new Date(properties.updateTime));

    return {temperature, shortForecast, updateTime};
  }, [forecast]);

  const relativeLocation = isRelativeLocationGeoJson(
    point?.properties.relativeLocation,
  )
    ? point?.properties.relativeLocation.properties
    : point?.properties.relativeLocation;

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
