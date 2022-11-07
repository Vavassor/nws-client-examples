import React, { FC } from "react";
import { SkipNavLink } from "@chakra-ui/skip-nav";
import {
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
      <Stack
        alignItems={{ lg: "center" }}
        as="header"
        backgroundColor="white"
        borderBottomWidth={1}
        direction={{ base: "column", lg: "row" }}
        paddingX={6}
        paddingY={3}
      >
        <Container maxW="container.xl">
          <HStack justifyContent="space-between">
            <Heading as="h1" me={4} size="xl">
              Weather
            </Heading>

            <Hide above="lg">
              <Button {...buttonProps}>Menu</Button>
            </Hide>
          </HStack>

          <nav {...(shouldShowMenu ? disclosureProps : {})}>
            <Link as={RouterLink} me={4} to="/">
              Today
            </Link>
            <Link as={RouterLink} to="/hourly">
              Hourly
            </Link>
          </nav>
        </Container>
      </Stack>
      <Outlet />
    </>
  );
};
