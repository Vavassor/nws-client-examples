import React from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import { CurrentConditions } from "./Forecast/CurrentConditions";
import { WeatherAlerts } from "./Forecast/WeatherAlerts";
import { TodaysConditions } from "./Forecast/TodaysConditions";

export const TodaysWeather = () => {
  return (
    <Container as="main" maxW="container.sm" pt={4}>
      <SkipNavContent />
      <Grid
        gap={4}
        gridTemplateColumns="100%"
        maxWidth="100%"
        templateAreas={`"current"
          "alerts"
          "todays"`}
      >
        <GridItem area="current">
          <CurrentConditions />
        </GridItem>
        <GridItem area="alerts">
          <WeatherAlerts />
        </GridItem>
        <GridItem area="todays">
          <TodaysConditions />
        </GridItem>
      </Grid>
    </Container>
  );
};
