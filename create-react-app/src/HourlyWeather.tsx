import { Container } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import React, { FC } from "react";
import { HourlyWeatherCard } from "./Forecast/HourlyWeatherCard";

export const HourlyWeather: FC = () => {
  return (
    <Container as="main" maxW="container.sm" pt={4}>
      <SkipNavContent />
      <HourlyWeatherCard />
    </Container>
  );
};
