import { Box, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import React, { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { usePoint } from "./usePoint";

export const LocalInformationCard: FC = () => {
  const { point } = usePoint();

  return (
    <Box as="section" borderRadius="lg" borderWidth="1px" py={4}>
      <Heading as="h2" px={8} size="lg">
        Local Information
      </Heading>
      {!!point && (
        <UnorderedList px={8}>
          <ListItem>
            <Link as={RouterLink} to={`offices/${point.properties.cwa}`}>
              Local forecast office
            </Link>
          </ListItem>
        </UnorderedList>
      )}
    </Box>
  );
};
