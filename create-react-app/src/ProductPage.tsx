import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { SkipNavContent } from "@chakra-ui/skip-nav";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@vavassor/nws-client";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { saveTextFile } from "./Common/SaveFile";

export const ProductPage: FC = () => {
  const { productId } = useParams();
  const { data: product } = useQuery(
    ["product", productId],
    () => getProduct({ productId: productId! }),
    {
      enabled: !!productId,
    }
  );

  const handleClickCopy = () => {
    if (product?.productText) {
      navigator.clipboard.writeText(product.productText);
    }
  };

  const handleClickPrint = () => {
    window.print();
  };

  const handleClickDownload = () => {
    if (product?.productText) {
      saveTextFile(product.productText, `${product.productName}.txt`);
    }
  };

  return (
    <Container as="main" maxW="container.sm" pt={4}>
      <SkipNavContent />
      {!!product && (
        <>
          <Heading as="h1" pt={4} size="lg">
            {product.productName}
          </Heading>
          <Text>
            Issued by {product.issuingOffice} on{" "}
            <time dateTime={product.issuanceTime}>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
                timeStyle: "long",
              }).format(new Date(product.issuanceTime))}
            </time>
            .
          </Text>
          <Box mt={8}>
            <Button onClick={handleClickCopy}>Copy text</Button>
            <Button ms={2} onClick={handleClickDownload}>
              Download
            </Button>
            <Button ms={2} onClick={handleClickPrint}>
              Print
            </Button>
          </Box>
          <Text as="pre" mt={4} overflowX="auto">
            {product.productText}
          </Text>
        </>
      )}
    </Container>
  );
};
