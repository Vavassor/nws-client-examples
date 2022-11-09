import { Container, Grid, GridItem } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { OfficeHeadlinesCard } from "./OfficeHeadlinesCard";
import { OfficeLinksCard } from "./OfficeLinksCard";
import { OfficeSummaryCard } from "./OfficeSummaryCard";

export const OfficePage: FC = () => {
  const { officeId } = useParams();

  return (
    <Container as="main" maxW="container.sm" pt={4}>
      <SkipNavContent />
      <Grid
        gap={4}
        gridTemplateColumns="100%"
        maxWidth="100%"
        templateAreas={`"current"
          "summary"
          "news"
          "links"`}
      >
        <GridItem area="summary">
          <OfficeSummaryCard officeId={officeId} />
        </GridItem>
        <GridItem area="news">
          <OfficeHeadlinesCard officeId={officeId} />
        </GridItem>
        <GridItem area="links">
          <OfficeLinksCard officeId={officeId} />
        </GridItem>
      </Grid>
    </Container>
  );
};
