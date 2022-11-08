import React, { FC } from "react";
import { SkipNavLink } from "@chakra-ui/skip-nav";
import {
  Box,
  Button,
  Container,
  Heading,
  Hide,
  HStack,
  Link,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink, Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
  const { getDisclosureProps, getButtonProps } = useDisclosure();
  const shouldShowMenu = useBreakpointValue({ base: true, lg: false });

  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

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
        <Container maxW="container.xl">
          <Stack
            alignItems={{ lg: "center" }}
            direction={{ base: "column", lg: "row" }}
          >
            <HStack justifyContent="space-between">
              <Heading as="h1" me={4} size="xl">
                Weather
              </Heading>

              <Hide above="lg">
                <Button {...buttonProps}>Menu</Button>
              </Hide>
            </HStack>

            <nav {...(shouldShowMenu ? disclosureProps : {})}>
              <Link as={RouterLink} to="/">
                Today
              </Link>
              <Link as={RouterLink} ms={4} to="/hourly">
                Hourly
              </Link>
              <Link as={RouterLink} ms={4} to="/products">
                Products
              </Link>
            </nav>
          </Stack>
        </Container>
      </Box>
      <Outlet />
    </>
  );
};
