import { Container } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import React, { FC } from "react";
import { ProductsCard } from "./ProductsCard";

export const ProductsPage: FC = () => {
  return (
    <Container as="main" maxW="container.sm" pt={4}>
      <SkipNavContent />
      <ProductsCard />
    </Container>
  );
};
