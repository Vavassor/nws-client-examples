import { Container } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { OfficeSummaryCard } from "./OfficeSummaryCard";

export const OfficePage: FC = () => {
  const { officeId } = useParams();

  return (
    <Container as="main" maxW="container.sm" pt={4}>
      <SkipNavContent />
      <OfficeSummaryCard officeId={officeId} />
    </Container>
  );
};
