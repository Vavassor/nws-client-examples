import { Box, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  officeId: string | undefined;
}

export const OfficeLinksCard: FC<Props> = ({ officeId }) => {
  return (
    <Box as="section" borderRadius="lg" borderWidth="1px" py={4}>
      <Heading as="h2" px={8} size="lg">
        Links
      </Heading>
      <UnorderedList px={8}>
        <ListItem>
          <Link as={RouterLink} to={`/products?location=${officeId}`}>
            Latest related text products
          </Link>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};
