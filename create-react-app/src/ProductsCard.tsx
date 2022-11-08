import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@vavassor/nws-client";
import React, { useState } from "react";
import { usePoint } from "./Forecast/usePoint";
import dayjs from "dayjs";
import { Link, useSearchParams } from "react-router-dom";

export const ProductsCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [endTime, setEndTime] = useState(dayjs().endOf("day").toISOString());
  const [startTime, setStartTime] = useState(
    dayjs().startOf("day").toISOString()
  );

  const { point } = usePoint();
  const { data: products } = useQuery(
    ["products"],
    () =>
      getProducts({
        end: endTime,
        limit: 25,
        office: searchParams.getAll("office"),
        start: startTime,
      }),
    {
      enabled: !!point,
    }
  );

  return (
    <Box as="section" borderRadius="lg" borderWidth="1px" py={4}>
      <Heading as="h2" px={8} size="lg">
        Products
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Time</Th>
              <Th>Office</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.["@graph"].map((product) => (
              <Tr key={product.id}>
                <Td maxWidth="150px">
                  <Link to={`/products/${product.id}`}>
                    <Text
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {product.productName}
                    </Text>
                  </Link>
                </Td>
                <Td>
                  {new Intl.DateTimeFormat("en-US", {
                    timeStyle: "short",
                  }).format(new Date(product.issuanceTime))}
                </Td>
                <Td>{product.issuingOffice}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
