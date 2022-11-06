import React, { FC } from "react";
import { SkipNavLink, SkipNavContent } from "@chakra-ui/skip-nav";
import { Box, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import { CurrentConditions } from "./Forecast/CurrentConditions";
import { WeatherAlerts } from "./Forecast/WeatherAlerts";
import { HourlyWeather } from "./Forecast/HourlyWeather";

export const Root: FC = () => {
  return (
    <>
      <SkipNavLink>Skip to content</SkipNavLink>
      <Box
        as="header"
        backgroundColor="white"
        borderBottomWidth={1}
        paddingX={6}
        paddingY={3}
      >
        <Heading as="h1" size="xl">
          Weather
        </Heading>
      </Box>
      <Container as="main" maxW="container.sm" pt={4}>
        <SkipNavContent />
        <Grid
          gap={4}
          maxWidth="100%"
          templateAreas={`"conditions"
            "alerts"
            "hourly"`}
        >
          <GridItem area="conditions">
            <CurrentConditions />
          </GridItem>
          <GridItem area="alerts">
            <WeatherAlerts />
          </GridItem>
          <GridItem area="hourly">
            <HourlyWeather />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};
