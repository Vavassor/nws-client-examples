import { Container } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import { FC } from "react";
import { HourlyWeatherSection } from "./Forecast/HourlyWeatherSection";

export const HourlyWeather: FC = () => {
  return (
    <Container as="main" maxW="container.sm" pt={4}>
      <SkipNavContent />
      <HourlyWeatherSection />
    </Container>
  );
};
