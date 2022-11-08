import { Container, Text } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@vavassor/nws-client";
import React, { FC } from "react";
import { useParams } from "react-router-dom";

export const Product: FC = () => {
  const { productId } = useParams();
  const { data: product } = useQuery(
    ["products", productId],
    () => getProduct({ productId: productId! }),
    {
      enabled: !!productId,
    }
  );

  return (
    <Container as="main" maxW="container.sm" pt={4}>
      <SkipNavContent />
      <Text as="pre">{product?.productText}</Text>
    </Container>
  );
};
